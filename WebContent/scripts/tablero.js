function Tablero() {
	this.casillas=[];
	this.crearCasillas();
}

Tablero.prototype.dibujar = function(lienzo) {
	for (var i=0; i<63; i++)
		this.casillas[i].dibujar(lienzo);
}

Tablero.prototype.crearCasillas = function() {
	for (var i=0; i<63; i++) {
		var casilla=new Casilla();
		this.casillas.push(casilla);
	}
	var ocas= [4, 8, 13, 17, 22, 26, 31, 35, 40, 44, 49, 53, 58];
	for (var i=0; i<ocas.length; i++)
		this.casillas[ocas[i]].tipo="OCA";
	
	var ejex = 50;
	var ejey = 500;
	
	for (var i=0; i<63; i++) {
		if(i > 9 && i <= 19){ //De la 10 a la 19
			if(i == 10){
				ejey = 500;
			}
			this.casillas[i].x0=500;
			this.casillas[i].y0=ejey;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCirculo();
			ejey -= 50;
		}else if(i > 19 && i <= 29){ //De la 20 a la 29
			if(i == 20){
				ejex = 500;
			}
			this.casillas[i].x0=ejex;
			this.casillas[i].y0=0;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCirculo();
			ejex -= 50;
		}else if(i > 29 && i <= 38){ //De la 30 a la 38
			if(i == 30){
				ejey = 0;
			}
			this.casillas[i].x0=0;
			this.casillas[i].y0=ejey;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCirculo();
			ejey += 50;
		}else if(i > 38 && i <= 46){ //De la 39 a la 46
			if(i == 39){
				ejex = 50;
			}
			this.casillas[i].x0=ejex;
			this.casillas[i].y0=400;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCirculo();
			ejex += 50;
		}else if(i > 46 && i <= 52){ //De la 47 a la 52
			if(i == 47){
				ejey = 350;
			}
			this.casillas[i].x0=400;
			this.casillas[i].y0=ejey;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCirculo();
			ejey -= 50;
		}else if(i > 52 && i <= 58){ //De la 53 a la 58
			if(i == 53){
				ejex = 350;
			}
			this.casillas[i].x0=ejex;
			this.casillas[i].y0=100;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCirculo();
			ejex -= 50;
		}else if(i > 58 && i <= 60){ //La 59 y 60
			if(i == 59){
				ejey = 150;
			}
			this.casillas[i].x0=100;
			this.casillas[i].y0=ejey;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCirculo();
			ejey += 50;
		}else if(i == 61){ //La 61
			this.casillas[i].x0=150;
			this.casillas[i].y0=200;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCirculo();
		}else if(i == 62){ //La 62 (ultima)
			this.casillas[i].x0=200;
			this.casillas[i].y0=200;
			this.casillas[i].xF=this.casillas[i].x0+50;
			this.casillas[i].yF=this.casillas[i].y0+50;
			this.casillas[i].crearCirculoFinal();
		}else{ //Desde la casilla 0-9
			if(i == 0){
				this.casillas[i].x0=i*ejex;
				this.casillas[i].y0=ejey;
				this.casillas[i].xF=this.casillas[i].x0+50;
				this.casillas[i].yF=this.casillas[i].y0+100;
				this.casillas[i].crearCirculoPrimero();
			}else{
				this.casillas[i].x0=(i+1)*ejex;
				this.casillas[i].y0=ejey;
				this.casillas[i].xF=this.casillas[i].x0+50;
				this.casillas[i].yF=this.casillas[i].y0+50;
				this.casillas[i].crearCirculo();
			}			
		}		
	}
}

function Casilla() {
	this.tipo="NORMAL";
}

Casilla.prototype.dibujar = function(lienzo) {
	lienzo.appendChild(this.rectangulo);
}

Casilla.prototype.crearCirculo = function() {
	this.rectangulo=document.createElementNS("http://www.w3.org/2000/svg", "rect");
	this.rectangulo.textContent = "1";
	this.rectangulo.setAttribute("x", this.x0);
	this.rectangulo.setAttribute("y", this.y0);
	this.rectangulo.setAttribute("width", 50);
	this.rectangulo.setAttribute("height", 50);
	this.rectangulo.setAttribute("stroke", "black");
	this.rectangulo.setAttribute("stroke-width", "3");
	this.rectangulo.setAttribute("fill", "rgb(255,255,255)");
}

Casilla.prototype.crearCirculoPrimero = function() {
	this.rectangulo=document.createElementNS("http://www.w3.org/2000/svg", "rect");
	this.rectangulo.setAttribute("x", this.x0);
	this.rectangulo.setAttribute("y", this.y0);
	this.rectangulo.setAttribute("width", 100);
	this.rectangulo.setAttribute("height", 50);
	this.rectangulo.setAttribute("stroke", "black");
	this.rectangulo.setAttribute("stroke-width", "3");
	this.rectangulo.setAttribute("fill", "rgb(255,255,255)");
}

Casilla.prototype.crearCirculoFinal = function() {
	this.rectangulo=document.createElementNS("http://www.w3.org/2000/svg", "rect");
	this.rectangulo.setAttribute("x", this.x0);
	this.rectangulo.setAttribute("y", this.y0);
	this.rectangulo.setAttribute("width", 150);
	this.rectangulo.setAttribute("height", 150);
	this.rectangulo.setAttribute("stroke", "black");
	this.rectangulo.setAttribute("stroke-width", "3");
	this.rectangulo.setAttribute("fill", "rgb(255,255,255)");
}







