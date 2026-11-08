/* =========================================================
   DENTAL CABANILLAS — Funciones del sitio
   Los productos, servicios, WhatsApp, dirección y horarios se
   editan desde el PANEL (si Firebase está conectado) o en datos.js.
   ========================================================= */
const D0 = window.DATOS || { ajustes: {}, servicios: [], productos: [], iconos: {} };
let AJ = { ...D0.ajustes };
let WHATSAPP = AJ.whatsapp || "51987654321";
const FB_CFG = window.FIREBASE_CONFIG || {};
const EN_VIVO = !!FB_CFG.apiKey && !FB_CFG.apiKey.startsWith("PEGA");
const FB_V = "10.12.2";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const soles = n => "S/ " + (+n).toFixed(2);
const precio = n => !+n ? "Consultar" : "S/ " + (Number.isInteger(+n) ? (+n).toLocaleString("en-US") : (+n).toFixed(2));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const MEDIA = {};   // imágenes subidas desde el panel (m:ID → imagen)
const foto = (img, w = 600) => !img ? "" : img.startsWith("m:") ? (MEDIA[img.slice(2)] || "") : (img.startsWith("http") || img.startsWith("data:")) ? img : `https://images.unsplash.com/photo-${img}?auto=format&fit=crop&w=${w}&q=80`;
const wa = txt => window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(txt), "_blank");
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const ICO = {
  plus: '<svg class="ico" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  check: '<svg class="ico" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  bag: '<svg class="ico" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>',
  paw: '<svg class="ico" viewBox="0 0 24 24"><path d="M7 3c-2.5 0-4 2-4 4.5 0 2 1 3.5 1.5 5.5.6 2.5.8 5.5 2 7.5.8 1.3 2.2 1 2.6-.4l.9-3.6c.3-1.2 1.7-1.2 2 0l.9 3.6c.4 1.4 1.8 1.7 2.6.4 1.2-2 1.4-5 2-7.5.5-2 1.5-3.5 1.5-5.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/></svg>',
  arrow: '<svg class="ico" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};
const icono = k => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${(D0.iconos || {})[k] || (D0.iconos || {}).paw || ""}</svg>`;

/* ---------- Menú y animaciones ---------- */
const menu = $("#menu"), burger = $("#hamburger");
if (menu && burger) burger.addEventListener("click", () => burger.setAttribute("aria-expanded", menu.classList.toggle("open")));
let io = null;
function revealAll(root = document) {
  if (!io) { $$(".reveal", root).forEach(el => el.classList.add("visible")); return; }
  $$(".reveal:not(.visible)", root).forEach(el => io.observe(el));
}
if ("IntersectionObserver" in window) io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { threshold: .08 });
revealAll();
if (EN_VIVO) $$(".demo-only").forEach(el => el.remove());

function toast(t) {
  let el = $(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.innerHTML = ICO.check + t; el.classList.add("show");
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 2200);
}

/* =========================================================
   DATOS: Firebase → panel en modo demo (mismo navegador) → datos.js
   ========================================================= */
const ordenar = l => l.slice().sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999) || String(a.n).localeCompare(String(b.n)));
let FBX = null;   // { fs, db } cuando Firebase está conectado
async function fb() {
  if (FBX) return FBX;
  const base = `https://www.gstatic.com/firebasejs/${FB_V}/`;
  const [app, fs] = await Promise.all([import(base + "firebase-app.js"), import(base + "firebase-firestore.js")]);
  FBX = { fs, db: fs.getFirestore(app.getApps().length ? app.getApp() : app.initializeApp(FB_CFG)) };
  return FBX;
}
const localDB = () => store.get("dc_db", null);
const mezclar = (a, b) => { const o = { ...a }; for (const k in (b || {})) o[k] = (b[k] && typeof b[k] === "object" && !Array.isArray(b[k]) && a && a[k]) ? { ...a[k], ...b[k] } : b[k]; return o; };
let DATA = null;
async function cargarDatos() {
  if (DATA) return DATA;
  let prod = null, serv = null, aj = null, web = null, cats = null, pags = null, docs = null;
  try {
    if (EN_VIVO) {
      let cache = null; try { cache = JSON.parse(sessionStorage.getItem("dc_cache")); } catch (e) {}
      if (cache && cache.v === 5 && Date.now() - cache.t < 3 * 60 * 1000) ({ prod, serv, aj, web, cats, pags, docs } = cache);
      else {
        const { fs, db } = await fb();
        const [p, s, a, w, c, g, dr] = await Promise.all([fs.getDocs(fs.collection(db, "productos")), fs.getDocs(fs.collection(db, "servicios")),
          fs.getDoc(fs.doc(db, "ajustes", "general")), fs.getDoc(fs.doc(db, "ajustes", "web")), fs.getDoc(fs.doc(db, "ajustes", "categorias")), fs.getDoc(fs.doc(db, "ajustes", "paginas")), fs.getDoc(fs.doc(db, "ajustes", "doctores"))]);
        cats = c.exists() ? c.data() : null; pags = g.exists() ? g.data() : null; docs = dr.exists() ? dr.data().lista : null;
        prod = p.docs.map(d => ({ ...d.data(), id: d.id })); serv = s.docs.map(d => ({ ...d.data(), id: d.id }));
        aj = a.exists() ? a.data() : null; web = w.exists() ? w.data() : null;
        try { sessionStorage.setItem("dc_cache", JSON.stringify({ v: 5, t: Date.now(), prod, serv, aj, web, cats, pags, docs })); } catch (e) {}
      }
    } else {
      const local = localDB();
      if (local) {
        if (local.productos) prod = Object.entries(local.productos).map(([id, x]) => ({ ...x, id }));
        if (local.servicios) serv = Object.entries(local.servicios).map(([id, x]) => ({ ...x, id }));
        aj = local.ajustes || null; web = local.web || null;
        cats = (local.conf || {}).categorias || null; pags = (local.conf || {}).paginas || null; docs = ((local.conf || {}).doctores || {}).lista || null;
      }
    }
  } catch (e) { console.warn("No se pudieron leer los datos; se usan los de ejemplo.", e); }
  await cargarMedios([web, pags]);
  DATA = {
    productos: ordenar(prod && prod.length ? prod : D0.productos).filter(x => x.visible !== false),
    servicios: ordenar(serv && serv.length ? serv : D0.servicios).filter(x => x.visible !== false),
    ajustes: { ...D0.ajustes, ...(aj || {}) },
    web: mezclar(D0.web || {}, web),
    categorias: { productos: ordenar((cats && cats.productos) || D0.categorias.productos), servicios: ordenar((cats && cats.servicios) || D0.categorias.servicios) },
    paginas: mezclar(D0.paginas || {}, pags),
    doctores: docs || D0.doctores || [],
  };
  return DATA;
}

// Imágenes guardadas aparte (encabezados, bloques, portada…): se leen todas antes de pintar
async function cargarMedios(objs) {
  const ids = [...new Set((JSON.stringify(objs).match(/"m:[A-Za-z0-9_-]+"/g) || []).map(x => x.slice(3, -1)))].filter(id => !MEDIA[id]);
  if (!ids.length) return;
  try {
    if (EN_VIVO) {
      let c = {}; try { c = JSON.parse(sessionStorage.getItem("dc_media") || "{}"); } catch (e) {}
      const faltan = ids.filter(id => !c[id]);
      if (faltan.length) { const { fs, db } = await fb();
        const r = await Promise.all(faltan.map(id => fs.getDoc(fs.doc(db, "medios", id)).catch(() => null)));
        r.forEach((d, i) => { if (d && d.exists()) c[faltan[i]] = d.data().data; });
        try { sessionStorage.setItem("dc_media", JSON.stringify(c)); } catch (e) {} }
      ids.forEach(id => { if (c[id]) MEDIA[id] = c[id]; });
    } else { const m = (localDB() || {}).medios || {}; ids.forEach(id => { if (m[id]) MEDIA[id] = m[id].data || m[id]; }); }
  } catch (e) { console.warn("No se pudieron leer las imágenes", e); }
}

/* ---------- Categorías (Pet Shop y servicios) ---------- */
let CATS = { productos: D0.categorias.productos, servicios: D0.categorias.servicios };
const norm = t => String(t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
const catDe = (tipo, id) => CATS[tipo].find(c => c.id === id || norm(c.n) === norm(id)) || null;
const catNom = (tipo, id) => (catDe(tipo, id) || {}).n || id || "";
const enCat = (tipo, x, cid) => { const c = catDe(tipo, x.cat); return c ? c.id === cid : x.cat === cid; };
const catVisible = (tipo, x) => { const c = catDe(tipo, x.cat); return !c || c.visible !== false; };
function chipsCat(el, tipo, items, onPick, todos = "Todos") {
  const usados = CATS[tipo].filter(c => c.visible !== false && items.some(x => enCat(tipo, x, c.id)));
  el.innerHTML = `<button class="chip on" data-c="">${ICO.paw} ${todos}</button>` + usados.map(c => `<button class="chip" data-c="${esc(c.id)}">${icono(c.icon)} ${esc(c.n)}</button>`).join("");
  el.onclick = e => { const b = e.target.closest("[data-c]"); if (!b) return; $$(".chip", el).forEach(x => x.classList.remove("on")); b.classList.add("on"); onPick(b.dataset.c); };
  return usados;
}

/* ---------- Ajustes: WhatsApp, dirección, horarios ---------- */
function aplicarAjustes(a) {
  AJ = a; WHATSAPP = String(a.whatsapp || WHATSAPP).replace(/\D/g, "");
  $$(".wa-link").forEach(x => x.href = "https://wa.me/" + WHATSAPP);
  const t = {
    telefono: a.telefono, direccion: a.direccion, correo: a.correo,
    horario: `Lun a Sáb ${a.abre} – ${a.cierra} · Dom ` + (a.domingoCierra ? `${a.abre} – ${a.domingoCierra}` : "cerrado"),
    horarioLS: `${a.abre} – ${a.cierra}`, horarioDom: a.domingoCierra ? `${a.abre} – ${a.domingoCierra}` : "Cerrado",
    deliveryTxt: +a.deliveryGratis ? `Delivery gratis desde S/ ${a.deliveryGratis}` : "Delivery a todo Lima",
  };
  $$("[data-aj]").forEach(x => { const v = t[x.dataset.aj]; if (v != null && v !== "") x.textContent = v; });
  const m = $("#mapa"); if (m && a.direccion) { const src = "https://www.google.com/maps?q=" + encodeURIComponent(a.direccion) + "&output=embed"; if (m.src !== src) m.src = src; }
}

/* =========================================================
   PERSONALIZACIÓN (logo, nombre, colores, portada, nosotros...)
   ========================================================= */
let NOMBRE = "Dental Cabanillas";
function hexMix(hex, to, p) {   // mezcla un color con blanco/negro para crear tonos
  const h = String(hex || "").replace("#", ""); if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  const c = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)), t = to === "w" ? 255 : 0;
  return "#" + c.map(v => Math.round(v + (t - v) * p).toString(16).padStart(2, "0")).join("");
}
const iniciales = n => String(n || "").replace(/^(Dra?\.)\s*/i, "").split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
function aplicarWeb(w) {
  const m = w.marca || {};
  NOMBRE = ((m.nombre1 || "") + (m.nombre2 || "")).trim() || NOMBRE;
  const logo = m.logo ? `<span class="paw logo-img"><img src="${esc(foto(m.logo, 200))}" alt="Logo ${esc(NOMBRE)}"></span>` : `<span class="paw">${$(".brand .paw svg")?.outerHTML || ""}</span>`;
  $$("[data-brand]").forEach(b => { b.innerHTML = `${logo}<span>${esc(m.nombre1 || "")}<b>${esc(m.nombre2 || "")}</b><small>${esc(m.eslogan || "")}</small></span>`; b.setAttribute("aria-label", NOMBRE + " inicio"); });
  $$("[data-nombre]").forEach(x => x.textContent = NOMBRE);
  $$("[data-eslogan]").forEach(x => x.textContent = m.eslogan || "");
  document.title = document.title.replace(/Dental Cabanillas/g, NOMBRE);
  const r = document.documentElement.style, c1 = m.color1, c2 = m.color2;
  if (hexMix(c1, "w", 0)) { r.setProperty("--pri", c1); r.setProperty("--pri-2", hexMix(c1, "w", .25)); r.setProperty("--pri-soft", hexMix(c1, "w", .9)); $('meta[name="theme-color"]')?.setAttribute("content", c1); }
  if (hexMix(c2, "w", 0)) { r.setProperty("--coral", c2); r.setProperty("--coral-2", hexMix(c2, "w", .2)); }
  const p = w.portada || {};
  if ($("#hTitle")) {
    $("#hTag").textContent = p.etiqueta || ""; $("#hText").textContent = p.texto || "";
    $("#hTitle").innerHTML = `${esc(p.titulo || "")} <span>${esc(p.tituloColor || "")}</span>`;
    if (p.foto) { const im = $("#hPhoto img"); const src = foto(p.foto, 1000); if (!im) $("#hPhoto").insertAdjacentHTML("beforeend", `<img src="${esc(src)}" alt="" onerror="this.remove()">`); else if (im.getAttribute("src") !== src) im.src = src; }
    (p.cifras || []).forEach((c, i) => { const d = $$("#hCifras > div")[i]; if (d) { const t = d.querySelector("div"); t.innerHTML = `<b>${esc(c.n)}</b>${esc(c.t)}`; d.style.display = c.n ? "" : "none"; } });
  }
  const n = w.nosotros || {};
  if ($("#nTitle")) {
    $("#nTitle").innerHTML = `${esc(n.titulo || "")} <span class="c-pri">${esc(n.tituloColor || "")}</span>`;
    $("#nText").textContent = n.texto || "";
    $("#nPuntos").innerHTML = (n.puntos || []).filter(Boolean).map(x => `<li>${esc(x)}</li>`).join("");
    if (n.foto) $("#nPhoto").innerHTML = `<img src="${esc(foto(n.foto, 900))}" alt="">`;
  }
  if ($("#team") && w.equipo) { $("#team").innerHTML = w.equipo.map(x => `<div class="doc reveal"><div class="av">${x.foto ? `<img src="${esc(foto(x.foto, 300))}" alt="">` : esc(iniciales(x.n))}</div><h3>${esc(x.n)}</h3><span>${esc(x.cargo)}</span><p>${esc(x.d)}</p></div>`).join(""); revealAll($("#team")); }
  if (w.testimonios) $$("[data-testis]").forEach(t => { t.innerHTML = w.testimonios.map(x => `<figure class="testi reveal"><div class="stars">★★★★★</div><blockquote>"${esc(x.q)}"</blockquote><figcaption class="testi-who"><span class="av">${esc(iniciales(x.n))}</span><div><b>${esc(x.n)}</b><span>${esc(x.r)}</span></div></figcaption></figure>`).join(""); revealAll(t); });
  const rd = w.redes || {};
  $$("[data-red]").forEach(a => { const u = rd[a.dataset.red]; if (u) { a.href = /^https?:/.test(u) ? u : "https://" + u; a.style.display = ""; } else a.style.display = "none"; });
  $$(".socials").forEach(s => s.style.display = Object.values(rd).some(Boolean) ? "" : "none");
  $$("[data-emerg]").forEach(x => x.style.display = w.emergencias === false ? "none" : "");
}

/* =========================================================
   SERVICIOS
   ========================================================= */
function svcCard(x) {
  const u = `tratamiento?id=${encodeURIComponent(x.id)}`;
  return `<article class="svc reveal">
    <a class="svc-img" href="${u}">${x.img ? `<img src="${esc(foto(x.img, 700))}" alt="${esc(x.n)}" loading="lazy" onerror="this.remove()">` : ""}<span class="ic">${icono(x.icon)}</span></a>
    <div class="svc-body"><h3><a href="${u}">${esc(x.n)}</a></h3><p>${esc(x.d)}</p>
      <div class="svc-foot"><div class="price"><small>${+x.p ? "Desde" : "Precio"}</small><b>${precio(x.p)}</b></div>
      <a href="${u}" class="btn btn-light btn-sm">Ver más ${ICO.arrow}</a></div>
    </div></article>`;
}
function pintarServicios(todos) {
  const list = todos.filter(x => catVisible("servicios", x));
  const main = $$("#svcMain"), mini = $("#svcMini");
  const draw = cid => {
    const l = cid ? list.filter(x => enCat("servicios", x, cid)) : list;
    main.forEach(el => { const lim = +el.dataset.limit || 99, pri = l.filter(x => x.tipo !== "adicional");
      el.innerHTML = (cid ? l.map(svcCard) : pri.slice(0, lim).map(svcCard)).join("") || `<p class="empty">No hay tratamientos en esta categoría.</p>`; revealAll(el); });
    if (mini) { mini.parentElement.parentElement.style.display = cid ? "none" : "";
      mini.innerHTML = list.filter(x => x.tipo === "adicional").map(x => `<div class="svc-mini reveal"><i>${icono(x.icon)}</i><div><b>${esc(x.n)}</b><span>${esc(x.d)}${+x.p ? " · desde " + precio(x.p) : ""}</span></div></div>`).join(""); revealAll(mini); }
  };
  const box = $("#svcCats"); if (box) chipsCat(box, "servicios", list, draw, "Todos");
  draw("");
}

/* =========================================================
   CARRITO Y TIENDA
   ========================================================= */
let PRODS = [];
let cart = store.get("dc_cart", []).map(i => ({ ...i, id: String(i.id) }));
const P = id => PRODS.find(p => String(p.id) === String(id));
const disponible = p => p && p.stock !== "agotado";
function saveCart() { store.set("dc_cart", cart); drawCart(); }
function addToCart(id, q = 1) {
  if (!disponible(P(id))) return toast("Producto agotado");
  const it = cart.find(i => i.id === String(id));
  it ? it.q += q : cart.push({ id: String(id), q });
  saveCart(); toast(q > 1 ? `${q} unidades agregadas al carrito` : "Agregado al carrito");
}
function drawCart() {
  cart = cart.filter(i => disponible(P(i.id)));
  const n = cart.reduce((a, i) => a + i.q, 0);
  $$(".cart-count").forEach(c => { c.textContent = n || ""; c.dataset.n = n; });
  const box = $("#cartItems"); if (!box) return;
  if (!cart.length) {
    box.innerHTML = `<div class="cart-empty">${ICO.bag}<b>Tu carrito está vacío</b><p>Agrega cepillos, pastas o productos para tu sonrisa.</p></div>`;
    $("#cartFoot").style.display = "none"; return;
  }
  $("#cartFoot").style.display = "";
  box.innerHTML = cart.map(i => { const p = P(i.id); return `
    <div class="ci"><div class="ci-img">${p.img ? `<img src="${esc(foto(p.img, 160))}" alt="">` : ""}</div>
      <div class="ci-info"><b>${esc(p.n)}</b><small>${soles(p.p)} c/u</small></div>
      <div class="qty"><button data-q="-1" data-id="${esc(p.id)}" aria-label="Quitar uno">−</button><span>${i.q}</span><button data-q="1" data-id="${esc(p.id)}" aria-label="Agregar uno">+</button></div>
    </div>`; }).join("");
  const sub = cart.reduce((a, i) => a + P(i.id).p * i.q, 0);
  const gratis = +AJ.deliveryGratis || 0, costo = +AJ.delivery || 0;
  const del = $("input[name=entrega]:checked")?.value === "Delivery" ? (gratis && sub >= gratis ? 0 : costo) : 0;
  $("#cSub").textContent = soles(sub);
  $("#cDel").textContent = del ? soles(del) : "Gratis";
  $("#cTot").textContent = soles(sub + del);
  $("#cHint").textContent = !gratis ? "" : sub < gratis ? `Te faltan ${soles(gratis - sub)} para delivery gratis` : "¡Tienes delivery gratis!";
}
const panel = $("#cart");
if (panel) {
  $$(".cart-btn").forEach(b => b.addEventListener("click", () => panel.classList.add("open")));
  $$("[data-close]", panel).forEach(b => b.addEventListener("click", () => panel.classList.remove("open")));
  $("#cartItems").addEventListener("click", e => {
    const b = e.target.closest("[data-q]"); if (!b) return;
    const it = cart.find(i => i.id === b.dataset.id); it.q += +b.dataset.q;
    if (it.q <= 0) cart = cart.filter(i => i !== it);
    saveCart();
  });
  $$("input[name=entrega]").forEach(r => r.addEventListener("change", () => { $("#cAddr").style.display = r.value === "Delivery" && r.checked ? "" : "none"; drawCart(); }));
  $("#cartSend").addEventListener("click", () => {
    const name = $("#cName"), addr = $("#cAddr"), ent = $("input[name=entrega]:checked").value;
    [name, addr].forEach(x => x.classList.remove("error"));
    if (!name.value.trim()) { name.classList.add("error"); name.focus(); return; }
    if (ent === "Delivery" && !addr.value.trim()) { addr.classList.add("error"); addr.focus(); return; }
    const lines = ["Hola, quiero hacer este pedido:", ""];
    cart.forEach(i => { const p = P(i.id); lines.push(`• ${i.q} x ${p.n} — ${soles(p.p * i.q)}`); });
    lines.push("", `Subtotal: ${$("#cSub").textContent}`, `Entrega: ${ent}${ent === "Delivery" ? " (" + $("#cDel").textContent + ")" : ""}`, `*Total: ${$("#cTot").textContent}*`, "", "Nombre: " + name.value.trim());
    if (ent === "Delivery") lines.push("Dirección: " + addr.value.trim());
    wa(lines.join("\n"));
  });
}

const GRAD = ["#d4f1f4,#e8f7ff", "#dff7ef,#d6ecfb", "#e6f0ff,#e0f7f5", "#f0f7ff,#d9f2ee"];
const hash = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) % 9973; return h; };
function card(p) {
  const ag = !disponible(p);
  const tag = ag ? `<span class="tag out">Agotado</span>` : p.tag ? `<span class="tag ${p.tag === "Nuevo" ? "new" : p.tag === "Recomendado" ? "vet" : ""}">${p.tag === "Recomendado" ? "Recomendado por el dentista" : esc(p.tag)}</span>` : "";
  return `<article class="prod${ag ? " sold" : ""}">${tag}
    <a class="prod-img" href="producto?id=${encodeURIComponent(p.id)}" aria-label="Ver ${esc(p.n)}" style="background:linear-gradient(135deg,${GRAD[hash(p.id) % 4]})"><span class="ph">${ICO.paw}</span>
      ${p.img ? `<img src="${esc(foto(p.img))}" alt="${esc(p.n)}" loading="lazy" onerror="this.remove()">` : ""}<span class="view">Ver producto</span></a>
    <div class="prod-body"><span class="cat">${esc(catNom("productos", p.cat))}</span>
      <h3><a href="producto?id=${encodeURIComponent(p.id)}">${esc(p.n)}</a></h3><p class="desc">${esc(p.d)}</p>
      <div class="prod-foot"><div class="p"><b>${soles(p.p)}</b>${+p.old > +p.p ? `<s>${soles(p.old)}</s>` : ""}</div>
        <button class="add" data-add="${esc(p.id)}" aria-label="Agregar ${esc(p.n)} al carrito" ${ag ? "disabled" : ""}>${ICO.plus}</button></div>
    </div></article>`;
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-add]"); if (!b || b.disabled) return;
  addToCart(b.dataset.add); b.classList.add("done"); b.innerHTML = ICO.check;
  setTimeout(() => { b.classList.remove("done"); b.innerHTML = ICO.plus; }, 1200);
});
function pintarTienda() {
  const feat = $("#featured");
  if (feat) { const d = PRODS.filter(p => p.destacado && disponible(p)); feat.innerHTML = (d.length ? d : PRODS.filter(disponible)).slice(0, 4).map(card).join(""); }
  const grid = $("#shopGrid"); if (!grid) return;
  let fCat = "", fEsp = "todos", q = "";
  const draw = () => {
    const list = PRODS.filter(p => catVisible("productos", p) && (!fCat || enCat("productos", p, fCat)) && (p.n + " " + (p.d || "")).toLowerCase().includes(q))
      .sort((a, b) => disponible(b) - disponible(a));
    grid.innerHTML = list.length ? list.map(card).join("") : `<p class="empty">No encontramos productos con ese filtro. Escríbenos por WhatsApp y te asesoramos.</p>`;
    $("#shopCount").textContent = list.length + (list.length === 1 ? " producto" : " productos");
  };
  chipsCat($("#shopCats"), "productos", PRODS, c => { fCat = c; draw(); });
  $$("[data-esp]").forEach(c => c.addEventListener("click", () => { $$("[data-esp]").forEach(x => x.classList.remove("on")); c.classList.add("on"); fEsp = c.dataset.esp; draw(); }));
  $("#shopSearch").addEventListener("input", e => { q = e.target.value.trim().toLowerCase(); draw(); });
  const pc = new URLSearchParams(location.search).get("cat");
  if (pc) { const c = catDe("productos", pc), b = c && $(`#shopCats [data-c="${c.id}"]`); if (b) b.click(); else draw(); } else draw();
}

/* =========================================================
   AGENDA: horarios libres reales y reserva
   turnos/{fecha_hora_n}  → lugar ocupado (sin datos personales)
   citas/{mismo id}       → la cita completa (solo la ve el panel)
   clientes/{código}/agenda/{id} → copia que ve el cliente en Mi Mascota
   ========================================================= */
const pad2 = n => String(n).padStart(2, "0");
const isoD = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const aMin = t => { const [h, m] = String(t || "0:00").split(":").map(Number); return h * 60 + (m || 0); };
const aHora = m => pad2(Math.floor(m / 60)) + ":" + pad2(m % 60);
function horasDelDia(fecha) {
  const d = new Date(fecha + "T12:00"), dom = d.getDay() === 0;
  const fin = dom ? AJ.domingoCierra : AJ.cierra; if (!fin) return [];
  const paso = +AJ.turno || 30, out = [];
  for (let t = aMin(AJ.abre); t + paso <= aMin(fin); t += paso) out.push(aHora(t));
  return out;
}
let DOCTORES_W = [];
function capHora(fecha, h) {   // cuántas citas caben: doctores que trabajan a esa hora (y vinieron)
  const act = DOCTORES_W.filter(d => d.activo !== false);
  if (!act.length) return Math.max(1, +AJ.capacidad || 1);
  const dia = new Date(fecha + "T12:00").getDay(), paso = +AJ.turno || 30;
  return act.filter(d => (d.dias || []).includes(dia) && !(d.ausencias || []).some(a => a.desde <= fecha && fecha <= (a.hasta || a.desde))
    && aMin(h) >= aMin(d.desde) && aMin(h) + paso <= aMin(d.hasta)).length;
}
async function ocupadosDe(fecha) {   // { "10:30": 2, ... }
  const cnt = {};
  if (EN_VIVO) {
    const { fs, db } = await fb();
    const s = await fs.getDocs(fs.query(fs.collection(db, "turnos"), fs.where("fecha", "==", fecha)));
    s.docs.forEach(d => { const h = d.data().hora; cnt[h] = (cnt[h] || 0) + 1; });
  } else {
    Object.values((localDB() || {}).turnos || {}).forEach(t => { if (t.fecha === fecha) cnt[t.hora] = (cnt[t.hora] || 0) + 1; });
  }
  return cnt;
}
async function buscarCliente(code) {   // → { dueno, mascotas:[{id,nombre,especie,raza}] } | null
  if (EN_VIVO) {
    const { fs, db } = await fb();
    const c = await fs.getDoc(fs.doc(db, "clientes", code)); if (!c.exists()) return null;
    const ms = await fs.getDocs(fs.collection(db, "clientes", code, "mascotas"));
    return { dueno: c.data().dueno || "", mascotas: ms.docs.map(d => ({ id: d.id, ...d.data() })) };
  }
  const c = ((localDB() || {}).clientes || {})[code];
  if (!c) { const d = typeof CLIENTES !== "undefined" && CLIENTES[code]; return d ? { dueno: d.dueno, mascotas: d.mascotas, demo: true } : null; }
  return { dueno: c.dueno, mascotas: Object.entries(c.mascotas || {}).map(([id, m]) => ({ id, ...m })) };
}
async function reservar(base) {   // intenta ocupar un lugar libre del horario; devuelve el id de la cita
  const cap = Math.max(1, capHora(base.fecha, base.hora)), pub = base.code && base.mascotaId;
  const agenda = { fecha: base.fecha, hora: base.hora, servicio: base.servicio, precio: base.precio, mascota: base.mascota, mascotaId: base.mascotaId, total: base.precio, pagado: 0, estadoPago: "pendiente", estado: "confirmada", creado: base.creado };
  for (let k = 1; k <= cap; k++) {
    const id = `${base.fecha}_${base.hora}_${k}`;
    if (EN_VIVO) {
      const { fs, db } = await fb();
      try {
        const b = fs.writeBatch(db);
        b.set(fs.doc(db, "turnos", id), { fecha: base.fecha, hora: base.hora, k, creado: base.creado });
        b.set(fs.doc(db, "citas", id), { ...base, k });
        if (pub) b.set(fs.doc(db, "clientes", base.code, "agenda", id), agenda);
        await b.commit(); return id;
      } catch (e) { if (!/permission|exists/i.test(e.code || e.message)) throw e; }   // ese lugar ya se ocupó: probamos el siguiente
    } else {
      const d = localDB() || { clientes: {} }; d.turnos = d.turnos || {}; d.citas = d.citas || {};
      if (d.turnos[id]) continue;
      d.turnos[id] = { fecha: base.fecha, hora: base.hora, k, creado: base.creado };
      d.citas[id] = { ...base, k };
      store.set("dc_db", d); return id;
    }
  }
  return null;
}

function iniciarCitas(servicios) {
  const book = $("#bookForm"); if (!book) return;
  const opts = $("#svcOpts"), res = servicios.filter(x => x.reservable !== false);
  const opt = (x, i) => `<label class="opt"><input type="radio" name="servicio" value="${esc(x.n)}" data-key="${esc(x.id)}" data-p="${+x.p || 0}" data-price="${+x.p ? "Desde " + precio(x.p) : "Consultar"}" required${i === 0 ? " checked" : ""}><span>${icono(x.icon)}${esc(x.n)}<small>${+x.p ? "desde " + precio(x.p) : "a consultar"}</small></span></label>`;
  if (opts && res.length) {
    let i = 0; const grupos = CATS.servicios.filter(c => c.visible !== false).map(c => ({ c, l: res.filter(x => enCat("servicios", x, c.id)) })).filter(g => g.l.length);
    const sinCat = res.filter(x => !catDe("servicios", x.cat));
    if (grupos.length > 1) { opts.classList.add("grouped"); opts.innerHTML = grupos.map(g => `<p class="opt-cat">${icono(g.c.icon)} ${esc(g.c.n)}</p>` + g.l.map(x => opt(x, i++)).join("")).join("") + (sinCat.length ? `<p class="opt-cat">Otros</p>` + sinCat.map(x => opt(x, i++)).join("") : ""); }
    else opts.innerHTML = res.map(opt).join("");
  }
  // dentista de preferencia (opcional: la clínica confirma quién atiende)
  const pref = $("[name=preferencia]", book);
  if (pref) pref.insertAdjacentHTML("beforeend", DOCTORES_W.filter(d => d.activo !== false).map(d => `<option value="${esc(d.n)}">${esc(d.n)} · ${esc(d.esp || "")}</option>`).join(""));
  const dateIn = $("[name=fecha]", book), slotsBox = $("#slots");
  dateIn.min = isoD(new Date());
  const max = new Date(); max.setDate(max.getDate() + 60); dateIn.max = isoD(max);
  let slot = "", cliente = null;
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const nice = s => { const d = new Date(s + "T12:00"); return `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}`; };
  let pedido = 0;
  async function drawSlots() {
    slot = ""; updateSum();
    if (!dateIn.value) { slotsBox.innerHTML = `<p class="slots-msg">Primero elige una fecha para ver los horarios disponibles.</p>`; return; }
    const fecha = dateIn.value, horas = horasDelDia(fecha), n = ++pedido;
    if (!horas.length) { slotsBox.innerHTML = `<p class="slots-msg">Ese día no atendemos. Si tienes una urgencia, escríbenos por WhatsApp.</p>`; return; }
    slotsBox.innerHTML = `<p class="slots-msg">Buscando horarios disponibles…</p>`;
    let occ = {}; try { occ = await ocupadosDe(fecha); } catch (e) { console.warn(e); }
    if (n !== pedido) return;
    const cap = h => capHora(fecha, h), now = new Date(), hoy = fecha === isoD(now);
    const libres = horas.filter(h => (occ[h] || 0) < cap(h) && !(hoy && aMin(h) <= now.getHours() * 60 + now.getMinutes() + 30));
    slotsBox.innerHTML = libres.length ? libres.map(h => { const n = cap(h) - (occ[h] || 0); return `<button type="button" class="slot" data-h="${h}">${h}${n > 1 ? `<small>${n} libres</small>` : ""}</button>`; }).join("")
      : `<p class="slots-msg">No quedan horarios libres este día. Prueba con otra fecha.</p>`;
  }
  slotsBox.addEventListener("click", e => {
    const b = e.target.closest(".slot"); if (!b) return;
    $$(".slot", slotsBox).forEach(x => x.classList.remove("on")); b.classList.add("on"); slot = b.dataset.h; updateSum();
  });
  dateIn.addEventListener("change", drawSlots);
  function updateSum() {
    const s = $("input[name=servicio]:checked", book), ed = $("[name=edad]", book).value;
    $("#sServ").textContent = s ? s.value : "—";
    $("#sPet").textContent = ($("[name=mascota]", book).value.trim() || "—") + (ed ? ` · ${ed} años` : "");
    $("#sDoc").textContent = pref && pref.value ? pref.value : "El primero disponible";
    $("#sDate").textContent = dateIn.value ? nice(dateIn.value) : "—";
    $("#sHour").textContent = slot || "—";
    $("#sPrice").textContent = s ? s.dataset.price : "—";
  }
  book.addEventListener("input", updateSum); book.addEventListener("change", updateSum);

  /* ---- ¿Ya es paciente? busca a su familia con el código ---- */
  const codeIn = $("[name=codigo]", book), msgC = $("#codeMsg"), pick = $("#petPick");
  const normCode = c => { c = String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, ""); return /^[A-Z]{2}[A-Z0-9]+$/.test(c) ? c.slice(0, 2) + "-" + c.slice(2) : c; };
  async function verCodigo() {
    const c = normCode(codeIn.value); cliente = null; pick.innerHTML = ""; $("[name=mascotaId]", book).value = "";
    if (!c) { msgC.textContent = ""; return; }
    msgC.className = "code-msg"; msgC.textContent = "Buscando…";
    try { cliente = await buscarCliente(c); } catch (e) { cliente = null; }
    if (!cliente) { msgC.className = "code-msg err"; msgC.textContent = "No encontramos ese código. Puedes reservar igual como paciente nuevo."; return; }
    cliente.code = c; codeIn.value = c;
    msgC.className = "code-msg ok"; msgC.textContent = `¡Hola, ${cliente.dueno.split(" ")[0]}! ¿Para quién es la cita?`;
    const nom = $("[name=nombre]", book); if (!nom.value) nom.value = cliente.dueno;
    pick.innerHTML = cliente.mascotas.map(m => `<button type="button" class="pp" data-pid="${esc(m.id)}">${m.foto ? `<img src="${esc(foto(m.foto, 120))}" alt="">` : ICO.paw}${esc(m.nombre)}</button>`).join("") + `<button type="button" class="pp" data-pid="">+ Otro familiar</button>`;
    if (cliente.mascotas.length === 1) pick.querySelector(".pp").click();
  }
  $("#codeBtn").addEventListener("click", verCodigo);
  codeIn.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); verCodigo(); } });
  codeIn.addEventListener("change", verCodigo);
  const edadDe = nac => { if (!nac) return ""; const d = new Date(String(nac).slice(0, 10) + "T12:00"); return Math.max(0, Math.floor((Date.now() - d) / (365.25 * 864e5))); };
  pick.addEventListener("click", e => {
    const b = e.target.closest(".pp"); if (!b) return;
    $$(".pp", pick).forEach(x => x.classList.remove("on")); b.classList.add("on");
    const m = cliente.mascotas.find(x => x.id === b.dataset.pid);
    $("[name=mascotaId]", book).value = m ? m.id : "";
    $("[name=mascota]", book).value = m ? m.nombre : "";
    $("[name=edad]", book).value = m ? edadDe(m.nac) : "";
    if (!m) $("[name=mascota]", book).focus();
    updateSum();
  });

  const ps = new URLSearchParams(location.search);
  if (ps.get("servicio")) { const r = $$("input[name=servicio]", book).find(x => x.dataset.key === ps.get("servicio")); if (r) r.checked = true; }
  if (ps.get("codigo")) { codeIn.value = ps.get("codigo"); verCodigo(); }
  drawSlots();

  book.addEventListener("submit", async e => {
    e.preventDefault();
    const msg = $(".f-msg", book), btn = $("#bookBtn");
    $$(".error", book).forEach(x => x.classList.remove("error"));
    const bad = $$("[required]", book).filter(x => !x.checkValidity());
    const tel = $("[name=celular]", book); if (tel.value.replace(/\D/g, "").length < 9) bad.push(tel);
    if (!slot) bad.push(slotsBox);
    if (bad.length) {
      bad.forEach(x => x.classList.add("error"));
      msg.className = "f-msg err";
      msg.textContent = !slot && bad.length === 1 ? "Elige un horario disponible." : "Completa los campos obligatorios (*) y elige un horario.";
      (bad[0].focus ? bad[0] : slotsBox).focus?.(); return;
    }
    const v = n => ($(`[name="${n}"]`, book)?.value || "").trim();
    const s = $("input[name=servicio]:checked", book);
    const cita = {
      fecha: dateIn.value, hora: slot, servicioId: s.dataset.key, servicio: s.value, precio: +s.dataset.p || 0,
      code: cliente ? cliente.code : "", mascotaId: cliente ? v("mascotaId") : "", mascota: v("mascota").slice(0, 60),
      edad: v("edad").slice(0, 3), preferencia: v("preferencia").slice(0, 60),
      dueno: v("nombre").slice(0, 80), celular: v("celular").replace(/[^\d+ ]/g, "").slice(0, 15), motivo: v("motivo").slice(0, 300),
      origen: "web", estado: "confirmada", pagado: 0, estadoPago: "pendiente", creado: new Date().toISOString(),
    };
    btn.disabled = true; msg.className = "f-msg"; msg.textContent = "Reservando…";
    let id = null;
    try { id = await reservar(cita); } catch (err) { console.error(err); }
    btn.disabled = false;
    if (!id) { msg.className = "f-msg err"; msg.textContent = "Ese horario se acaba de llenar o no pudimos conectar. Elige otro horario."; drawSlots(); return; }
    const txt = ["Hola, acabo de reservar una cita en la web:", "",
      `• Tratamiento: ${cita.servicio}${cita.precio ? " (desde " + precio(cita.precio) + ")" : ""}`, `• Fecha: ${nice(cita.fecha)}`, `• Hora: ${cita.hora}`,
      `• Paciente: ${cita.mascota}${cita.edad ? " (" + cita.edad + " años)" : ""}`, `• Contacto: ${cita.dueno}`, `• Celular: ${cita.celular}`];
    if (cita.preferencia) txt.push(`• Dentista de preferencia: ${cita.preferencia}`);
    if (cita.code) txt.push(`• Código de paciente: ${cita.code}`);
    if (cita.motivo) txt.push(`• Motivo: ${cita.motivo}`);
    book.hidden = true;
    const ok = $("#bookOk"); ok.hidden = false;
    ok.innerHTML = `<div class="ok-ic">${ICO.check}</div><h3>¡Cita confirmada!</h3><p>Te esperamos, ${esc(cita.dueno.split(" ")[0])}. Guarda estos datos:</p>
      <div class="ok-box"><div><span>Tratamiento</span><b>${esc(cita.servicio)}</b></div><div><span>Fecha</span><b>${esc(nice(cita.fecha))}</b></div>
      <div><span>Hora</span><b>${esc(cita.hora)} h</b></div><div><span>Paciente</span><b>${esc(cita.mascota)}</b></div>
      <div><span>Precio</span><b>${cita.precio ? "Desde " + precio(cita.precio) : "A consultar"}</b></div><div><span>Pago</span><b>Pendiente (pagas en el consultorio)</b></div>
      <div class="full"><span>Te esperamos en</span><b>${esc(AJ.direccion)}</b></div></div>
      <p class="sub-ok">Llega 10 minutos antes. ${cita.code ? "También la verás en <b>Mi Sonrisa</b> con tu código." : "En tu primera cita te daremos tu código para ver tu tratamiento en Mi Sonrisa."}</p>
      <div class="hero-actions"><button class="btn btn-pri" id="okWa">${ICO.check} Avisar por WhatsApp</button>${cita.code ? `<a class="btn btn-light" href="mi-sonrisa?codigo=${esc(cita.code)}">Ver en Mi Sonrisa</a>` : ""}<a class="btn btn-light" href="citas">Reservar otra</a></div>`;
    $("#okWa").addEventListener("click", () => wa(txt.join("\n")));
    ok.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* =========================================================
   PORTAL MI SONRISA
   (Demo: los datos de ejemplo están aquí. En la versión real se
    leen de Firebase con el código del paciente.)
   ========================================================= */
const day = n => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + n); return d; };
const isoN = n => isoD(day(n));
const CLIENTES = {
  "DC-1024": { dueno: "María López", mascotas: [
    { id: "maria", nombre: "María López", sexo: "Femenino", nac: isoN(-37 * 365), dni: "45871236", alergias: "Penicilina", enfermedades: "Ninguna", medicamentos: "",
      citas: [{ servicio: "Curación con resina · pieza 26", fecha: isoN(3), hora: "10:30", vet: "Dra. Andrea Cabanillas", total: 90, pagado: 0 }],
      odontograma: { "18": { e: "ausente" }, "16": { e: "resina" }, "26": { e: "caries", n: "Caries en la cara de masticación" }, "36": { e: "endodoncia" }, "46": { e: "corona", n: "Corona de zirconio" }, "38": { e: "extraer", n: "Muela del juicio sin espacio" }, "11": { e: "resina" } },
      plan: [{ pieza: "", t: "Limpieza dental", p: 80, estado: "hecho" }, { pieza: "36", t: "Endodoncia", p: 350, estado: "hecho" }, { pieza: "46", t: "Corona de zirconio", p: 900, estado: "hecho" },
             { pieza: "26", t: "Curación con resina", p: 90, estado: "pendiente" }, { pieza: "38", t: "Extracción de muela del juicio", p: 180, estado: "pendiente" }],
      financ: [],
      historial: [
        { id: "h1", citaId: "demo-1", f: isoN(-12), hora: "16:00", t: "Corona de zirconio · pieza 46", d: "Cementado de corona definitiva. Mordida ajustada.", vet: "Dr. Luis Cabanillas", monto: 900, pagado: 900, base: 900, cargos: [], pagos: [{ monto: 450, metodo: "Yape", fecha: isoN(-30) }, { monto: 450, metodo: "Tarjeta", fecha: isoN(-12) }],
          meds: [], ind: "Evitar alimentos muy duros las primeras 24 horas." },
        { id: "h2", citaId: "demo-2", f: isoN(-30), hora: "15:00", t: "Endodoncia · pieza 36", d: "Pulpitis irreversible. Tratamiento de conductos en una sesión.", vet: "Dr. Martín Rojas", monto: 380, pagado: 380, base: 350, cargos: [{ n: "Radiografía periapical", q: 1, p: 30 }], pagos: [{ monto: 380, metodo: "Efectivo", fecha: isoN(-30) }],
          meds: [{ n: "Ibuprofeno 400 mg", dosis: "1 tableta", cada: "8 h", dias: "3" }, { n: "Clorhexidina 0.12% (enjuague)", dosis: "15 ml", cada: "12 h", dias: "7" }], ind: "No masticar del lado tratado hasta colocar la corona.", control: isoN(-12), controlMotivo: "Colocar corona" },
        { id: "h3", citaId: "demo-3", f: isoN(-60), hora: "10:00", t: "Evaluación y limpieza dental", d: "Sarro moderado. Se detecta caries en 26 y muela del juicio 38 sin espacio.", vet: "Dra. Andrea Cabanillas", monto: 130, pagado: 130, base: 130, cargos: [], pagos: [{ monto: 130, metodo: "Yape", fecha: isoN(-60) }], meds: [] }],
      rec: [{ i: "clean", t: "Próxima limpieza dental", f: isoN(120) }, { i: "tooth", t: "Curación pieza 26", f: isoN(3) }] },
    { id: "mateo", nombre: "Mateo López", sexo: "Masculino", nac: isoN(-8 * 365 - 60), dni: "", alergias: "Ninguna", enfermedades: "", medicamentos: "", temporal: true,
      citas: [], odontograma: { "16": { e: "sellante" }, "26": { e: "sellante" }, "36": { e: "sellante" }, "46": { e: "sellante" }, "75": { e: "caries", n: "Caries pequeña en muela de leche" }, "51": { e: "ausente", n: "Cambio natural de diente" } },
      plan: [{ pieza: "16·26·36·46", t: "Sellantes", p: 160, estado: "hecho" }, { pieza: "75", t: "Curación con resina", p: 70, estado: "pendiente" }], financ: [],
      historial: [{ id: "h4", citaId: "demo-4", f: isoN(-20), hora: "11:00", t: "Odontopediatría: sellantes y flúor", d: "Molares permanentes sanos. Se colocan sellantes preventivos.", vet: "Dra. Fiorella Quispe", monto: 160, pagado: 160, base: 160, cargos: [], pagos: [{ monto: 160, metodo: "Plin", fecha: isoN(-20) }], meds: [], ind: "No comer en 30 minutos después del flúor." }],
      rec: [{ i: "kid", t: "Control de Mateo", f: isoN(40) }] }] },
  "DC-2048": { dueno: "Diego Paredes", mascotas: [
    { id: "diego", nombre: "Diego Paredes", sexo: "Masculino", nac: isoN(-24 * 365), dni: "72145698", alergias: "Ninguna", enfermedades: "", medicamentos: "",
      citas: [{ servicio: "Control de ortodoncia", fecha: isoN(6), hora: "17:00", vet: "Dra. Andrea Cabanillas", total: 0, pagado: 0 }],
      odontograma: { "14": { e: "ausente", n: "Extraída por ortodoncia" }, "24": { e: "ausente", n: "Extraída por ortodoncia" }, "47": { e: "resina" } },
      plan: [{ pieza: "", t: "Ortodoncia con brackets metálicos", p: 3500, estado: "curso", ses: 24, hechas: 8 }, { pieza: "14·24", t: "Extracciones por ortodoncia", p: 240, estado: "hecho" }],
      financ: [{ id: "f1", t: "Ortodoncia con brackets", total: 3500, inicial: 500, n: 20, monto: 150, dia: 15, inicio: isoN(-250),
        pagos: [{ tipo: "inicial", monto: 500, fecha: isoN(-250), metodo: "Transferencia" }, ...[0, 1, 2, 3, 4, 5, 6, 7].map(k => ({ tipo: "cuota", monto: 150, fecha: isoN(-220 + k * 30), metodo: k % 2 ? "Yape" : "Efectivo" }))] }],
      historial: [{ id: "h5", citaId: "demo-5", f: isoN(-24), hora: "17:00", t: "Control de ortodoncia (8 de 24)", d: "Cambio de arco. Buena higiene.", vet: "Dra. Andrea Cabanillas", monto: 0, pagado: 0, meds: [], ind: "Usar cera si algún bracket roza. Evitar alimentos duros y pegajosos." }],
      rec: [{ i: "card", t: "Cuota 9 de ortodoncia", f: isoN(9) }, { i: "brace", t: "Control de ortodoncia", f: isoN(6) }] }] },
};
const portal = $("#portal");
if (portal) {
  const ODO = D0.odonto || [], odoDe = e => ODO.find(x => x.id === e) || ODO[0] || { n: e, c: "#fff" };
  const MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const DIA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const toD = s => { if (!s) return null; if (s instanceof Date) return s; const [y, mo, d] = String(s).slice(0, 10).split("-").map(Number); return new Date(y, mo - 1, d); };
  const fmt = d => { d = toD(d); return d ? `${d.getDate()} ${MES[d.getMonth()]} ${d.getFullYear()}` : ""; };
  const diff = d => Math.round((toD(d) - day(0)) / 864e5);
  const edadTxt = nac => { if (!nac) return ""; const m = Math.floor((Date.now() - toD(nac)) / (30.44 * 864e5)); return m >= 24 ? `${Math.floor(m / 12)} años` : `${Math.max(m, 0)} meses`; };
  const enDias = n => n === 0 ? "Hoy" : n === 1 ? "Mañana" : n < 0 ? `Hace ${-n} días` : `En ${n} días`;
  const pagoTxt = (total, pagado) => {
    total = +total || 0; pagado = +pagado || 0;
    if (total && pagado >= total) return `<span class="st ok">Pagado ${soles(pagado)}</span>`;
    if (pagado > 0) return `<span class="st warn">Adelanto ${soles(pagado)} · Saldo ${soles(Math.max(total - pagado, 0))}</span>`;
    return total ? `<span class="st bad">Pago pendiente · ${soles(total)}</span>` : `<span class="st">Incluido en tu tratamiento</span>`;
  };
  let cli = null, code = "", idx = 0, timer = null;

  function normal(c, pacs, agenda) {   // formato del panel → formato de esta página
    const hoy = day(0);
    return { dueno: c.dueno || "", mascotas: pacs.map(m => {
      let citas = (m.citas || []).slice();
      if (agenda) citas = agenda.filter(a => a.mascotaId === m.id && (a.estado || "confirmada") === "confirmada");
      citas = citas.map(a => ({ ...a, fecha: toD(a.fecha) })).filter(a => a.fecha >= hoy).sort((a, b) => (a.fecha - b.fecha) || String(a.hora).localeCompare(b.hora));
      const hist = (m.historial || []).slice();
      (agenda || []).filter(a => a.mascotaId === m.id && a.estado === "atendida" && !hist.some(h => h.citaId === a.id))
        .forEach(a => hist.push({ f: a.fecha, hora: a.hora, t: a.servicio, d: "", vet: a.vet || "", monto: +a.total || 0, pagado: +a.pagado || 0, citaId: a.id, cargos: a.cargos || [], base: a.precioBase, pagos: a.pagos || [] }));
      return { ...m, citas, plan: m.plan || [], financ: m.financ || [], odontograma: m.odontograma || {},
        historial: hist.map(h => ({ ...h, f: toD(h.f) })).sort((a, b) => b.f - a.f || String(b.hora || "").localeCompare(a.hora || "")),
        rec: (m.rec || []).map(r => ({ ...r, f: toD(r.f) })).filter(r => diff(r.f) >= -7).sort((a, b) => a.f - b.f) };
    }) };
  }
  async function buscar(c) {
    if (EN_VIVO) {
      const { fs, db } = await fb();
      const s = await fs.getDoc(fs.doc(db, "clientes", c)); if (!s.exists()) return null;
      const [ms, ag] = await Promise.all([fs.getDocs(fs.collection(db, "clientes", c, "mascotas")), fs.getDocs(fs.collection(db, "clientes", c, "agenda"))]);
      return normal(s.data(), ms.docs.map(d => ({ id: d.id, ...d.data() })), ag.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    const local = localDB();
    if (local && local.clientes && local.clientes[c]) {
      const x = local.clientes[c];
      const ag = Object.entries(local.citas || {}).filter(([, a]) => a.code === c).map(([id, a]) => ({ id, ...a, total: a.total ?? a.precio, pagado: a.pagado || 0 }));
      return normal(x, Object.entries(x.mascotas || {}).map(([id, m]) => ({ id, ...m })), ag);
    }
    const demo = CLIENTES[c]; return demo ? normal(demo, demo.mascotas, null) : null;
  }
  async function login(c) {
    c = c.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (/^[A-Z]{2}[A-Z0-9]+$/.test(c)) c = c.slice(0, 2) + "-" + c.slice(2);
    const err = $("#loginErr"), btn = $("#codeForm button");
    err.textContent = ""; btn.disabled = true;
    let r = null;
    try { r = await buscar(c); } catch (e) { console.error(e); err.textContent = "No pudimos conectar. Revisa tu internet e intenta otra vez."; btn.disabled = false; return; }
    btn.disabled = false;
    if (!r) { err.textContent = "Código no encontrado. Revisa tu código o escríbenos por WhatsApp."; $("#codeIn").classList.add("error"); try { sessionStorage.removeItem("dc_code"); } catch (e) {} return; }
    if (!r.mascotas.length) { err.textContent = "Tu código aún no tiene pacientes registrados. Consulta en el consultorio."; return; }
    cli = r; code = c; idx = 0;
    try { sessionStorage.setItem("dc_code", c); } catch (e) {}
    $("#login").style.display = "none"; $("#dash").classList.add("show");
    render(); window.scrollTo({ top: portal.offsetTop - 90, behavior: "smooth" });
  }
  function logout() { try { sessionStorage.removeItem("dc_code"); } catch (e) {} clearInterval(timer); $("#dash").classList.remove("show"); $("#login").style.display = ""; $("#codeIn").value = ""; }

  /* ---------- Odontograma (vista del paciente) ---------- */
  const TOOTH = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3c-2.5 0-4 2-4 4.5 0 2 1 3.5 1.5 5.5.6 2.5.8 5.5 2 7.5.8 1.3 2.2 1 2.6-.4l.9-3.6c.3-1.2 1.7-1.2 2 0l.9 3.6c.4 1.4 1.8 1.7 2.6.4 1.2-2 1.4-5 2-7.5.5-2 1.5-3.5 1.5-5.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/></svg>';
  const FILAS = { sup: ["18", "17", "16", "15", "14", "13", "12", "11", "21", "22", "23", "24", "25", "26", "27", "28"], inf: ["48", "47", "46", "45", "44", "43", "42", "41", "31", "32", "33", "34", "35", "36", "37", "38"],
    supT: ["55", "54", "53", "52", "51", "61", "62", "63", "64", "65"], infT: ["85", "84", "83", "82", "81", "71", "72", "73", "74", "75"] };
  function odontoHTML(m) {
    const od = m.odontograma || {}, pz = n => { const x = od[n] || {}, s = odoDe(x.e || "sano");
      return `<span class="pz ${x.e || "sano"}" style="--c:${s.c}" title="Pieza ${n} · ${esc(s.n)}${x.n ? " · " + esc(x.n) : ""}">${TOOTH}<b>${n}</b></span>`; };
    const fila = (l, cls) => `<div class="odo-row ${cls || ""}"><div>${l.slice(0, l.length / 2).map(pz).join("")}</div><div>${l.slice(l.length / 2).map(pz).join("")}</div></div>`;
    const usados = [...new Set(Object.values(od).map(x => x.e).filter(e => e && e !== "sano"))];
    const notas = Object.entries(od).filter(([, x]) => x.n).sort((a, b) => a[0].localeCompare(b[0]));
    return `<div class="odo-scroll"><div class="odo"><small class="odo-l">Arriba</small>${fila(FILAS.sup)}${m.temporal ? fila(FILAS.supT, "temp") + fila(FILAS.infT, "temp") : ""}${fila(FILAS.inf, "low")}<small class="odo-l">Abajo</small></div></div>
      <div class="odo-legend">${(usados.length ? usados : ["sano"]).map(e => `<span><i style="background:${odoDe(e).c}"></i>${esc(odoDe(e).n)}</span>`).join("")}</div>
      ${notas.length ? `<ul class="odo-notes">${notas.map(([n, x]) => `<li><b>${n}</b> ${esc(odoDe(x.e).n)} · ${esc(x.n)}</li>`).join("")}</ul>` : ""}
      ${m.temporal ? `<p class="odo-hint">Se muestran también los dientes de leche (filas del centro).</p>` : ""}`;
  }
  /* ---------- Cuotas ---------- */
  function cuotasHTML(m) {
    if (!m.financ.length) return "";
    return m.financ.map(f => {
      const pag = (f.pagos || []).reduce((a, p) => a + (+p.monto || 0), 0), saldo = Math.max((+f.total || 0) - pag, 0), cuotas = (f.pagos || []).filter(p => p.tipo === "cuota").length;
      const ini = toD(f.inicio) || day(0), venc = new Date(ini.getFullYear(), ini.getMonth() + cuotas + 1, Math.min(+f.dia || ini.getDate(), 28)), dd = diff(venc), pct = f.total ? Math.round(pag / f.total * 100) : 0;
      return `<div class="fin"><div class="fin-h"><b>${esc(f.t)}</b><span>${soles(f.total)}</span></div>
        <div class="bar big"><i style="width:${pct}%"></i></div>
        <div class="fin-g"><div><small>Pagado</small><b>${soles(pag)}</b></div><div><small>Falta</small><b class="${saldo ? "c-red" : ""}">${soles(saldo)}</b></div><div><small>Cuotas</small><b>${cuotas} de ${f.n}</b></div></div>
        ${saldo > 0 ? `<div class="fin-next ${dd < 0 ? "late" : dd <= 5 ? "soon" : ""}">${ICO.check.replace("ico", "ico")}<span>Cuota ${cuotas + 1} de ${f.n}: <b>${soles(Math.min(+f.monto || 0, saldo))}</b> · ${dd < 0 ? `venció el ${fmt(venc)}` : `vence el ${fmt(venc)} (${enDias(dd).toLowerCase()})`}</span></div>` : `<div class="fin-next ok"><span>¡Tratamiento pagado por completo! 🎉</span></div>`}
        <details class="fin-hist"><summary>Ver pagos (${(f.pagos || []).length})</summary>${(f.pagos || []).slice().reverse().map(p => `<div><span>${p.tipo === "inicial" ? "Cuota inicial" : "Cuota"} · ${fmt(p.fecha)} · ${esc(p.metodo || "")}</span><b>${soles(p.monto)}</b></div>`).join("")}</details></div>`;
    }).join("");
  }
  /* ---------- Plan de tratamiento ---------- */
  const EST = { pendiente: ["", "Pendiente"], curso: ["warn", "En curso"], hecho: ["ok", "Hecho"] };
  function planHTML(m) {
    if (!m.plan.length) return `<p style="color:var(--muted)">Tu dentista aún no registró un plan de tratamiento.</p>`;
    const tot = m.plan.reduce((a, x) => a + (+x.p || 0), 0), hechos = m.plan.filter(x => x.estado === "hecho").length, pct = Math.round(hechos / m.plan.length * 100);
    return `<div class="plan-sum"><div><b>${hechos} de ${m.plan.length}</b><small>tratamientos listos</small></div><div class="bar big"><i style="width:${pct}%"></i></div><div><b>${soles(tot)}</b><small>presupuesto total</small></div></div>
      <div class="plan-list">${m.plan.map(x => `<div class="pl ${x.estado}"><span class="pl-pz">${x.pieza ? esc(x.pieza) : "—"}</span><div><b>${esc(x.t)}</b>${x.ses ? `<small>Sesión ${+x.hechas || 0} de ${x.ses}</small><span class="bar"><i style="width:${Math.round((+x.hechas || 0) / x.ses * 100)}%"></i></span>` : ""}</div><span class="pl-p">${soles(x.p)}</span><span class="st ${EST[x.estado || "pendiente"][0]}">${EST[x.estado || "pendiente"][1]}</span></div>`).join("")}</div>`;
  }
  function render() {
    const m = cli.mascotas[idx];
    $("#dHello").textContent = `Hola, ${(cli.dueno || "").split(" ")[0]}`;
    $("#dCode").textContent = code;
    $("#petTabs").innerHTML = cli.mascotas.length > 1 ? cli.mascotas.map((p, i) => `<button class="pet-tab ${i === idx ? "on" : ""}" data-i="${i}"><span class="av">${p.foto ? `<img src="${esc(foto(p.foto, 200))}" alt="" onerror="this.remove()">` : esc(iniciales(p.nombre))}</span>${esc(p.nombre.split(" ")[0])}</button>`).join("") : "";
    $("#petCard").innerHTML = `
      <div class="pac-h"><span class="pac-av">${m.foto ? `<img src="${esc(foto(m.foto, 300))}" alt="" onerror="this.remove()">` : esc(iniciales(m.nombre))}</span><div><h2>${esc(m.nombre)}</h2><span>${esc([edadTxt(m.nac), m.sexo].filter(Boolean).join(" · "))}</span></div></div>
      <div class="facts">
        <div><small>DNI</small><b>${esc(m.dni || "—")}</b></div><div><small>Nacimiento</small><b>${m.nac ? fmt(m.nac) : "—"}</b></div>
        <div class="full"><small>Enfermedades</small><b>${esc(m.enfermedades || "Ninguna registrada")}</b></div>
        ${m.medicamentos ? `<div class="full"><small>Medicamentos que toma</small><b>${esc(m.medicamentos)}</b></div>` : ""}
      </div>
      ${m.alergias && !/^ningun/i.test(m.alergias) ? `<div class="alert-box">${icono("shield")}<span><b>Alergia:</b> ${esc(m.alergias)}. Avísanos siempre antes de cualquier tratamiento.</span></div>` : ""}`;
    $("#cuotasCard").style.display = m.financ.length ? "" : "none";
    $("#cuotas").innerHTML = cuotasHTML(m);
    clearInterval(timer);
    const pr = m.citas[0];
    if (pr) {
      const d = pr.fecha;
      $("#nextBox").innerHTML = `
        <div><small>PRÓXIMA CITA · ${enDias(diff(d)).toUpperCase()}</small><h3>${esc(pr.servicio)}</h3>
          <p>${DIA[d.getDay()]} ${fmt(d)} · <b>${esc(pr.hora)} h</b><br>${pr.vet ? "Te atiende: <b>" + esc(pr.vet) + "</b>" : "Dentista por confirmar"}</p>
          ${+pr.total || +pr.pagado ? `<div class="pay-line">${pagoTxt(pr.total, pr.pagado)}</div>` : ""}</div>
        <div class="countdown" id="cd"></div>
        <div class="next-actions">
          <button class="btn btn-white" data-act="confirmar">Confirmar asistencia</button>
          <button class="btn btn-glass" data-act="reprogramar">Reprogramar</button>
          <a class="btn btn-glass" href="citas?codigo=${encodeURIComponent(code)}">Agendar otra cita</a>
        </div>`;
      const [hh, mm] = String(pr.hora || "00:00").split(":"); const target = new Date(d); target.setHours(+hh, +mm);
      const tick = () => { let s = Math.max(0, Math.floor((target - Date.now()) / 1000)); const D = Math.floor(s / 86400); s %= 86400; const H = Math.floor(s / 3600); s %= 3600; const M = Math.floor(s / 60);
        $("#cd").innerHTML = `<div><b>${D}</b><span>días</span></div><div><b>${H}</b><span>horas</span></div><div><b>${M}</b><span>min</span></div>`; };
      tick(); timer = setInterval(tick, 30000);
    } else {
      $("#nextBox").innerHTML = `<div><small>PRÓXIMA CITA</small><h3>${esc(m.nombre.split(" ")[0])} no tiene citas programadas</h3><p>Reserva tu próximo control o limpieza en menos de un minuto.</p></div>
        <div class="next-actions"><a class="btn btn-white" href="citas?codigo=${encodeURIComponent(code)}">Reservar cita</a></div>`;
    }
    $("#citasCard").style.display = m.citas.length > 1 ? "" : "none";
    $("#citasList").innerHTML = m.citas.map(c => `<div class="vac"><div><b>${esc(c.servicio)}</b><small>${DIA[c.fecha.getDay()]} ${fmt(c.fecha)} · ${esc(c.hora)} h · ${c.vet ? "Te atiende: " + esc(c.vet) : "Dentista por confirmar"}</small></div>${pagoTxt(c.total, c.pagado)}</div>`).join("");
    $("#plan").innerHTML = planHTML(m);
    $("#odonto").innerHTML = odontoHTML(m);
    // Servicios y pagos
    const pag = m.historial.filter(h => +h.monto > 0 || +h.pagado > 0);
    const totalPag = pag.reduce((a, h) => a + (+h.pagado || 0), 0), saldo = pag.reduce((a, h) => a + Math.max((+h.monto || 0) - (+h.pagado || 0), 0), 0);
    $("#pagos").innerHTML = pag.length ? `
      <div class="pay-sum"><div><small>Total pagado</small><b>${soles(totalPag)}</b></div>${saldo ? `<div class="due"><small>Saldo por pagar</small><b>${soles(saldo)}</b></div>` : `<div><small>Saldo de atenciones</small><b>S/ 0.00</b></div>`}</div>
      <div class="pay-list">${pag.map(h => `<div class="pay-row"><div><b>${esc(h.t)}</b><small>${fmt(h.f)}${h.hora ? " · " + esc(h.hora) + " h" : ""}${h.vet ? " · " + esc(h.vet) : ""}</small>
          ${(h.cargos || []).length ? `<ul class="pay-det"><li><span>${esc(h.t)}</span><span>${soles(baseDe(h))}</span></li>${h.cargos.map(x => `<li><span>${+x.q > 1 ? x.q + " × " : ""}${esc(x.n)}</span><span>${soles((+x.q || 1) * (+x.p || 0))}</span></li>`).join("")}</ul>` : ""}
          <button type="button" class="doc-btn" data-doc="rc" data-hi="${m.historial.indexOf(h)}">${icono("file")} Descargar recibo (PDF)</button></div>
        <div class="amt"><b>${soles(+h.monto || +h.pagado)}</b>${pagoTxt(h.monto || h.pagado, h.pagado)}</div></div>`).join("")}</div>`
      : `<p style="color:var(--muted)">Aún no hay pagos registrados.</p>`;
    // Historial
    $("#timeline").innerHTML = m.citas.map(c => `<li class="upcoming"><span class="t-date">${fmt(c.fecha)} · ${esc(c.hora)} h · Programada</span><b>${esc(c.servicio)}</b><span class="vet">${esc(c.vet || "")}</span></li>`).join("") +
      m.historial.map(h => `<li><span class="t-date">${fmt(h.f)}${h.hora ? " · " + esc(h.hora) + " h" : ""}</span><b>${esc(h.t)}</b>${h.d ? `<p><b>Diagnóstico:</b> ${esc(h.d)}</p>` : ""}
        ${(h.cargos || []).length ? `<p class="h-used"><b>Usado en la atención:</b> ${h.cargos.map(x => `${+x.q > 1 ? x.q + " × " : ""}${esc(x.n)}`).join(" · ")}</p>` : ""}
        ${(h.meds || []).length ? `<div class="rx"><b>Receta para la casa</b>${h.meds.map(x => `<span>${esc(x.n)}${x.dosis ? " – " + esc(x.dosis) : ""}${x.cada ? ", cada " + esc(x.cada) : ""}${x.dias ? ", por " + esc(x.dias) + (/^\d+$/.test(x.dias) ? " días" : "") : ""}</span>`).join("")}</div>` : ""}
        ${h.ind ? `<p><b>Indicaciones:</b> ${esc(h.ind)}</p>` : ""}
        ${((h.meds || []).some(x => x.n) || h.ind || +h.monto > 0 || +h.pagado > 0) ? `<div class="doc-row">${(h.meds || []).some(x => x.n) || h.ind ? `<button type="button" class="doc-btn rx-btn" data-doc="rx" data-hi="${m.historial.indexOf(h)}">${icono("pill")} Descargar receta</button>` : ""}${+h.monto > 0 || +h.pagado > 0 ? `<button type="button" class="doc-btn" data-doc="rc" data-hi="${m.historial.indexOf(h)}">${icono("file")} Recibo</button>` : ""}</div>` : ""}
        ${(h.fotos || []).length ? `<div class="h-fotos" data-fotos="${esc(h.fotos.join(","))}">${h.fotos.map(() => `<span class="ph-load"></span>`).join("")}</div>` : ""}
        ${h.vet ? `<span class="vet">Atendió: ${esc(h.vet)}</span>` : ""}</li>`).join("")
      || `<p style="color:var(--muted)">Aún no hay atenciones registradas.</p>`;
    cargarFotos();
    $("#rems").innerHTML = m.rec.length ? m.rec.map(r => `<div class="rem"><i>${icono(r.i)}</i><b>${esc(r.t)}</b><small>${enDias(diff(r.f))} · ${fmt(r.f)}</small></div>`).join("")
      : `<p style="color:var(--muted)">Sin recordatorios por ahora.</p>`;
  }
  // Recibo y receta en PDF (descarga directa)
  const baseDe = h => h.base != null && h.base !== "" ? +h.base : Math.max((+h.monto || 0) - (h.cargos || []).reduce((a, x) => a + (+x.q || 1) * (+x.p || 0), 0), 0);
  const isoF = d => d instanceof Date ? isoD(d) : String(d || "").slice(0, 10);
  const negocio = () => { const mk = ((DATA && DATA.web) || D0.web || {}).marca || {};
    return { nombre: NOMBRE, razon: AJ.razonSocial || "", ruc: AJ.ruc || "", dir: AJ.direccion || "", tel: AJ.telefono || "", logo: mk.logo || "", color: mk.color1 || "#0b6e99", pie: AJ.reciboPie || "", web: location.host + location.pathname.replace(/mi-sonrisa.*$/, "") + "mi-sonrisa" }; };
  async function descargar(tipo, h, m) {
    if (!window.PDFV) return toast("Espera un momento y vuelve a intentar");
    const f = isoF(h.f);
    if (tipo === "rc") {
      const pagos = (h.pagos && h.pagos.length) ? h.pagos : +h.pagado ? [{ monto: +h.pagado, metodo: h.metodo || "", fecha: f }] : [], tot = +h.monto || +h.pagado || 0;
      return PDFV.recibo({ neg: negocio(), num: PDFV.num("C", f, h.citaId || h.id || h.t + f), fecha: (pagos[pagos.length - 1] || {}).fecha || f, hora: (pagos[pagos.length - 1] || {}).hora || "",
        cliente: cli.dueno, code, mascota: m.nombre, etqMascota: "Paciente", vet: h.vet, detalle: `Atención del ${fmt(h.f)}${h.hora ? " · " + h.hora + " h" : ""}`,
        items: [{ n: h.t, q: 1, p: (h.cargos || []).length || h.base != null ? baseDe(h) : tot, principal: true }, ...(h.cargos || []).map(x => ({ n: x.n, q: +x.q || 1, p: +x.p || 0 }))],
        total: tot, pagos, pagado: +h.pagado || 0, saldo: Math.max(tot - (+h.pagado || 0), 0) });
    }
    return PDFV.receta({ neg: negocio(), fecha: f, paciente: m.nombre, firma: "Cirujano dentista", aviso: "Ante cualquier molestia o reacción, comunícate con tu dentista.",
      campos: [["Paciente", m.nombre], ["Edad", edadTxt(m.nac)], ["DNI", m.dni], ["Alergias", m.alergias || "Ninguna"], ["Código", code], ["Atención", h.t], ["Dentista", h.vet]],
      vet: h.vet, servicio: h.t, diagnostico: h.d, meds: (h.meds || []).filter(x => x.n), ind: h.ind, control: h.control, controlMotivo: h.controlMotivo });
  }
  portal.addEventListener("click", async e => {
    const b = e.target.closest("[data-doc]"); if (!b) return;
    const m = cli.mascotas[idx], h = m.historial[+b.dataset.hi]; if (!h) return;
    const txt = b.innerHTML; b.disabled = true; b.textContent = "Preparando PDF…";
    try { await descargar(b.dataset.doc, h, m); toast(b.dataset.doc === "rx" ? "Receta descargada" : "Recibo descargado"); }
    catch (er) { console.error(er); toast(er.message || "No se pudo crear el PDF"); }
    b.disabled = false; b.innerHTML = txt;
  });
  // Fotos y radiografías del historial
  const FOTOS = {};
  async function leerFoto(id) {
    if (FOTOS[id] !== undefined) return FOTOS[id];
    try {
      if (EN_VIVO) { const { fs, db } = await fb(); const d = await fs.getDoc(fs.doc(db, "clientes", code, "fotos", id)); FOTOS[id] = d.exists() ? d.data().data : null; }
      else FOTOS[id] = ((((localDB() || {}).fotos || {})[code] || {})[id] || {}).data || null;
    } catch (e) { FOTOS[id] = null; }
    return FOTOS[id];
  }
  async function cargarFotos() {
    for (const box of $$("#timeline [data-fotos]")) {
      const ids = box.dataset.fotos.split(",").filter(Boolean), src = await Promise.all(ids.map(leerFoto));
      box.innerHTML = src.filter(Boolean).map(x => `<button type="button" class="h-foto" data-zoom><img src="${x}" alt="Foto de la atención"></button>`).join("");
      if (!box.innerHTML) box.remove();
    }
  }
  document.addEventListener("click", e => {
    const z = e.target.closest("[data-zoom]");
    if (z) { const lb = document.createElement("div"); lb.className = "lightbox"; lb.innerHTML = `<img src="${z.querySelector("img").src}" alt=""><button aria-label="Cerrar">×</button>`; document.body.appendChild(lb); lb.addEventListener("click", () => lb.remove()); }
  });
  portal.addEventListener("click", e => {
    const t = e.target.closest("[data-i]"); if (t) { idx = +t.dataset.i; render(); }
    const a = e.target.closest("[data-act]"); if (!a) return;
    const m = cli.mascotas[idx], pr = m.citas[0]; if (!pr) return;
    const base = `${pr.servicio} de ${m.nombre} el ${fmt(pr.fecha)} a las ${pr.hora} h (código ${code})`;
    if (a.dataset.act === "confirmar") wa(`Hola ${NOMBRE}, confirmo la cita: ${base}. ¡Gracias!`);
    if (a.dataset.act === "reprogramar") wa(`Hola ${NOMBRE}, necesito reprogramar la cita: ${base}. ¿Qué otros horarios tienen?`);
  });
  $("#codeForm").addEventListener("submit", e => { e.preventDefault(); $("#codeIn").classList.remove("error"); login($("#codeIn").value); });
  $$("[data-code]").forEach(b => b.addEventListener("click", () => { $("#codeIn").value = b.dataset.code; login(b.dataset.code); }));
  $("#logout").addEventListener("click", logout);
  $("#printBtn").addEventListener("click", () => window.print());
  const pc = new URLSearchParams(location.search).get("codigo");
  let saved = null; try { saved = sessionStorage.getItem("dc_code"); } catch (e) {}
  if (pc || saved) cargarDatos().then(() => login(pc || saved));
}

/* =========================================================
   DETALLE DE TRATAMIENTO (tratamiento?id=...)
   ========================================================= */
function paginaTratamiento(servs) {
  const box = $("#td"); if (!box) return;
  const id = new URLSearchParams(location.search).get("id"), x = servs.find(s => s.id === id);
  if (!x) { box.innerHTML = `<div class="pd-empty"><h2>Tratamiento no encontrado</h2><p>Puede que ya no esté disponible.</p><a class="btn btn-pri" href="tratamientos">Ver tratamientos</a></div>`; return; }
  const cat = catDe("servicios", x.cat), ben = Array.isArray(x.beneficios) ? x.beneficios : String(x.beneficios || "").split("\n").filter(Boolean);
  const faq = Array.isArray(x.faq) ? x.faq : String(x.faq || "").split("\n").map(l => { const [q, ...a] = l.split("|"); return { q: q.trim(), a: a.join("|").trim() }; }).filter(f => f.q);
  document.title = `${x.n} | ${NOMBRE}`;
  $("#tdCrumbs").innerHTML = `<a href="tratamientos">Tratamientos</a>${cat ? ` <span>›</span> <a href="tratamientos">${esc(cat.n)}</a>` : ""} <span>›</span> <b>${esc(x.n)}</b>`;
  box.innerHTML = `<div class="td">
    <div class="td-media"><span class="td-ph">${icono(x.icon)}</span>${x.img ? `<img src="${esc(foto(x.img, 1000))}" alt="${esc(x.n)}" onerror="this.remove()">` : ""}</div>
    <div class="td-info">
      <span class="cat">${icono(x.icon)} ${esc(cat ? cat.n : "Tratamiento")}</span>
      <h1>${esc(x.n)}</h1>
      <p class="td-lead">${esc(x.d || "")}</p>
      <div class="td-facts">
        <div><small>${+x.p ? "Precio desde" : "Precio"}</small><b>${precio(x.p)}</b></div>
        ${x.duracion ? `<div><small>Duración</small><b>${esc(x.duracion)}</b></div>` : ""}
        ${x.sesiones ? `<div><small>Sesiones</small><b>${esc(x.sesiones)}</b></div>` : ""}
      </div>
      <div class="hero-actions">${x.reservable !== false ? `<a class="btn btn-pri" href="citas?servicio=${encodeURIComponent(x.id)}">${ICO.check} Reservar este tratamiento</a>` : ""}<button class="btn btn-light" id="tdWa">Consultar por WhatsApp</button></div>
      <p class="td-note">${icono("card")} Pide tu presupuesto por escrito y paga en cuotas.</p>
    </div></div>
    ${String(x.larga || "").trim() || ben.length ? `<div class="td-more">
      ${String(x.larga || "").trim() ? `<div><h2>¿En qué consiste?</h2>${String(x.larga).split(/\n{2,}/).filter(Boolean).map(t => `<p>${esc(t)}</p>`).join("")}</div>` : ""}
      ${ben.length ? `<div><h2>Beneficios</h2><ul class="checks">${ben.map(b => `<li>${esc(b)}</li>`).join("")}</ul></div>` : ""}</div>` : ""}
    ${faq.length ? `<div class="td-faq"><h2>Preguntas frecuentes</h2><div class="faq">${faq.map((f, i) => `<details${i ? "" : " open"}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div></div>` : ""}`;
  $("#tdWa").addEventListener("click", () => wa(`Hola ${NOMBRE}, quisiera información sobre *${x.n}*. ¿Me pueden ayudar?`));
  const rel = servs.filter(s => s.id !== x.id && s.tipo !== "adicional" && catVisible("servicios", s)).sort((a, b) => (b.cat === x.cat) - (a.cat === x.cat)).slice(0, 3);
  if (rel.length) { $("#tdRelSec").hidden = false; $("#tdRel").innerHTML = rel.map(svcCard).join(""); revealAll($("#tdRel")); }
}

/* ---------- Antes y después ---------- */
const ba = $("#ba");
if (ba) {
  const r = $("#baRange", ba), set = v => ba.style.setProperty("--pos", v + "%");
  r.addEventListener("input", () => set(r.value));
  // animación suave la primera vez que se ve
  const io2 = new IntersectionObserver(es => { if (es[0].isIntersecting) { io2.disconnect(); let v = 50, t = 0; const a = setInterval(() => { t++; v = 50 + Math.sin(t / 6) * 22; set(v.toFixed(1)); r.value = v; if (t > 38) { clearInterval(a); set(50); r.value = 50; } }, 30); } }, { threshold: .5 });
  io2.observe(ba);
}

/* =========================================================
   FORMULARIO DE CONTACTO
   ========================================================= */
const cf = $("#contactForm");
if (cf) cf.addEventListener("submit", e => {
  e.preventDefault();
  const msg = $(".f-msg", cf);
  $$(".error", cf).forEach(x => x.classList.remove("error"));
  const bad = $$("[required]", cf).filter(x => !x.checkValidity());
  const tel = $("[name=celular]", cf); if (tel.value.replace(/\D/g, "").length < 9) bad.push(tel);
  if (bad.length) { bad.forEach(x => x.classList.add("error")); msg.className = "f-msg err"; msg.textContent = "Completa los campos obligatorios (*)."; bad[0].focus(); return; }
  const v = n => $(`[name="${n}"]`, cf).value.trim();
  wa([`Hola ${NOMBRE}:`, "", "• Nombre: " + v("nombre"), "• Celular: " + v("celular"), "• Asunto: " + v("asunto"), "• Mensaje: " + v("mensaje")].join("\n"));
  msg.className = "f-msg ok"; msg.textContent = "¡Listo! Se abrió WhatsApp con tu mensaje.";
});

/* =========================================================
   PÁGINAS EDITABLES: menú, encabezados, secciones del inicio, pie
   ========================================================= */
const PAGINA = (location.pathname.split("/").pop() || "").replace(/\.html$/, "") || "inicio";
const PAG_KEY = PAGINA === "index" ? "inicio" : PAGINA;
const QS = new URLSearchParams(location.search);
function setHead(el, d) {   // pill + título (con parte en color) + texto
  if (!el || !d) return;
  const pill = $(".pill", el), h = $("h1, h2, h3", el), p = h && h.parentElement.querySelector(":scope > p") || $("p", el);
  if (pill && d.pill != null) { const svg = pill.querySelector("svg"); pill.innerHTML = (svg ? svg.outerHTML + " " : "") + esc(d.pill); pill.style.display = d.pill ? "" : "none"; }
  if (h && d.titulo != null) h.innerHTML = esc(d.titulo) + (d.tituloColor ? ` <span class="${h.tagName === "H1" && !el.classList.contains("page-head") ? "" : "c-pri"}">${esc(d.tituloColor)}</span>` : "");
  if (p && d.texto != null) { p.textContent = d.texto; p.style.display = d.texto ? "" : "none"; }
}
function aplicarPaginas(pg) {
  // Menú
  const menuEl = $("#menu");
  if (menuEl && pg.menu) {
    const extra = (pg.extras || []).filter(x => x.enMenu).map(x => ({ id: "p:" + x.slug, n: x.n, visible: true, href: "pagina?p=" + encodeURIComponent(x.slug) }));
    const activo = PAG_KEY === "producto" ? "tienda" : PAG_KEY === "tratamiento" ? "tratamientos" : PAG_KEY === "pagina" ? "p:" + QS.get("p") : PAG_KEY;
    menuEl.innerHTML = [...pg.menu.filter(m => m.visible !== false).map(m => ({ ...m, href: m.id === "inicio" ? "./" : m.id })), ...extra]
      .map(m => `<li><a href="${esc(m.href)}" data-nav="${esc(m.id)}"${m.id === activo ? ' class="active" aria-current="page"' : ""}>${esc(m.n)}</a></li>`).join("");
    const ocultas = pg.menu.filter(m => m.visible === false).map(m => m.id);
    $$("footer a").forEach(a => { const h = (a.getAttribute("href") || "").split("?")[0]; if (ocultas.includes(h)) a.closest("li") ? a.closest("li").style.display = "none" : a.style.display = "none"; });
  }
  // Encabezado de cada página (con imagen de fondo opcional)
  const enc = (pg.encabezados || {})[PAG_KEY], ph = $("[data-ph]");
  if (enc) setHead(ph, enc);
  if (ph && enc && enc.img && foto(enc.img)) { ph.classList.add("has-img"); ph.style.setProperty("--ph-img", `url("${foto(enc.img, 1600)}")`); }
  // Textos sueltos de cada página
  const TX = pg.textos || {};
  $$("[data-t]").forEach(el => { const v = TX[el.dataset.t]; if (v != null && v !== "") el.textContent = v; });
  // Imágenes fijas (llamado final, ingreso a Mi Mascota…)
  const IMG = pg.imagenes || {};
  $$("[data-ik]").forEach(el => { const v = IMG[el.dataset.ik]; if (v && foto(v)) el.src = foto(v, 900); });
  // Secciones compartidas (aviso de emergencias, testimonios y llamado final) en todas las páginas
  (pg.inicio || []).forEach(sx => {
    if (!["emergencias", "cta", "testimonios"].includes(sx.id)) return;
    $$(sx.id === "emergencias" ? ".emergency" : sx.id === "cta" ? ".cta" : '[data-sec="testimonios"] .sec-head').forEach(box => {
      if (sx.id === "testimonios") return setHead(box, sx);
      const h = $(sx.id === "cta" ? "h2" : "h3", box), p = $("p", box);
      if (h && sx.titulo) h.textContent = sx.titulo; if (p && sx.texto != null) p.textContent = sx.texto;
    });
  });
  // Secciones del inicio: textos, mostrar/ocultar y orden
  if (PAG_KEY === "inicio" && pg.inicio) {
    const foot = $("footer");
    let n = 0;
    pg.inicio.forEach(sx => {
      const el = $(`[data-sec="${sx.id}"]`); if (!el) return;
      el.style.display = sx.visible === false ? "none" : "";
      if (sx.id === "emergencias") { const e = $(".emergency", el); if (e) { if (sx.titulo) $("h3", e).textContent = sx.titulo; if (sx.texto != null) $("p", e).textContent = sx.texto; } }
      else if (sx.id === "cta") { const c = $(".cta", el); if (c) { if (sx.titulo) $("h2", c).textContent = sx.titulo; if (sx.texto != null) $("p", c).textContent = sx.texto; } }
      else if (sx.id !== "accesos") setHead($(".sec-head", el) || el, sx);
      if (sx.id !== "accesos") { foot.parentNode.insertBefore(el, foot); }
      if (sx.visible !== false && el.tagName === "SECTION" && !["emergencias", "cta"].includes(sx.id)) el.classList.toggle("bg-soft", n++ % 2 === 0);
    });
    const cta = $('[data-sec="cta"]'); if (cta) cta.classList.remove("bg-soft");
  }
  // Pie de página
  if (pg.pie && pg.pie.texto && $("#pieTexto")) $("#pieTexto").textContent = pg.pie.texto;
  // Bloques agregados por el cliente en esta página
  const bl = ((pg.bloques || {})[PAG_KEY] || []).filter(b => b.visible !== false && (b.titulo || b.texto || b.img));
  const cont = $("#pgBloques");
  if (cont) {
    cont.innerHTML = bl.length ? `<section class="pg-bloques"><div class="container bloques">${bl.map((b, i) => bloqueHTML(b, i)).join("")}</div></section>` : "";
    const f = $("footer"); if (f) f.parentNode.insertBefore(cont, f);
    revealAll(cont);
  }
}
function bloqueHTML(b, i) {
  return `<article class="bloque reveal ${b.img ? "con-img" : ""} ${i % 2 ? "alt" : ""}">
    ${b.img && foto(b.img) ? `<div class="b-img"><img src="${esc(foto(b.img, 900))}" alt="" loading="lazy"></div>` : ""}
    <div class="b-txt">${b.titulo ? `<h2>${esc(b.titulo)}</h2>` : ""}${String(b.texto || "").split(/\n+/).filter(Boolean).map(t => `<p>${esc(t)}</p>`).join("")}
      ${b.boton && b.enlace ? `<a class="btn btn-pri" href="${esc(b.enlace)}">${esc(b.boton)} ${ICO.arrow}</a>` : ""}</div>
  </article>`;
}

/* =========================================================
   PÁGINA DE PRODUCTO (producto?id=...)
   ========================================================= */
async function infoProducto(id) {
  try {
    if (EN_VIVO) { const { fs, db } = await fb(); const s = await fs.getDoc(fs.doc(db, "productos_info", id)); return s.exists() ? s.data() : null; }
    return ((localDB() || {}).productos_info || {})[id] || null;
  } catch (e) { return null; }
}
async function paginaProducto() {
  const box = $("#pd"); if (!box) return;
  const id = QS.get("id"), p = P(id);
  if (!p) { box.innerHTML = `<div class="pd-empty"><h2>Producto no encontrado</h2><p>Puede que ya no esté disponible.</p><a class="btn btn-pri" href="tienda">Volver a la tienda</a></div>`; return; }
  const info = await infoProducto(id) || {};
  const imgs = [p.img, ...(info.imgs || [])].filter(Boolean);
  const cat = catDe("productos", p.cat), ag = !disponible(p);
  const off = +p.old > +p.p ? Math.round((1 - p.p / p.old) * 100) : 0;
  const det = String(info.detalles || "").split("\n").map(l => l.split(":")).filter(x => x[0].trim() && x.length > 1);
  const larga = String(info.larga || "").split(/\n{2,}/).filter(Boolean);
  document.title = `${p.n} | ${NOMBRE}`;
  $("#pdCrumbs").innerHTML = `<a href="tienda">Tienda</a>${cat ? ` <span>›</span> <a href="tienda?cat=${encodeURIComponent(cat.id)}">${esc(cat.n)}</a>` : ""} <span>›</span> <b>${esc(p.n)}</b>`;
  box.innerHTML = `
    <div class="pd-gal">
      <div class="pd-main" style="background:linear-gradient(135deg,${GRAD[hash(p.id) % 4]})">${imgs.length ? `<img id="pdImg" src="${esc(foto(imgs[0], 900))}" alt="${esc(p.n)}">` : `<span class="ph">${ICO.paw}</span>`}
        ${off ? `<span class="tag">-${off}%</span>` : p.tag ? `<span class="tag ${p.tag === "Nuevo" ? "new" : p.tag === "Recomendado" ? "vet" : ""}">${esc(p.tag === "Recomendado" ? "Recomendado por el dentista" : p.tag)}</span>` : ""}</div>
      ${imgs.length > 1 ? `<div class="pd-thumbs">${imgs.map((im, i) => `<button class="${i ? "" : "on"}" data-im="${esc(foto(im, 900))}" aria-label="Foto ${i + 1}"><img src="${esc(foto(im, 200))}" alt=""></button>`).join("")}</div>` : ""}
    </div>
    <div class="pd-info">
      <span class="cat">${esc(cat ? cat.n : p.cat)}</span>
      <h1>${esc(p.n)}</h1>
      <div class="pd-price"><b>${soles(p.p)}</b>${off ? `<s>${soles(p.old)}</s><span class="save">Ahorras ${soles(p.old - p.p)}</span>` : ""}</div>
      <p class="pd-stock ${ag ? "out" : ""}">${ag ? "Agotado por ahora · escríbenos y te avisamos cuando llegue" : "Disponible · listo para entrega"}</p>
      ${p.d ? `<p class="pd-desc">${esc(p.d)}</p>` : ""}
      <div class="pd-buy">
        <div class="qty big"><button type="button" data-pq="-1" aria-label="Menos">−</button><span id="pdQ">1</span><button type="button" data-pq="1" aria-label="Más">+</button></div>
        <button class="btn btn-pri" id="pdAdd" ${ag ? "disabled" : ""}>${ICO.bag} Agregar al carrito</button>
      </div>
      <button class="btn btn-coral btn-block" id="pdNow">${ag ? "Consultar disponibilidad por WhatsApp" : "Comprar ahora por WhatsApp"}</button>
      <div class="pd-perks">
        <span>${icono("truck")} ${+AJ.deliveryGratis ? `Delivery gratis desde S/ ${AJ.deliveryGratis}` : "Delivery a domicilio"}</span>
        <span>${icono("shield")} Productos originales</span>
        <span>${icono("tooth")} Recomendado por dentistas</span>
      </div>
      <button class="share" id="pdShare">${icono("sparkle")} Compartir este producto</button>
    </div>`;
  if (larga.length || det.length) box.insertAdjacentHTML("afterend", `<div class="pd-more">${larga.length ? `<div><h2>Descripción</h2>${larga.map(x => `<p>${esc(x)}</p>`).join("")}</div>` : ""}${det.length ? `<div><h2>Detalles</h2><dl>${det.map(x => `<dt>${esc(x[0].trim())}</dt><dd>${esc(x.slice(1).join(":").trim())}</dd>`).join("")}</dl></div>` : ""}</div>`);
  let q = 1;
  box.addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.im) { $("#pdImg").src = t.dataset.im; $$(".pd-thumbs button").forEach(x => x.classList.toggle("on", x === t)); }
    if (t.dataset.pq) { q = Math.max(1, Math.min(99, q + +t.dataset.pq)); $("#pdQ").textContent = q; }
  });
  $("#pdAdd").addEventListener("click", () => { addToCart(p.id, q); $("#cart") && $("#cart").classList.add("open"); });
  $("#pdNow").addEventListener("click", () => wa(ag ? `Hola ${NOMBRE}, ¿cuándo tendrán disponible *${p.n}*? Me interesa.`
    : `Hola ${NOMBRE}, quiero comprar:\n\n• ${q} x ${p.n} — ${soles(p.p * q)}\n\n${location.href}\n\n¿Me confirman disponibilidad y el envío?`));
  $("#pdShare").addEventListener("click", async () => {
    const data = { title: p.n, text: `${p.n} — ${soles(p.p)}`, url: location.href };
    try { if (navigator.share) return await navigator.share(data); } catch (e) { return; }
    window.open("https://wa.me/?text=" + encodeURIComponent(`${data.text}\n${data.url}`), "_blank");
  });
  const rel = PRODS.filter(x => x.id !== p.id && catVisible("productos", x) && (cat ? enCat("productos", x, cat.id) : x.cat === p.cat)).concat(PRODS.filter(x => x.id !== p.id)).filter((x, i, a) => a.indexOf(x) === i).slice(0, 4);
  if (rel.length) { $("#pdRelSec").hidden = false; $("#pdRel").innerHTML = rel.map(card).join(""); }
}

/* =========================================================
   PÁGINAS CREADAS DESDE EL PANEL (pagina?p=...)
   ========================================================= */
function paginaLibre(pg) {
  const box = $("#pg"); if (!box) return;
  const x = (pg.extras || []).find(e => e.slug === QS.get("p"));
  if (!x) { box.innerHTML = `<section class="page-head"><div class="container"><h1>Página no encontrada</h1><p>Puede que haya sido eliminada.</p><div class="hero-actions" style="justify-content:center"><a class="btn btn-pri" href="./">Ir al inicio</a></div></div></section>`; return; }
  document.title = `${x.n} | ${NOMBRE}`;
  box.innerHTML = `<section class="page-head"><div class="container">${x.pill ? `<span class="pill">${icono("sparkle")} ${esc(x.pill)}</span>` : ""}<h1>${esc(x.titulo || x.n)}${x.tituloColor ? ` <span class="c-pri">${esc(x.tituloColor)}</span>` : ""}</h1>${x.texto ? `<p>${esc(x.texto)}</p>` : ""}</div></section>
    <section><div class="container bloques">${(x.bloques || []).map(bloqueHTML).join("")}</div></section>`;
  revealAll(box);
}

/* ---------- Curva del pie: toma el color de la sección anterior ---------- */
function curvaPie() {
  const f = $("footer"); if (!f) return;
  let p = f.previousElementSibling; while (p && (!p.offsetHeight || p.id === "pgBloques" && !p.innerHTML.trim())) p = p.previousElementSibling;
  if (p && p.id === "pgBloques") p = p.querySelector("section") || p;
  const bg = p ? getComputedStyle(p).backgroundColor : ""; if (bg && bg !== "rgba(0, 0, 0, 0)") f.style.setProperty("--wave", bg);
}
/* ---------- Arranque ---------- */
aplicarAjustes(AJ);
if (D0.web) aplicarWeb(D0.web);
cargarDatos().then(d => {
  CATS = d.categorias; DOCTORES_W = d.doctores || [];
  aplicarAjustes(d.ajustes);
  aplicarWeb(d.web);
  aplicarPaginas(d.paginas);
  PRODS = d.productos; drawCart(); pintarTienda();
  pintarServicios(d.servicios);
  iniciarCitas(d.servicios);
  paginaProducto(); paginaLibre(d.paginas); paginaTratamiento(d.servicios);
  curvaPie();
});
