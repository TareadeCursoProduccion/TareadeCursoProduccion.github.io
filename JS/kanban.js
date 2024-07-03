class KANBAN {
    constructor(Nombre, Demanda, TiempoEntrega, StockSeguridad, AlmacenajePorcentual) {
      this.Nombre = Nombre;
      this.Demanda = Demanda;
      this.TiempoEntrega = TiempoEntrega;
      this.StockSeguridad = StockSeguridad;
      this.AlmacenajePorcentual = AlmacenajePorcentual;
  
      // Calcula la AlmacenajeUnidad (redondeado)
      this.AlmacenajeUnidad = Math.round(AlmacenajePorcentual * Demanda);
  
      // Calcula UnidadKanban (redondeado)
      this.UnidadKanban = Math.round((Demanda * TiempoEntrega * (1 + StockSeguridad)) / this.AlmacenajeUnidad);
    }
  }
  
  document.getElementById('initialForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const costOrder = parseFloat(document.getElementById('costOrder').value);
    const kanbanTableBody = document.getElementById('kanbanTableBody');
    kanbanTableBody.innerHTML = '';
  
    for (let i = 0; i < costOrder; i++) {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>Componente ${i + 1}</td>
        <td><input type="number" name="Demanda${i}" min="1" required></td>
        <td><input type="number" name="TiempoEntrega${i}" min="1" required></td>
        <td><input type="number" name="StockSeguridad${i}" min="0.01" max="1" step="0.01" required></td>
        <td><input type="number" name="Almacenaje${i}" min="0.01" max="1" step="0.01" required></td>
      `;
  
      kanbanTableBody.appendChild(row);
    }
  
    document.getElementById('kanbanForm').style.display = 'block';
  });
  
  document.getElementById('kanbanForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const costOrder = parseFloat(document.getElementById('costOrder').value);
    const resultTableBody = document.getElementById('resultTableBody');
    resultTableBody.innerHTML = '';
  
    let totalKanbans = 0;
  
    for (let i = 0; i < costOrder; i++) {
      const demanda = parseFloat(document.querySelector(`input[name="Demanda${i}"]`).value);
      const tiempoEntrega = parseFloat(document.querySelector(`input[name="TiempoEntrega${i}"]`).value);
      const stockSeguridad = parseFloat(document.querySelector(`input[name="StockSeguridad${i}"]`).value);
      const almacenaje = parseFloat(document.querySelector(`input[name="Almacenaje${i}"]`).value);
  
      const kanban = new KANBAN(
        `Componente ${i + 1}`,
        demanda,
        tiempoEntrega,
        stockSeguridad,
        almacenaje
      );
  
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${kanban.Nombre}</td>
        <td>${kanban.AlmacenajeUnidad}</td>
        <td>${kanban.UnidadKanban}</td>
      `;
  
      resultTableBody.appendChild(row);
      totalKanbans += kanban.UnidadKanban;
    }
  
    document.getElementById('totalKanbans').innerText = `Suma totales: ${totalKanbans} kanbanes`;
    document.getElementById('results').style.display = 'block';
  });
  
