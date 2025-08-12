
// Database Schema Simulation
let users = [];
const products = [
    {
        id: 1,
        name: "Authentic Kente Cloth",
        price: 250.00,
        category: "fabrics",
        description: "Handwoven traditional Kente cloth from Ashanti region. Made with premium cotton threads.",
        image: "https://s1.it.atcdn.net/wp-content/uploads/2016/03/AT_PROMO_0122.jpg",
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
        image: "https://ashantinaturals.com/cdn/shop/products/65850926104_d2e9788c-5204-420f-a94a-8fd277bc0483_1024x1024.png?v=1644571355",
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
        image: "https://frederickhyde.com/cdn/shop/files/AD-DJWT0835_1.jpg?v=1737119261",
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
        image: "https://img.kwcdn.com/product/fancy/e79709c6-7996-4b64-8f0d-9fd5136ddcdf.jpg?imageView2/2/w/800/q/70/format/webp",
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
        image: "https://media.istockphoto.com/id/2091627555/photo/clothe.jpg?s=612x612&w=0&k=20&c=_lPzUmHBxQb56CPN3D8mByBIT5O9JolH1AMH9X-mYJU=",
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
        image: "https://media.istockphoto.com/id/2161915578/photo/wicker-baskets-on-market.jpg?s=612x612&w=0&k=20&c=_rQ6xCo3cqMdXzSrf-PZZSf3WWCfawU_akODK9546VY=",
        rating: 4.7,
        reviews: 31,
        stock: 12
    }
];

let cart = [];
let currentUser = null;

// Persistence helpers
function saveCart() {
    try {
        localStorage.setItem('gm_cart', JSON.stringify(cart));
    } catch (error) {
        // Ignore storage errors
    }
}

function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem('gm_cart');
        cart = saved ? JSON.parse(saved) : [];
    } catch (error) {
        cart = [];
    }
}

function saveCurrentUser() {
    try {
        localStorage.setItem('gm_user', JSON.stringify(currentUser));
    } catch (error) {
        // Ignore storage errors
    }
}

function loadCurrentUser() {
    try {
        const saved = localStorage.getItem('gm_user');
        currentUser = saved ? JSON.parse(saved) : null;
    } catch (error) {
        currentUser = null;
    }
}

function saveUsers() {
    try {
        localStorage.setItem('gm_users', JSON.stringify(users));
    } catch (error) {
        // Ignore storage errors
    }
}

function loadUsers() {
    try {
        const saved = localStorage.getItem('gm_users');
        users = saved ? JSON.parse(saved) : [];
    } catch (error) {
        users = [];
    }
}

function updateAuthUI() {
    const loginLink = document.getElementById('login-link');
    if (!loginLink) return;
    if (currentUser && currentUser.email) {
        loginLink.innerHTML = '<i class="fas fa-user"></i> Logout (' + (currentUser.name || currentUser.email) + ')';
        loginLink.onclick = function(e) {
            e.preventDefault();
            logout();
        };
    } else {
        loginLink.innerHTML = '<i class="fas fa-user"></i> Login';
        loginLink.onclick = function(e) {
            e.preventDefault();
            showPage('login');
        };
    }
}

function logout() {
    currentUser = null;
    saveCurrentUser();
    updateAuthUI();
    alert('You have been logged out.');
}

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
    saveCart();
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
    saveCart();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    loadCart();
    saveCart();
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
    if (typeof PaystackPop === 'undefined') {
        alert('Payment system is currently unavailable. Please check your internet connection and try again.');
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
            saveCart();
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

    // Validate against stored users (demo only; not secure for production)
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
        alert('Invalid email or password.');
        return;
    }
    currentUser = { email: user.email, name: user.name };
    saveCurrentUser();
    updateAuthUI();
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
    
    // Simple duplicate check and save (demo only)
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
        alert('An account with this email already exists. Please log in.');
        showPage('login');
        return;
    }
    users.push({ name, email, password });
    saveUsers();
    alert(`Registration successful for: ${name} (${email})`);
    currentUser = { email, name };
    saveCurrentUser();
    updateAuthUI();
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
    loadUsers();
    loadCurrentUser();
    loadCartFromStorage();
    loadFeaturedProducts();
    updateCartCount();
    updateAuthUI();
};
