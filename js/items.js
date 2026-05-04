function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2,5);
}

async function saveItem() {
  const name = document.getElementById('fName').value.trim();
  if (!name) return alert("Informe o nome");

  const item = {
    id: uid(),
    name,
    cat: document.getElementById('fCat').value,
    qty: parseInt(fQty.value) || 0
  };

  await dbPut('items', item);
  renderAll();
}