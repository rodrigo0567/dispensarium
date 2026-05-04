// 🔑 Gera ID único
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2,5);
}


// 🔄 Render geral
async function renderAll() {
  await renderGrid('kitchen');
  await renderGrid('clean');
}


// 📦 Render por categoria
async function renderGrid(cat) {
  const items = await dbGetAll('items');
  const filtered = items.filter(i => i.cat === cat);

  const grid = document.getElementById('grid-' + cat);

  if (!grid) return;

  grid.innerHTML = filtered.map(item => `
    <div class="item-card">
      <div class="item-name">${item.name}</div>

      <div class="item-controls">
        <button onclick="startMovement('${item.id}','out')">-</button>
        <span>${item.qty}</span>
        <button onclick="startMovement('${item.id}','in')">+</button>
      </div>
    </div>
  `).join('');
}


// ➕ SALVAR ITEM (ESSENCIAL)
async function saveItem() {
  const name = document.getElementById('fName').value.trim();
  const cat = document.getElementById('fCat').value;
  const qty = parseInt(document.getElementById('fQty').value) || 0;

  if (!name) {
    toast("Informe o nome");
    return;
  }

  const item = {
    id: uid(),
    name,
    cat,
    qty,
    price: 0
  };

  await dbPut('items', item);

  closeModal('addModal');

  await renderAll();

  toast("Item adicionado!");
}