function registrar() {
	var request = new XMLHttpRequest();	
	request.open("post", "registrar.jsp");
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=function() {
		if (request.readyState==4) {
			var respuesta=JSON.parse(request.responseText);
			if (respuesta.result=="OK"){
				sessionStorage.setItem('email', email.value);
				window.location.href="Tablero.html";
			}else
				mensajeRegistro.innerHTML=respuesta.mensaje;
		}
	};
	var p = {
		email : email.value, pwd1 : pwd1.value, pwd2 : pwd2.value 
	};
	request.send("p=" + JSON.stringify(p));	
}
function cambiarPass() {
	var request = new XMLHttpRequest();	
	request.open("post", "cambioContrasena.jsp");
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=function() {
		if (request.readyState==4) {
			var respuesta=JSON.parse(request.responseText);
			if (respuesta.result=="OK"){
				window.location.href="panel.html";
			}else
				console.log(respuesta.mensaje);
				//mensajeRegistro.innerHTML=respuesta.mensaje;
		}
	};				
	var p = {
		email : sessionStorage.getItem('email'), pwd1 : pwd1.value, pwd1New: pwd1New.value, pwd2New : pwd2New.value 
	};
	request.send("p=" + JSON.stringify(p));	
}


function login() {
	var request = new XMLHttpRequest();	
	request.open("post", "login.jsp");
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=function() {
		if (request.readyState==4) {
			var respuesta=JSON.parse(request.responseText);
			if (respuesta.result=="OK"){
				if(respuesta.reg=="si"){
					sessionStorage.setItem('email', email.value);
					window.location.href="panel.html";
				}else{
					sessionStorage.setItem('email', email.value);
					window.location.href="Tablero.html";
				
				}
				
			}else
				mensajeRegistro.innerHTML=respuesta.mensaje;
		}
	};
	var p = {
		email : email.value, pwd1 : pwd1.value
	};
	request.send("p=" + JSON.stringify(p));	
}


function estaConectado() {
	var request = new XMLHttpRequest();	
	request.open("get", "../estaConectado.jsp");
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=function() {
		if (request.readyState==4) {
			var respuesta=JSON.parse(request.responseText);
			if (respuesta.result!="OK") {
				alert("No estás conectado y no tienes permiso para esta página");
			}
		}
	};
	request.send();	
}
function recuperarPWD(){
	var request = new XMLHttpRequest();	
	request.open("post", "recuperarPWD.jsp");
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange=function() {
		if (request.readyState==4) {
			var respuesta=JSON.parse(request.responseText);
			if (respuesta.result!="OK") {
				alert("Error al intentar realizar la recuperación.");
				
			}
		}
	};
	var p = {
			email : txtEmail.value
		};
		request.send("p=" + JSON.stringify(p));

}