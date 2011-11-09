var _BALL_STATE = {
		JOGADOR : 1,
		QUADRA : 2,
		REDE : 3,
		FORA : 4
};
function Quadra(lado1, lado2) {
	this.lado1 = lado1;
	this.lado2 = lado2;
}

function Time(nome, quadra) {
	this.nome = nome;
}

function Game(time1, time2) {
	this.quadra = new Quadra("Quadra " + time1, "Quadra " + time2);
	this.time1 = new Time(time1, this.quadra.lado1);
	this.time2 = new Time(time2, this.quadra.lado2);
	this.ganhador = null;
	this.listeners = [
	                 new VerificaRedeListener(),
	                 new VerificaBolaNoChaoListener(),
	                 new VerificaBolaForaListener(),
	                 new VerificaNumeroToquesTimeListener(),
	                 new VerificaDoisToquesListener()
	                  ]
}
Game.prototype.jogar = function(jogadas) {
	var alguemGanhou = false;
	var i = 0;
 	while(!alguemGanhou && i < jogadas.length) {
 		this.fireGameChanged(jogadas, i);
 		i++;
 		alguemGanhou = this.ganhador != null;
 	}
	return this.ganhador;
}

Game.prototype.fireGameChanged = function(jogadas, i) {
	for(var k = 0; k < this.listeners.length; k++) {
		this.listeners[k].gameChanged(this, jogadas, i);
	}
}

function VerificaRedeListener() {}
function VerificaBolaNoChaoListener() {}
function VerificaBolaForaListener() {}
function VerificaNumeroToquesTimeListener() {}
function VerificaDoisToquesListener() {}

VerificaRedeListener.prototype.gameChanged = function(game, jogadas, i) {
	var isBolaNaRede = jogadas[i] == "REDE";
	if(isBolaNaRede) {
		var quemPerdeu = extractTime(jogadas[i-1]);
		if(quemPerdeu == game.time1.nome) {
			game.ganhador = game.time2
		}
		if(quemPerdeu == game.time2.nome) {
			game.ganhador = game.time1;
		}
	}
}

VerificaBolaNoChaoListener.prototype.gameChanged = function(game, jogadas, i) {
	var isBolaNoChao = jogadas[i].indexOf("Quadra") != -1;
	if(isBolaNoChao) {
		var origem = jogadas[i-1];
		var nomeTime = extractTime(origem);
		var quadra = extractTimeQuadra(jogadas[i]);
		if(nomeTime == quadra) {
			if(nomeTime == game.time1.nome) {
				game.ganhador = game.time2;
			} else {
				game.ganhador = game.time1;
			}
		} else {
			if(nomeTime == game.time1.nome) {
				game.ganhador = game.time1;
			} else {
				game.ganhador = game.time2;
			}
		}
	}
}

VerificaBolaForaListener.prototype.gameChanged = function(game, jogadas, i) {
 	alert("Verificando Bola Fora");
}

VerificaNumeroToquesTimeListener.prototype.gameChanged = function(game, jogadas, i) {
 	alert("Verificando Numero de Toques dos times");
}

VerificaDoisToquesListener.prototype.gameChanged = function(game, jogadas, i) {
	var time1 = game.time1;
	var time2 = game.time2;
	if(jogadas[i].indexOf(time1.nome) != -1) {
		if(i >= 0 && jogadas[i] == jogadas[i-1]) {
			game.ganhador = time2;
		}
	}
	if(jogadas[i].indexOf(time2.nome) != -1) {
		if(i >= 0 && jogadas[i] == jogadas[i-1]) {
			game.ganhador = time1;
		}
	}
}

//main
var game = new Game("ABC", "America");
var ganhador = game.jogar(["ABC 1", "America 1", "Quadra ABC"]);

if(ganhador != null) {
	alert("Ponto para " + ganhador.nome);
} else {
	alert('Jogada incompleta');
}
//end;













//var jogadas = ["ABC 1", "America 2", "Quadra America"];
//var jogadas = ["ABC 1", "America 2", "America 3", "America 4", "America 5", "Quadra ABC", "ABC 3"];
//verificaSaquePerdido("ABC", "America", jogadas);
//verificaBolaNoChao("ABC", "America", jogadas);
//verificaBolaFora("ABC", "America", jogadas);
//verificaNumeroDeToquesDosTime("ABC", "America", jogadas);
//verificaDoisToques("ABC", "America", jogadas);
//alert('Fim de Jogo');


function verificaNumeroDeToquesDosTime(time1, time2, jogadas) {
	var countToques1 = 0;
	var countToques2 = 0;
	for(var i = 0; i<jogadas.length; i++) {
		if(jogadas[i].indexOf(time1) != -1) {
			countToques1++;
			if(countToques1 > 3) {
				alert('Ponto para ' + time2);
			}
		} else {
			countToques1 = 0;
		}
		
		if(jogadas[i].indexOf(time2) != -1) {
			countToques2++;
			if(countToques2 > 3) {
				alert('Ponto para ' + time1);
			}
		} else {
			countToques2 = 0;
		}
	}
}

function verificaBolaFora(time1, time2, jogadas) {
	var i = findBolaForaIndex(jogadas);
	if(i != -1) {//a bola caiu no chao em algum momento
		var origem = jogadas[i-1];
		var time = extractTime(origem);
		if(time == time1) {
			alert('Ponto para ' + time2);
		}
		if(time == time2) {
			alert('Ponto para ' + time1);
		}
	}
}

function findBolaForaIndex(jogadas) {
	for(var i = 0; i<jogadas.length; i++) {
		if(jogadas[i].indexOf("Fora") != -1) {
			return i;
		}
	}
	return -1;
}

function extractTimeQuadra(token) {
	return token.substring("Quadra ".length);
}

function extractTime(jogador) {
	
	return jogador.substring(0, jogador.length-2);
}