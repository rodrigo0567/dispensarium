// 📄 Troca de páginas
function showPage(page) {
  // remove active de todas
  document.querySelectorAll('.page').forEach(p =>
    p.classList.remove('active')
  );

  // ativa a página correta
  const el = document.getElementById('page-' + page);
  if (el) el.classList.add('active');

  // marca menu ativo
  document.querySelectorAll('nav a').forEach(a =>
    a.classList.remove('active')
  );

  const nav = document.querySelector(`nav a[onclick*="${page}"]`);
  if (nav) nav.classList.add('active');
}


// 🪟 Abrir modal de adicionar
function openAddModal() {
  const modal = document.getElementById('addModal');
  if (!modal) return;

  modal.classList.add('open');

  // limpa campos
  const name = document.getElementById('fName');
  const qty = document.getElementById('fQty');

  if (name) name.value = '';
  if (qty) qty.value = 1;
}


// ❌ Fechar modal
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}


// 🔔 Toast (mensagem rápida)
function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;

  el.textContent = msg;
  el.classList.add('show');

  setTimeout(() => {
    el.classList.remove('show');
  }, 2000);
}