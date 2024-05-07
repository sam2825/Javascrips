function jugar(eleccionUsuario) {
  let opciones = ["Piedra", "Papel", "Tijeras"];
  let eleccionMaquina = opciones[Math.floor(Math.random() * opciones.length)];
  console.log("Tu eliges: " + eleccionUsuario);
  console.log("La máquina elige: " + eleccionMaquina);
  if (
    (eleccionUsuario === "piedra" && eleccionMaquina === "Tijeras") ||
    (eleccionUsuario === "papel" && eleccionMaquina === "Piedra") ||
    (eleccionUsuario === "tijeras" && eleccionMaquina === "Papel")
  ) {
    console.log("¡Ganaste!");
  } else if (
    (eleccionMaquina === "Piedra" && eleccionUsuario === "tijeras") ||
    (eleccionMaquina === "Papel" && eleccionUsuario === "piedra") ||
    (eleccionMaquina === "Tijeras" && eleccionUsuario === "papel")
  ) {
    console.log("Perdiste.");
  } else {
    console.log("Empate.");
  }
}
while (true) {
  let eleccionUsuario = prompt("Elige Piedra, Papel o Tijeras (o escribe 'salir' para terminar):").toLowerCase();
  if (eleccionUsuario === "salir") {
    console.log("Gracias por jugar. ¡Hasta luego!");
    break;
  }
  jugar(eleccionUsuario);
}