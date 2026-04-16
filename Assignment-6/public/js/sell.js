window.addEventListener('load', () => {
  const form = document.getElementById('sell-form');
  if (form) {
    form.addEventListener('submit', handleSellItem);
  }

  // Check authentication
  if (!currentUser) {
    window.location.href = '/login';
  }
});

function handleSellItem(e) {
  e.preventDefault();

  if (!currentUser) {
    showMessage('Please login first', 'error');
    return;
  }

  const itemData = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    category: document.getElementById('category').value,
    price: parseFloat(document.getElementById('price').value),
    originalPrice: document.getElementById('originalPrice').value ? parseFloat(document.getElementById('originalPrice').value) : null,
    condition: document.getElementById('condition').value,
    location: document.getElementById('location').value,
    seller: currentUser.id
  };

  fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemData)
  })
  .then(res => res.json())
  .then(data => {
    showMessage('Item posted successfully!');
    setTimeout(() => {
      window.location.href = '/my-items';
    }, 1500);
  })
  .catch(err => {
    console.error('Error posting item:', err);
    showMessage('Error posting item', 'error');
  });
}
