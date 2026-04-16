const API_URL = 'http://localhost:5000/api';
let currentUser = null;

// Check if user is logged in
window.addEventListener('load', () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  if (token && userId) {
    currentUser = { id: userId, name: userName };
    updateNavigation();
  } else {
    updateNavigation();
  }

  // Load featured items on homepage
  if (window.location.pathname === '/') {
    loadFeaturedItems();
  }
});

function updateNavigation() {
  const navAuth = document.getElementById('nav-auth');
  const navLogout = document.getElementById('nav-logout');
  const navSell = document.getElementById('nav-sell');
  const navProfile = document.getElementById('nav-profile');
  const navCart = document.getElementById('nav-cart');

  if (currentUser) {
    if (navAuth) navAuth.style.display = 'none';
    if (navLogout) navLogout.style.display = 'block';
    if (navSell) navSell.style.display = 'block';
    if (navProfile) navProfile.style.display = 'block';
    if (navCart) navCart.style.display = 'block';
  } else {
    if (navAuth) navAuth.style.display = 'block';
    if (navLogout) navLogout.style.display = 'none';
    if (navSell) navSell.style.display = 'none';
    if (navProfile) navProfile.style.display = 'none';
    if (navCart) navCart.style.display = 'none';
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  currentUser = null;
  updateNavigation();
  window.location.href = '/';
}

function loadFeaturedItems() {
  fetch(`${API_URL}/items/?limit=6`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('featured-items');
      if (container) {
        container.innerHTML = data.items.map(item => createItemCard(item)).join('');
      }
    })
    .catch(err => console.error('Error loading featured items:', err));
}

function createItemCard(item) {
  return `
    <div class="item-card" onclick="goToItem('${item._id}')">
      <div class="item-image">🛍️</div>
      <div class="item-details">
        <div class="item-title">${item.title}</div>
        <div class="item-category">${item.category}</div>
        <div class="item-price">₹${item.price}</div>
        <div class="item-condition">Condition: ${item.condition}</div>
        <div class="item-footer">
          <span class="item-location">📍 ${item.location}</span>
          <span>${item.views} views</span>
        </div>
      </div>
    </div>
  `;
}

function goToItem(itemId) {
  window.location.href = `/item-detail?id=${itemId}`;
}

function filterByCategory(category) {
  window.location.href = `/items?category=${category}`;
}

function searchItems() {
  const searchInput = document.getElementById('search-input');
  if (searchInput && searchInput.value) {
    window.location.href = `/items?search=${encodeURIComponent(searchInput.value)}`;
  }
}

function showMessage(message, type = 'success') {
  const messageDiv = document.createElement('div');
  messageDiv.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 1000;
    max-width: 300px;
  `;
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);

  setTimeout(() => messageDiv.remove(), 3000);
}
