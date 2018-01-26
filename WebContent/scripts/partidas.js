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
		nombre : document.getElementById("nombre").innerHTML,
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
		nombre : document.getElementById("nombre").innerHTML
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
			 
             var mensaje=document.getElementById("chat");
             mensaje.value+="Has entrado a una partida, espera que lleguen los jugadores.\n";
             
           
		} 
		if(mensaje.tipo=="COMIENZO"){
			jugadorTurno=mensaje.jugadorConElTurno;
			
			if(sessionStorage.email==jugadorTurno){
				//habilito el boton
				var botonEnviar = document.getElementById("lanzarDado");
				botonEnviar.disabled=false;
			}
			numerojugadores=mensaje.numerojugadores;
			idPartida=mensaje.idPartida; //meter en el areatext de partida
			addMensaje(mensaje.jugadores); //meter en el areatext de jugadores
			tablero.pintarFichas(mensaje.jugadores);//pintar fichar
            var mensajeChat=document.getElementById("chat");
            mensajeChat.value+="Comienza la partida con el número "+idPartida+".\n\n";
            mensajeChat.value+="Es el turno del usuario: "+ jugadorTurno+".\n\n";
		}
		if(mensaje.tipo=="TIRADA"){


			var casillaOrigen=mensaje.casillaOrigen;
			var numeroDelDado=mensaje.dado;
			var destinoFinal=mensaje.destinoFinal;
			var mensaje1=mensaje.mensaje;
			var jugadorQueMueve=mensaje.jugador;
			var botonEnviar = document.getElementById("lanzarDado");
			if(mensaje.jugadorConElTurno!=jugadorQueMueve){
				
				botonEnviar.disabled=true;
				jugadorTurno=mensaje.jugadorConElTurno;
			}
			if(sessionStorage.email==jugadorTurno){
				//habilito el boton
				var botonEnviar = document.getElementById("lanzarDado");
				botonEnviar.disabled=false;
			}
			if(mensaje.ganador!=null){
				var ganador=mensaje.ganador;
				mensajeChat.value+="El ganador es: "+ganador+"\n\n";

			}
			if(mensajeAdicional!=null){
				var mensaDi=mensaje.mensajeAdicional;
				mensajeChat.value+=mensaDi+"\n\n";

			}
			console.log("Destino inicial: "+mensaje.destinoInicial+" DestinoFinal: "+destinoFinal);
			var mensajeChat=document.getElementById("chat");
			mensajeChat.value+="El usuario "+jugadorQueMueve+" ha sacado: "+numeroDelDado+".\n\n";
			if(destinoFinal!=null){
				tablero.moverFicha(jugadorQueMueve, mensaje.destinoInicial);
				setTimeout(
						function(){
							tablero.moverFicha(jugadorQueMueve, mensaje.destinoFinal);
						}, 1000);
						
				
			}else{
				destinoFinal=mensaje.destinoInicial;
				tablero.moverFicha(jugadorQueMueve, destinoFinal);
			}
			if(mensaje.mensaje!=null){
				mensajeChat.value+=mensaje.mensaje+"\n\n";
			}
			
			mensajeChat.value+="Es el turno del usuario: "+ jugadorTurno+".\n\n";
			
			

			
		}
		if (mensaje.tipo=="mensajeChat"){
			var mensajeChat=document.getElementById("chat");
			var jugador=mensaje.nombreJugador;
			var mensajeMostrar=mensaje.mensajeChat;
			mensajeChat.value+="CHAT: "+jugador+": "+mensajeMostrar+".\n\n";
			document.getElementById("txtChat").value="";
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
	        nombreJugador: document.getElementById("nombre").innerHTML,
	        puntos: getRandomInt(1, 6),
	        idPartida: idPartida
	    };

	   ws.send(JSON.stringify(p));
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}


function enviarMensaje(){
	if(document.getElementById("txtChat").value!=""){
	var p = {
		tipo : "mensajeChat",
		idPartida : idPartida,
		nombreJugador: document.getElementById("nombre").innerHTML,
		mensajeUsuario : document.getElementById("txtChat").value
		};
		ws.send(JSON.stringify(p));
	}
}