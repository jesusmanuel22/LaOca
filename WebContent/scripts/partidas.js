var ws;
var idPartida;
var arr;

function crearPartida() {
	var request = new XMLHttpRequest();	
	request.open("post", "crearPartida.jsp");
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=function() {
		if (request.readyState==4) {
			var respuesta=JSON.parse(request.responseText);
			if (respuesta.result=="OK") {
				//divMensajes.innerHTML="Creación de partida (" + respuesta.mensaje + ") solicitada";
				console.log("Creación de partida (" + respuesta.mensaje + ") solicitada");
				conectarWebSocket();
			} else {
				//divMensajes.innerHTML="Error: " + respuesta.mensaje;
				console.log("Error: " + respuesta.mensaje);
			}				
		}
	};
	var p = {
		nombre : document.getElementById("nombre").value,
		numeroDeJugadores : document.getElementById("njugadores").value
	};
	request.send("p=" + JSON.stringify(p));
	//sleep(5000);
}

function unirse() {
	var request = new XMLHttpRequest();	
	request.open("post", "llegarASalaDeEspera.jsp");
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=function() {
		if (request.readyState==4) {
			var respuesta=request.responseText;
			console.log(respuesta);
			conectarWebSocket();
			//sessionStorage.nombre=document.getElementById("nombre").value;
		}
	};
	var p = {
		nombre : document.getElementById("nombre").value
	};
	request.send("p=" + JSON.stringify(p));
}

var jugadorTurno;
var numerojugadores;

function conectarWebSocket() {
	ws=new WebSocket("ws://localhost:8080/LaOca2017/servidorDePartidas");
	
	ws.onopen = function() {
		/*addMensaje("Websocket conectado");
		divTablero.setAttribute("style", "display:visible");
		var tablero=new Tablero();
		tablero.dibujar(svgTablero);*/
	}
	
	ws.onmessage = function(datos) {
		var mensaje=datos.data;
		mensaje=JSON.parse(mensaje);
		if (mensaje.tipo=="DIFUSION") {
			addMensaje(mensaje.mensaje);
			console.log("eeee");
		} 
		if(mensaje.tipo=="COMIENZO"){
			jugadorTurno=mensaje.jugadorConElTurno;
			if(sessionStorage.nombre==jugadorTurno){
				//habilito el boton
			}
			numerojugadores=mensaje.numerojugadores;
			idPartida=mensaje.idPartida; //meter en el areatext de partida
			//addMensaje(mensaje.jugadores); //meter en el areatext de jugadores
			tablero.pintarFichas(mensaje.jugadores);//pintar fichar

		}
		if(mensaje.tipo=="TIRADA"){


			var casillaOrigen=mensaje.casillaOrigen;
			var numeroDelDado=mensaje.dado;
			//var destinoInicial=mensaje.ca;
			var destinoFinal=mensaje.destinoInicial;
			var mensaje1=mensaje.mensaje;
			
			if(mensaje.jugadorConElTurno!=null){
				//habilitar botón de tirar
				
				jugadorTurno=mensaje.jugadorConElTurno;
			}
			if(mensaje.ganador!=null){
				var ganador=mensaje.ganador;
			}

			tablero.moverFicha(jugadorTurno, destinoFinal);
		}

		
	}
	ws.onclose=function(){
		addMensaje("Websocket cerrado");
	}
	
}

function addMensaje(texto) {
	/*var div=document.createElement("div");
	divChat.appendChild(div);
	div.innerHTML=texto;*/
	console.log(texto);
}

function lanzarDado(){
	var p = {
	        tipo: "dadoselanza",	
	        nombreJugador: document.getElementById("nombre").value,
	        puntos: getRandomArbitrary(1, 6),
	        idPartida: idPartida
	    };

	   ws.send(JSON.stringify(p));
}
function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}


/*function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}*/






