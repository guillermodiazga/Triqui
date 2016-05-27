//interfaz
"use strict";
var interfazTriqui = new function ($){

//init
	var triqui;
	var tablero;
	var user;
	var pc;
	
	var sonidos = {
					on : true,
					empate : "Punchline Drum",
					perdio : "Concussive Hit Guitar Boing",
					gano : "Battle Crowd Celebrate Stutter",
					nuevo : "Swoosh",
					jugando : "Pen Clicking"
				};
	addEventos();
	nuevoJuego();

	$('#tablero').addClass('magictime spaceInRight');

	function nuevoJuego (modo){
		triqui = new Triqui.juego();
		tablero = new Triqui.tablero();
		user = new Triqui.jugador("x");
		pc = new Triqui.computador("o");
		MiniMax.JUGADOR = {HUMANO: user.name, CPU: pc.name};
		triqui.jugadorActual = user.name;
		triqui.modo = modo || "facil";
		showMensaje("Nuevo juego en modo: "+triqui.modo, sonidos.nuevo);
	};

	function pintarJugada (id, name, clase) {
		$("#"+id)
			.text(name)
			.addClass(clase);

		console.info("Jugo: "+triqui.jugadorActual)
	};
	
	function juegaPersona(id){
		var jugador =  user.name;
		if(triqui.jugadorActual != user.name && triqui.modo == "multiplayer"){
			jugador = pc.name;
		}
		tablero.campos = user.marcar(tablero.campos, id, jugador);
		pintarJugada(id, jugador, "user");

		triqui.jugadorActual = (triqui.jugadorActual == user.name)? pc.name : user.name;

		showMensaje("Juega '"+ triqui.jugadorActual.toUpperCase() +"' en modo "+triqui.modo, sonidos.jugando );
	};

	function juegoEnModoMedio () {
		var modo;
		if(triqui.modoAntes != "facil"){
			modo = "facil";
			triqui.modoAntes = "facil";
			console.info("PC Jugara Facil");
		}else{
			modo = "invencible";
			triqui.modoAntes = "invencible"
			console.info("PC Jugara Invencible");
		}

		return modo;
	};

	function juegaPc(){
		var modo = triqui.modo;

		if(triqui.modo == "medio")
				modo = juegoEnModoMedio();

		var pocision = pc.procesarMovida(tablero.campos, modo)
		tablero.campos = pc.marcar(tablero.campos, pocision, pc.name);
		pintarJugada(pocision, pc.name, "pc");
		triqui.jugadorActual = user.name;

		var rutaGanadora = tablero.validarGanador(tablero.campos, pc.name);
		if(rutaGanadora){
			resaltarRutaGano(rutaGanadora);
			showMensaje("Gano: "+pc.name, sonidos.perdio);
			triqui.estadoJuego = "Terminado";
		}else{
			showMensaje("Jugando "+ triqui.jugadorActual +" en modo "+triqui.modo, sonidos.jugando );
		}
	};

	function addEventos(){
			addEventosCelda ();
			addEventosBotones ();
	};

	function addEventosCelda (){
		$(".celda").click(function(){
			if(tablero.campos[this.id] != 0)
				return false;

			if(triqui.estadoJuego == "Jugando"){
				juegaPersona(this.id);
				

				if(!tablero.validarGanador(tablero.campos, user.name) && tablero.hayCeldasVacias(tablero.campos)){
					if(triqui.modo != "multiplayer")
							juegaPc();
				}else{//fin Juego
					var rutaGanadora = tablero.validarGanador(tablero.campos, user.name);
					if(rutaGanadora){
						showMensaje("Gano: "+user.name, sonidos.gano);
						resaltarRutaGano(rutaGanadora);
					}else{
						showMensaje("Empate", sonidos.empate);
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

	function addEventosBotones () {

		$(".modo").click(function(){
			nuevoJuego($(this).attr("data-value"));
			limpiarTablero();
			animationClearCeldas();
		});

		$(".control").click(function(){
			nuevoJuego(triqui.modo);
			limpiarTablero();
			animationClearCeldas();
		});

		$("input[name='modo'], button").click(function(){
			nuevoJuego();
			limpiarTablero();
			animationClearCeldas();
		});

		$("#sonido").click(function(){
			sonidos.on = $(this)[0].checked
		});
	}

	function resaltarRutaGano(rutaGanadora){
		for(var i in rutaGanadora){
			$("#"+rutaGanadora[i]).addClass("gano");
		}
	};

	function showMensaje (text, audio) {
		var consola = $("#consola")
		consola.text(text);
		setTimeout(function(){
			consola.addClass('puffOut');
		},10);
		setTimeout(function(){
			consola.removeClass('puffOut');
		},500);

		if(sonidos.on == true)
			sonar(audio);
	};

	function sonar(name){
		var sonido = new Audio();
		var ruta = "assets/"+name+".mp3";
		sonido.src = ruta;
		sonido.play();

		setTimeout(function(){
			sonido.pause();
			
		},3000);

	};
		
	function animationClearCeldas(){
		var celdas = $(".celda");
		celdas.parent().fadeTo(300, 0.5);
		celdas.each(function(id){
			var celda = $(this);
			setTimeout(function(){
				celda.toggleClass("gano");
			},50*id);
			celda.toggleClass("gano");
		});	

		celdas.parent().fadeTo(500,1);
		
	};		
	
	
}($);
