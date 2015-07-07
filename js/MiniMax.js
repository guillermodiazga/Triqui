"use strict"
var MiniMax = function (){};

//MiniMax.JUGADOR = {HUMANO: "user",CPU: "pc"};

MiniMax.ar_triqui;
MiniMax.calculos=0;

MiniMax.tableroMarcable = function(posicion) {
    if (this.ar_triqui[posicion] == 0)
        return true;
    else
        return false;
}

MiniMax.tableroMarcar = function (turno, posicion) {
    this.ar_triqui[posicion] = turno;
    MiniMax.calculos++;
}

MiniMax.min = function() {
    if (this.validarGanador(this.JUGADOR.CPU))
        return 1;
    if (!this.tableroCeldasVacias())
        return 0;
    var n = 9;
    var aux, mejor = 9999;
    for (var i = 0; i < n; i++)
        if (this.tableroMarcable(i)) {
            this.tableroMarcar(this.JUGADOR.HUMANO, i);
            aux = this.max();
            if (aux < mejor)
                mejor = aux;
            this.tableroMarcar(0, i)
        }
    return mejor
}

MiniMax.max = function() {
    if (this.validarGanador(this.JUGADOR.HUMANO))
        return -1;
    if (!this.tableroCeldasVacias())
        return 0;
    var n = 9;
    var aux, mejor = -9999;
    for (var i = 0; i < n; i++)
        if (this.tableroMarcable(i)) {
            this.tableroMarcar(this.JUGADOR.CPU, i);
            aux = this.min();
            if (aux > mejor)
                mejor = aux;
            this.tableroMarcar(0, i);
        }
    return mejor
}

MiniMax.validarGanador = function(jugador) {
    if (this.ar_triqui[0] == jugador && this.ar_triqui[4] == jugador && this.ar_triqui[8] == jugador)
        return true;
    else if (this.ar_triqui[2] == jugador && this.ar_triqui[4] == jugador && this.ar_triqui[6] == jugador)
        return true;
    else if (this.ar_triqui[0] == jugador && this.ar_triqui[1] == jugador && this.ar_triqui[2] == jugador)
        return true;
    else if (this.ar_triqui[3] == jugador && this.ar_triqui[4] == jugador && this.ar_triqui[5] == jugador)
        return true;
    else if (this.ar_triqui[6] == jugador && this.ar_triqui[7] == jugador && this.ar_triqui[8] == jugador)
        return true;
    else if (this.ar_triqui[0] == jugador && this.ar_triqui[3] == jugador && this.ar_triqui[6] == jugador)
        return true;
    else if (this.ar_triqui[1] == jugador && this.ar_triqui[4] == jugador && this.ar_triqui[7] == jugador)
        return true;
    else if (this.ar_triqui[2] == jugador && this.ar_triqui[5] == jugador && this.ar_triqui[8] == jugador)
        return true;
    else
        return false
}

MiniMax.tableroCeldasVacias = function() {
    var n = 9;
    for (var i = 0; i < n; i++)
        if (this.ar_triqui[i] == 0)
            return true;
    return false
}

MiniMax.clone = function( obj ) {
    if ( obj === null || typeof obj  !== 'object' ) {
        return obj;
    }
 
    var temp = obj.constructor();
    for ( var key in obj ) {
        temp[ key ] = this.clone( obj[ key ] );
    }
 
    return temp;
}

MiniMax.getPos = function(ar) {
    this.calculos = 0;
    this.ar_triqui = this.clone(ar);
    var posicion = 0;
    var n = 9;
    var aux, mejor = -9999;
    for (var i = 0; i < n; i++){

        if (this.tableroMarcable(i)) {
            this.tableroMarcar(this.JUGADOR.CPU, i);
            aux = this.min();
            if (aux > mejor) {
                mejor = aux;
                posicion = i
            }
            this.tableroMarcar(0, i);
        }
    }
    this.tableroMarcar(this.JUGADOR.CPU, posicion);
    console.info("Calculos MiniMax: "+this.calculos);
    return posicion;
}