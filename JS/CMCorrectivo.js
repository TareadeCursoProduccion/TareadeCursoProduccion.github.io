function toggleMTBFInput() {
    var mtbfOption = document.getElementById("mtbfOption").value;
    var mtbfValueDiv = document.getElementById("mtbfValueDiv");
    var mtbfPercentageDiv = document.getElementById("mtbfPercentageDiv");
    var mtbfInput = document.getElementById("mtbf");

    if (mtbfOption === "percentage") {
        mtbfValueDiv.style.display = "none";
        mtbfPercentageDiv.style.display = "block";
        mtbfInput.removeAttribute("required");
    } else {
        mtbfValueDiv.style.display = "block";
        mtbfPercentageDiv.style.display = "none";
        mtbfInput.setAttribute("required", "required");
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
    
    // Mostrar la fórmula
    var formulaDiv = document.getElementById('formula');
    let formulaHtml = `
      <h3>Fórmulas Utilizadas</h3>
      <p>Número de Fallas = H / MTBF</p>
      <p>Costo de Mantenimiento Correctivo = Número de Fallas * ((Duración de las Tareas * Costo por Hora + Repuestos + Costos de Tareas Operacionales + Retraso Logístico) + (Duración de las Tareas * Costo Unitario por Parada + Costo de Fallas de Vez Única))</p>
      <h3>Valores Utilizados</h3>
      <p>H = ${hora} horas</p>
      <p>MTBF = ${mtbf} horas</p>
      <p class="formula">Número de Fallas = ${hora} / ${mtbf}</p>
      <p>Número de Fallas = ${numeroFallas}</p>
      <p class="formula">Costo de Mantenimiento Correctivo = ${numeroFallas} * ((${duracionTareas} * ${costoHora} + ${repuestos} + ${costoTareasOperacionales} + ${retrasoLogistico}) + (${duracionTareas} * ${costoParada} + ${costoFallaUnica}))</p>
      <p>Costo de Mantenimiento Correctivo = $${costoMantenimientoCorrectivo.toFixed(2)}</p>
    `;
    formulaDiv.innerHTML = formulaHtml;
    
    resultContainer.style.display = 'block'; // Mostrar el contenedor del resultado
});