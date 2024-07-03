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
    
  
    if(!isNaN(valorPromedioInventario))
    {
              
     var square = document.getElementById('square');
    square.innerHTML = "<p>Valor Promedio del Inventario: " + Math.round(valorPromedioInventario) + "</p>";
    square.innerHTML += "<p>Costo de Bienes Vendidos: " + Math.round(costoBienesVendidos) + "</p>";
    square.innerHTML += "<p>Rotación de Inventario: " + Math.round(rotacionInventario) + " Piezas</p>";

        square.style.display = 'block'; 
    }
    else
    {
  
    }
    
});