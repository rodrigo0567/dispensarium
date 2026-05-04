function showPage(page) {
  document.querySelectorAll('.page').forEach(p =>
    p.classList.remove('active')
  );

  document.getElementById('page-' + page).classList.add('active');
}

function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function toast(msg) {
  const el = document.getElementById('toast');

  el.textContent = msg;
  el.classList.add('show');

  setTimeout(() => {
    el.classList.remove('show');
  }, 2500);
}