window.addEventListener('load', () => {
  if (!currentUser) {
    window.location.href = '/login';
    return;
  }

  loadMyItems();
});

function loadMyItems() {
  fetch(`${API_URL}/items/seller/${currentUser.id}`)
    .then(res => res.json())
    .then(items => {
      const grid = document.getElementById('my-items-grid');
      grid.innerHTML = items.length > 0 
        ? items.map(item => createMyItemCard(item)).join('')
        : '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No items posted yet</p>';
    })
    .catch(err => {
      console.error('Error loading items:', err);
      document.getElementById('my-items-grid').innerHTML = '<p>Error loading items</p>';
    });
}

function createMyItemCard(item) {
  return `
    <div class="item-card">
      <div class="item-image">🛍️</div>
      <div class="item-details">
        <div class="item-title">${item.title}</div>
        <div class="item-category">${item.category}</div>
        <div class="item-price">₹${item.price}</div>
        <div class="item-condition">Status: ${item.status}</div>
        <div style="margin-top: 10px; display: flex; gap: 10px;">
          <button class="btn-primary" onclick="editItem('${item._id}')" style="padding: 8px 12px; font-size: 12px;">Edit</button>
          <button class="btn-danger" onclick="deleteItem('${item._id}')" style="padding: 8px 12px; font-size: 12px;">Delete</button>
        </div>
      </div>
    </div>
  `;
}

function editItem(itemId) {
  alert('Edit feature coming soon!');
}

function deleteItem(itemId) {
  if (confirm('Are you sure you want to delete this item?')) {
    fetch(`${API_URL}/items/${itemId}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      showMessage('Item deleted successfully!');
      loadMyItems();
    })
    .catch(err => {
      console.error('Error deleting item:', err);
      showMessage('Error deleting item', 'error');
    });
  }
}
