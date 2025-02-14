// FUNCIONES
function obtenerFecha(diasSumar = 0) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + diasSumar);
    
    const opciones = { month: 'short', day: 'numeric' };
    let fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

    // Eliminar el punto después del mes (ejemplo: "feb.")
    fechaFormateada = fechaFormateada.replace('.', '');

    return fechaFormateada;
}

function actualDate() {
    const elemento = document.getElementById('date');
    if (elemento) elemento.textContent = obtenerFecha();
}

function tomorrowDate() {
    const elemento = document.getElementById('datetom');
    if (elemento) elemento.textContent = obtenerFecha(1);
}

// Ejecutar funciones al cargar la página
actualDate();
tomorrowDate()

document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("1");

    menuButton.addEventListener("click", () => {
        let existingMenu = document.getElementById("menu-aside");
        let overlay = document.getElementById("menu-overlay");

        if (!existingMenu) {
            // Crear overlay
            overlay = document.createElement("div");
            overlay.id = "menu-overlay";
            document.body.appendChild(overlay);

            // Crear menú
            const aside = document.createElement("aside");
            aside.id = "menu-aside";
            aside.innerHTML = `
                <div class="menu-content">
                    <div class="top">
                        <button id="close-menu">
                            <img class="flecha" src="/assets/flecha.png">
                        </button>
                    </div>
                    <div class="mid">
                        <a class="links" href="/pages/inbox.html">
                            <div>
                                <img class="icons" src="/assets/bandeja-de-entrada.png">
                                <span>Inbox</span> 
                            </div>
                        </a>
                        <a class="links" href="/index.html">
                            <div>
                                <img class="icons" src="/assets/estrella.png">
                                <span>Today</span> 
                            </div>
                        </a>
                        <a class="links" href="/pages/tomorr.html">
                            <div>
                                <img class="icons" src="/assets/calendario.png">
                                <span>Tomorrow</span> 
                            </div>
                        </a>
                        <a class="links" href="/pages/anytm.html">
                            <div>
                                <img class="icons" src="/assets/lista-de-quehaceres.png">
                                <span>Anytime</span> 
                            </div>
                        </a>
                    </div>
                    <hr/>
                    <div class="bot">
                        <h2 class="h2proj">Projects</h2>
                    </div>                    
                </div>
            `;

            document.body.appendChild(aside);

            // Pequeño retraso para aplicar la animación
            setTimeout(() => {
                document.body.classList.add("menu-visible");
            }, 10);
        }

        // Evento para cerrar el menú
        document.getElementById("close-menu").addEventListener("click", closeMenu);
        overlay.addEventListener("click", closeMenu);
    });

    function closeMenu() {
        document.body.classList.remove("menu-visible");
        setTimeout(() => {
            document.getElementById("menu-aside")?.remove();
            document.getElementById("menu-overlay")?.remove();
        }, 500);
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const addbtn = document.getElementById("addbtn");

    addbtn.addEventListener("click", () => {
        let taskproject = document.getElementById("divtj");

        if (taskproject) {
            // Si ya existe, aplicamos animación inversa y eliminamos después de la animación
            taskproject.classList.remove("show");
            taskproject.classList.add("hide");
            setTimeout(() => taskproject.remove(), 300); // Coincide con la duración de la animación
        } else {
            const div = document.createElement("div");
            div.id = "divtj";
            div.classList.add("menu-hidden"); // Oculto al inicio
            div.innerHTML = `
                <div class="card">
                    <ul class="list">
                        <li class="element">
                            <button id="crtpr">
                                <img class="taskprojico" src="/assets/cheque.png">
                                <p class="label">Create a task</p>
                            </button>
                        </li>
                        <li class="element">
                            <button id="crttsk">
                                <img class="taskprojico" src="/assets/gestion-de-proyectos.png">
                                <p class="label">Create a project</p>                     
                            </button>
                        </li>
                    </ul>
                </div>
            `;

            document.body.appendChild(div);

            // Opción 1: Aparece desde el botón inmediatamente
            setTimeout(() => {
                div.classList.add("show");
            }, 10); // Delay para que el navegador detecte la animación
        }
    });
});


