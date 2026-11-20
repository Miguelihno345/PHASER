// Catálogo, filtros, detalle y carrito.

// Fotografías individuales por producto. Las URL genéricas que ya estaban
// guardadas en MockAPI se sustituyen por la fotografía del modelo correcto.
// Si el administrador introduce una URL propia, esa URL tiene prioridad.
const PRODUCT_IMAGES = {
  "gibson|les paul standard 50s": "https://www.tammerpianojasoitin.fi/WebRoot/Capnova/Shops/17042015-9511/5D7A/59CB/4CB8/9331/F567/0A28/1011/0A74/gibson-les-paul-standard-50s-original-gold-top-1_ml.png",
  "gibson|sg standard": "https://detroitguitar.com/cdn/shop/files/GibsonSGCherry02_2048x.jpg?v=1731534275",
  "gibson|es-335": "https://cdn.pimber.ly/public/asset/export/654df2787858ff9fd0095eeb/677de95d/69724c4a541065256900011b/8d3abfd2/230750068%20%283%29.JPG.jpeg",
  "gibson|flying v": "https://cdn.do-re.com.tr/gibson-flying-v-elektro-gitar-antique-natural-a35c6c3fdbe41825b0e56b327af219bf-ea6a3ecbf38063a94b2f1588df4bc2af-max-pp.jpg",
  "fender|player stratocaster": "assets/products/fender-player-stratocaster.jpg",
  "fender|player telecaster": "https://media.rainpos.com/5730/0145212582_gtr_frt_001_rr.png",
  "fender|jazzmaster": "https://giggear.2dimg.com/1/1547740663_6928.jpg",
  "fender|jaguar": "https://astrings.co.uk/cdn/shop/products/car1x.jpg?v=1682345469",
  "prs|se custom 24": "https://media.guitarcenter.com/is/image/MMGS7/K46777000001000-02-2000x2000.jpg",
  "prs|custom 24": "https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/37067/262961/0395694%20%284%29.jpg__15315.1767758983.jpg?c=1",
  "prs|mccarty 594": "assets/products/prs-mccarty-594.jpg",
  "prs|se ce 24": "https://www.chicagomusicexchange.com/cdn/shop/files/prs-electric-guitars-solid-body-prs-se-ce-24-charcoal-burst-prs-se-ce-24-charcoal-burst-115984-ca-1229629786.jpg?v=1774666514",
  "martin|sc-13e": "https://cdn.mos.cms.futurecdn.net/7EWwsneU5PRk6SHV7mhD3C.jpg",
  "martin|d-28": "https://megamusiconline.com.au/cdn/shop/files/40SS-D281.jpg?v=1774935507&width=1920",
  "martin|000-15m": "https://rudysmusic.com/cdn/shop/products/hj3-4224_3651x3651.jpg?v=1642618505",
  "martin|gpc-13e": "https://d1aeri3ty3izns.cloudfront.net/media/44/447028/1200/preview.jpg",
  "ibanez|rg550": "https://cdn11.bigcommerce.com/s-hvzya2q3vy/images/stencil/1280x1280/products/55367/164472/ibarg550eb_194265__80694.1759233131.jpg?c=1&imbypass=on",
  "ibanez|azes40": "https://musicdistributionco.com/cdn/shop/products/AZES40-PRB.png?v=1775294823&width=1946",
  "ibanez|jemjr": "https://cdn11.bigcommerce.com/s-6yzvyy2b/products/27224/images/180221/JEMJRWH__31746.1623109361.500.750.png?c=2",
  "ibanez|rga42fm": "https://audiomusicacl.vtexassets.com/arquivos/ids/184273-800-auto?aspect=true&height=auto&v=638242515510230000&width=800",
  "jackson|js32 dinky": "https://thumbs.static-thomann.de/thumb//bdbmagic/pics/prod/330584.jpg",
  "jackson|soloist": "assets/products/jackson-soloist.jpg",
  "jackson|js32 king v": "https://static.bax-shop.es/image/product/318963/2073022/a08b0046/1581670444Jackson%20JS%20Series%20King%20V%20J32%20Gloss%20Black_3.jpg?key=og",
  "jackson|js32 kelly": "https://media.musicarts.com/is/image/MMGS7/L37444000001000-02-2000x2000.jpg",
  "esp|ltd ec-1000": "https://www.melodyhousemi.com/assets/library/ESP-LTD/LEC1000VBDI-1.jpg",
  "esp|eclipse": "https://guitardien.vn/cdn/shop/files/J42422000001000-00-600x600.webp?v=1747363739&width=1946",
  "schecter|c-1 platinum": "https://media.musicarts.com/is/image/MMGS7/H96103000005000-00-720x720.jpg",
  "epiphone|les paul custom": "https://vietmusic.vn/cdn/shop/files/EIGLPCEBGH1_front__1_1ceef816-9370-4afa-a502-6ec89a374e75.jpg?v=1741442874",
  "yamaha|revstar standard": "https://www.windmillguitars.com/cdn/shop/files/RSS20_black_a_0001_tcm117-1658982_1200x1200.jpg?v=1764255748",
  "yamaha|pacifica 612": "https://cdn.mos.cms.futurecdn.net/YnBfZVsY8CT35UavKpbFmY.jpg",
  "kramer|baretta special": "https://static.bax-shop.es/image/product/977460/3823151/58c370a8/1662447060KPBSWHCT1_front.jpg?key=og",
  "kramer|pacer classic": "https://www.pitbullaudio.com/media/catalog/product/k/r/kra-kpcrbmcf1.jpg?bg-color=255%2C255%2C255&fit=bounds&height=&quality=100&width=",
  "kramer|focus vt-211s": "https://static.bax-shop.es/image/product/850969/3218181/2b71b986/1637307097KF21TECT1_front_v2.jpg?key=og",
  "kramer|nightswan": "https://cdn.long-mcquade.com/files/224286/lg_4a4795a1cd187a3165683c7269c35334.jpg"
};

function getProductImage(product) {
  const normalize = value => String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
  const key = `${normalize(product.marca)}|${normalize(product.nombre)}`;
  const original = String(product.imagen || "").trim();

  // These three records had image URLs that failed in the browser.
  // Use bundled local assets so the cards and detail view always have an image.
  const localImageKeys = new Set([
    "fender|player stratocaster",
    "prs|mccarty 594",
    "jackson|soloist"
  ]);
  if (localImageKeys.has(key)) return PRODUCT_IMAGES[key];
  const isOldGenericSeed = !original || /^imagen(\s|$)/i.test(original) ||
    original.includes("photo-1550291652") || original.includes("photo-1564186763535") ||
    original.includes("photo-1510915361894");
  if (!isOldGenericSeed) return safeURL(original);
  return PRODUCT_IMAGES[key] || "";
}

const ProductStore = {
  products: [],
  filtered: [],
  cart: [],
  async load() {
    const loading = document.getElementById("loadingState");
    const error = document.getElementById("errorState");
    loading.classList.remove("d-none"); error.classList.add("d-none");
    try {
      this.products = await PhaserAPI.getAll();
      this.filtered = [...this.products];
      this.populateFilters();
      this.render();
      document.getElementById("resultCount").textContent = this.products.length.toString().padStart(2, "0");
      loading.classList.add("d-none");
      if (window.AdminPanel) AdminPanel.refreshStats();
    } catch (err) {
      console.error(err);
      loading.classList.add("d-none"); error.classList.remove("d-none");
    }
  },
  populateFilters() {
    const brands = [...new Set(this.products.map(p => p.marca).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
    const categories = [...new Set(this.products.map(p => p.categoria).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
    const brand = document.getElementById("brandFilter");
    const category = document.getElementById("categoryFilter");
    const oldBrand = brand.value, oldCategory = category.value;
    brand.innerHTML = '<option value="">Todas las marcas</option>' + brands.map(x=>`<option value="${escapeHTML(x)}">${escapeHTML(x)}</option>`).join("");
    category.innerHTML = '<option value="">Todas las categorías</option>' + categories.map(x=>`<option value="${escapeHTML(x)}">${escapeHTML(x)}</option>`).join("");
    brand.value = oldBrand; category.value = oldCategory;
  },
  applyFilters() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const brand = document.getElementById("brandFilter").value;
    const category = document.getElementById("categoryFilter").value;
    const sort = document.getElementById("sortFilter").value;
    this.filtered = this.products.filter(p => {
      const haystack = [p.nombre,p.marca,p.modelo,p.categoria,p.descripcion].join(" ").toLowerCase();
      return (!query || haystack.includes(query)) && (!brand || p.marca === brand) && (!category || p.categoria === category);
    });
    if (sort === "price-asc") this.filtered.sort((a,b)=>Number(a.precio)-Number(b.precio));
    if (sort === "price-desc") this.filtered.sort((a,b)=>Number(b.precio)-Number(a.precio));
    if (sort === "name") this.filtered.sort((a,b)=>(a.nombre||"").localeCompare(b.nombre||""));
    this.render();
  },
  visibleProducts() {
    return document.body.dataset.page === "home" ? this.filtered.slice(0, 8) : this.filtered;
  },
  render() {
    const grid = document.getElementById("productGrid");
    const empty = document.getElementById("emptyState");
    document.getElementById("resultCount").textContent = this.filtered.length.toString().padStart(2,"0");
    grid.innerHTML = this.visibleProducts().map(p => {
      const stock = Number(p.stock)||0;
      return `<article class="product-card" data-id="${escapeHTML(p.id)}">
        <div class="product-image">
          <img src="${getProductImage(p)}" alt="${escapeHTML(p.nombre)}" loading="lazy" onerror="this.onerror=null;this.remove();">
          <span class="product-tag">${escapeHTML(p.categoria||"GUITARRA")}</span>
          <span class="stock-tag">${stock>0?`${stock} DISP.`:"AGOTADO"}</span>
        </div>
        <div class="product-info">
          <div class="product-brand">${escapeHTML((p.marca||"").toUpperCase())}</div>
          <h3 class="product-name">${escapeHTML(p.nombre||p.modelo||"Guitarra")}</h3>
          <div class="product-model">${escapeHTML(p.modelo||"")}</div>
          <div class="product-card-bottom"><strong class="product-price">Bs ${formatMoney(p.precio)}</strong><button class="add-quick" data-add="${escapeHTML(p.id)}" aria-label="Agregar al carrito" ${stock<1?"disabled":""}>+</button></div>
        </div></article>`;
    }).join("");
    empty.classList.toggle("d-none", this.filtered.length !== 0);
    grid.classList.toggle("d-none", this.filtered.length === 0);
    grid.querySelectorAll(".product-card").forEach(card => card.addEventListener("click", e => {
      if (e.target.closest("[data-add]")) return;
      this.showDetail(card.dataset.id);
    }));
    grid.querySelectorAll("[data-add]").forEach(btn => btn.addEventListener("click", e => {
      e.stopPropagation(); this.addToCart(btn.dataset.add);
    }));
  },
  find(id) { return this.products.find(p => String(p.id) === String(id)); },
  showDetail(id) {
    const p = this.find(id); if (!p) return;
    document.getElementById("productModalBody").innerHTML = `<div class="product-detail">
      <div class="detail-image"><img src="${getProductImage(p)}" alt="${escapeHTML(p.nombre)}" onerror="this.onerror=null;this.remove();"></div>
      <div class="detail-copy"><p class="eyebrow">${escapeHTML((p.marca||"").toUpperCase())} / ${escapeHTML((p.categoria||"").toUpperCase())}</p>
      <h3>${escapeHTML(p.nombre)}</h3><span class="product-model">${escapeHTML(p.modelo||"")}</span>
      <p>${escapeHTML(p.descripcion||"Instrumento disponible en PHASER.")}</p>
      <strong class="detail-price">Bs ${formatMoney(p.precio)}</strong>
      <span class="detail-stock">${Number(p.stock)>0?`${p.stock} UNIDADES DISPONIBLES`:"SIN STOCK"}</span>
      <button class="btn-phaser" id="detailAdd" ${Number(p.stock)<1?"disabled":""}>AGREGAR AL CARRITO <i class="bi bi-arrow-right"></i></button></div></div>`;
    document.getElementById("detailAdd").addEventListener("click",()=>{this.addToCart(id);bootstrap.Modal.getInstance(document.getElementById("productModal")).hide();});
    bootstrap.Modal.getOrCreateInstance(document.getElementById("productModal")).show();
  },
  addToCart(id) {
    const p = this.find(id); if (!p || Number(p.stock)<1) return showToast("Este producto no tiene stock disponible.");
    const existing = this.cart.find(x=>String(x.id)===String(id));
    if (existing) {
      if (existing.quantity >= Number(p.stock)) return showToast("No hay más unidades disponibles.");
      existing.quantity++;
    } else this.cart.push({id:p.id,quantity:1});
    this.renderCart(); showToast("Guitarra agregada al carrito.");
  },
  changeQuantity(id, delta) {
    const item=this.cart.find(x=>String(x.id)===String(id)); const p=this.find(id); if(!item||!p)return;
    const next=item.quantity+delta;
    if(next<=0)this.cart=this.cart.filter(x=>String(x.id)!==String(id));
    else if(next<=Number(p.stock))item.quantity=next;
    else showToast("No hay más unidades disponibles.");
    this.renderCart();
  },
  removeCartItem(id){this.cart=this.cart.filter(x=>String(x.id)!==String(id));this.renderCart();},
  renderCart() {
    const wrap=document.getElementById("cartItems");
    const count=this.cart.reduce((s,x)=>s+x.quantity,0);
    document.getElementById("cartCount").textContent=count;
    document.getElementById("cartPanelCount").textContent=`(${count})`;
    if(!this.cart.length){wrap.innerHTML='<div class="state-message"><i class="bi bi-bag"></i><strong>Tu carrito está vacío.</strong><span>Encontrá tu próximo instrumento.</span></div>';document.getElementById("checkoutButton").disabled=true;}
    else {
      wrap.innerHTML=this.cart.map(item=>{const p=this.find(item.id);if(!p)return "";return `<div class="cart-item"><img src="${getProductImage(p)}" alt="" onerror="this.onerror=null;this.remove();"><div><h6>${escapeHTML(p.nombre)}</h6><small>${escapeHTML(p.marca)} · Bs ${formatMoney(p.precio)}</small><div class="quantity-control"><button data-minus="${escapeHTML(p.id)}">−</button><span>${item.quantity}</span><button data-plus="${escapeHTML(p.id)}">+</button></div></div><div><strong>Bs ${formatMoney(Number(p.precio)*item.quantity)}</strong><button class="remove-item d-block ms-auto" data-remove="${escapeHTML(p.id)}" aria-label="Quitar">×</button></div></div>`;}).join("");
      wrap.querySelectorAll("[data-minus]").forEach(b=>b.onclick=()=>this.changeQuantity(b.dataset.minus,-1));
      wrap.querySelectorAll("[data-plus]").forEach(b=>b.onclick=()=>this.changeQuantity(b.dataset.plus,1));
      wrap.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>this.removeCartItem(b.dataset.remove));
      document.getElementById("checkoutButton").disabled=false;
    }
    const subtotal=this.cart.reduce((sum,item)=>{const p=this.find(item.id);return sum+(p?Number(p.precio)*item.quantity:0);},0);
    document.getElementById("cartSubtotal").textContent=`Bs ${formatMoney(subtotal)}`;
  },
  async checkout() {
    if(!this.cart.length)return;
    const button=document.getElementById("checkoutButton");button.disabled=true;button.textContent="PROCESANDO...";
    try {
      // Volvemos a consultar cada producto antes de descontar para evitar usar stock desactualizado.
      const latest = await Promise.all(this.cart.map(async item=>({item,product:await PhaserAPI.getById(item.id)})));
      for(const {item,product} of latest) if(Number(product.stock)<item.quantity) throw new Error(`Stock insuficiente para ${product.nombre}.`);
      const updated=[];
      try {
        for(const {item,product} of latest) {
          const saved=await PhaserAPI.patch(product.id,{stock:Number(product.stock)-item.quantity});
          updated.push({id:product.id,oldStock:Number(product.stock),saved});
        }
      } catch(err) {
        // Compensación simple si falla una actualización intermedia.
        for(const entry of updated) await PhaserAPI.patch(entry.id,{stock:entry.oldStock}).catch(()=>{});
        throw err;
      }
      this.cart=[];await this.load();this.renderCart();
      bootstrap.Offcanvas.getInstance(document.getElementById("cartPanel")).hide();
      showToast("Compra de demostración confirmada. Stock actualizado en MockAPI.");
    } catch(err) {console.error(err);showToast(err.message||"No se pudo completar la compra.");}
    finally {button.disabled=!this.cart.length;button.innerHTML='CONFIRMAR COMPRA <i class="bi bi-arrow-right"></i>';}
  }
};

window.ProductStore=ProductStore;
