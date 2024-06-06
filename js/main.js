document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    body.style.fontFamily = "Arial, sans-serif";
    body.style.backgroundColor = "#f0f0f0";
    body.style.color = "#333";
    body.style.display = "flex";
    body.style.justifyContent = "center";
    body.style.alignItems = "center";
    body.style.height = "100vh";
    body.style.margin = "0";

    const container = document.getElementById('container');
    container.style.backgroundColor = "#fff";
    container.style.padding = "20px";
    container.style.borderRadius = "8px";
    container.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
    container.style.textAlign = "center";
    container.style.width = "300px";
    container.style.marginTop = "20px";  
    const mainTitle = document.getElementById('main-title');
    mainTitle.style.color = "#007bff";
    mainTitle.style.textAlign = "center";
    mainTitle.style.marginBottom = "20px";

    const gameTitle = document.getElementById('game-title');
    gameTitle.style.color = "#007bff";  
    const inputUserChoice = document.getElementById('user-choice');
    inputUserChoice.style.margin = "10px";
    inputUserChoice.style.padding = "10px";
    inputUserChoice.style.width = "calc(100% - 22px)";
    inputUserChoice.style.border = "1px solid #ccc";
    inputUserChoice.style.borderRadius = "5px";
    inputUserChoice.style.boxSizing = "border-box";
    inputUserChoice.style.display = "none";

    const buttonsContainer = document.getElementById('buttons-container');
    buttonsContainer.style.marginTop = "10px";
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.justifyContent = "center";  
    const gameResultsDiv = document.getElementById("game-results");
    gameResultsDiv.style.marginTop = "20px";
    gameResultsDiv.style.textAlign = "left";

    const statsDiv = document.getElementById("stats");
    statsDiv.style.marginTop = "20px";
    statsDiv.style.textAlign = "left";  
    const resetStatsButton = document.getElementById("reset-stats");
    resetStatsButton.style.marginTop = "20px";
    resetStatsButton.style.padding = "10px 20px";
    resetStatsButton.style.backgroundColor = "#dc3545";
    resetStatsButton.style.color = "#fff";
    resetStatsButton.style.border = "none";
    resetStatsButton.style.borderRadius = "5px";
    resetStatsButton.style.cursor = "pointer";
    resetStatsButton.style.transition = "background-color 0.3s";

    resetStatsButton.addEventListener("mouseover", function() {
        resetStatsButton.style.backgroundColor = "#c82333";
    });  
    resetStatsButton.addEventListener("mouseout", function() {
        resetStatsButton.style.backgroundColor = "#dc3545";
    });

    const ejecutarConLog = func => (...args) => {
        console.log("Ejecutando función...");
        return func(...args);
    };  
    const estadisticasJuego = {
        victorias: 0,
        derrotas: 0,
        empates: 0,
        cargarEstadisticas() {
            const datos = localStorage.getItem("estadisticasJuego");
            if (datos) {
                const estadisticas = JSON.parse(datos);
                Object.assign(this, estadisticas);
            }
        },
        guardarEstadisticas() {
            const datos = JSON.stringify({
                victorias: this.victorias,
                derrotas: this.derrotas,
                empates: this.empates
            });
            localStorage.setItem("estadisticasJuego", datos);
        },
        actualizarEstadisticas(resultado) {
            this[resultado === "¡Ganaste!" ? 'victorias' : resultado === "Perdiste." ? 'derrotas' : 'empates']++;
            this.guardarEstadisticas();
            this.mostrarEstadisticas();
        },
        reiniciarEstadisticas() {
            this.victorias = this.derrotas = this.empates = 0;
            this.guardarEstadisticas();
            this.mostrarEstadisticas();
            limpiarResultadosAnteriores();
        },
        mostrarEstadisticas() {
            statsDiv.innerHTML = ""; 
            const statsResult = document.createElement("p");
            statsResult.textContent = `Victorias: ${this.victorias}, Derrotas: ${this.derrotas}, Empates: ${this.empates}`;
            statsDiv.appendChild(statsResult);
        }
    };

    const determinarResultado = (eleccionUsuario, eleccionMaquina) =>
        (eleccionUsuario === "Piedra" && eleccionMaquina === "Tijeras") ||
        (eleccionUsuario === "Papel" && eleccionMaquina === "Piedra") ||
        (eleccionUsuario === "Tijeras" && eleccionMaquina === "Papel")
            ? "¡Ganaste!":
            (eleccionMaquina === "Piedra" && eleccionUsuario === "Tijeras") ||
            (eleccionMaquina === "Papel" && eleccionUsuario === "Piedra") ||
            (eleccionMaquina === "Tijeras" && eleccionUsuario === "Papel")
                ? "Perdiste."
                : "Empate.";  
    const actualizarResultados = (eleccionUsuario, eleccionMaquina, resultado) => {
        limpiarResultadosAnteriores(); 
        const nuevoResultado = document.createElement("p");
        nuevoResultado.textContent = `Tu eliges: ${eleccionUsuario}, La máquina elige: ${eleccionMaquina}. Resultado: ${resultado}`;
        gameResultsDiv.appendChild(nuevoResultado);
    };

    const limpiarResultadosAnteriores = () => {
        
        const resultadosAnteriores = gameResultsDiv.querySelectorAll('p');
        resultadosAnteriores.forEach(resultado => resultado.remove());
    };  
    const mostrarError = mensaje => {
        limpiarResultadosAnteriores(); 
        const errorElement = document.createElement("p");
        errorElement.textContent = mensaje;
        errorElement.style.color = "red";
        gameResultsDiv.appendChild(errorElement);
    };

    const jugar = eleccionUsuario => {
        const opciones = ["Piedra", "Papel", "Tijeras"];
        const eleccionMaquina = opciones[Math.floor(Math.random() * opciones.length)];  
        if (!["piedra", "papel", "tijeras"].includes(eleccionUsuario)) {
            mostrarError("Error: Opción no válida. Por favor elige Piedra, Papel o Tijeras.");
            return;
        }

        const resultado = determinarResultado(eleccionUsuario, eleccionMaquina);
        actualizarResultados(eleccionUsuario, eleccionMaquina, resultado);
        estadisticasJuego.actualizarEstadisticas(resultado);  
        inputUserChoice.value = "";

        return resultado;
    };  
    const iniciarJuegoTexto = () => {
        estadisticasJuego.cargarEstadisticas();
        estadisticasJuego.mostrarEstadisticas();

        inputUserChoice.style.display = "block";
        inputUserChoice.focus();  
        inputUserChoice.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                let eleccionUsuario = inputUserChoice.value.trim().toLowerCase();
                let resultado = jugar(eleccionUsuario);
                if (resultado) {
                    estadisticasJuego.actualizarEstadisticas(resultado);
                }
            }
        });
    };

    const iniciarJuegoBotones = () => {
        estadisticasJuego.cargarEstadisticas();
        estadisticasJuego.mostrarEstadisticas();  
        const opciones = ["Piedra", "Papel", "Tijeras"];
        opciones.forEach(opcion => {
            const button = document.createElement("button");
            button.textContent = opcion;
            button.classList.add('btn-choice');
            button.dataset.choice = opcion.toLowerCase();
            button.style.margin = "10px";
            button.style.padding = "10px 20px";
            button.style.border = "none";
            button.style.borderRadius = "5px";
            button.style.backgroundColor = "#007bff";
            button.style.color = "#fff";
            button.style.cursor = "pointer";
            button.style.transition = "background-color 0.3s";

            button.addEventListener('mouseover', () => button.style.backgroundColor = "#0056b3");
            button.addEventListener('mouseout', () => button.style.backgroundColor = "#007bff");  
            button.addEventListener('click', function() {
                let eleccionUsuario = button.dataset.choice;
                let resultado = jugar(eleccionUsuario);
                if (resultado) {
                    estadisticasJuego.actualizarEstadisticas(resultado);
                }
            });

            buttonsContainer.appendChild(button);
        });
    };  
    const reiniciarEstadisticas = () => {
        estadisticasJuego.reiniciarEstadisticas();
        console.log("Estadísticas y resultados del juego reiniciados.");
    };

    document.getElementById("start-text-input").addEventListener("click", ejecutarConLog(iniciarJuegoTexto));
    document.getElementById("start-buttons").addEventListener("click", ejecutarConLog(iniciarJuegoBotones));
    document.getElementById("reset-stats").addEventListener("click", ejecutarConLog(reiniciarEstadisticas));  
});