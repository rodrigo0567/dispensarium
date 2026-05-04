let currentUser = '';

async function doLogin() {
  const name = document.getElementById('loginName').value.trim();

  if (!name) {
    toast('Digite seu nome');
    return;
  }

  currentUser = name;

  document.getElementById('sidebarUser').textContent = name;
  document.getElementById('loginOverlay').style.display = 'none';
  document.getElementById('app').style.display = 'flex';

  await openDB();

  await renderAll();
}

function doLogout() {
  currentUser = '';

  document.getElementById('loginOverlay').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}