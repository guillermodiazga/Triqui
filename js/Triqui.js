//logica
"use strict"

var Triqui = Triqui || {};

Triqui.juego = function () {	
	this.jugadorActual = 'user';
	this.estadoJuego = 'Jugando';
}

Triqui.jugador = function (name) {
	
	this.name = name;
	
	this.marcar = function(campos, posicion, name) {

		if(campos[posicion] != 0){
			return campos;
		}
		campos[posicion] = name;
		return campos;
	};
}


Triqui.computador = function (name) {
	 Triqui.jugador.call(this,name);

	 this.procesarMovida = function(campos, modo) {

	 	var posicion = (modo == "facil")? Math.ceil(Math.random()*8) : MiniMax.getPos(campos);

		if(campos[posicion]==0)
			return posicion;
		else {
			return this.procesarMovida(campos);
		}
	};
}

Triqui.tablero = function () {
	this.campos = [0, 0, 0, 0, 0, 0, 0, 0, 0];

	var combinacionesGanadoras = [[0,4,8],[2,4,6],[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8]];

	var validarTresEnRaya = function (ar, user) {
		var ganador = false;
		for(var i in combinacionesGanadoras){
			for(var j in combinacionesGanadoras[i]){
				var pos = combinacionesGanadoras[i][j];
				if (user != ar[pos]){
					ganador = false;
					break;
				}else{
					ganador = true;
				}
			}
			if(ganador){
				return combinacionesGanadoras[i];
			}
		}
		return false;
	}

	this.validarGanador = function(campos, jugador) {
		var hayGanador = validarTresEnRaya(campos, jugador)
	    if (hayGanador)
	        return hayGanador;
	    else{
	        return false;
	    }
	}

	this.hayCeldasVacias = function(campos) {
	    for (var i in campos){
	        if (campos[i] == 0)
	            return true;
	    }
	    return false
	}

}

Triqui.computador.prototype = new Triqui.jugador();
Triqui.computador.prototype.constructor = Triqui.computador;