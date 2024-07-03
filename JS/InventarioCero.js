class ZEROINVENTORY {
  constructor(DiasLaborados, Demanda, UnidadesOperario, OperariosRequeridos, OperariosActuales, OperariosContratados, OperariosDespedidos, OperariosUtilizados, UnidadesProducidas, CostoPorContratar, CostoPorDespedir, CostoManoObra) {
    this.DiasLaborados = DiasLaborados;
    this.Demanda = Demanda;
    this.UnidadesOperario = UnidadesOperario;
    this.OperariosRequeridos = OperariosRequeridos;
    this.OperariosActuales = OperariosActuales;
    this.OperariosContratados = OperariosContratados;
    this.OperariosDespedidos = OperariosDespedidos;
    this.OperariosUtilizados = OperariosUtilizados;
    this.UnidadesProducidas = UnidadesProducidas;
    this.CostoPorContratar = CostoPorContratar;
    this.CostoPorDespedir = CostoPorDespedir;
    this.CostoManoObra = CostoManoObra;
    this.CostoTotal = CostoPorContratar + CostoManoObra + CostoPorDespedir;
  }
}

class CALCULATEZI {
  CalculateZI(PPT, CDTH, OAI, CDT, CCT, DL, D) {
    let OU = 0;
    let zeros = [];
    for (let i = 0; i < DL.length; i++) {
      let UO = DL[i] * PPT; // Unidades por operario
      let OR = Math.ceil(D[i] / UO); // Operarios requeridos
      let OA = i == 0 ? Number(OAI) : OU; // Operarios actuales
      let OC = OR > OA ? OR - OA : 0; // Operarios contratados
      let OD = OA > OR ? OA - OR : 0; // Operarios despedidos
      OU = OA + OC - OD; // Operarios utilizados

      zeros.push(new ZEROINVENTORY(DL[i], D[i], UO, OR, OA, OC, OD, OU, D[i], OC * CCT, CDT * OD, DL[i] * OU * CDTH));
    }
    return zeros;
  }

  CalculateTotal(zeros) {
    let total = new ZEROINVENTORY(
      'Total',
      zeros.reduce((acc, curr) => acc + curr.DiasLaborados, 0),
      '',
      zeros.reduce((acc, curr) => acc + curr.OperariosRequeridos, 0),
      zeros.reduce((acc, curr) => acc + curr.OperariosActuales, 0),
      zeros.reduce((acc, curr) => acc + curr.OperariosContratados, 0),
      zeros.reduce((acc, curr) => acc + curr.OperariosDespedidos, 0),
      zeros.reduce((acc, curr) => acc + curr.OperariosUtilizados, 0),
      zeros.reduce((acc, curr) => acc + curr.UnidadesProducidas, 0),
      zeros.reduce((acc, curr) => acc + curr.CostoPorContratar, 0),
      zeros.reduce((acc, curr) => acc + curr.CostoPorDespedir, 0),
      zeros.reduce((acc, curr) => acc + curr.CostoManoObra, 0)
    );
    total.CostoTotal = total.CostoPorContratar + total.CostoManoObra + total.CostoPorDespedir;
    return total;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const initialForm = document.getElementById("initial-form");
  const monthlyForm = document.getElementById("monthly-form");
  const resultDiv = document.getElementById("result");
  const calculateZI = new CALCULATEZI();
  let ZI = {};

  initialForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(initialForm);
    ZI = Object.fromEntries(formData.entries());
    ZI.PPT = Number(ZI.PPT);
    ZI.MESES = Number(ZI.MESES);
    ZI.OAI = Number(ZI.OAI);
    ZI.CDT = Number(ZI.CDT);
    ZI.CCT = Number(ZI.CCT);
    ZI.CDTH = Number(ZI.CDTH);

    let monthlyInputsHtml = '';
    for (let i = 0; i < ZI.MESES; i++) {
      monthlyInputsHtml += `
        <div class="form-group">
          <label for="Labores${i}">Días laborados Mes ${i + 1}</label>
          <input type="number" id="Labores${i}" name="Labores${i}" min="1" required>
        </div>
        <div class="form-group">
          <label for="Demanda${i}">Demanda Mes ${i + 1}</label>
          <input type="number" id="Demanda${i}" name="Demanda${i}" min="1" required>
        </div>
      `;
    }

    document.getElementById("monthly-inputs").innerHTML = monthlyInputsHtml;
    // initialForm.style.display = "none";
    monthlyForm.style.display = "block";
  });

  monthlyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(monthlyForm);
    const DL = [];
    const D = [];

    for (let i = 0; i < ZI.MESES; i++) {
      DL.push(Number(formData.get(`Labores${i}`)));
      D.push(Number(formData.get(`Demanda${i}`)));
    }

    const zeros = calculateZI.CalculateZI(ZI.PPT, ZI.CDTH, ZI.OAI, ZI.CDT, ZI.CCT, DL, D);
    const total = calculateZI.CalculateTotal(zeros);
    displayResult(zeros, total);
  });

  function displayResult(zeros, total) {
    let tableHtml = `
      <table>
        <thead>
          <tr>
            <th></th>
            ${zeros.map((zero, index) => `<th>Mes ${index + 1}</th>`).join('')}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${generateRows(zeros, 'DiasLaborados', 'Días laborales')}
          ${generateRows(zeros, 'Demanda', 'Demanda')}
          ${generateRows(zeros, 'OperariosRequeridos', 'Operarios requeridos')}
          ${generateRows(zeros, 'OperariosActuales', 'Operarios actuales')}
          ${generateRows(zeros, 'OperariosContratados', 'Operarios contratados')}
          ${generateRows(zeros, 'OperariosDespedidos', 'Operarios despedidos')}
          ${generateRows(zeros, 'OperariosUtilizados', 'Operarios utilizados')}
          ${generateRows(zeros, 'UnidadesProducidas', 'Unidades Producidas')}
            <tr><td colspan="2" style="text-align: center; font-weight: bold;">Coste de plan agregado de produccion</td></tr>
          ${generateRows(zeros, 'CostoPorContratar', 'Costo por contratar')}
          ${generateRows(zeros, 'CostoPorDespedir', 'Costo por despedir')}
          ${generateRows(zeros, 'CostoManoObra', 'Costo por mano de obra')}
          ${generateRows(zeros, 'CostoTotal', 'Costo total')}
        </tbody>
      </table>
    `;
    resultDiv.innerHTML = tableHtml;
    resultDiv.style.display = "block";
  }

  function generateRows(zeros, property, label) {
    return `
      <tr>
        <th>${label}</th>
        ${zeros.map(zero => `<td>${zero[property]}</td>`).join('')}
        <td>${zeros.reduce((acc, curr) => acc + curr[property], 0)}</td>
      </tr>
    `;
  }
});
