let pendingMov = null;

async function startMovement(itemId, direction) {
  const items = await dbGetAll('items');
  const item = items.find(i => i.id === itemId);

  if (!item) return;

  if (direction === 'out' && item.qty <= 0) {
    toast('Item sem estoque!');
    return;
  }

  pendingMov = { itemId, direction };

  document.getElementById('movItemName').value = item.name;
  document.getElementById('movType').value =
    direction === 'in' ? '⬆️ Entrada' : '⬇️ Saída';

  document.getElementById('movQty').value = 1;
  document.getElementById('movPrice').value = item.price || 0;
  document.getElementById('movObs').value = '';

  openModal('movModal');
}

async function confirmMovement() {
  if (!pendingMov) return;

  const { itemId, direction } = pendingMov;

  const qty = parseInt(document.getElementById('movQty').value) || 1;
  const price = parseFloat(document.getElementById('movPrice').value) || 0;
  const obs = document.getElementById('movObs').value;

  const items = await dbGetAll('items');
  const item = items.find(i => i.id === itemId);

  if (!item) return;

  if (direction === 'out' && item.qty < qty) {
    toast('Estoque insuficiente!');
    return;
  }

  item.qty = direction === 'in'
    ? item.qty + qty
    : item.qty - qty;

  item.price = price;

  await dbPut('items', item);

  await dbPut('movements', {
    id: uid(),
    itemId,
    itemName: item.name,
    cat: item.cat,
    direction,
    qty,
    price,
    totalValue: price * qty,
    user: currentUser,
    date: new Date().toISOString(),
    obs
  });

  closeModal('movModal');
  renderAll();

  toast(direction === 'in'
    ? `+${qty} ${item.name}`
    : `-${qty} ${item.name}`
  );

  pendingMov = null;
}