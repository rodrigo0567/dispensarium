let currentUser = '';

async function doLogin() {
  const name = document.getElementById('loginName').value.trim();

  if (!name) {
    alert("Digite seu nome");
    return;
  }

  localStorage.setItem('user', name);

  document.getElementById('sidebarUser').textContent = name;

  document.getElementById('loginOverlay').style.display = 'none';
  document.getElementById('app').style.display = 'flex';

  renderAll();
}

function doLogout() {
  localStorage.removeItem('user');
  location.reload();
}
window.onload = function () {
  const user = localStorage.getItem('user');

  if (user) {
    document.getElementById('sidebarUser').textContent = user;
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    renderAll();
  }
};