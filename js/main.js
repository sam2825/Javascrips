function jugar(eleccionUsuario) {
  let opciones = ["Piedra", "Papel", "Tijeras"];
  let eleccionMaquina = opciones[Math.floor(Math.random() * opciones.length)];
  console.log("Tu eliges: " + eleccionUsuario);
  console.log("La máquina elige: " + eleccionMaquina)

  eleccionUsuario = eleccionUsuario.charAt(0).toUpperCase() + eleccionUsuario.slice(1);
  const resultado = determinarResultado(eleccionUsuario, eleccionMaquina);

  console.log(resultado);
  actualizarResultados(eleccionUsuario, eleccionMaquina, resultado);
  return resultado;
}

function determinarResultado(eleccionUsuario, eleccionMaquina) {
  if (
    (eleccionUsuario === "Piedra" && eleccionMaquina === "Tijeras") ||
    (eleccionUsuario === "Papel" && eleccionMaquina === "Piedra") ||
    (eleccionUsuario === "Tijeras" && eleccionMaquina === "Papel")
  ) {
    return "¡Ganaste!";
  } else if (
    (eleccionMaquina === "Piedra" && eleccionUsuario === "Tijeras") ||
    (eleccionMaquina === "Papel" && eleccionUsuario === "Piedra") ||
    (eleccionMaquina === "Tijeras" && eleccionUsuario === "Papel")
  ) {
    return "Perdiste.";
  } else {
    return "Empate.";
  }
}

function actualizarResultados(eleccionUsuario, eleccionMaquina, resultado) {
  const gameResultsDiv = document.getElementById("game-results");
  const nuevoResultado = document.createElement("p");
  nuevoResultado.textContent = `Tu eliges: ${eleccionUsuario}, La máquina elige: ${eleccionMaquina}. Resultado: ${resultado}`;
  gameResultsDiv.appendChild(nuevoResultado);
}

function iniciarJuego() {
  const resultados = [];

  if (confirm("¿Estás listo para jugar?")) {
    while (true) {
      let eleccionUsuario = prompt("Elige Piedra, Papel o Tijeras (o escribe 'salir' para terminar):").toLowerCase();
      if (eleccionUsuario === "salir") {
        console.log("Gracias por jugar. ¡Hasta luego!");
        break;
      }
      if (eleccionUsuario !== "piedra" && eleccionUsuario !== "papel" && eleccionUsuario !== "tijeras") {
        console.log("Error: Opción no válida. Por favor elige Piedra, Papel o Tijeras.");
        continue;
      }

      let resultado = jugar(eleccionUsuario);
      resultados.push(resultado);

      console.log("Resultados hasta ahora:", resultados);
    }
  } else {
    console.log("Quizás en otra ocasión. ¡Hasta luego!");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("La página está completamente cargada.");
});