/* Obtenemos primero el nombre del jugador */



let playerNameInput = document.getElementById('name_player');
let btnPlay = document.getElementById('jugar');

/* Funcion Mandar dato del nombre del jugador al localStorage */
btnPlay.addEventListener('click', registrarJugador);

function registrarJugador() {
    let name = playerNameInput.value;
    localStorage.setItem('nombreJugador', name);
}

/* Obtenemos la variable guardada en localStorage para poder usarla luego*/

let nameForScreen = localStorage.getItem('nombreJugador');






/* FUNCIONALIDADES DEL JUEGO */

/* Declaratoria de variables para darle el juego */

let turno = 1,
    puestas = 0,
    fichas = ["images/ficha-roja.png", "images/ficha-negra.png"], // Lo controlaremos con posiciones
    partidaAcabada = false,
    modalAlert = document.querySelector(".modal-win-lose"),
    modalAlertText = document.querySelector(".modal-text"),
    positions = Array.from(document.querySelectorAll(".square-position"));

  positions.forEach((x) => x.addEventListener("click", ponerFicha));

function ponerFicha(e) {
  let positionpressed = e.target;

  if (positionpressed.innerHTML === "") {
    const imgFicha = document.createElement("img");
    imgFicha.src = fichas[1];
    positionpressed.appendChild(imgFicha);
    puestas += 1;

    let estadoPartida = estado();
    if (estadoPartida == 0) {
      cambiarTurno();
      if (puestas < 9) {
        TurnoBot();
        estadoPartida = estado();
        puestas += 1;
        cambiarTurno();
      }
    }

    if (estadoPartida == 1) {
      modalAlertText.innerHTML = `¡Felicidades ${nameForScreen}! <span>Ganaste el juego</span>`
      modalAlert.classList.add("active")
      partidaAcabada = true;

    } else if (estadoPartida == -1) {
      modalAlertText.innerHTML = `¡Oh no ${nameForScreen}! <span>Perdiste el juego</span>`
      modalAlert.classList.add("active");
      partidaAcabada = true;
    }
  }
}

/* Evaluarmos que turno toca, si está en el 1, le toca al 2 (Jugador, PC) */

function cambiarTurno(){
		turno += 1;
		turno %= 2;
}

function estado(){

	posicionVictoria = 0; // Posicion de victoria por defecto
	nEstado = 0; // Estado por default

	function sonIguales(...datosFichas){
		valores = datosFichas.map(e=>e.innerHTML);
		if(valores[0] != "" && valores.every((x, i, arr) => x===arr[0])){
			datosFichas.forEach(e => e.style.backgroundColor = "#F8EE9A")
			return true;
		}
		else{
			return false;
		}
	}

	//Comprobamos si hay alguna linea que haga el 3 en raya
  // Evaluamos todas las situacione posibles de victoria, en horizontal, vertical, y diagonales
  // Esto se compuebra con las posiciones de los bloques del tablero


	if(sonIguales(positions[0], positions[1], positions[2])){
		posicionVictoria = 1;
	}

	else if(sonIguales(positions[3], positions[4], positions[5])){
		posicionVictoria = 2;
	}

	else if(sonIguales(positions[6], positions[7], positions[8])){
		posicionVictoria = 3;
	}

	else if(sonIguales(positions[0], positions[3], positions[6])){
		posicionVictoria = 4;
	}

	else if(sonIguales(positions[1], positions[4], positions[7])){
		posicionVictoria = 5;
	}

	else if(sonIguales(positions[2], positions[5], positions[8])){
		posicionVictoria = 6;
	}

	else if(sonIguales(positions[0], positions[4], positions[8])){
		posicionVictoria = 7;
	}

	else if(sonIguales(positions[2], positions[4], positions[6])){
		posicionVictoria = 8;
	}

	//Comprobamos quien ha ganado

	if(posicionVictoria > 0){
		if(turno == 1){
			nEstado = 1;
		}
		else{
			nEstado = -1;
		}
	}

	return nEstado;
}

function TurnoBot(){

	function PosicionAleatoria(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	let valores = positions.map(x=>x.innerHTML);
	let lugarFicha = -1;

	if(valores[4]==""){
		lugarFicha = 4;
	}
	else{
		let n = PosicionAleatoria(0, positions.length-1);
		while(valores[n]!=""){
			n = PosicionAleatoria(0, positions.length-1); 
		}
		lugarFicha = n;
	}

  // Entonces pintamos la ficha 
  
  const imgFichaBot = document.createElement("img");
  imgFichaBot.src = fichas[0]
	positions[lugarFicha].appendChild(imgFichaBot);

	return lugarFicha;
} 


/* Boton para refrescar la página */

let btn_aceptar = document.querySelector(".btn_aceptar");

btn_aceptar.addEventListener("click",()=>{
  location.reload();
})