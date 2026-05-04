// 🔄 Entrada / Saída de itens
async function startMovement(id, type) {
  try {
    const items = await dbGetAll('items');

    const item = items.find(i => i.id === id);

    if (!item) {
      console.error("Item não encontrado");
      return;
    }

    // 🚫 evitar negativo
    if (type === 'out' && item.qty <= 0) {
      toast("Sem estoque!");
      return;
    }

    // ➕ entrada
    if (type === 'in') {
      item.qty++;
    }

    // ➖ saída
    if (type === 'out') {
      item.qty--;
    }

    // 💾 salva atualização
    await dbPut('items', item);

    // 🔄 re-renderiza
    await renderAll();

  } catch (e) {
    console.error("Erro na movimentação:", e);
  }
}