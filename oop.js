class Product {
    constructor(id, name, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        let existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            let newItem = new ShoppingCartItem(product, quantity);
            this.items.push(newItem);
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    displayCartItems() {
        const cartItemsDiv = document.getElementById("cart-items");
        cartItemsDiv.innerHTML = ""; 
        this.items.forEach(item => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.innerHTML = `
                <p>Produit: ${item.product.name} | Quantité: ${item.quantity} | Prix: $${item.getTotalPrice().toFixed(2)}</p>
            `;
            cartItemsDiv.appendChild(cartItemDiv);
        });

       
        document.getElementById("total-price").textContent = "$" + this.getTotal().toFixed(2);
    }
}

const productList = document.getElementById("product-list");

let products = [
    new Product(1, "Violon", 2500, "https://www.shahbamusic.com/2307-large_default/violon-pm.jpg"),
    new Product(2, "Nay", 1000, "https://www.shahbamusic.com/1789-large_default/nay-oriental.jpg"),
    new Product(3, "Guitar", 1500, "https://cangozmuzik.com.tr/uploads/p/p/Admira-PALOMA-Klasik-Gitar_4.jpg?v=1725971514"),
];

let cart = new ShoppingCart();


function initializeProducts() {
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add To Cart</button>
        `;
        productList.appendChild(productCard);
    });

    
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = parseInt(button.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            cart.addItem(product, 1);
            cart.displayCartItems(); 
        });
    });
}

document.addEventListener("DOMContentLoaded", initializeProducts);
console.log("DOMContentLoaded", initializeProducts)
