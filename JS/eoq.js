function calculateEOQ() {
    var demand = parseFloat(document.getElementById("demand").value);
    var orderCost = parseFloat(document.getElementById("orderCost").value);
    var holdingCost = parseFloat(document.getElementById("holdingCost").value);

    if (demand <= 0 || orderCost <= 0 || holdingCost <= 0) {
        alert("Por favor, ingrese valores mayores a 0.");
        return false;
    }

    // Verificar si los campos están completos
    if (isNaN(demand) || isNaN(orderCost) || isNaN(holdingCost)) {
        alert("Por favor, complete todos los campos.");
        return; // Salir de la función si algún campo está vacío o no es un número
    }

    var demandAnual = demand * 365; // Calcula la demanda anual

    // Calcular EOQ
    var eoq = Math.sqrt((2 * (demandAnual * orderCost)) / holdingCost);

    // Redondear a un número entero (hacia abajo)
    eoq = Math.floor(eoq);

    // Mostrar resultado
    var resultContainer = document.getElementById('resultContainer');
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h2>Resultado</h2><p>El resultado de EOQ es de: " + eoq + " unidades</p>";
    
    // Mostrar la fórmula
    var formulaDiv = document.getElementById('formula');
    let formulaHtml = `
      <h3>Fórmula de Cálculo:</h3>
      <p>EOQ = √((2 * D * S) / H)</p>
      <p class="formula">D = Demanda anual = ${demand} * 365</p>
      <p>D = ${demandAnual}</p>
      <p>S = Costos del pedido = ${orderCost}</p>
      <p>H = Costos de mantenimiento = ${holdingCost}</p>
      <p class="formula">EOQ = √((2 * ${demandAnual} * ${orderCost}) / ${holdingCost})</p>
      <p>EOQ = ${eoq} unidades</p>
    `;
    formulaDiv.innerHTML = formulaHtml;
    
    resultContainer.style.display = 'block'; // Mostrar el contenedor del resultado
}
