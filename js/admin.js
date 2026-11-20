// PHASER ADMIN — CRUD real conectado con MockAPI.
// Credenciales de práctica: admin / PHASER.
// IMPORTANTE: autenticación de demostración en frontend; no es seguridad de producción.
const AdminPanel = {
  loggedIn: false,

  requireLogin() {
    if (!this.loggedIn) {
      showToast("Iniciá sesión como administrador para continuar.");
      return false;
    }
    return true;
  },

  async open() {
    if (!this.requireLogin()) return;
    const status = document.getElementById("adminStatus");
    status.textContent = "Actualizando inventario desde MockAPI...";
    try {
      await ProductStore.load();
      this.renderTable();
      status.textContent = "Inventario sincronizado con MockAPI.";
      bootstrap.Modal.getOrCreateInstance(document.getElementById("adminModal")).show();
    } catch (error) {
      status.textContent = "No se pudo sincronizar el inventario.";
      showToast("Error al cargar el inventario: " + error.message);
    }
  },

  refreshStats() {
    const products = ProductStore.products || [];
    document.getElementById("adminTotal").textContent = products.length;
    document.getElementById("adminStock").textContent =
      products.reduce((sum, product) => sum + (Number(product.stock) || 0), 0);
    document.getElementById("adminBrands").textContent =
      new Set(products.map(product => product.marca).filter(Boolean)).size;
  },

  renderTable() {
    const body = document.getElementById("adminTableBody");
    if (!body) return;

    if (!ProductStore.products.length) {
      body.innerHTML = '<tr><td colspan="6" class="text-center py-4">No hay productos registrados.</td></tr>';
      this.refreshStats();
      return;
    }

    body.innerHTML = ProductStore.products.map(product => `
      <tr>
        <td>
          <div class="admin-product-name">${escapeHTML(product.nombre || "Sin nombre")}</div>
          <div class="admin-product-sub">${escapeHTML(product.modelo || "")}</div>
        </td>
        <td>${escapeHTML(product.marca || "—")}</td>
        <td>${escapeHTML(product.categoria || "—")}</td>
        <td>Bs ${formatMoney(product.precio)}</td>
        <td>${Number(product.stock) || 0}</td>
        <td>
          <button class="table-action" data-edit="${escapeHTML(product.id)}" title="Editar producto" aria-label="Editar ${escapeHTML(product.nombre)}"><i class="bi bi-pencil"></i></button>
          <button class="table-action delete" data-delete="${escapeHTML(product.id)}" title="Eliminar producto" aria-label="Eliminar ${escapeHTML(product.nombre)}"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `).join("");

    body.querySelectorAll("[data-edit]").forEach(button => {
      button.addEventListener("click", () => this.openForm(button.dataset.edit));
    });
    body.querySelectorAll("[data-delete]").forEach(button => {
      button.addEventListener("click", () => this.deleteProduct(button.dataset.delete));
    });
    this.refreshStats();
  },

  openForm(id = null) {
    if (!this.requireLogin()) return;

    const product = id ? ProductStore.find(id) : null;
    if (id && !product) {
      showToast("No encontramos ese producto en el inventario.");
      return;
    }

    document.getElementById("productForm").reset();
    document.getElementById("editProductId").value = product ? product.id : "";
    document.getElementById("productFormTitle").innerHTML =
      product ? 'Editar <em>guitarra.</em>' : 'Nueva <em>guitarra.</em>';
    document.getElementById("saveProductButton").innerHTML =
      product ? 'GUARDAR CAMBIOS <i class="bi bi-arrow-right"></i>' :
                'GUARDAR PRODUCTO <i class="bi bi-arrow-right"></i>';

    if (product) {
      document.getElementById("formNombre").value = product.nombre || "";
      document.getElementById("formMarca").value = product.marca || "";
      document.getElementById("formModelo").value = product.modelo || "";
      document.getElementById("formCategoria").value = product.categoria || "";
      document.getElementById("formPrecio").value = product.precio ?? 0;
      document.getElementById("formStock").value = product.stock ?? 0;
      document.getElementById("formImagen").value = product.imagen || "";
      document.getElementById("formDescripcion").value = product.descripcion || "";
    }

    bootstrap.Modal.getOrCreateInstance(document.getElementById("productFormModal")).show();
  },

  async save(formData) {
    if (!this.requireLogin()) return;

    const id = document.getElementById("editProductId").value;
    const product = {
      nombre: String(formData.get("nombre") || "").trim(),
      marca: String(formData.get("marca") || "").trim(),
      modelo: String(formData.get("modelo") || "").trim(),
      categoria: String(formData.get("categoria") || "").trim(),
      precio: Number(formData.get("precio")),
      stock: Number(formData.get("stock")),
      imagen: String(formData.get("imagen") || "").trim(),
      descripcion: String(formData.get("descripcion") || "").trim()
    };

    if (!product.nombre || !product.marca || !product.modelo || !product.categoria ||
        !product.descripcion || !Number.isFinite(product.precio) || product.precio < 0 ||
        !Number.isInteger(product.stock) || product.stock < 0) {
      showToast("Revisá los campos: precio y stock deben ser números válidos.");
      return;
    }

    if (product.imagen) {
      try {
        const imageURL = new URL(product.imagen);
        if (!["http:", "https:"].includes(imageURL.protocol)) throw new Error("URL inválida");
      } catch {
        showToast("La imagen debe tener una URL válida que comience con https:// o http://.");
        return;
      }
    } else {
      // Si no se proporciona una URL, la interfaz usa su imagen de respaldo por modelo.
      product.imagen = "";
    }

    const saveButton = document.getElementById("saveProductButton");
    saveButton.disabled = true;
    saveButton.textContent = "GUARDANDO...";

    try {
      if (id) {
        await PhaserAPI.update(id, product); // PUT: reemplaza los datos del producto.
      } else {
        await PhaserAPI.create(product); // POST: crea un nuevo producto.
      }

      bootstrap.Modal.getInstance(document.getElementById("productFormModal"))?.hide();
      await ProductStore.load();
      this.renderTable();
      document.getElementById("adminStatus").textContent = "Cambios guardados correctamente en MockAPI.";
      showToast(id ? "Producto actualizado en MockAPI." : "Producto agregado a MockAPI.");
    } catch (error) {
      console.error(error);
      showToast("No se pudo guardar el producto: " + error.message);
    } finally {
      saveButton.disabled = false;
      saveButton.innerHTML = id ? 'GUARDAR CAMBIOS <i class="bi bi-arrow-right"></i>' :
                                 'GUARDAR PRODUCTO <i class="bi bi-arrow-right"></i>';
    }
  },

  async deleteProduct(id) {
    if (!this.requireLogin()) return;
    const product = ProductStore.find(id);
    if (!product) return;

    const confirmed = confirm(
      `¿Eliminar "${product.nombre}" del catálogo?\n\nEsta acción borrará el registro de MockAPI y no se puede deshacer.`
    );
    if (!confirmed) return;

    try {
      await PhaserAPI.remove(id); // DELETE: elimina el producto en MockAPI.
      ProductStore.cart = ProductStore.cart.filter(item => String(item.id) !== String(id));
      await ProductStore.load();
      ProductStore.renderCart();
      this.renderTable();
      document.getElementById("adminStatus").textContent = "Producto eliminado de MockAPI.";
      showToast("Producto eliminado del catálogo.");
    } catch (error) {
      console.error(error);
      showToast("No se pudo eliminar el producto: " + error.message);
    }
  },

  async refreshInventory() {
    if (!this.requireLogin()) return;
    const status = document.getElementById("adminStatus");
    status.textContent = "Consultando MockAPI...";
    try {
      await ProductStore.load();
      this.renderTable();
      status.textContent = "Inventario actualizado desde MockAPI.";
      showToast("Inventario actualizado.");
    } catch (error) {
      status.textContent = "Error al actualizar el inventario.";
      showToast(error.message);
    }
  },

  logout() {
    this.loggedIn = false;
    bootstrap.Modal.getInstance(document.getElementById("adminModal"))?.hide();
    bootstrap.Modal.getInstance(document.getElementById("productFormModal"))?.hide();
    showToast("Sesión administrativa cerrada.");
  }
};

window.AdminPanel = AdminPanel;
