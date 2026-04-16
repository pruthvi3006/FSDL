window.addEventListener('load', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
});

function handleLogin(e) {
  e.preventDefault();

  const loginData = {
    email: document.getElementById('login-email').value,
    password: document.getElementById('login-password').value
  };

  fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userName', data.user.name);
      currentUser = data.user;
      showMessage('Login successful!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } else {
      showMessage(data.message || 'Login failed', 'error');
    }
  })
  .catch(err => {
    console.error('Login error:', err);
    showMessage('Login failed', 'error');
  });
}

function handleRegister(e) {
  e.preventDefault();

  const registerData = {
    name: document.getElementById('register-name').value,
    email: document.getElementById('register-email').value,
    password: document.getElementById('register-password').value,
    phone: document.getElementById('register-phone').value
  };

  fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerData)
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userName', data.user.name);
      currentUser = data.user;
      showMessage('Registration successful!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } else {
      showMessage(data.message || 'Registration failed', 'error');
    }
  })
  .catch(err => {
    console.error('Registration error:', err);
    showMessage('Registration failed', 'error');
  });
}

function toggleAuth() {
  const loginForm = document.querySelector('.auth-form');
  const registerForm = document.getElementById('register-form-container');

  if (loginForm && registerForm) {
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
  }
}
