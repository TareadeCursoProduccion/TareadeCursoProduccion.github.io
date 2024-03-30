function toggleMTBFInput() {
    var mtbfOption = document.getElementById("mtbfOption").value;
    var mtbfValueDiv = document.getElementById("mtbfValueDiv");
    var mtbfPercentageDiv = document.getElementById("mtbfPercentageDiv");

    if (mtbfOption === "percentage") {
        mtbfValueDiv.style.display = "none";
        mtbfPercentageDiv.style.display = "block";
    } else {
        mtbfValueDiv.style.display = "block";
        mtbfPercentageDiv.style.display = "none";
    }
}

document.getElementById('maintenanceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    let hora = parseFloat(document.getElementById('hora').value);
    let mtbfOption = document.getElementById('mtbfOption').value;
    let mtbf = 0;

    if (mtbfOption === 'value') {
        mtbf = parseFloat(document.getElementById('mtbf').value);
    } else {
        var mtbfPercentageValue = parseFloat(document.getElementById('mtbfPercentageValue').value);
        mtbf = (mtbfPercentageValue / 100) * hora;
    }

    let duracionTareas = parseFloat(document.getElementById('duracionTareas').value);
    let costoHora = parseFloat(document.getElementById('costoHora').value);
    let repuestos = parseFloat(document.getElementById('repuestos').value);
    let costoTareasOperacionales = parseFloat(document.getElementById('costoTareasOperacionales').value);
    let retrasoLogistico = parseFloat(document.getElementById('retrasoLogistico').value);
    let costoParada = parseFloat(document.getElementById('CostoParada').value);
    let costoFallaUnica = parseFloat(document.getElementById('CostoFallaUnica').value);
    
    // Calcular el mantenimiento correctivo
    let numeroFallas = Math.floor(hora / mtbf); // Redondear hacia abajo
    let costoMantenimientoCorrectivo = numeroFallas * (
        (duracionTareas * costoHora + repuestos + costoTareasOperacionales + retrasoLogistico) + 
        (duracionTareas * costoParada + costoFallaUnica)
    );
    
    // Mostrar el resultado
    var resultContainer = document.getElementById('resultContainer');
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "<h2>Numero de Fallas: " + numeroFallas + "</h2>";
    resultDiv.innerHTML += "<h2>Costo de Mantenimiento Correctivo: $" + costoMantenimientoCorrectivo.toFixed(2) + "</h2>";
    resultContainer.style.display = 'block'; // Mostrar el contenedor del resultado
});