window.addEventListener('load', () => {
  if (!currentUser) {
    window.location.href = '/login';
    return;
  }

  loadCart();
});

function loadCart() {
  fetch(`${API_URL}/cart/${currentUser.id}`)
    .then(res => res.json())
    .then(cart => {
      const container = document.getElementById('cart-items');
      const subtotalEl = document.getElementById('subtotal');
      const totalEl = document.getElementById('total');

      if (!cart.items || cart.items.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 40px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Your cart is empty</p>
            <a href="/items" class="btn-primary">Continue Shopping</a>
          </div>
        `;
        subtotalEl.textContent = '₹0';
        totalEl.textContent = '₹0';
        return;
      }

      let subtotal = 0;
      container.innerHTML = cart.items.map(cartItem => {
        const itemTotal = cartItem.item.price * cartItem.quantity;
        subtotal += itemTotal;
        return `
          <div class="cart-item">
            <div class="cart-item-image">🛍️</div>
            <div class="cart-item-details">
              <div class="cart-item-title">${cartItem.item.title}</div>
              <div style="font-size: 12px; color: #999; margin-bottom: 5px;">Location: ${cartItem.item.location}</div>
              <div class="cart-item-price">₹${cartItem.item.price}</div>
              <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 10px;">
                <span>Qty: ${cartItem.quantity}</span>
                <span style="font-weight: bold;">Subtotal: ₹${itemTotal}</span>
              </div>
              <button class="btn-danger" onclick="removeFromCart('${cartItem.item._id}')">Remove</button>
            </div>
          </div>
        `;
      }).join('');

      subtotalEl.textContent = `₹${subtotal}`;
      totalEl.textContent = `₹${subtotal}`;
    })
    .catch(err => {
      console.error('Error loading cart:', err);
      document.getElementById('cart-items').innerHTML = '<p>Error loading cart</p>';
    });
}

function removeFromCart(itemId) {
  fetch(`${API_URL}/cart/remove/${currentUser.id}/${itemId}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    showMessage('Item removed from cart');
    loadCart();
  })
  .catch(err => {
    console.error('Error removing from cart:', err);
    showMessage('Error removing item', 'error');
  });
}

function checkout() {
  showMessage('Redirecting to payment gateway...');
  setTimeout(() => {
    alert('Payment gateway integration coming soon! For now, your order is confirmed.');
    fetch(`${API_URL}/cart/clear/${currentUser.id}`, {
      method: 'DELETE'
    })
    .then(() => {
      window.location.href = '/';
    });
  }, 1500);
}
