//interfaz
"use strict";
var interfazTriqui = new function (){

//init
	var triqui;
	var tablero;
	var user;
	var pc;
	addEventosCelda();
	nuevoJuego();

	function nuevoJuego (){
		triqui = new Triqui.juego();
		tablero = new Triqui.tablero();
		user = new Triqui.jugador("x");
		pc = new Triqui.computador("o");
		MiniMax.JUGADOR = {HUMANO: user.name,CPU: pc.name};
		triqui.jugadorActual = user.name;
		triqui.modo = ($("#facil:checked").size())? "facil" : "invencible";
		console.log("Nuevo juego en modo: "+triqui.modo);
	};

	function pintarJugada (id, name, clase) {
		$("#"+id)
			.text(name)
			.addClass(clase);

		console.info("Jugo: "+triqui.jugadorActual)
	};
	
	function juegaPersona(id){
		tablero.campos = user.marcar(tablero.campos, id, user.name);
		pintarJugada(id, user.name, "user");
		triqui.jugadorActual = pc.name;
	};

	function juegaPc(){
		var pocision = pc.procesarMovida(tablero.campos, triqui.modo)
		tablero.campos = pc.marcar(tablero.campos, pocision, pc.name);
		pintarJugada(pocision, pc.name, "pc");
		triqui.jugadorActual = user.name;

		var rutaGanadora = tablero.validarGanador(tablero.campos, pc.name);
		if(rutaGanadora){
			animacionGano(rutaGanadora);
			console.log("Gano Pc");
			triqui.estadoJuego = "Terminado";
		}
	};

	function addEventosCelda (){
		$(".celda").click(function(){
			if(tablero.campos[this.id] != 0)
				return false;

			if(triqui.estadoJuego == "Jugando"){
				juegaPersona(this.id);
				if(!tablero.validarGanador(tablero.campos, user.name) && tablero.hayCeldasVacias(tablero.campos)){
					juegaPc();
				}else{//fin Juego
					var rutaGanadora = tablero.validarGanador(tablero.campos, user.name);
					if(rutaGanadora){
						console.log("Gano User");
						animacionGano(rutaGanadora);
					}else{
						console.log("Empate");
					}
					triqui.estadoJuego = "Terminado";
				}
			}

		});
	};
	
	function limpiarTablero() {
		$(".celda")
			.text("")
			.removeClass("user")
			.removeClass("gano")
			.removeClass("pc");

		$("#jugadas").text("");
	};

	$("input, button").click(function(){
		nuevoJuego();
		limpiarTablero();
	});

	function animacionGano(rutaGanadora){
		for(var i in rutaGanadora){
			$("#"+rutaGanadora[i]).delay(5000).addClass("gano");
		}
	};

	console.log = function(a){$("#consola").text(a)}
	
}();
