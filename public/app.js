// RIF BITE demo: replace the WhatsApp number below with the restaurant's number.
// Use the international format without +, spaces, or leading local zero (example Morocco: 2126XXXXXXXX).
const WHATSAPP_NUMBER = "212600000000";

const products = [
  {id:1,name:"Rif Classic Burger",category:"Burgers",price:45,description:"Bœuf grillé, cheddar, salade et sauce maison.",label:"BEST-SELLER",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"},
  {
  id: 2,
  name: "Double Cheese",
  category: "Burgers",
  price: 58,
  description: "Double steak, double cheddar, goût intense.",
  label: "GOURMAND",
  image: "https://images.unsplash.com/photo-1713330801172-03f8d1c0dde7?auto=format&fit=crop&w=700&q=80"
},
  {id:3,name:"Pizza Margherita",category:"Pizzas",price:40,description:"Tomate, mozzarella et basilic frais.",label:"CLASSIQUE",image:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Pizza Pepperoni",category:"Pizzas",price:55,description:"Mozzarella fondante et pepperoni.",label:"POPULAIRE",image:"https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Tacos Poulet",category:"Tacos",price:38,description:"Poulet mariné, frites et sauce fromagère.",label:"CRÉMEUX",image:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Tacos Mixte",category:"Tacos",price:48,description:"Poulet et viande hachée, sauce au choix.",label:"GÉNÉREUX",image:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Sandwich Crispy",category:"Sandwiches",price:32,description:"Poulet croustillant, salade et sauce maison.",label:"CROUSTILLANT",image:"https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Sandwich Mixte",category:"Sandwiches",price:36,description:"Viandes savoureuses et légumes frais.",label:"FAVORI",image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80"}
];

const CART_KEY = "rifBiteCart";
let activeCategory = "Tous";
const money = amount => `${amount} DH`;

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch { return {}; }
}
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCounts(); }
function cartCount(cart=getCart()){ return Object.values(cart).reduce((sum,qty)=>sum+qty,0); }
function cartSubtotal(cart=getCart()){
  return Object.entries(cart).reduce((sum,[id,qty])=>{
    const product=products.find(item=>item.id===Number(id));
    return sum+(product ? product.price*qty : 0);
  },0);
}
function updateCartCounts(){
  const count=cartCount();
  ["headerCartCount","floatingCartCount","checkoutCount"].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.textContent=id==="checkoutCount" ? `${count} article${count===1?"":"s"}` : count;
  });
  const subtotal=document.getElementById("subtotal");
  const total=document.getElementById("grandTotal");
  if(subtotal) subtotal.textContent=money(cartSubtotal());
  if(total) total.textContent=money(cartSubtotal());
}
function addToCart(id){
  const cart=getCart(); cart[id]=(cart[id]||0)+1; saveCart(cart);
  const btn=document.querySelector(`[data-add="${id}"]`);
  if(btn){const old=btn.textContent;btn.textContent="✓";setTimeout(()=>btn.textContent=old,700);}
}
function renderProducts(){
  const grid=document.getElementById("productGrid"); if(!grid) return;
  const search=(document.getElementById("searchInput")?.value||"").trim().toLowerCase();
  const filtered=products.filter(p=>(activeCategory==="Tous"||p.category===activeCategory)&&(`${p.name} ${p.category} ${p.description}`).toLowerCase().includes(search));
  grid.innerHTML=filtered.map(p=>`
    <article class="product-card">
      <div class="product-image" style="background-image:url('${p.image}')"><span class="product-label">${p.label}</span></div>
      <div class="product-details"><h3>${p.name}</h3><p>${p.description}</p>
        <div class="product-bottom"><span class="product-price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}" aria-label="Ajouter ${p.name} au panier">+</button></div>
      </div>
    </article>`).join("");
  document.getElementById("emptyState")?.classList.toggle("hidden",filtered.length>0);
  grid.querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>addToCart(Number(btn.dataset.add))));
}
function renderCheckout(){
  const container=document.getElementById("checkoutItems"); if(!container) return;
  const cart=getCart();
  const entries=Object.entries(cart).filter(([id,qty])=>qty>0&&products.some(p=>p.id===Number(id)));
  container.innerHTML=entries.map(([id,qty])=>{
    const p=products.find(item=>item.id===Number(id));
    return `<article class="checkout-item"><div><h3>${p.name}</h3><small>${money(p.price)} / unité</small>
      <div class="item-controls"><button type="button" data-minus="${p.id}" aria-label="Retirer un ${p.name}">−</button><strong>${qty}</strong><button type="button" data-plus="${p.id}" aria-label="Ajouter un ${p.name}">+</button><button type="button" data-remove="${p.id}" aria-label="Supprimer ${p.name}">×</button></div></div><span class="item-price">${money(p.price*qty)}</span></article>`;
  }).join("");
  document.getElementById("emptyCart")?.classList.toggle("hidden",entries.length>0);
  document.getElementById("orderForm")?.classList.toggle("hidden",entries.length===0);
  container.classList.toggle("hidden",entries.length===0);
  container.querySelectorAll("[data-plus]").forEach(b=>b.addEventListener("click",()=>changeQty(b.dataset.plus,1)));
  container.querySelectorAll("[data-minus]").forEach(b=>b.addEventListener("click",()=>changeQty(b.dataset.minus,-1)));
  container.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>changeQty(b.dataset.remove,0,true)));
  updateCartCounts();
}
function changeQty(id,delta,remove=false){
  const cart=getCart();
  if(remove) delete cart[id];
  else {cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];}
  saveCart(cart);renderCheckout();
}
function setupCheckout(){
  const form=document.getElementById("orderForm"); if(!form)return;
  const fulfillment=document.getElementById("fulfillment");
  const address=document.getElementById("address");
  const addressLabel=document.getElementById("addressLabel");
  function syncAddress(){
    const delivery=fulfillment.value==="Livraison à Al Hoceima";
    address.required=delivery;
    addressLabel.classList.toggle("hidden",!delivery);
  }
  fulfillment.addEventListener("change",syncAddress);syncAddress();
  form.addEventListener("submit",event=>{
    event.preventDefault();
    const error=document.getElementById("formError");
    const cart=getCart();
    if(cartCount(cart)===0){error.textContent="Votre panier est vide.";error.classList.remove("hidden");return;}
    if(WHATSAPP_NUMBER==="212600000000"){error.textContent="Le numéro WhatsApp est un exemple. Remplacez WHATSAPP_NUMBER dans app.js par le numéro du restaurant avant utilisation.";error.classList.remove("hidden");return;}
    const data=new FormData(form);
    const lines=Object.entries(cart).map(([id,qty])=>{
      const p=products.find(item=>item.id===Number(id));return p?`- ${p.name} x${qty} = ${p.price*qty} DH`:null;
    }).filter(Boolean);
    const total=cartSubtotal();
    const message=[
      "Bonjour RIF BITE ! Je souhaite passer cette commande :","",
      ...lines,"",`Sous-total : ${total} DH`,`Nom : ${data.get("customerName")}`,
      `Téléphone : ${data.get("phone")}`,`Réception : ${data.get("fulfillment")}`,
      data.get("fulfillment")==="Livraison à Al Hoceima"?`Adresse : ${data.get("address")}`:null,
      `Paiement : ${data.get("payment")}`,data.get("notes")?`Notes : ${data.get("notes")}`:null,"",
      "Merci de confirmer la disponibilité et les frais de livraison."
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer");
  });
}
document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("year") && (document.getElementById("year").textContent=new Date().getFullYear());
  document.getElementById("searchInput")?.addEventListener("input",renderProducts);
  document.getElementById("filterList")?.querySelectorAll("[data-category]").forEach(btn=>btn.addEventListener("click",()=>{
    activeCategory=btn.dataset.category;
    document.querySelectorAll(".filter-chip").forEach(chip=>chip.classList.toggle("selected",chip===btn));
    renderProducts();
  }));
  const toggle=document.getElementById("menuToggle");
  toggle?.addEventListener("click",()=>{
    const nav=document.getElementById("navLinks");const open=nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded",String(open));
  });
  document.querySelectorAll("#navLinks a").forEach(a=>a.addEventListener("click",()=>document.getElementById("navLinks")?.classList.remove("open")));
  renderProducts();renderCheckout();updateCartCounts();setupCheckout();
});
