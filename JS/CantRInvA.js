document.getElementById('calculationForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Obtener los valores de los inputs
    const demandRate = parseFloat(document.getElementById('demandRate').value);
    const cycleTime = parseFloat(document.getElementById('cycleTime').value);
    const containerSize = parseFloat(document.getElementById('containerSize').value);
  
    if (isNaN(demandRate) || isNaN(cycleTime) || isNaN(containerSize)) {
      alert("Por favor, introduce valores válidos.");
      return;
    }
  
    // Calcular N y IM
    const N = Math.round((demandRate * cycleTime) / (60 * containerSize));
    const IM = N * containerSize;
  
    // Mostrar resultados
    document.getElementById('containerResult').innerText = `N = ${N} recipientes`;
    document.getElementById('containerFormula').innerText = `Fórmula: N = (${demandRate} × ${cycleTime}) / (60 × ${containerSize})`;
  
    document.getElementById('inventoryResult').innerText = `IM = ${IM} unidades`;
    document.getElementById('inventoryFormula').innerText = `Fórmula: IM = ${N} × ${containerSize}`;
  });
  