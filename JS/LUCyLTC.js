function generarTabla() {

    var costoS = parseFloat(document.getElementById("costoS").value);
    var costoM = parseFloat(document.getElementById("costoM").value);
    var tiempoEntrega = parseInt(document.getElementById("tiempoEntrega").value);
    var semanas2 = parseInt(document.getElementById("semanas").value);

    var costoS_min = parseFloat(document.getElementById("costoS").getAttribute("min"));
    var costoM_min = parseFloat(document.getElementById("costoM").getAttribute("min"));
    var tiempoEntrega_min = parseInt(document.getElementById("tiempoEntrega").getAttribute("min"));
    var semanas_min = parseInt(document.getElementById("semanas").getAttribute("min"));
    var semanas_max = parseInt(document.getElementById("semanas").getAttribute("max"));
    if (costoS < costoS_min || costoM < costoM_min || tiempoEntrega < tiempoEntrega_min || semanas2 < semanas_min  || semanas2 > semanas_max) {
        alert("Los valores no pueden ser menores que los mínimos especificados.");
        return;
    }
    let semanas = parseInt(document.getElementById('semanas').value);
    let tablaEntrada = document.getElementById('tablaEntrada');

    if (isNaN(semanas) || semanas <= 0) {
        alert('Por favor, ingrese un número válido de semanas.');
        return;
    }

    let html = '<table border="1"><tr>';
    for (let i = 1; i <= semanas; i++) {
        html += `<th style = "width: 100px">Semana ${i}</th>`;
    }
    html += '</tr><tr>';
    for (let i = 1; i <= semanas; i++) {
        html += `<td><input style = "width: 100px" type="number" id="semana${i}" required min="1"></td>`;
    }
    html += '</tr></table>';
    html += '<div class="center"><button type="button" style="width: 100px;" onclick="calcular()">Calcular</button></div>';

    tablaEntrada.innerHTML = html;
    tablaEntrada.style.display = 'block'; // Mostrar la tabla cuando se genera
}
function calcular() {
    let S = parseFloat(document.getElementById('costoS').value);
    let K = parseFloat(document.getElementById('costoM').value);
    let LT = parseFloat(document.getElementById('tiempoEntrega').value);
    let semanas = parseInt(document.getElementById('semanas').value);

    let valoresPorSemana = [];
    let camposCompletos = true;
    let valoresInvalidos = false;

    for (let i = 1; i <= semanas; i++) {
        let valor = parseFloat(document.getElementById(`semana${i}`).value);
        
        // Validar que el valor sea mayor que 0
        if (valor <= 0 || isNaN(valor)) {
            valoresInvalidos = true;
            break;
        }

        valoresPorSemana.push(valor);
    }

    if (valoresInvalidos) {
        alert("¡Los valores deben ser mayores que 0! Por favor, verifica los campos e inténtalo de nuevo.");
    } else if (camposCompletos) {
        let LUCs = calcularLUC(S, K, LT, valoresPorSemana);
        let LTCs = calcularLTC(S, K, valoresPorSemana);

        mostrarResultados(LUCs, LTCs);
    } else {
        alert("¡Tienes campos vacíos! Por favor, completa todos los campos e inténtalo de nuevo.");
    }
}


function calcularLUC(S, K, LT, Values) {
    let LUCs = [];
    let units = 0;
    let totalCost = S;
    let period = 0;

    for (let i = 0; i < Values.length; i++) {
        units += Values[i];
        let k = period === 0 ? 0 : Values[i] * (period) * K;
        totalCost = period === 0 ? S : totalCost + k;
        period++;
        let entry = {
            PeriodString: `${period}`,
            UnitString: `${Values[i]}`,
            Units: units,
            S: S,
            K: K,
            TotalCost: totalCost,
            UnitCost: totalCost / units
        };
        if ((i + 1) % 5 === 0 || (i + 1) === Values.length) {
            k = 0;
            entry.Delete = true;
            period = 0;
            units = 0;

        }
        LUCs.push(entry);

    }

    return LUCs;
}

function calcularLTC(S, K, Values) {
    let LTCs = [];
    let period = 0;

    for (let i = 0; i < Values.length; i++) {
        let cm = Values[i] * period * K;

        let ltc = {
            Period: period + 1,
            Units: Values[i],
            MaintainedPeriod: period,
            MaintenanceCost: cm,
            CumulativeMaintenanceCost: LTCs.length == 0 ? 0 : LTCs[i - 1].Delete == true ? 0 : Number((LTCs[i - 1].CumulativeMaintenanceCost + cm).toFixed(3)),
            Delete: false,
            PlannedReception: 0
        };
        period++;
        if (ltc.CumulativeMaintenanceCost > S) {
            period = 0;
            ltc.Delete = true;
        }
        
        console.log(ltc.Delete);
        LTCs.push(ltc);
    }

    return LTCs;
}

function agregarRequerimiento() {
    let semana = document.getElementById('tablaRequerimientos').rows.length;
    
    let newRow = document.getElementById('tablaRequerimientos').insertRow(-1);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);

    cell1.innerHTML = semana;
    cell2.innerHTML = `<input type="number" id="reqSemana${semana}" min="0" step="any">`;
}


function mostrarResultados(LUCs, LTCs) {
    let resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';
      resultadosDiv.style.display ='block';
      // Mostrar tabla de LTC
      let ltcTable = '<h2 align="center">Método LTC</h2><table border="1"><tr><th>Período</th><th>Unidades</th><th>Periodos Mantenidos</th><th>Costo de Mantenimiento</th><th>Costo de Mantenimiento Acumulado</th></tr>';
      LTCs.forEach(ltc => {
            ltcTable += `<tr style="background-color: ${ltc.Delete ? 'red' : '#f2f2f2'};"><td>${ltc.Period}</td><td>${ltc.Units}</td><td>${ltc.MaintainedPeriod}</td><td>${ltc.MaintenanceCost.toFixed(2)}</td><td>${ltc.CumulativeMaintenanceCost.toFixed(2)}</td></tr>`;
        });
        ltcTable += '</table>';

      let lucTable = '<h2 align="center">Método LUC</h2><table border="1" style = "border-radius:20px"><tr><th>Período</th><th>Unidades</th><th>S</th><th>K</th><th>Costo Total</th><th>Costo Unitario</th></tr>';

      let accumulatedUnits = ''; // Variable para acumular UnitString
      let accumulatedPeriods = ''; // Variable para acumular PeriodString
      let acumK = '';
      let counter = 0;
      let acumUnitsCount = 0;
      LUCs.forEach((luc, index) => {
          // Reiniciar acumulaciones si PeriodString es 1
          if (parseInt(luc.PeriodString) === 1) {
            
              accumulatedUnits = luc.UnitString;
              accumulatedPeriods = luc.PeriodString;
              acumK = 0;
              acumUnitsCount = 0;
              counter = 0;
          } else {
               //acumK = acumK + luc.K;
               counter = counter + 1;
              acumUnitsCount = acumUnitsCount + parseInt(luc.UnitString);
              acumK = (parseInt(luc.UnitString)*counter) * luc.K; 
              accumulatedUnits += `+${luc.UnitString}`;
              accumulatedPeriods += `+${luc.PeriodString}`;
          }
      
          // Construir la fila de la tabla
          lucTable += `<tr style="background-color: ${luc.Delete ? 'red' : '#f2f2f2'};"><td>${accumulatedPeriods}</td><td>${accumulatedUnits}</td><td>${luc.S.toFixed(2)}</td> <td>${acumK}</td> <td>${luc.TotalCost.toFixed(2)}</td><td>${luc.UnitCost.toFixed(4)}</td></tr>`;
      });
      
      lucTable += '</table>';
      
      

  

    resultadosDiv.innerHTML = ltcTable + lucTable;
}
