import {tareas} from './data.js';

const tableBody = document.getElementById("table-body")
const inputValue = document.getElementById("input-value")
const submitButton = document.getElementById("agregar-button")
const tareasTotales = document.getElementById("tareas-totales")
const tareasRealizadas = document.getElementById("tareas-realizadas")
let checkAll
let deleteButton
let contador = 0

const recuentoRealizadas = () => {
    contador = 0
    tareas.forEach((tarea) => {
        if (tarea.realizado) {
            contador ++
        }
    })
}

const listeningTable = () => {
    console.log(tareas);
    let tableRows = ''
    
    tareas.forEach((tarea, idx) => {
        tableRows += `
            <tr>
                <th scope="row">${tarea.id}</th>
                <td>${tarea.nombre}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <input class="form-check-input" type="checkbox" ${tarea.realizado ? "checked" : ""}>
                        <span class="ms-3" id=checkboxtext-${idx}>${tarea.realizado ? "realizado" : "pendiente"}</span>
                    </div>
                </td>
                <td>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn-close" aria-label="Close"></button>
                    </div>
                </td>
            </tr>
        `
    })

    tableBody.innerHTML = tableRows
    
    checkAll = document.querySelectorAll(".form-check-input")
    deleteButton = document.querySelectorAll(".btn-close")

    checkAll.forEach ((box, idx) =>
        box.addEventListener("click", () => {
        if (box.checked) {
            tareas[idx].realizado = true
            listeningTable()
 
        } else {
            tareas[idx].realizado = false
            listeningTable()
            
        }
        })
    )

    deleteButton.forEach((button, idx) => 
        button.addEventListener("click", () => {
            tareas.splice(idx,1)
            listeningTable()
        })
    )



    recuentoRealizadas()
    tareasTotales.innerHTML = tareas.length
    tareasRealizadas.innerHTML = contador
}


listeningTable()


submitButton.addEventListener("click", () => {
    tareas.push(
        {
            id: tareas.length + 1,
            nombre: inputValue.value,
            realizado: false,
        }
    )
    listeningTable()
    inputValue.value = ''
})

