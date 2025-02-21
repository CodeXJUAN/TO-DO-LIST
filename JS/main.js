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
tomorrowDate();

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
                            <button id="crttsk">
                                <img class="taskprojico" src="/assets/cheque.png">
                                <p class="label">Create a task</p>
                            </button>
                        </li>
                        <li class="element">
                            <button id="crtpr">
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

            // Agregar evento al botón crttsk
            document.getElementById("crttsk").addEventListener("click", () => {
                // Cerrar el menú (divtj) antes de crear el formulario
                if (div) {
                    div.classList.remove("show");
                    div.classList.add("hide");
                    setTimeout(() => div.remove(), 300); // Coincide con la duración de la animación
                }

                let createTaskDiv = document.getElementById("create-crttsk");

                if (!createTaskDiv) {
                    createTaskDiv = document.createElement("div");
                    createTaskDiv.id = "create-crttsk";
                    createTaskDiv.innerHTML = `
                        <div class="top-div">
                            <div>
                                <h2>Create Task</h2>
                            </div>
                            <div>
                                <button id="close-crttsk">
                                    <img class="cruz" src="/assets/cruzado.png">
                                </button>
                            </div>
                        </div>
                        <form id="task-form" action="" method="post">
                            <div class="mid-div">
                                <div class="form__group field">
                                    <input type="input" class="form__field" placeholder="Name" required="" id="task-name">
                                    <label for="name" class="form__label">Name</label>
                                </div>
                                <div class="form__group field">
                                    <select class="form__field" name="cate" id="task-category">
                                        <option value="none">None</option>
                                        <option value="work">Work</option>
                                        <option value="shop">Shopping</option>
                                        <option value="famy">Familiy</option>
                                    </select>
                                    <label for="name" class="form__label">Category</label>
                                </div>
                                <div class="form__group field">
                                    <input type="time" class="form__field" placeholder="Time" required="" id="task-time">
                                    <label for="name" class="form__label">Time</label>
                                </div>
                            </div>
                            <div class="bot-div">
                                <input id="save" type="submit" value="Guardar">
                                <input id="cancel" type="button" value="Cancelar">
                            </div>
                        </form>
                    `;

                    document.body.appendChild(createTaskDiv);

                    // Evento para cerrar el div
                    document.getElementById("close-crttsk").addEventListener("click", () => {
                        createTaskDiv.remove();
                    });

                    // Evento para cancelar
                    document.getElementById("cancel").addEventListener("click", () => {
                        createTaskDiv.remove();
                    });

                    // Manejar el evento submit del formulario de tarea
                    document.getElementById("task-form").addEventListener("submit", (e) => {
                        e.preventDefault();

                        const taskName = document.getElementById("task-name").value;
                        const taskCategory = document.getElementById("task-category").value;
                        const taskTime = document.getElementById("task-time").value;

                        // Crear el div con la información de la tarea
                        const taskDiv = document.createElement("div");
                        taskDiv.className = "task-item";
                        taskDiv.innerHTML = `
                        <div class="task">
                            <h3 class="title-task">${taskName}</h3>
                            <div class="wrapper">
                                <p class="time-task">${taskTime}</p>
                                <p class="category-task">#${taskCategory}</p>
                            </div>
                        </div>
                        <div class="check">
                            <div class="checkbox-wrapper">
                                <input checked="" type="checkbox">
                                <svg viewBox="0 0 35.6 35.6">
                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                </svg>
                            </div>
                            <button class="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 14" class="svgIcon bin-top">
                                    <g clip-path="url(#clip0_35_24)">
                                        <path fill="black" d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z">
                                        </path>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_35_24">
                                        <rect fill="white" height="14" width="69"></rect>
                                    </clipPath>
                                    </defs>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 57" class="svgIcon bin-bottom">
                                    <g clip-path="url(#clip0_35_22)">
                                        <path fill="black" d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z">
                                        </path>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_35_22">
                                        <rect fill="white" height="57" width="69"></rect>
                                    </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                        `;

                        // Añadir el div al segundo div del main
                        const mainDiv = document.querySelector("main > div:nth-child(2)");
                        mainDiv.appendChild(taskDiv);

                        // Cerrar el formulario
                        createTaskDiv.remove();
                    });
                }
            });

            // Agregar evento al botón crtpr
            document.getElementById("crtpr").addEventListener("click", () => {
                // Cerrar el menú (divtj) antes de crear el formulario
                if (div) {
                    div.classList.remove("show");
                    div.classList.add("hide");
                    setTimeout(() => div.remove(), 300); // Coincide con la duración de la animación
                }

                let createProjectDiv = document.getElementById("create-crtpr");

                if (!createProjectDiv) {
                    createProjectDiv = document.createElement("div");
                    createProjectDiv.id = "create-crtpr";
                    createProjectDiv.innerHTML = `
                        <div class="top-div">
                            <div>
                                <h2>Create Project</h2>
                            </div>
                            <div>
                                <button id="close-crtpr">
                                    <img class="cruz" src="/assets/cruzado.png">
                                </button>
                            </div>
                        </div>
                        <form id="project-form" action="" method="post">
                            <div class="mid-div">
                                <div class="form__group field">
                                    <input type="input" class="form__field" placeholder="Name" required="" id="project-name">
                                    <label for="name" class="form__label">Name</label>
                                </div>
                                <div class="form__group field">
                                    <select class="form__field" name="cate" id="project-category">
                                        <option value="none">None</option>
                                        <option value="work">Work</option>
                                        <option value="shop">Shopping</option>
                                        <option value="famy">Familiy</option>
                                    </select>
                                    <label for="name" class="form__label">Category</label>
                                </div>
                                <div class="form__group field">
                                    <input type="date" class="form__field" placeholder="Date" required="" id="project-date">
                                    <label for="name" class="form__label">Date</label>
                                </div>
                            </div>
                            <div class="bot-div">
                                <input id="save" type="submit" value="Guardar">
                                <input id="cancel" type="button" value="Cancelar">
                            </div>
                        </form>
                    `;

                    document.body.appendChild(createProjectDiv);

                    // Evento para cerrar el div
                    document.getElementById("close-crtpr").addEventListener("click", () => {
                        createProjectDiv.remove();
                    });

                    // Evento para cancelar
                    document.getElementById("cancel").addEventListener("click", () => {
                        createProjectDiv.remove();
                    });

                    // Manejar el evento submit del formulario de proyecto
                    document.getElementById("project-form").addEventListener("submit", (e) => {
                        e.preventDefault();
                    
                        const projectName = document.getElementById("project-name").value;
                        const projectCategory = document.getElementById("project-category").value;
                        const projectDate = document.getElementById("project-date").value;
                    
                        // Crear el div con la información del proyecto
                        const projectDiv = document.createElement("div");
                        projectDiv.className = "project-item";
                        projectDiv.innerHTML = `
                        <div class="task">
                            <h3 class="title-task">${projectName}</h3>
                            <div class="wrapper">
                                <p class="time-task">${projectCategory}</p>
                                <p class="category-task">#${projectDate}</p>
                            </div>
                        </div>
                        <div class="check">
                            <div class="checkbox-wrapper">
                                <input type="checkbox" class="task-checkbox">
                                <svg viewBox="0 0 35.6 35.6">
                                    <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                    <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                </svg>
                            </div>
                            <button class="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 14" class="svgIcon bin-top">
                                    <g clip-path="url(#clip0_35_24)">
                                        <path fill="black" d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        `;
                    
                        const projectAside = document.querySelector("main > div:nth-child(2)");
                        projectAside.appendChild(projectDiv);
                    
                        // Cerrar el formulario
                        createProjectDiv.remove();
                    
                        // Agregar interactividad al checkbox
                        const checkbox = projectDiv.querySelector(".task-checkbox");
                        const taskTitle = projectDiv.querySelector(".title-task");
                    
                        checkbox.addEventListener("change", () => {
                            if (checkbox.checked) {
                                taskTitle.style.textDecoration = "line-through";
                                projectDiv.classList.add("fade-out");
                                setTimeout(() => {
                                    projectDiv.remove();
                                }, 500);
                            }
                        });
                    
                        // Agregar interactividad al botón de eliminar
                        const deleteButton = projectDiv.querySelector(".button");
                        deleteButton.addEventListener("click", () => {
                            projectDiv.classList.add("fade-out");
                            setTimeout(() => {
                                projectDiv.remove();
                            }, 500);
                        }
                    });
                };
            });
        };
    });
});