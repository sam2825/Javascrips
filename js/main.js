function jugar(eleccionUsuario) {
  let opciones = ["Piedra", "Papel", "Tijeras"];
  let eleccionMaquina = opciones[Math.floor(Math.random() * opciones.length)];
  console.log("Tu eliges: " + eleccionUsuario);
  console.log("La máquina elige: " + eleccionMaquina)

  eleccionUsuario = eleccionUsuario.charAt(0).toUpperCase() + eleccionUsuario.slice(1);
  if (
    (eleccionUsuario === "Piedra" && eleccionMaquina === "Tijeras") ||
    (eleccionUsuario === "Papel" && eleccionMaquina === "Piedra") ||
    (eleccionUsuario === "Tijeras" && eleccionMaquina === "Papel")
  ) {
    console.log("¡Ganaste!");
  } else if (
    (eleccionMaquina === "Piedra" && eleccionUsuario === "Tijeras") ||
    (eleccionMaquina === "Papel" && eleccionUsuario === "Piedra") ||
    (eleccionMaquina === "Tijeras" && eleccionUsuario === "Papel")
  ) {
    console.log("Perdiste.");
  } else {
    console.log("Empate.");
  }
}
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

    jugar(eleccionUsuario);
  }
} else {
  console.log("Quizás en otra ocasión. ¡Hasta luego!");
}