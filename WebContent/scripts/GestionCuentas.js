function registrar() {
	var request = new XMLHttpRequest();
	request.open("post", "registrar.jsp");
	request.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			var respuesta = JSON.parse(request.responseText);
			if (respuesta.result == "OK") {
				sessionStorage.setItem('email', email.value);
				window.location.href = "index.html";
			} else
				mensajeRegistro.innerHTML = respuesta.mensaje;
		}
	};
	var p = {
		email : email.value,
		pwd1 : pwd1.value,
		pwd2 : pwd2.value
	};
	request.send("p=" + JSON.stringify(p));
}
function cambiarPass() {
	var request = new XMLHttpRequest();
	request.open("post", "cambioContrasena.jsp");
	request.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			var respuesta = JSON.parse(request.responseText);
			if (respuesta.result == "OK") {
				window.location.href = "panel.html";
			} else
				console.log(respuesta.mensaje);
			// mensajeRegistro.innerHTML=respuesta.mensaje;
		}
	};
	var p = {
		email : sessionStorage.getItem('email'),
		pwd1 : pwd1.value,
		pwd1New : pwd1New.value,
		pwd2New : pwd2New.value
	};
	request.send("p=" + JSON.stringify(p));
}

function cambiarAvatar() {
	  var request = new XMLHttpRequest();
	  request.open("post", "cambioAvatar.jsp");
	  request.setRequestHeader("Content-Type",
	      "application/x-www-form-urlencoded");
	  request.onreadystatechange = function() {
	    if (request.readyState == 4) {
	      var respuesta = JSON.parse(request.responseText);
	      if (respuesta.result == "OK") {
	        document.getElementById("respuestaFoto").value="La foto se ha actualizado correctamente."
	      } else
	        console.log(respuesta.mensaje);
	      // mensajeRegistro.innerHTML=respuesta.mensaje;
	    }
	  };
	  var p = {
	    email : sessionStorage.getItem('email'),
	    ruta : actual
	  };
	  request.send("p=" + JSON.stringify(p));
	}

function login() {
	var request = new XMLHttpRequest();
	request.open("post", "login.jsp");
	request.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			var respuesta = JSON.parse(request.responseText);
			if (respuesta.result == "OK") {
				if (respuesta.reg == "si") {
					crearCookie();
					sessionStorage.setItem('email', email.value);
					window.location.href = "panel.html";
				} else {
					sessionStorage.setItem('email', email.value);
					window.location.href = "Tablero.html";

				}

			} else
				mensajeRegistro.innerHTML = respuesta.mensaje;
		}
	};
	var p = {
		email : email.value,
		pwd1 : pwd1.value
	};
	request.send("p=" + JSON.stringify(p));
}

function estaConectado() {
	var request = new XMLHttpRequest();
	request.open("get", "../estaConectado.jsp");
	request.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			var respuesta = JSON.parse(request.responseText);
			if (respuesta.result != "OK") {
				alert("No estás conectado y no tienes permiso para esta página");
			}
		}
	};
	request.send();
}
function recuperarPWD() {
	var request = new XMLHttpRequest();
	request.open("post", "recuperarPWD.jsp");
	request.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			var respuesta = JSON.parse(request.responseText);
			if (respuesta.result != "OK") {
				alert("Error al intentar realizar la recuperación.");

			}
		}
	};
	var p = {
		email : txtEmail.value
	};
	request.send("p=" + JSON.stringify(p));

}
function nuevaPWD() {
	var request = new XMLHttpRequest();
	request.open("post", "nuevaPWD.jsp");
	request.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	var token = window.location.href;
	token = token.split("=");
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			var respuesta = JSON.parse(request.responseText);
			if (respuesta.result == "OK") {
				window.location.href = "index.html";
			} else
				console.log(respuesta.mensaje);
		}
	};
	var p = {
		pwd1New : pwd1New.value,
		pwd2New : pwd2New.value,
		token : token[1]
	};
	request.send("p=" + JSON.stringify(p));
}
function ranking2() {
	var request = new XMLHttpRequest();
	request.open("post", "ranking.jsp");
	request.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	var array;

	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			var respuesta = JSON.parse(request.responseText);
			var numero = respuesta.numero;
			var i = 0;
			// var ordenado=respuesta.sort(function (a,b));

			// console.log(respuesta);
			var table = document.getElementById("ranking")
					.getElementsByTagName('tbody')[0];
			
			$("#ranking tbody tr").remove();
			
			for ( var i in respuesta) {

				var obj = respuesta[i];
				var re = JSON.parse(obj);

				var row = table.insertRow(table.rows.lenght);
				var celda1 = row.insertCell(0);
				var newText = document.createTextNode(re.email);
				celda1.appendChild(newText);
				var celda2 = row.insertCell(1);
				var newText2 = document.createTextNode(re.victorias);
				celda2.appendChild(newText2);
			}
			sortTable("ranking", 1);

		}
	};
	var p = {
		email : sessionStorage.getItem('email')
	};
	request.send("p=" + JSON.stringify(p));
}
function sortTable(table_id, sortColumn) {
	var tableData = document.getElementById(table_id).getElementsByTagName(
			'tbody').item(0);
	var rowData = tableData.getElementsByTagName('tr');
	for (var i = 0; i < rowData.length - 1; i++) {
		for (var j = 0; j < rowData.length - (i + 1); j++) {
			if (Number(rowData.item(j).getElementsByTagName('td').item(
					sortColumn).innerHTML.replace(/[^0-9\.]+/g, "")) < Number(rowData
					.item(j + 1).getElementsByTagName('td').item(sortColumn).innerHTML
					.replace(/[^0-9\.]+/g, ""))) {
				tableData.insertBefore(rowData.item(j + 1), rowData.item(j));
			}
		}
	}
}

function compareSecondColumn(a, b) {
	if (a[1] === b[1]) {
		return 0;
	} else {
		return (a[1] < b[1]) ? -1 : 1;
	}
}
function crearCookie() {
	var clave = document.getElementById("email").value;
	var valor = document.getElementById("pwd1").value;
	valor = window.btoa(valor);
	var diasexpiracion = 53;
	var d = new Date();
	d.setTime(d.getTime() + (diasexpiracion * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = clave + "=" + valor + "; " + expires;
}
function getDatos() {
	var email = document.getElementById("email").value;
	document.getElementById("pwd1").value = obtenerCookie(email);
}
function obtenerCookie(clave) {
	var name = clave + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1);
		if (c.indexOf(name) == 0)
			return atob(c.substring(name.length, c.length));
	}
	return "";
}