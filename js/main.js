while (true) {
    eleccionUsuario = prompt("Elije: Piedra, Papel o Tijeras").toLowerCase();

   if (eleccionUsuario === "piedra" || eleccionUsuario === "papel" || eleccionUsuario === "tijeras") {
        jugar(eleccionUsuario);
    } else {
        console.log("Eleccion invalida. Por favor, elija Piedra, Papel o Tijeras.");
    }
}
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
  let eleccionUsuario = prompt("Elige Piedra, Papel o Tijeras:").toLowerCase(); 
  jugar(eleccionUsuario);