// 📊 Gerar relatório simples
async function generateReport() {
  try {
    const items = await dbGetAll('items');

    const container = document.getElementById('reportContent');

    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = `<p style="color:#94a3b8;">Nenhum dado disponível</p>`;
      return;
    }

    // separa categorias
    const kitchen = items.filter(i => i.cat === 'kitchen');
    const clean   = items.filter(i => i.cat === 'clean');

    // total geral
    const total = items.reduce((acc, i) => acc + i.qty, 0);

    container.innerHTML = `
      <h3>Total de Itens: ${total}</h3>

      <h4>Cozinha</h4>
      ${renderTable(kitchen)}

      <h4>Limpeza</h4>
      ${renderTable(clean)}
    `;

  } catch (e) {
    console.error("Erro no relatório:", e);
  }
}


// 📋 Render tabela
function renderTable(list) {
  if (list.length === 0) {
    return `<p style="color:#94a3b8;">Nenhum item</p>`;
  }

  return `
    <table border="1" cellpadding="6" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <th>Item</th>
        <th>Quantidade</th>
      </tr>
      ${list.map(i => `
        <tr>
          <td>${i.name}</td>
          <td>${i.qty}</td>
        </tr>
      `).join('')}
    </table>
  `;
}