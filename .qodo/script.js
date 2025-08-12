
// Database Schema Simulation
const users = [];
const products = [
    {
        id: 1,
        name: "Authentic Kente Cloth",
        price: 250.00,
        category: "fabrics",
        description: "Handwoven traditional Kente cloth from Ashanti region. Made with premium cotton threads.",
        image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        reviews: 42,
        stock: 15
    },
    {
        id: 2,
        name: "Shea Butter Cream",
        price: 85.00,
        category: "beauty",
        description: "100% natural shea butter cream with added essential oils for skin nourishment.",
        image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.0,
        reviews: 36,
        stock: 30
    },
    {
        id: 3,
        name: "Wooden Drum (Djembe)",
        price: 320.00,
        category: "handicrafts",
        description: "Authentic African djembe drum carved from a single piece of wood with goat skin head.",
        image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 5.0,
        reviews: 28,
        stock: 8
    },
    {
        id: 4,
        name: "Ghanaian Black Soap",
        price: 45.00,
        category: "beauty",
        description: "Traditional black soap made from plantain skins, cocoa pods, and palm tree leaves.",
        image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 3.5,
        reviews: 19,
        stock: 50
    },
    {
        id: 5,
        name: "Adinkra Printed Fabric",
        price: 180.00,
        category: "fabrics",
        description: "Cotton fabric printed with traditional Adinkra symbols representing wisdom and proverbs.",
        image: "https://images.unsplash.com/photo-1592919505780-303950717430?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.2,
        reviews: 27,
        stock: 22
    },
    {
        id: 6,
        name: "Basket Weave Handbag",
        price: 120.00,
        category: "handicrafts",
        description: "Handwoven raffia bag with leather accents. Perfect for everyday use.",
        image: "https://images.unsplash.com/photo-1556305079-4d1d0c8b9d4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        reviews: 31,
        stock: 12
    }
];

let cart = [];
let currentUser = null;

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Special case for login/register
    if (pageId !== 'login' && pageId !== 'register') {
        document.querySelector(`nav a[onclick="showPage('${pageId}')"]`).classList.add('active');
    }
    
    // Load content if needed
    if (pageId === 'products') {
        loadProducts();
    } else if (pageId === 'cart') {
        loadCart();
    } else if (pageId === 'home') {
        loadFeaturedProducts();
    }
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    container.innerHTML = '';
    
    // Get 4 featured products
    const featured = products.slice(0, 4);
    
    featured.forEach(product => {
        container.innerHTML += createProductCard(product);
    });
}

// Load all products on products page
function loadProducts() {
    const container = document.getElementById('all-products');
    container.innerHTML = '';
    
    products.forEach(product => {
        container.innerHTML += createProductCard(product);
    });
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-img" style="background-image: url('${product.image}')">
                <span class="product-badge">New</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <p class="product-price">₵ ${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="favorite"><i class="far fa-heart"></i></button>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Load cart items
function loadCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty</p>';
        document.getElementById('subtotal').textContent = '₵ 0.00';
        document.getElementById('total').textContent = '₵ 15.00';
        return;
    }
    
    cart.forEach(item => {
        container.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-img" style="background-image: url('${item.image}')"></div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">₵ ${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    updateCartTotal();
}

// Update item quantity in cart
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCartCount();
    loadCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    loadCart();
}

// Update cart total
function updateCartTotal() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 15.00;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `₵ ${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `₵ ${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `₵ ${total.toFixed(2)}`;
}

// Filter products by category
function filterCategory(category) {
    showPage('products');
    document.getElementById('category-filter').value = category;
    filterProducts();
}

// Filter products
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const searchTerm = document.getElementById('search-filter').value.toLowerCase();
    
    const container = document.getElementById('all-products');
    container.innerHTML = '';
    
    const filtered = products.filter(product => {
        const matchesCategory = category === 'all' || product.category === category;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
    
    if (filtered.length === 0) {
        container.innerHTML = '<p>No products found</p>';
        return;
    }
    
    filtered.forEach(product => {
        container.innerHTML += createProductCard(product);
    });
}

// Search products from header
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    if (!searchTerm) return;
    
    showPage('products');
    document.getElementById('search-filter').value = searchTerm;
    document.getElementById('category-filter').value = 'all';
    filterProducts();
}

// Checkout with Paystack
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    // Get total amount
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 15.00;
    const total = (subtotal + shipping) * 100; // Convert to kobo
    
    // Paystack integration
    const handler = PaystackPop.setup({
        key: 'pk_test_3231cd66664bc3fd3871d4939b07b7d27c43d48d', // Replace with your public key
        email: currentUser ? currentUser.email : 'customer@example.com',
        amount: total,
        currency: 'GHS',
        ref: 'GM' + Date.now(), // Generate a unique reference
        onClose: function() {
            alert('Transaction was not completed, window closed.');
        },
        callback: function(response) {
            alert('Payment complete! Reference: ' + response.reference);
            // Here you would typically send the reference to your server for verification
            cart = []; // Clear cart
            updateCartCount();
            loadCart();
            showPage('home');
        }
    });
    
    handler.openIframe();
}

// Form submissions
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // In a real app, this would be validated against a database
    alert(`Login attempt with email: ${email}`);
    currentUser = { email, name: "Test User" };
    showPage('home');
});

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('fullname').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }
    
    // In a real app, this would create a new user in the database
    alert(`Registration successful for: ${name} (${email})`);
    currentUser = { email, name };
    showPage('home');
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
    document.getElementById('contact-form').reset();
});

// Initialize
window.onload = function() {
    loadFeaturedProducts();
    updateCartCount();
};
