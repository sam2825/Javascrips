document.addEventListener("DOMContentLoaded", async function() {
    const body = document.body;
    body.style.fontFamily = "Arial, sans-serif";
    body.style.backgroundColor = "#f0f0f0";
    body.style.color = "#333";
    body.style.display = "flex";
    body.style.justifyContent = "center";
    body.style.alignItems = "center";
    body.style.height = "100vh";
    body.style.margin = "0";
    body.style.transition = "background-color 0.3s, color 0.3s";

    const container = document.getElementById('container');
    container.style.backgroundColor = "#fff";
    container.style.padding = "20px";
    container.style.borderRadius = "8px";
    container.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
    container.style.textAlign = "center";
    container.style.width = "300px";
    container.style.marginTop = "20px";
    container.style.transition = "background-color 0.3s";

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

    const styleButton = (button) => {
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
    };

    const resetStatsButton = document.getElementById("reset-stats");
    styleButton(resetStatsButton);

    const startTextInputButton = document.getElementById("start-text-input");
    styleButton(startTextInputButton);

    const startButtonsButton = document.getElementById("start-buttons");
    styleButton(startButtonsButton);

    const toggleDarkModeButton = document.createElement("button");
    toggleDarkModeButton.id = "toggleDarkMode";
    toggleDarkModeButton.textContent = "🌙";
    toggleDarkModeButton.style.position = 'fixed';
    toggleDarkModeButton.style.top = '10px';
    toggleDarkModeButton.style.right = '10px';
    toggleDarkModeButton.style.width = '40px';
    toggleDarkModeButton.style.height = '40px';
    toggleDarkModeButton.style.borderRadius = '50%';
    toggleDarkModeButton.style.border = 'none';
    toggleDarkModeButton.style.backgroundColor = '#333';
    toggleDarkModeButton.style.color = '#fff';
    toggleDarkModeButton.style.cursor = 'pointer';
    toggleDarkModeButton.style.fontSize = '20px';
    toggleDarkModeButton.style.display = 'flex';
    toggleDarkModeButton.style.justifyContent = 'center';
    toggleDarkModeButton.style.alignItems = 'center';
    toggleDarkModeButton.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    document.body.appendChild(toggleDarkModeButton);

    let darkModeEnabled = false;

    const enableDarkMode = () => {
        body.style.backgroundColor = "#333";
        body.style.color = "#fff";

        container.style.backgroundColor = "#444";

        toggleDarkModeButton.textContent = "☀️";
        toggleDarkModeButton.style.backgroundColor = '#333';
        toggleDarkModeButton.style.color = '#fff';

        darkModeEnabled = true;
    };

    const disableDarkMode = () => {
        body.style.backgroundColor = "#f0f0f0";
        body.style.color = "#333";

        container.style.backgroundColor = "#fff";

        toggleDarkModeButton.textContent = "🌙";
        toggleDarkModeButton.style.backgroundColor = '#333';
        toggleDarkModeButton.style.color = '#fff';

        darkModeEnabled = false;
    };

    toggleDarkModeButton.addEventListener("click", () => {
        if (darkModeEnabled) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    const ejecutarConLog = func => (...args) => {
        console.log("Ejecutando función...");
        return func(...args);
    };

    const cargarEstadisticasAsync = async () => {
        return new Promise((resolve, reject) => {
            try {
                const datos = localStorage.getItem("estadisticasJuego");
                if (datos) {
                    const estadisticas = JSON.parse(datos);
                    resolve(estadisticas);
                } else {
                    resolve(null);
                }
            } catch (error) {
                reject(error);
            }
        });
    };

    const guardarEstadisticasAsync = async (estadisticas) => {
        return new Promise((resolve, reject) => {
            try {
                const datos = JSON.stringify(estadisticas);
                localStorage.setItem("estadisticasJuego", datos);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };

    const estadisticasJuego = {
        victorias: 0,
        derrotas: 0,
        empates: 0,
        async cargarEstadisticas() {
            try {
                const estadisticas = await cargarEstadisticasAsync();
                if (estadisticas) {
                    Object.assign(this, estadisticas);
                }
            } catch (error) {
                console.error("Error al cargar estadísticas:", error);
            }
        },
        async guardarEstadisticas() {
            try {
                await guardarEstadisticasAsync({
                    victorias: this.victorias,
                    derrotas: this.derrotas,
                    empates: this.empates
                });
            } catch (error) {
                console.error("Error al guardar estadísticas:", error);
            }
        },
        async actualizarEstadisticas(resultado) {
            this[resultado === "¡Ganaste!" ? 'victorias' : resultado === "Perdiste." ? 'derrotas' : 'empates']++;
            await this.guardarEstadisticas();
            this.mostrarEstadisticas();
        },
        async reiniciarEstadisticas() {
            this.victorias = this.derrotas = this.empates = 0;
            await this.guardarEstadisticas();
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
        (eleccionUsuario === "piedra" && eleccionMaquina === "tijeras") ||
        (eleccionUsuario === "papel" && eleccionMaquina === "piedra") ||
        (eleccionUsuario === "tijeras" && eleccionMaquina === "papel")
            ? "¡Ganaste!" :
            (eleccionMaquina === "piedra" && eleccionUsuario === "tijeras") ||
            (eleccionMaquina === "papel" && eleccionUsuario === "piedra") ||
            (eleccionMaquina === "tijeras" && eleccionUsuario === "papel")
                ? "Perdiste." :
                "Empate.";

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

    let currentGameMode = null;

    const jugar = eleccionUsuario => {
        const opciones = ["piedra", "papel", "tijeras"];
        const eleccionMaquina = opciones[Math.floor(Math.random() * opciones.length)];
        eleccionUsuario = eleccionUsuario.toLowerCase();

        if (!opciones.includes(eleccionUsuario)) {
            mostrarError("Error: Opción no válida. Por favor elige Piedra, Papel o Tijeras.");
            return;
        }

        const resultado = determinarResultado(eleccionUsuario, eleccionMaquina);
        actualizarResultados(eleccionUsuario, eleccionMaquina, resultado);
        estadisticasJuego.actualizarEstadisticas(resultado);
        inputUserChoice.value = "";

        return resultado;
    };

    const iniciarJuegoTexto = async () => {
        limpiarResultadosAnteriores();
        buttonsContainer.innerHTML = "";

        await estadisticasJuego.cargarEstadisticas();
        estadisticasJuego.mostrarEstadisticas();

        inputUserChoice.style.display = "block";
        inputUserChoice.focus();
        inputUserChoice.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                let eleccionUsuario = inputUserChoice.value.trim();
                jugar(eleccionUsuario);
            }
        });

        currentGameMode = "texto";
    };

    const iniciarJuegoBotones = async () => {
        limpiarResultadosAnteriores();
        inputUserChoice.style.display = "none";

        await estadisticasJuego.cargarEstadisticas();
        estadisticasJuego.mostrarEstadisticas();
        if (buttonsContainer.children.length === 0) {
            const opciones = [
                { label: "Piedra", emoji: "🪨" },
                { label: "Papel", emoji: "📃" },
                { label: "Tijeras", emoji: "✂️" }
            ];
            opciones.forEach(opcion => {
                const button = document.createElement("button");
                button.textContent = `${opcion.label} ${opcion.emoji}`;
                button.style.margin = "10px";
                button.style.padding = "10px";
                button.style.border = "none";
                button.style.borderRadius = "5px";
                button.style.backgroundColor = "#007bff";
                button.style.color = "#fff";
                button.style.cursor = "pointer";
                button.style.transition = "background-color 0.3s";
                button.addEventListener("click", () => jugar(opcion.label.toLowerCase()));
                buttonsContainer.appendChild(button);
            });
        }

        currentGameMode = "botones";
    };

    const resetearEstadisticas = async () => {
        await estadisticasJuego.reiniciarEstadisticas();
    };

    startTextInputButton.addEventListener("click", async () => {
        if (currentGameMode !== "texto") {
            await iniciarJuegoTexto();
        }
    });

    startButtonsButton.addEventListener("click", async () => {
        if (currentGameMode !== "botones") {
            await iniciarJuegoBotones();
        }
    });

    resetStatsButton.addEventListener("click", async () => {
        await resetearEstadisticas();
    });

    await fetchGameConfig();
});