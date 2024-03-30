// function enableMTBF() {
//     var mtbfValueInput = document.getElementById('mtbf');
//     var mtbfPercentageValueInput = document.getElementById('mtbfPercentageValue');
    
//     if (document.getElementById('mtbfValue').checked) {
//         mtbfValueInput.disabled = false;
//         mtbfPercentageValueInput.disabled = true;
//         mtbfPercentageValueInput.value = "";
//     } else {
//         mtbfValueInput.disabled = true;
//         mtbfValueInput.value = "";
//         mtbfPercentageValueInput.disabled = false;
//     }
// }
function toggleMTBFInput() {
    var mtbfOption = document.getElementById('mtbfOption').value;
    var mtbfValueDiv = document.getElementById('mtbfValueDiv');
    var mtbfPercentageDiv = document.getElementById('mtbfPercentageDiv');
    
    if (mtbfOption === 'value') {
        mtbfValueDiv.style.display = 'block';
        mtbfPercentageDiv.style.display = 'none';
    } else {
        mtbfValueDiv.style.display = 'none';
        mtbfPercentageDiv.style.display = 'block';
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
        mtbf = (mtbfPercentageValue / 100) * hora; // Corrección aquí, debe ser "hora" en lugar de "hours"
    }

    let duracionTareas = parseFloat(document.getElementById('duracionTareas').value);
    let costoHora = parseFloat(document.getElementById('costoHora').value); // Corrección aquí, debe ser "costoHora" en lugar de "CostoHora"
    let repuestos = parseFloat(document.getElementById('repuestos').value);
    let costoTareasOperacionales = parseFloat(document.getElementById('costoTareasOperacionales').value);
    let retrasoLogistico = parseFloat(document.getElementById('retrasoLogistico').value);
    let costoParada = parseFloat(document.getElementById('CostoParada').value); // Corrección aquí, debe ser "costoParada" en lugar de "CostoParada"
    let costoFallaUnica = parseFloat(document.getElementById('CostoFallaUnica').value);
    
    // Calcular el mantenimiento correctivo
    let numeroFallas = hora / mtbf; // Corrección aquí, "NumeroFallas" debería estar en minúsculas
    let costoMantenimientoCorrectivo = Math.round(numeroFallas) * (
        (duracionTareas * costoHora + repuestos + costoTareasOperacionales + retrasoLogistico) + 
        (duracionTareas * costoParada + costoFallaUnica)
    );
    
    // Mostrar el resultado
    document.getElementById('result').innerHTML = "<h2>Numero de Fallas: " + numeroFallas.toFixed(2) + "</h2>"; // Corrección aquí, "NumeroFallas" debería estar en minúsculas
    document.getElementById('result').innerHTML += "<h2>Costo de Mantenimiento Correctivo: $" + costoMantenimientoCorrectivo.toFixed(2) + "</h2>";
});