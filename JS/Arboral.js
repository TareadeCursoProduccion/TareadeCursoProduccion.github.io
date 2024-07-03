import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

const productForm = document.getElementById('product-form');
const componentForm = document.getElementById('component-form');
const parentFields = document.getElementById('parent-fields');
const diagramDiv = document.getElementById('diagram');
const addParentButton = document.getElementById('add-parent');
const componentOption = document.getElementById('component-option');
const newComponentGroup = document.getElementById('new-component-group');
const existingComponentGroup = document.getElementById('existing-component-group');
const existingComponentSelect = document.getElementById('existing-component-select');
const componentNameInput = document.getElementById('component-name');

let products = [];
let components = [];
let mermaidCode = '';

productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const productName = document.getElementById('product-name').value;
    if (productName) {
        products.push(productName);
        document.getElementById('product-name').value = '';  // Limpiar el campo
        updateParentSelect();
        updateExistingComponentSelect();
        updateMermaidCode();
        renderMermaidDiagram();
       
    }
    document.getElementById('productoPrincipalLabel').style.display = 'none';
    document.getElementById('product-name').style.display = 'none';
    document.getElementById('addProductoButton').style.display = 'none';
    document.getElementById('productNLabel').style.display = 'none';
    document.getElementById('component-sections').style.display = 'block';
  
});

componentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedOption = componentOption.value;
    const componentName = componentNameInput.value;
    const selectedComponent = existingComponentSelect.value;
    let parents = [];
    for (let i = 0; i < parentFields.childElementCount; i++) {
        const parentName = document.getElementById(`parent-select-${i}`).value;
        const units = parseInt(document.getElementById(`units-${i}`).value, 10);
        if (parentName && units) {
            parents.push({ parent: parentName, units });
        }
    }
    document.getElementById('resultSecction').style.display = 'block';
    document.getElementById('calcularResultadoSection').style.display = 'block';
    document.getElementById('downloadSection').style.display = 'block';
    if (selectedOption === 'new' && componentName && parents.length) {
        // Verificar si el componente ya existe
        const existingComponent = components.find(c => c.name === componentName);
        if (existingComponent) {
            alert(`El componente '${componentName}' ya existe.`);
        } else {
            components.push({ name: componentName, parents });
            document.getElementById('component-name').value = '';  // Limpiar el campo
            updateParentSelect();
            updateExistingComponentSelect();
            updateMermaidCode();
            renderMermaidDiagram();
        }
    } else if (selectedOption === 'existing' && selectedComponent && parents.length) {
        const existingComponent = components.find(c => c.name === selectedComponent);
        if (existingComponent) {
            let isNewRelation = true;
            parents.forEach(newParent => {
                const existingParentRelation = existingComponent.parents.find(p => p.parent === newParent.parent);
                if (existingParentRelation) {
                    alert(`La relación con el padre '${newParent.parent}' ya existe para el componente '${selectedComponent}'. No se puede agregar nuevamente.`);
                    isNewRelation = false;
                }
            });
            if (isNewRelation) {
                parents.forEach(newParent => {
                    existingComponent.parents.push(newParent);
                });
                updateParentSelect();
                updateExistingComponentSelect();
                updateMermaidCode();
                renderMermaidDiagram();
            }
        }
    }
});

addParentButton.addEventListener('click', () => {
    const parentFieldIndex = parentFields.childElementCount;
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
    formGroup.innerHTML = `
        <label for="parent-select-${parentFieldIndex}">Seleccionar Producto o Componente Principal:</label>
        <select id="parent-select-${parentFieldIndex}" required></select>
        <label for="units-${parentFieldIndex}">Unidades:</label>
        <input type="number" id="units-${parentFieldIndex}" required>
    `;
    parentFields.appendChild(formGroup);
    updateParentSelect();
});

componentOption.addEventListener('change', () => {
    if (componentOption.value === 'new') {
        newComponentGroup.style.display = 'flex';
        existingComponentGroup.style.display = 'none';
        componentNameInput.required = true;
        existingComponentSelect.required = false;
    } else {
        newComponentGroup.style.display = 'none';
        existingComponentGroup.style.display = 'flex';
        componentNameInput.required = false;
        existingComponentSelect.required = true;
    }
});

function updateParentSelect() {
    const selectElements = parentFields.querySelectorAll('select');
    selectElements.forEach(select => {
        const selectedValue = select.value;
        select.innerHTML = '';
        products.concat(components.map(c => c.name)).forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
        select.value = selectedValue;
    });
}

function updateExistingComponentSelect() {
    const selectedValue = existingComponentSelect.value;
    existingComponentSelect.innerHTML = '';
    components.forEach(component => {
        const option = document.createElement('option');
        option.value = component.name;
        option.textContent = component.name;
        existingComponentSelect.appendChild(option);
    });
    existingComponentSelect.value = selectedValue;
}

function updateMermaidCode() {
    mermaidCode = 'graph TD\n';
    components.forEach(component => {
        let componentLabel = component.name;
        component.parents.forEach(parent => {
            componentLabel += `(${parent.units})`;
            mermaidCode += `${parent.parent} --> ${component.name}["${componentLabel}"]\n`;
        });
    });
}

function renderMermaidDiagram() {
    diagramDiv.innerHTML = `<div class="mermaid">${mermaidCode}</div>`;
    mermaid.contentLoaded();
}

function findElementByName(name) {
    return components.find(item => item.name === name);
}

// export function calcularResultadoTodos(multiplier) {
//     const results = components.map(component => {
//         const result = calcularResultado(component.name);
//         return { name: component.name, result: result * multiplier };
//     });

//     let resultsText = '';
//     results.forEach(result => {
//         resultsText += `Resultado para '${result.name}': ${result.result}\n`;
//     });

//     document.getElementById('resultsas').innerText = resultsText;
//     return results;
// }

export function calcularResultadoTodos(multiplier) {
    const results = components.map(component => {
        const result = calcularResultado(component.name);
        return { name: component.name, result: result * multiplier };
    });

    let totalSum = 0;
    let resultsText = '';
    results.forEach(result => {
        totalSum += result.result;
        resultsText += `Resultado para '${result.name}': ${result.result}\n`;
    });

    const average = totalSum / results.length;
    resultsText += `\nPromedio de los resultados: ${average.toFixed(2)}`;

    const resultsDiv = document.getElementById('resultsas');
    if (resultsDiv) {
        resultsDiv.innerText = resultsText;
    } else {
        console.error("Elemento con id 'resultsas' no encontrado");
    }

    return results;
}

function calcularResultado(name) {
    const element = findElementByName(name);

    if (!element) {
        console.error(`Elemento con nombre ${name} no encontrado`);
        return 0;
    }

    let result = 1;

    element.parents.forEach(parent => {
        result *= parent.units;

        const parentElement = findElementByName(parent.parent);
        if (parentElement) {
            result *= calcularResultado(parent.parent);
        }
    });

    return result;
}

updateMermaidCode();
renderMermaidDiagram();
