// 🚀 Inicialização do sistema
window.onload = async function () {
  try {
    // 🔧 inicia banco primeiro (ESSENCIAL)
    await initDB();

    // 🔐 verifica usuário salvo
    const user = localStorage.getItem('user');

    if (user) {
      document.getElementById('sidebarUser').textContent = user;

      document.getElementById('loginOverlay').style.display = 'none';
      document.getElementById('app').style.display = 'flex';

      await renderAll();
    }

  } catch (e) {
    console.error("Erro ao iniciar sistema:", e);
  }
};


// 🔐 LOGIN
async function doLogin() {
  const name = document.getElementById('loginName').value.trim();

  if (!name) {
    alert("Digite seu nome");
    return;
  }

  try {
    localStorage.setItem('user', name);

    document.getElementById('sidebarUser').textContent = name;

    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('app').style.display = 'flex';

    await renderAll();

  } catch (e) {
    console.error("Erro no login:", e);
  }
}


// 🚪 LOGOUT
function doLogout() {
  localStorage.removeItem('user');
  location.reload();
}