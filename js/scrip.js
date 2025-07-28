// Recuperar turnos del localStorage o inicializar array
let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

const form = document.getElementById("formTurno");
const listaTurnos = document.getElementById("listaTurnos");

class Turno {
    constructor(nombre, fecha, hora) {
        this.nombre = nombre;
        this.fecha = fecha;
        this.hora = hora;
        this.id = Date.now(); // ID único
    }
}

// Mostrar los turnos en el DOM
function mostrarTurnos() {
    listaTurnos.innerHTML = "";

    if (turnos.length === 0) {
        listaTurnos.innerHTML = "<p>No hay turnos asignados.</p>";
        return;
    }

    turnos.forEach(turno => {
        const div = document.createElement("div");
        div.className = "turno";
        div.innerHTML = `
      <strong>Nombre:</strong> ${turno.nombre}<br>
      <strong>Fecha:</strong> ${turno.fecha}<br>
      <strong>Hora:</strong> ${turno.hora}<br>
      <button class="eliminar" onclick="eliminarTurno(${turno.id})">Eliminar</button>
    `;
        listaTurnos.appendChild(div);
    });

    localStorage.setItem("turnos", JSON.stringify(turnos));
}

// Eliminar turno
function eliminarTurno(id) {
    turnos = turnos.filter(t => t.id !== id);
    mostrarTurnos();
}

// Evento de formulario
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    if (!nombre || !fecha || !hora) return;

    const nuevoTurno = new Turno(nombre, fecha, hora);
    turnos.push(nuevoTurno);
    mostrarTurnos();
    form.reset();
});

// Inicializar
mostrarTurnos();
