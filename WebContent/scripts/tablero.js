function Tablero(lienzoTa) {
	this.casillas=[];
	this.lienzo=lienzoTa;
	this.crearCasillas();
	this.fichas=[];

}
Tablero.prototype.moverFicha = function(nombreuser, casilladestino){
	  
	  var ficha = document.getElementById(nombreuser);
	  var casillaDest = document.getElementById("casilla"+casilladestino);
	  var x = casillaDest.childNodes[0].getAttribute("x");
	  var y = casillaDest.childNodes[0].getAttribute("y");
	  
	  if(ficha.getAttribute("fill") == "red"){
	    ficha.setAttribute("cx",((this.casillas[casilladestino].x0)+15));    
	    ficha.setAttribute("cy",((this.casillas[casilladestino].y0)+15));
	  }
	  
	  if(ficha.getAttribute("fill") == "yellow"){
	    
	    ficha.setAttribute("cx",((this.casillas[casilladestino].x0)+35));    
	    ficha.setAttribute("cy",((this.casillas[casilladestino].y0)+15));
	  }
	  
	  if(ficha.getAttribute("fill") == "green"){    
	    ficha.setAttribute("cx",((this.casillas[casilladestino].x0)+35));    
	    ficha.setAttribute("cy",((this.casillas[casilladestino].y0)+35));
	  }
	  
	  if(ficha.getAttribute("fill") == "blue"){    
	    ficha.setAttribute("cx",((this.casillas[casilladestino].x0)+15));    
	    ficha.setAttribute("cy",((this.casillas[casilladestino].y0)+35));
	  }
	}
Tablero.prototype.mensaje = function(){
	console.log("hola")
}
Tablero.prototype.pintarFichas = function(listajugadores){
	this.crearFichas(listajugadores);
	for (var i=0;i<this.fichas.length;i++){
		this.fichas[i].dibujar(this.lienzo);
	}
}
Tablero.prototype.dibujar = function() {
	for (var i=0; i<63; i++){		
		this.casillas[i].dibujar(this.lienzo);
		this.casillas[i].addImagen(i);
		this.casillas[i].addNumero(i+1);
	}
	

}

Tablero.prototype.crearFichas = function(listajugadores) {
	
	for(var i=0; i<listajugadores.length; i++){
		var ficha = new Ficha(listajugadores[i]);
		this.fichas.push(ficha);
		ficha.crearJugador(this.casillas[0],i);
	}	
}

Tablero.prototype.crearCasillas = function() {

	for (var i=0; i<63; i++) {
		var casilla=new Casilla();
		this.casillas.push(casilla);
	}
	
	//Tipo OCA
	var ocas= [4, 8, 13, 17, 22, 26, 31, 35, 40, 44, 49, 53, 58];
	for (var i=0; i<ocas.length; i++)
		this.casillas[ocas[i]].tipo="OCA";
	
	//Tipo START
	this.casillas[0].tipo = "START";	
	//Tipo OCAWIN
	this.casillas[62].tipo = "OCAWIN";	
	//Tipo PUENTE
	this.casillas[5].tipo = "PUENTE";	
	this.casillas[11].tipo = "PUENTE";
	//Tipo POSADA
	this.casillas[18].tipo = "POSADA";
	//Tipo POZO
	this.casillas[30].tipo = "POZO";
	//Tipo DADOS
	this.casillas[25].tipo = "DADOS";
	this.casillas[52].tipo = "DADOS";
	//Tipo LABERINTO
	this.casillas[41].tipo = "LABERINTO";
	//Tipo CARCEL
	this.casillas[51].tipo = "CARCEL";
	//Tipo MUERTE
	this.casillas[57].tipo = "MUERTE";
	
	
	var ejex = 50;
	var ejey = 500;
	
	for (var i=0; i<63; i++) {
		if(i > 9 && i <= 19){ //De la 10 a la 19
			if(i == 10){
				ejey = 450;
			}
			this.casillas[i].x0=500;
			this.casillas[i].y0=ejey;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCuadrado(i);
			ejey -= 50;
		}else if(i > 19 && i <= 29){ //De la 20 a la 29
			if(i == 20){
				ejex = 450;
			}
			this.casillas[i].x0=ejex;
			this.casillas[i].y0=0;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCuadrado(i);
			ejex -= 50;
		}else if(i > 29 && i <= 37){ //De la 30 a la 37
			if(i == 30){
				ejey = 50;
			}
			this.casillas[i].x0=0;
			this.casillas[i].y0=ejey;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCuadrado(i);
			ejey += 50;
		}else if(i > 37 && i <= 45){ //De la 38 a la 45
			if(i == 38){
				ejex = 50;
			}
			this.casillas[i].x0=ejex;
			this.casillas[i].y0=400;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCuadrado(i);
			ejex += 50;
		}else if(i > 45 && i <= 51){ //De la 46 a la 51
			if(i == 46){
				ejey = 350;
			}
			this.casillas[i].x0=400;
			this.casillas[i].y0=ejey;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCuadrado(i);
			ejey -= 50;
		}else if(i > 51 && i <= 57){ //De la 52 a la 57
			if(i == 52){
				ejex = 350;
			}
			this.casillas[i].x0=ejex;
			this.casillas[i].y0=100;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCuadrado(i);
			ejex -= 50;
		}else if(i > 57 && i <= 60){ //La 58 a 60
			if(i == 58){
				ejey = 150;
			}
			this.casillas[i].x0=100;
			this.casillas[i].y0=ejey;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCuadrado(i);
			ejey += 50;
		}else if(i == 61){ //La 61
			this.casillas[i].x0=150;
			this.casillas[i].y0=250;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCuadrado(i);
		}else if(i == 62){ //La 62 (ultima)
			this.casillas[i].x0=200;
			this.casillas[i].y0=200;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCuadradoFinal(i);
		}else{ //Desde la casilla 0-9
			if(i == 0){
				this.casillas[i].x0=i*ejex;
				this.casillas[i].y0=ejey;
				this.casillas[i].xF=this.casillas[i].x0+50;
				this.casillas[i].yF=this.casillas[i].y0+100;
				this.casillas[i].crearCuadradoPrimero(i);
			}else{
				this.casillas[i].x0=(i+1)*ejex;
				this.casillas[i].y0=ejey;
				this.casillas[i].xF=this.casillas[i].x0+50;
				this.casillas[i].yF=this.casillas[i].y0+50;
				this.casillas[i].crearCuadrado(i);
			}			
		}		
	}	
}


function Casilla() {
	this.tipo="NORMAL";
}

Casilla.prototype.dibujar = function(lienzo) {
	lienzo.appendChild(this.g);
}

Casilla.prototype.addNumero = function(numero) {
	this.numtxt.innerHTML = numero;
	this.numtxt.setAttribute("font-size","13");
}


Casilla.prototype.addImagen = function(numero) {
		if(this.tipo == "START"){			
			this.imagen.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "imagenes/start.png");
			this.imagen.setAttribute("x", (this.x0+30));
		}
		
		if(this.tipo == "OCAWIN"){			
			this.imagen.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "imagenes/ocawin.png");
			this.imagen.setAttribute("x", (this.x0+12));
			this.imagen.setAttribute("y", (this.y0+15));		
			this.imagen.setAttribute("width", 125);
			this.imagen.setAttribute("height", 125);
		}
		
		if(this.tipo == "PUENTE"){			
			this.imagen.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "imagenes/puente2.png");
			this.imagen.setAttribute("x", (this.x0+2));
			this.imagen.setAttribute("y", (this.y0+7));					
			this.imagen.setAttribute("width", 45);
			this.imagen.setAttribute("height", 45);
		}
		
		if(this.tipo == "POSADA"){			
			this.imagen.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "imagenes/posada.png");
			this.imagen.setAttribute("x", (this.x0+2));
			this.imagen.setAttribute("y", (this.y0+3));					
			this.imagen.setAttribute("width", 45);
			this.imagen.setAttribute("height", 45);
		}
		
		if(this.tipo == "POZO"){			
			this.imagen.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "imagenes/pozo.png");
			this.imagen.setAttribute("x", (this.x0+9));
			this.imagen.setAttribute("y", (this.y0+6));					
			this.imagen.setAttribute("width", 40);
			this.imagen.setAttribute("height", 40);
		}
		
		if(this.tipo == "DADOS"){			
			this.imagen.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "imagenes/dados.png");
			this.imagen.setAttribute("x", (this.x0+7));
			this.imagen.setAttribute("y", (this.y0+10));					
			this.imagen.setAttribute("width", 40);
			this.imagen.setAttribute("height", 40);
		}
		
		if(this.tipo == "LABERINTO"){			
			this.imagen.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "imagenes/laberinto.png");
		}
		
		if(this.tipo == "CARCEL"){			
			this.imagen.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "imagenes/carcel.png");
		}
		
		if(this.tipo == "MUERTE"){			
			this.imagen.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "imagenes/muerte.png");
			this.imagen.setAttribute("x", (this.x0+5));
			this.imagen.setAttribute("y", (this.y0+7));					
			this.imagen.setAttribute("width", 40);
			this.imagen.setAttribute("height", 40);
		}
		
		if(this.tipo == "OCA"){			
			this.imagen.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "imagenes/oca.png");
			this.imagen.setAttribute("x", (this.x0+5));
			this.imagen.setAttribute("y", (this.y0+7));					
			this.imagen.setAttribute("width", 40);
			this.imagen.setAttribute("height", 40);
		}
		
		
}

Casilla.prototype.crearCuadrado = function(numcasilla) {
	
	//Grupo g
	this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
	this.g.setAttribute("id", "casilla"+(numcasilla+1));
	
	// Rectangulo
	this.rectangulo = document.createElementNS("http://www.w3.org/2000/svg","rect");
	this.rectangulo.setAttribute("x", this.x0);
	this.rectangulo.setAttribute("y", this.y0);
	this.rectangulo.setAttribute("width", 50);
	this.rectangulo.setAttribute("height", 50);
	this.rectangulo.setAttribute("stroke", "black");
	this.rectangulo.setAttribute("stroke-width", "3");
	this.rectangulo.setAttribute("fill", "rgb(255,255,255)");	
	
	//Texto
	this.numtxt = document.createElementNS("http://www.w3.org/2000/svg","text");
	this.numtxt.setAttribute("x",this.x0+4);
	this.numtxt.setAttribute("y",this.y0+12);
	this.numtxt.setAttribute("fill","#000");
	
	//Imagen
	this.imagen = document.createElementNS("http://www.w3.org/2000/svg","image");
	this.imagen.setAttribute("x", this.x0);
	this.imagen.setAttribute("y", this.y0);
	this.imagen.setAttribute("width", 50);
	this.imagen.setAttribute("height", 50);	
	
	//Agrupar en g
	this.g.appendChild(this.rectangulo);	
	this.g.appendChild(this.imagen);
	this.g.appendChild(this.numtxt);
}

Casilla.prototype.crearCuadradoPrimero = function(numcasilla) {
	
	//Grupo g
	this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
	this.g.setAttribute("id", "casilla"+(numcasilla+1));
	
	//Rectangulo
	this.rectangulo=document.createElementNS("http://www.w3.org/2000/svg", "rect");
	this.rectangulo.setAttribute("x", this.x0);
	this.rectangulo.setAttribute("y", this.y0);
	this.rectangulo.setAttribute("width", 100);
	this.rectangulo.setAttribute("height", 50);
	this.rectangulo.setAttribute("stroke", "black");
	this.rectangulo.setAttribute("stroke-width", "3");
	this.rectangulo.setAttribute("fill", "rgb(255,255,255)");
	
	//Texto
	this.numtxt = document.createElementNS("http://www.w3.org/2000/svg","text");
	this.numtxt.setAttribute("x",this.x0+4);
	this.numtxt.setAttribute("y",this.y0+12);
	this.numtxt.setAttribute("fill","#000");
	
	//Imagen
	this.imagen = document.createElementNS("http://www.w3.org/2000/svg","image");
	this.imagen.setAttribute("x", this.x0);
	this.imagen.setAttribute("y", this.y0);
	this.imagen.setAttribute("width", 50);
	this.imagen.setAttribute("height", 50);
	
	//Agrupar en g
	this.g.appendChild(this.rectangulo);	
	this.g.appendChild(this.imagen);
	this.g.appendChild(this.numtxt);
}

Casilla.prototype.crearCuadradoFinal = function(numcasilla) {
	
	//Grupo g
	this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
	this.g.setAttribute("id", "casilla"+(numcasilla+1));
	
	//Rectangulo
	this.rectangulo=document.createElementNS("http://www.w3.org/2000/svg", "rect");
	this.rectangulo.setAttribute("x", this.x0);
	this.rectangulo.setAttribute("y", this.y0);
	this.rectangulo.setAttribute("width", 150);
	this.rectangulo.setAttribute("height", 150);
	this.rectangulo.setAttribute("stroke", "black");
	this.rectangulo.setAttribute("stroke-width", "3");
	this.rectangulo.setAttribute("fill", "rgb(255,255,255)");
	
	//Texto
	this.numtxt = document.createElementNS("http://www.w3.org/2000/svg","text");
	this.numtxt.setAttribute("x",this.x0+4);
	this.numtxt.setAttribute("y",this.y0+12);
	this.numtxt.setAttribute("fill","#000");
	
	//Imagen
	this.imagen = document.createElementNS("http://www.w3.org/2000/svg","image");
	this.imagen.setAttribute("x", this.x0);
	this.imagen.setAttribute("y", this.y0);
	this.imagen.setAttribute("width", 50);
	this.imagen.setAttribute("height", 50);
	
	//Agrupar en g
	this.g.appendChild(this.rectangulo);	
	this.g.appendChild(this.imagen);
	this.g.appendChild(this.numtxt);
}


function Ficha(idjugador){
	this.id = idjugador;
}

Ficha.prototype.dibujar = function(lienzo) {
	lienzo.appendChild(this.circle);
}

Ficha.prototype.crearJugador = function(casilla,i){
	
	if(i == 0){
		//Circulo
		this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.circle.setAttribute("cx",(casilla.x0+20));
		this.circle.setAttribute("id",this.id);
		this.circle.setAttribute("cy",(casilla.y0+25));
		this.circle.setAttribute("fill","red");
		this.circle.setAttribute("stroke","black");	
		this.circle.setAttribute("stroke-width","3");
		this.circle.setAttribute("r","7");
	}

	if(i == 1){
		//Circulo
		this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.circle.setAttribute("cx",(casilla.x0+40));
		this.circle.setAttribute("id",this.id);
		this.circle.setAttribute("cy",(casilla.y0+25));
		this.circle.setAttribute("fill","green");
		this.circle.setAttribute("stroke","black");	
		this.circle.setAttribute("stroke-width","3");
		this.circle.setAttribute("r","7");
	}
	
	if(i == 2){
		//Circulo
		this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.circle.setAttribute("cx",(casilla.x0+60));
		this.circle.setAttribute("id",this.id);
		this.circle.setAttribute("cy",(casilla.y0+25));
		this.circle.setAttribute("fill","blue");
		this.circle.setAttribute("stroke","black");	
		this.circle.setAttribute("stroke-width","3");
		this.circle.setAttribute("r","7");
	}

	if(i == 3){
		//Circulo
		this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.circle.setAttribute("cx",(casilla.x0+80));
		this.circle.setAttribute("id",this.id);
		this.circle.setAttribute("cy",(casilla.y0+25));
		this.circle.setAttribute("fill","yellow");
		this.circle.setAttribute("stroke","black");	
		this.circle.setAttribute("stroke-width","3");
		this.circle.setAttribute("r","7");
	}

}







