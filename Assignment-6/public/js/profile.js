window.addEventListener('load', () => {
  if (!currentUser) {
    window.location.href = '/login';
    return;
  }

  loadProfile();

  const form = document.getElementById('profile-form');
  if (form) {
    form.addEventListener('submit', handleProfileUpdate);
  }
});

function loadProfile() {
  fetch(`${API_URL}/auth/profile/${currentUser.id}`)
    .then(res => res.json())
    .then(user => {
      document.getElementById('name').value = user.name || '';
      document.getElementById('email').value = user.email || '';
      document.getElementById('phone').value = user.phone || '';
      document.getElementById('address').value = user.address || '';
      document.getElementById('city').value = user.city || '';
      document.getElementById('state').value = user.state || '';
      document.getElementById('zipcode').value = user.zipcode || '';
    })
    .catch(err => {
      console.error('Error loading profile:', err);
      showMessage('Error loading profile', 'error');
    });
}

function handleProfileUpdate(e) {
  e.preventDefault();

  const userData = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    zipcode: document.getElementById('zipcode').value
  };

  fetch(`${API_URL}/auth/profile/${currentUser.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(res => res.json())
  .then(data => {
    showMessage('Profile updated successfully!');
    localStorage.setItem('userName', userData.name);
    currentUser.name = userData.name;
  })
  .catch(err => {
    console.error('Error updating profile:', err);
    showMessage('Error updating profile', 'error');
  });
}
