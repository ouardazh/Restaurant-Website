
const products = [
  {
    id: 1,
    name: "Double Cheese",
    category: "burger",
    price: 45,
    description: "Two beef patties, cheese and a special sauce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 2,
    name: "Classic Burger",
    category: "burger",
    price: 35,
    description: "Classic burger with lettuce, tomato and cheese.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 3,
    name: "Pizza Margherita",
    category: "pizza",
    price: 40,
    description: "Tomato, cheese and basil pizza.",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 4,
    name: "Chicken Pizza",
    category: "pizza",
    price: 55,
    description: "Chicken pizza with cheese and tomato sauce.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 5,
    name: "Chicken Tacos",
    category: "tacos",
    price: 40,
    description: "Chicken tacos with fries and sauce.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=85"
  },
  {
    id: 6,
    name: "Chicken Sandwich",
    category: "sandwich",
    price: 30,
    description: "Chicken sandwich with fresh vegetables.",
    image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&w=800&q=85"
  }
];

// IMPORTANT: replace with the restaurant's real WhatsApp number.
// Morocco example: 212 followed by the phone number without its initial 0.
const RESTAURANT_WHATSAPP = "212600000000";
const DELIVERY_FEE = 15;

const localText = {
  ar: {
    add: "زيد للسلة",
    added: "تضافت الوجبة للسلة!",
    remove: "حذف",
    empty: "السلة ديالك خاوية!",
    emptyDesc: "زيد شي وجبة باش تكمل الطلب.",
    increase: "زيد",
    decrease: "نقص",
    currency: "DH",
    emptyError: "السلة ديالك خاوية.",
    invalidPhone: "عافاك دخل رقم هاتف مغربي صحيح.",
    fillFields: "عافاك عمر المعلومات ديال الطلب.",
    name: ["دوبل تشيز", "كلاسيك برغر", "بيتزا مارغريتا", "بيتزا بالدجاج", "طاكوس بالدجاج", "ساندويتش بالدجاج"],
    desc: [
      "جوج شرائح ديال اللحم، الجبن وصوص خاص.",
      "برغر بالخس والطماطم والجبن.",
      "بيتزا بالجبن والطماطم والريحان.",
      "بيتزا بالدجاج والجبن وصوص الطماطم.",
      "طاكوس بالدجاج والبطاطس والصوص.",
      "ساندويتش بالدجاج والخضروات."
    ]
  },
  fr: {
    add: "Ajouter",
    added: "Plat ajouté au panier !",
    remove: "Supprimer",
    empty: "Votre panier est vide !",
    emptyDesc: "Ajoutez un plat pour continuer.",
    increase: "Ajouter",
    decrease: "Réduire",
    currency: "DH",
    emptyError: "Votre panier est vide.",
    invalidPhone: "Veuillez saisir un numéro marocain valide.",
    fillFields: "Veuillez remplir les informations.",
    name: ["Double Cheese", "Classic Burger", "Pizza Margherita", "Pizza au poulet", "Tacos au poulet", "Sandwich au poulet"],
    desc: [
      "Deux steaks, du fromage et une sauce spéciale.",
      "Burger classique, salade, tomate et fromage.",
      "Pizza à la tomate, au fromage et au basilic.",
      "Pizza au poulet, fromage et sauce tomate.",
      "Tacos au poulet, frites et sauce.",
      "Sandwich au poulet et aux légumes."
    ]
  },
  en: {
    add: "Add to cart",
    added: "Meal added to cart!",
    remove: "Remove",
    empty: "Your cart is empty!",
    emptyDesc: "Add a meal to continue.",
    increase: "Increase",
    decrease: "Decrease",
    currency: "DH",
    emptyError: "Your cart is empty.",
    invalidPhone: "Please enter a valid Moroccan phone number.",
    fillFields: "Please complete your order details.",
    name: ["Double Cheese", "Classic Burger", "Pizza Margherita", "Chicken Pizza", "Chicken Tacos", "Chicken Sandwich"],
    desc: [
      "Two beef patties, cheese and a special sauce.",
      "Classic burger with lettuce, tomato and cheese.",
      "Tomato, cheese and basil pizza.",
      "Chicken pizza with cheese and tomato sauce.",
      "Chicken tacos with fries and sauce.",
      "Chicken sandwich with fresh vegetables."
    ]
  },
  es: {
    add: "Añadir",
    added: "¡Plato añadido al carrito!",
    remove: "Eliminar",
    empty: "¡Tu carrito está vacío!",
    emptyDesc: "Añade un plato para continuar.",
    increase: "Aumentar",
    decrease: "Reducir",
    currency: "DH",
    emptyError: "Tu carrito está vacío.",
    invalidPhone: "Introduce un número marroquí válido.",
    fillFields: "Completa los datos del pedido.",
    name: ["Doble queso", "Hamburguesa clásica", "Pizza Margarita", "Pizza de pollo", "Tacos de pollo", "Sándwich de pollo"],
    desc: [
      "Dos hamburguesas de carne, queso y salsa especial.",
      "Hamburguesa con lechuga, tomate y queso.",
      "Pizza de tomate, queso y albahaca.",
      "Pizza de pollo con queso y salsa de tomate.",
      "Tacos de pollo con patatas fritas y salsa.",
      "Sándwich de pollo con verduras frescas."
    ]
  },
  de: {
    add: "Hinzufügen",
    added: "Gericht hinzugefügt!",
    remove: "Entfernen",
    empty: "Dein Warenkorb ist leer!",
    emptyDesc: "Füge ein Gericht hinzu.",
    increase: "Erhöhen",
    decrease: "Verringern",
    currency: "DH",
    emptyError: "Dein Warenkorb ist leer.",
    invalidPhone: "Bitte gib eine gültige marokkanische Nummer ein.",
    fillFields: "Bitte fülle die Bestellangaben aus.",
    name: ["Double Cheese", "Classic Burger", "Pizza Margherita", "Hähnchenpizza", "Hähnchen-Tacos", "Hähnchen-Sandwich"],
    desc: [
      "Zwei Rindfleisch-Patties, Käse und Spezialsauce.",
      "Klassischer Burger mit Salat, Tomate und Käse.",
      "Pizza mit Tomaten, Käse und Basilikum.",
      "Pizza mit Hähnchen, Käse und Tomatensauce.",
      "Tacos mit Hähnchen, Pommes und Sauce.",
      "Sandwich mit Hähnchen und frischem Gemüse."
    ]
  },
  nl: {
    add: "Toevoegen",
    added: "Gerecht toegevoegd!",
    remove: "Verwijderen",
    empty: "Je winkelwagen is leeg!",
    emptyDesc: "Voeg een gerecht toe.",
    increase: "Verhogen",
    decrease: "Verlagen",
    currency: "DH",
    emptyError: "Je winkelwagen is leeg.",
    invalidPhone: "Voer een geldig Marokkaans telefoonnummer in.",
    fillFields: "Vul de bestelgegevens in.",
    name: ["Double Cheese", "Classic Burger", "Pizza Margherita", "Kip-pizza", "Kip-taco's", "Broodje kip"],
    desc: [
      "Twee rundvleesburgers, kaas en speciale saus.",
      "Klassieke burger met sla, tomaat en kaas.",
      "Pizza met tomaat, kaas en basilicum.",
      "Pizza met kip, kaas en tomatensaus.",
      "Taco's met kip, friet en saus.",
      "Broodje met kip en verse groenten."
    ]
  }
};

function currentLanguage() {
  const saved = localStorage.getItem("rifBiteLanguage") || "ar";
  return localText[saved] ? saved : "ar";
}

function productName(product) {
  return localText[currentLanguage()].name[product.id - 1] || product.name;
}

function productDescription(product) {
  return localText[currentLanguage()].desc[product.id - 1] || product.description;
}

function tSafe(key, fallback) {
  return typeof window.t === "function" ? window.t(key) : fallback;
}

function money(amount) {
  return `${amount} ${localText[currentLanguage()].currency}`;
}

function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem("rifBiteCart") || "[]");
    if (!Array.isArray(cart)) return [];

    return cart.filter(item =>
      Number.isInteger(item.id) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      products.some(product => product.id === item.id)
    );
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("rifBiteCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;
  });
}

function renderProducts(list, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = list.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${productName(product)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x450/f7f5ef/191915?text=RIF+BITE'">
      </div>
      <div class="product-info">
        <h3>${productName(product)}</h3>
        <p>${productDescription(product)}</p>
        <div class="product-bottom">
          <span class="price">${money(product.price)}</span>
          <button class="add-btn" type="button" data-add="${product.id}">
            + ${localText[currentLanguage()].add}
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const product = products.find(item => item.id === Number(id));
  if (!product) return;

  const cart = getCart();
  const found = cart.find(item => item.id === product.id);

  if (found) {
    found.quantity++;
  } else {
    cart.push({ id: product.id, quantity: 1 });
  }

  saveCart(cart);
  showToast(`${productName(product)} — ${localText[currentLanguage()].added}`);
}

function changeQuantity(id, amount) {
  const cart = getCart();
  const item = cart.find(entry => entry.id === Number(id));
  if (!item) return;

  item.quantity += amount;
  saveCart(cart.filter(entry => entry.quantity > 0));
  renderCart();
}

function removeFromCart(id) {
  saveCart(getCart().filter(item => item.id !== Number(id)));
  renderCart();
}

function subtotalFor(cart) {
  return cart.reduce((sum, item) => {
    const product = products.find(entry => entry.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
}

function renderCart() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  const cart = getCart();
  const text = localText[currentLanguage()];

  const empty = document.getElementById("emptyCart");
  const form = document.getElementById("checkoutForm");
  const subtotal = subtotalFor(cart);
  const delivery = cart.length ? DELIVERY_FEE : 0;

  document.getElementById("subtotal").textContent = money(subtotal);
  document.getElementById("delivery").textContent = money(delivery);
  document.getElementById("total").textContent = money(subtotal + delivery);

  empty.hidden = cart.length > 0;
  form.hidden = cart.length === 0;

  container.innerHTML = cart.map(item => {
    const product = products.find(entry => entry.id === item.id);

    return `
      <article class="cart-item">
        <img src="${product.image}" alt="${productName(product)}">
        <div class="cart-item-details">
          <h3>${productName(product)}</h3>
          <span class="price">${money(product.price * item.quantity)}</span>
          <div class="cart-item-controls">
            <button class="quantity-btn" type="button"
              data-minus="${product.id}" aria-label="${text.decrease}">−</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" type="button"
              data-plus="${product.id}" aria-label="${text.increase}">+</button>
            <button class="remove-btn" type="button"
              data-remove="${product.id}">${text.remove}</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  updateCartCount();
}

function filterMenu() {
  const search = document.getElementById("searchInput");
  const category = document.getElementById("categoryFilter");

  if (!search || !category) return;

  const term = search.value.trim().toLocaleLowerCase();
  const selectedCategory = category.value;

  const filtered = products.filter(product => {
    const matchesText =
      productName(product).toLocaleLowerCase().includes(term) ||
      productDescription(product).toLocaleLowerCase().includes(term) ||
      product.name.toLocaleLowerCase().includes(term);

    return matchesText &&
      (selectedCategory === "all" || product.category === selectedCategory);
  });

  renderProducts(filtered, "menuProducts");

  const emptyMessage = document.getElementById("emptyMessage");
  emptyMessage.hidden = filtered.length > 0;
}

function showToast(message) {
  let toast = document.getElementById("rifToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "rifToast";
    toast.className = "rif-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function setupCheckout() {
  const form = document.getElementById("checkoutForm");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const cart = getCart();
    const text = localText[currentLanguage()];

    if (!cart.length) {
      showToast(text.emptyError);
      return;
    }

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    if (!name || !phone || !address) {
      showToast(text.fillFields);
      return;
    }

    if (!/^(\+212|0)[0-9]{9}$/.test(phone)) {
      showToast(text.invalidPhone);
      return;
    }

    const subtotal = subtotalFor(cart);
    const delivery = DELIVERY_FEE;
    const total = subtotal + delivery;

    const lines = cart.map(item => {
      const product = products.find(entry => entry.id === item.id);
      return `- ${productName(product)} x ${item.quantity}: ${money(product.price * item.quantity)}`;
    }).join("\n");

    const message = [
      "Hello RIF BITE! I would like to place an order.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Delivery address: ${address}`,
      "",
      "Order:",
      lines,
      "",
      `Subtotal: ${money(subtotal)}`,
      `Delivery: ${money(delivery)}`,
      `Total: ${money(total)}`,
      "",
      "Please confirm availability and delivery details."
    ].join("\n");

    const url = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

document.addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  const plus = event.target.closest("[data-plus]");
  const minus = event.target.closest("[data-minus]");
  const remove = event.target.closest("[data-remove]");

  if (add) addToCart(add.dataset.add);
  if (plus) changeQuantity(plus.dataset.plus, 1);
  if (minus) changeQuantity(minus.dataset.minus, -1);
  if (remove) removeFromCart(remove.dataset.remove);
});

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products.slice(0, 3), "featuredProducts");
  renderProducts(products, "menuProducts");
  renderCart();
  setupCheckout();
  updateCartCount();

  document.getElementById("searchInput")?.addEventListener("input", filterMenu);
  document.getElementById("categoryFilter")?.addEventListener("change", filterMenu);
});

document.addEventListener("rifBiteLanguageChanged", () => {
  renderProducts(products.slice(0, 3), "featuredProducts");
  renderProducts(products, "menuProducts");
  filterMenu();
  renderCart();
  updateCartCount();
});



const languageSwitcher = document.getElementById("languageSwitcher");

function changeLanguage(lang) {
  document.querySelectorAll("[data-" + lang + "]").forEach(element => {
    element.textContent = element.getAttribute("data-" + lang);
  });

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  localStorage.setItem("rifBiteLanguage", lang);

  if (languageSwitcher) {
    languageSwitcher.value = lang;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage =
    localStorage.getItem("rifBiteLanguage") || "ar";

  changeLanguage(savedLanguage);

  if (languageSwitcher) {
    languageSwitcher.addEventListener("change", event => {
      changeLanguage(event.target.value);
    });
  }
});
