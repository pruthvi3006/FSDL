window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get('id');
  
  if (itemId) {
    loadItemDetail(itemId);
  }
});

function loadItemDetail(itemId) {
  fetch(`${API_URL}/items/${itemId}`)
    .then(res => res.json())
    .then(item => {
      const container = document.getElementById('item-content');
      container.innerHTML = `
        <div class="item-detail-layout">
          <div class="item-detail-image">🛍️</div>
          <div class="item-detail-info">
            <h1>${item.title}</h1>
            <div class="item-detail-price">₹${item.price}</div>
            
            <div class="item-detail-meta">
              <div class="item-meta-item">
                <strong>Category</strong>
                <span>${item.category}</span>
              </div>
              <div class="item-meta-item">
                <strong>Condition</strong>
                <span>${item.condition}</span>
              </div>
              <div class="item-meta-item">
                <strong>Location</strong>
                <span>${item.location}</span>
              </div>
              <div class="item-meta-item">
                <strong>Views</strong>
                <span>${item.views}</span>
              </div>
            </div>

            <h3 style="margin-top: 30px;">Description</h3>
            <p>${item.description}</p>

            <div class="seller-card">
              <h3>Seller Information</h3>
              <div class="seller-info">
                <p><strong>Name:</strong> ${item.seller.name}</p>
                <p><strong>Phone:</strong> ${item.seller.phone || 'N/A'}</p>
                <p><strong>Email:</strong> ${item.seller.email}</p>
                <p><strong>Location:</strong> ${item.seller.city || 'N/A'}</p>
              </div>
            </div>

            <div style="display: flex; gap: 15px;">
              ${currentUser ? `
                <button class="btn-primary" onclick="addToCart('${item._id}')">Add to Cart</button>
              ` : `
                <button class="btn-primary" onclick="goLogin()">Login to Buy</button>
              `}
              <button class="btn-secondary" onclick="window.history.back()">Back</button>
            </div>
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error('Error loading item:', err);
      document.getElementById('item-content').innerHTML = '<p>Error loading item details</p>';
    });
}

function addToCart(itemId) {
  if (!currentUser) {
    goLogin();
    return;
  }

  fetch(`${API_URL}/cart/add/${currentUser.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ itemId, quantity: 1 })
  })
  .then(res => res.json())
  .then(data => {
    showMessage('Item added to cart!');
    setTimeout(() => {
      window.location.href = '/cart';
    }, 1500);
  })
  .catch(err => {
    console.error('Error adding to cart:', err);
    showMessage('Error adding to cart', 'error');
  });
}

function goLogin() {
  window.location.href = '/login';
}
