
//var cppOption = document.getElementById('cppOption').value;
var OptionFinal = 'cppFijoDiv';
function toggleMTBFInput() {
    var cppOption = document.getElementById('cppOption').value;
    var cppFijoDiv = document.getElementById('cppFijoDiv');
    var cppPromedioDiv = document.getElementById('cppPromedioDiv');
    OptionFinal = cppOption;
    
    if (cppOption === 'cppFijoDiv') {
        cppFijoDiv.style.display = 'block';
        cppPromedioDiv.style.display = 'none';
    } else {
        cppFijoDiv.style.display = 'none';
        cppPromedioDiv.style.display = 'block';
    }
}


document.getElementById('maintenanceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    let demandaAnual = parseFloat(document.getElementById('demandaAnual').value);
    let cantidadPerdida = parseFloat(document.getElementById('cantidadPerdida').value);
    let inventarioSeguridadFijo = parseFloat(document.getElementById('inventarioSeguridadFijo').value);

    // if (mtbfOption === 'value') {
    //     mtbf = parseFloat(document.getElementById('mtbf').value);
    // } else {
    //     var mtbfPercentageValue = parseFloat(document.getElementById('mtbfPercentageValue').value);
    //     mtbf = (mtbfPercentageValue / 100) * hora;
    // }

    let demandaSemanal = parseFloat(document.getElementById('demandaSemanal').value);
    let cicloRevision = parseFloat(document.getElementById('cicloRevision').value);
    let inventarioSeguridadPromedio = parseFloat(document.getElementById('inventarioSeguridadPromedio').value);
    
    // Calcular el Control de inventario y cadena de suministros
    
    let costoBienesVendidos;
    let valorPromedioInventario;
    let rotacionInventario;
    if(OptionFinal === 'cppFijoDiv'){
        valorPromedioInventario=cantidadPerdida/2+inventarioSeguridadFijo;
        costoBienesVendidos = demandaAnual;
        rotacionInventario = costoBienesVendidos/valorPromedioInventario;

        // Mostrar el resultado
    document.getElementById('result').innerHTML = "<h2>valor Promedio del Inventario: " + valorPromedioInventario.toFixed(2) + "</h2>";
    document.getElementById('result').innerHTML += "<h2>costo de Bienes Vendidos: " + costoBienesVendidos.toFixed(2) + "</h2>";
    
    document.getElementById('result').innerHTML += "<h2>Rotacion de Inventario: " + rotacionInventario.toFixed(2) + " Piezas</h2>";
    }else{
        valorPromedioInventario=(demandaSemanal)*(cicloRevision)/2+inventarioSeguridadPromedio;
        costoBienesVendidos = demandaSemanal*52;
        rotacionInventario = costoBienesVendidos/valorPromedioInventario;

        // Mostrar el resultado
    document.getElementById('result').innerHTML = "<h2>valor Promedio del Inventario: " + valorPromedioInventario.toFixed(2) + "</h2>";
    document.getElementById('result').innerHTML += "<h2>costo de Bienes Vendidos: " + costoBienesVendidos.toFixed(2) + "</h2>";
    
    document.getElementById('result').innerHTML += "<h2>Rotacion de Inventario: " + rotacionInventario.toFixed(2) + " Piezas</h2>";
    }
    
    // Mostrar el resultado
    // document.getElementById('result').innerHTML = "<h2>valor Promedio del Inventario: " + valorPromedioInventario.toFixed(2) + "</h2>";
    // document.getElementById('result').innerHTML += "<h2>costo de Bienes Vendidos: " + costoBienesVendidos.toFixed(2) + "</h2>";
    
    // document.getElementById('result').innerHTML += "<h2>Rotacion de Inventario: $" + CostoMantenimientoCorrectivo.toFixed(2) + "</h2>";
});