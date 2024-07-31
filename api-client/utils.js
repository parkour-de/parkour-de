async function loginUser(key, password) {
  const response = await fetch(`https://8bj.de/api/user/${key}/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return await response.json();
}

function saveToken(token) {
  sessionStorage.setItem('token', token);
}

function saveCredentials(key, password) {
  sessionStorage.setItem('key', key);
  sessionStorage.setItem('password', password);
}

function getUserKey() {
  return sessionStorage.getItem('key');
}

async function getToken() {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return await refreshToken();
  }

  const expiry = parseInt(atob(token.split(':')[1]), 10);
  const now = Math.floor(Date.now() / 1000);

  if (expiry < now) {
    return await refreshToken();
  }

  return token;
}

async function refreshToken() {
  const key = sessionStorage.getItem('key');
  const password = sessionStorage.getItem('password');

  if (!key || !password) {
    throw new Error('No credentials stored');
  }

  const response = await fetch(`https://8bj.de/api/user/${key}/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  const data = await response.json();
  saveToken(data.token);
  return data.token;
}