function checkAuth() {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) return null;
  return JSON.parse(userStr);
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}