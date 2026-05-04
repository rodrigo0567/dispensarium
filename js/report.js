async function generateReport() {
  const items = await dbGetAll('items');
  const movements = await dbGetAll('movements');

  const totalStock = items.reduce((acc, i) => acc + (i.qty * (i.price || 0)), 0);

  const el = document.getElementById('reportContent');

  el.innerHTML = `
    <div class="stat-cards">
      <div class="stat-card">
        <div class="sv">${items.length}</div>
        <div class="sl">Total de itens</div>
      </div>

      <div class="stat-card">
        <div class="sv">R$ ${totalStock.toFixed(2)}</div>
        <div class="sl">Valor em estoque</div>
      </div>
    </div>

    <div class="report-section">
      <h4>📋 Estoque Atual</h4>

      <table class="report-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qtd</th>
            <th>Preço</th>
          </tr>
        </thead>

        <tbody>
          ${items.map(i => `
            <tr>
              <td>${i.name}</td>
              <td>${i.qty}</td>
              <td>R$ ${i.price || 0}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

async function exportCSV() {
  const items = await dbGetAll('items');

  let csv = "Item;Quantidade;Preço\n";

  items.forEach(i => {
    csv += `${i.name};${i.qty};${i.price}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'relatorio.csv';
  a.click();
}