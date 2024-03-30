function calculateEOQ() {
    var demand = parseFloat(document.getElementById("demand").value);
    var orderCost = parseFloat(document.getElementById("orderCost").value);
    var holdingCost = parseFloat(document.getElementById("holdingCost").value);

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
    document.getElementById("result").innerHTML = "<h2>Resultado</h2><p>El resultado de EOQ es de: " + eoq + " unidades</p>";
    document.getElementById("result").style.display = 'block'; // Mostrar el contenedor del resultado
}