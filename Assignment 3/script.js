// ==================== Product Data ====================
const products = [
    {
        id: 1,
        name: 'MacBook Pro 16"',
        category: 'laptops',
        price: 2499.99,
        oldPrice: 2799.99,
        image: './apple_m5_m5pro_m5max_m5ultra.jpg',
        rating: 5,
        description: 'Powerful laptop with M2 Pro chip'
    },
    {
        id: 2,
        name: 'iPhone 15 Pro',
        category: 'phones',
        price: 1199.99,
        oldPrice: 1299.99,
        image: './apple-iphone-15-pro-max-natural-titanium-png-11695041051y3hjkvpdvc.png',
        rating: 5,
        description: 'Latest Apple smartphone with advanced camera'
    },
    {
        id: 3,
        name: 'Sony WH-1000XM5',
        category: 'accessories',
        price: 399.99,
        oldPrice: 449.99,
        image: './images (3).jfif',
        rating: 4,
        description: 'Premium noise-cancelling headphones'
    },
    {
        id: 4,
        name: 'Dell XPS 15',
        category: 'laptops',
        price: 1899.99,
        oldPrice: 1999.99,
        image: './Dell-XPS-15-Front-and-Top-View.jpg',
        rating: 5,
        description: 'High-performance laptop for professionals'
    },
    {
        id: 5,
        name: 'Samsung Galaxy S24',
        category: 'phones',
        price: 999.99,
        oldPrice: 1099.99,
        image: './images (4).jfif',
        rating: 4,
        description: 'Flagship Android smartphone'
    },
    {
        id: 6,
        name: 'Apple Watch Ultra',
        category: 'accessories',
        price: 799.99,
        oldPrice: 899.99,
        image: './66f6dd392c94c053536369e9-ultra-2-49mm-titanium-case-orange-ocean-band-mreh3kh-a.jpg',
        rating: 5,
        description: 'Advanced smartwatch with health monitoring'
    },
    {
        id: 7,
        name: 'Lenovo ThinkPad X1',
        category: 'laptops',
        price: 1599.99,
        oldPrice: 1799.99,
        image: './Lenovo_ThinkPad_X1_Ultrabook.jpg',
        rating: 4,
        description: 'Business laptop with excellent keyboard'
    },
    {
        id: 8,
        name: 'iPad Pro 12.9"',
        category: 'tablets',
        price: 1099.99,
        oldPrice: 1199.99,
        image: './images (5).jfif',
        rating: 5,
        description: 'Powerful tablet for creative professionals'
    },
    {
        id: 9,
        name: 'USB-C Hub',
        category: 'accessories',
        price: 49.99,
        oldPrice: 59.99,
        image: './61Bm+9UTP6L._AC_UF1000,1000_QL80_.jpg',
        rating: 4,
        description: 'Multi-port USB-C hub with HDMI'
    }
];

// ==================== Shopping Cart ====================
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Update quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;

    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-muted mt-5">Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item d-flex align-items-start">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-control">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span style="width: 30px; text-align: center;">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <span class="ms-auto remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateCartTotal();
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// ==================== Display Products ====================
function displayProducts(productsToDisplay) {
    const container = document.getElementById('productsContainer');
    
    if (productsToDisplay.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No products found</p></div>';
        return;
    }

    container.innerHTML = productsToDisplay.map(product => `
        <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div class="card product-card">
                <img src="${product.image}" class="product-image" alt="${product.name}">
                <div class="product-body">
                    <span class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                    <h5 class="product-title">${product.name}</h5>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(product.rating)}<span class="text-muted">(${product.rating}.0)</span>
                    </div>
                    <div class="product-footer">
                        <div>
                            <span class="product-price">$${product.price.toFixed(2)}</span>
                            <span class="product-old-price">$${product.oldPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <button class="add-to-cart-btn mt-3" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== Filter Products ====================
function filterByCategory(category) {
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// ==================== Notification ====================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show';
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1000;
        min-width: 300px;
        animation: slideInDown 0.3s ease;
    `;
    notification.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== Event Listeners ====================
document.addEventListener('DOMContentLoaded', function() {
    // Always display products dynamically from data
    displayProducts(products);
    loadCart();
    loadUser();

    // Filter category buttons
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', function() {
            filterByCategory(this.value);
        });
    });

    // Login form
    document.getElementById('loginForm').addEventListener('submit', loginUser);
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', registerUser);

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert(`Order placed successfully! Total: $${(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)).toFixed(2)}`);
        cart = [];
        saveCart();
        updateCartUI();
        document.getElementById('cartCount').textContent = '0';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const element = document.querySelector(href);
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ==================== Search Functionality ====================
function searchProducts(searchTerm) {
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayProducts(filtered);
}
// ==================== Authentication ====================
let currentUser = null;

// Load user from localStorage
function loadUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserUI();
    }
}

// Save user to localStorage
function saveUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Get all registered users
function getAllUsers() {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
}

// Save all users
function saveAllUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// Register new user
function registerUser(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const phone = document.getElementById('registerPhone').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
        showAuthNotification('Please fill all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAuthNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Check if email already exists
    const users = getAllUsers();
    if (users.some(u => u.email === email)) {
        showAuthNotification('Email already registered', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        password: password,
        registeredAt: new Date().toLocaleDateString()
    };
    
    users.push(newUser);
    saveAllUsers(users);
    
    showAuthNotification('Registration successful! Please login.', 'success');
    document.getElementById('registerForm').reset();
    
    // Close register modal and open login modal
    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    registerModal.hide();
    setTimeout(() => {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    }, 500);
}

// Login user
function loginUser(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!email || !password) {
        showAuthNotification('Please enter email and password', 'error');
        return;
    }
    
    const users = getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showAuthNotification('Invalid email or password', 'error');
        return;
    }
    
    currentUser = user;
    saveUser(currentUser);
    
    if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
    }
    
    showAuthNotification(`Welcome back, ${user.name}!`, 'success');
    document.getElementById('loginForm').reset();
    
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();
    
    updateUserUI();
}

// Logout user
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    cart = [];
    saveCart();
    updateCartUI();
    updateUserUI();
    showAuthNotification('Logged out successfully', 'success');
}

// Update UI based on login state
function updateUserUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userProfileNav = document.getElementById('userProfileNav');
    const userGreeting = document.getElementById('userGreeting');
    
    if (currentUser) {
        loginBtn.classList.add('d-none');
        registerBtn.classList.add('d-none');
        userProfileNav.classList.remove('d-none');
        userGreeting.textContent = `👋 Hello, ${currentUser.name.split(' ')[0]}!`;
    } else {
        loginBtn.classList.remove('d-none');
        registerBtn.classList.remove('d-none');
        userProfileNav.classList.add('d-none');
    }
}

// Switch to register modal from login
function switchToRegister() {
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();
    setTimeout(() => {
        const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
        registerModal.show();
    }, 500);
}

// Switch to login modal from register
function switchToLogin() {
    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    registerModal.hide();
    setTimeout(() => {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    }, 500);
}

// Show authentication notifications
function showAuthNotification(message, type) {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'alert-success' : 'alert-danger';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    notification.className = `alert ${bgColor} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1050;
        min-width: 300px;
        animation: slideInDown 0.3s ease;
    `;
    notification.innerHTML = `
        <i class="fas ${icon} me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}