// Inicialización, utilidades y eventos generales.
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function safeURL(value) {
  try { const url=new URL(String(value||"")); return ["http:","https:"].includes(url.protocol)?escapeHTML(url.href):""; } catch { return ""; }
}
function formatMoney(value) { return new Intl.NumberFormat("es-BO",{maximumFractionDigits:2}).format(Number(value)||0); }
function showToast(message) {
  document.getElementById("toastMessage").textContent=message;
  bootstrap.Toast.getOrCreateInstance(document.getElementById("phaserToast"),{delay:3500}).show();
}
document.addEventListener("DOMContentLoaded",()=>{
  ProductStore.load();
  ProductStore.renderCart();

  ["searchInput","brandFilter","categoryFilter","sortFilter"].forEach(id=>{
    const el=document.getElementById(id);
    el.addEventListener(id==="searchInput"?"input":"change",()=>ProductStore.applyFilters());
  });
  document.getElementById("retryLoad").addEventListener("click",()=>ProductStore.load());
  document.getElementById("searchFocus").addEventListener("click",()=>{
    document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
    setTimeout(()=>document.getElementById("searchInput").focus(),400);
  });
  document.getElementById("cartOpen").addEventListener("click",()=>bootstrap.Offcanvas.getOrCreateInstance(document.getElementById("cartPanel")).show());
  document.getElementById("checkoutButton").addEventListener("click",()=>ProductStore.checkout());
  const openAdminLogin = () => bootstrap.Modal.getOrCreateInstance(document.getElementById("adminLoginModal")).show();
  document.getElementById("adminOpen")?.addEventListener("click", openAdminLogin);
  document.getElementById("adminMenuOpen")?.addEventListener("click", () => {
    closePhaserMenu();
    openAdminLogin();
  });

  // Menú responsive propio: no depende del plugin Collapse de Bootstrap.
  const menuToggle = document.getElementById("phaserMenuToggle");
  const mainNav = document.getElementById("mainNav");
  const closePhaserMenu = () => {
    if (!menuToggle || !mainNav) return;
    mainNav.classList.remove("phaser-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú de navegación");
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
  };
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("phaser-menu-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");
      menuToggle.innerHTML = isOpen
        ? '<span class="menu-x"></span><span class="menu-x"></span>'
        : '<span></span><span></span><span></span>';
    });
    mainNav.querySelectorAll('a[href]').forEach(link => link.addEventListener("click", closePhaserMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992) closePhaserMenu();
    });
  }
  document.getElementById("adminLoginForm").addEventListener("submit",e=>{
    e.preventDefault();
    const user=document.getElementById("adminUser").value;
    const pass=document.getElementById("adminPassword").value;
    if(user==="admin"&&pass==="PHASER"){
      AdminPanel.loggedIn=true;
      bootstrap.Modal.getInstance(document.getElementById("adminLoginModal")).hide();
      e.target.reset();document.getElementById("loginError").classList.add("d-none");
      AdminPanel.open();
    } else document.getElementById("loginError").classList.remove("d-none");
  });
  document.getElementById("adminLogout").addEventListener("click",()=>AdminPanel.logout());
  document.getElementById("addProductButton").addEventListener("click",()=>AdminPanel.openForm());
  document.getElementById("refreshInventoryButton").addEventListener("click",()=>AdminPanel.refreshInventory());
  document.getElementById("productForm").addEventListener("submit",e=>{
    e.preventDefault();
    const data=new FormData();
    data.set("nombre",document.getElementById("formNombre").value);
    data.set("marca",document.getElementById("formMarca").value);
    data.set("modelo",document.getElementById("formModelo").value);
    data.set("categoria",document.getElementById("formCategoria").value);
    data.set("precio",document.getElementById("formPrecio").value);
    data.set("stock",document.getElementById("formStock").value);
    data.set("imagen",document.getElementById("formImagen").value);
    data.set("descripcion",document.getElementById("formDescripcion").value);
    AdminPanel.save(data);
  });
  const brandList = document.getElementById("brandList");
  if (brandList) brandList.addEventListener("click",e=>{
    const btn=e.target.closest("[data-brand]");if(!btn)return;
    window.location.href = "catalogo.html?marca=" + encodeURIComponent(btn.dataset.brand);
  });
  const brandHome = document.getElementById("brandHome");
  if (brandHome && document.body.dataset.page === "home") {
    brandHome.addEventListener("click",e=>{
      if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
        e.preventDefault();
        window.scrollTo({top:0,behavior:"smooth"});
      }
    });
  }
  // Permite abrir el catálogo ya filtrado desde enlaces internos de marcas.
  const requestedBrand = new URLSearchParams(window.location.search).get("marca");
  if (requestedBrand && document.getElementById("brandFilter")) {
    ProductStore.load().then(() => {
      const option = [...document.getElementById("brandFilter").options].find(o => o.value.toLowerCase() === requestedBrand.toLowerCase());
      if (option) {
        document.getElementById("brandFilter").value = option.value;
        ProductStore.applyFilters();
      }
    });
  }
});
