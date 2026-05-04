function showPage(page) {
  document.querySelectorAll('.page').forEach(p =>
    p.classList.remove('active')
  );

  const el = document.getElementById('page-' + page);

  if (!el) {
    console.error('Página não encontrada:', page);
    return;
  }

  el.classList.add('active');
}
function openAddModal() {
  const modal = document.getElementById('addModal');

  if (!modal) {
    console.error('Modal não encontrado');
    return;
  }

  modal.classList.add('open');

  // limpa campos
  document.getElementById('fName').value = '';
  document.getElementById('fQty').value = 1;
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}
function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;

  el.textContent = msg;
  el.classList.add('show');

  setTimeout(() => {
    el.classList.remove('show');
  }, 2000);
}