function toggleMTBFInput() {
    var cppOption = document.getElementById('cppOption').value;
    var cppFijoDiv = document.getElementById('cppFijoDiv');
    var cppPromedioDiv = document.getElementById('cppPromedioDiv');

    if (cppOption === 'cppFijoDiv') {
        cppFijoDiv.style.display = 'block';
        cppPromedioDiv.style.display = 'none';
        square.style.display = 'none'; 
    } else {
        cppFijoDiv.style.display = 'none';
        cppPromedioDiv.style.display = 'block';
        square.style.display = 'none'; 
    }
}

document.getElementById('maintenanceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    let demandaAnual = parseFloat(document.getElementById('demandaAnual').value);
    let cantidadPerdida = parseFloat(document.getElementById('cantidadPerdida').value);
    let inventarioSeguridadFijo = parseFloat(document.getElementById('inventarioSeguridadFijo').value);
    let demandaSemanal = parseFloat(document.getElementById('demandaSemanal').value);
    let cicloRevision = parseFloat(document.getElementById('cicloRevision').value);
    let inventarioSeguridadPromedio = parseFloat(document.getElementById('inventarioSeguridadPromedio').value);
    
    let costoBienesVendidos;
    let valorPromedioInventario;
    let rotacionInventario;

    var cppOption = document.getElementById('cppOption').value; 

    if (cppOption === 'cppFijoDiv') {
        valorPromedioInventario = cantidadPerdida / 2 + inventarioSeguridadFijo;
        costoBienesVendidos = demandaAnual;
        rotacionInventario = costoBienesVendidos / valorPromedioInventario;
    } else {
        valorPromedioInventario = (demandaSemanal * cicloRevision) / 2 + inventarioSeguridadPromedio;
        costoBienesVendidos = demandaSemanal * 52;
        rotacionInventario = costoBienesVendidos / valorPromedioInventario;
    }
    
    if (!isNaN(valorPromedioInventario)) {
        var square = document.getElementById('square');
        square.innerHTML = "<h2>Resultado</h2>";
        square.innerHTML += "<p>Valor Promedio del Inventario: " + Math.round(valorPromedioInventario) + "</p>";
        square.innerHTML += "<p>Costo de Bienes Vendidos: " + Math.round(costoBienesVendidos) + "</p>";
        square.innerHTML += "<p>Rotación de Inventario: " + Math.round(rotacionInventario) + " Piezas</p>";

        // Mostrar la fórmula utilizada
        let formulaHtml = `<h3>Fórmulas Utilizadas</h3>`;
        if (cppOption === 'cppFijoDiv') {
            formulaHtml += `<p>Valor Promedio del Inventario = (Q / 2) + SS</p>`;
            formulaHtml += `<p>Costo de Bienes Vendidos = Demanda Anual</p>`;
            formulaHtml += `<p>Rotación de Inventario = Costo de Bienes Vendidos / Valor Promedio del Inventario</p>`;
        } else {
            formulaHtml += `<p>Valor Promedio del Inventario = (d * T / 2) + SS</p>`;
            formulaHtml += `<p>Costo de Bienes Vendidos = Demanda Semanal * 52</p>`;
            formulaHtml += `<p>Rotación de Inventario = Costo de Bienes Vendidos / Valor Promedio del Inventario</p>`;
        }

        formulaHtml += `<h3>Valores Utilizados</h3>`;
        if (cppOption === 'cppFijoDiv') {
            formulaHtml += `<p>Demanda Anual (D): ${demandaAnual}</p>`;
            formulaHtml += `<p>Cantidad Perdida (Q): ${cantidadPerdida}</p>`;
            formulaHtml += `<p>Inventario de Seguridad (SS): ${inventarioSeguridadFijo}</p>`;
        } else {
            formulaHtml += `<p>Demanda Semanal (d): ${demandaSemanal}</p>`;
            formulaHtml += `<p>Ciclo de Revisión (T): ${cicloRevision}</p>`;
            formulaHtml += `<p>Inventario de Seguridad (SS): ${inventarioSeguridadPromedio}</p>`;
        }

        square.innerHTML += formulaHtml;
        square.style.display = 'block';
    }
});
