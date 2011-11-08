
var jogadas = ["ABC 1", "America 2", "Quadra America"];
//var jogadas = ["ABC 1", "America 2", "America 3", "America 4", "America 5", "Quadra ABC", "ABC 3"];
verificaSaquePerdido("ABC", "America", jogadas);
verificaBolaNoChao("ABC", "America", jogadas);
verificaBolaFora("ABC", "America", jogadas);
verificaNumeroDeToquesDosTime("ABC", "America", jogadas);
verificaDoisToques("ABC", "America", jogadas);
alert('Fim de Jogo');

function verificaDoisToques(time1, time2, jogadas) {
	
	for(var i = 0; i<jogadas.length; i++) {
		if(jogadas[i].indexOf(time1) != -1) {
			if(i >= 0 && jogadas[i] == jogadas[i-1]) {
				alert('Ponto para ' + time2);
			}
		}
		if(jogadas[i].indexOf(time2) != -1) {
			if(i >= 0 && jogadas[i] == jogadas[i-1]) {
				alert('Ponto para ' + time1);
			}
		}
	}
}

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

function verificaBolaNoChao(time1, time2, jogadas) {
	var i = findBolaNoChaoIndex(jogadas);
	if(i != -1) {//a bola caiu no chao em algum momento
		var origem = jogadas[i-1];
		var time = extractTime(origem);
		var quadra = extractTimeQuadra(jogadas[i]);
		if(time == quadra) {
			if(time == time1) {
				alert('Ponto para ' + time2)
			} else {
				alert('Ponto para ' + time1)
			}
		} else {
			alert('Ponto para ' + time);
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
function findBolaNoChaoIndex(jogadas) {
	for(var i = 0; i<jogadas.length; i++) {
		if(jogadas[i].indexOf("Quadra") != -1) {
			return i;
		}
	}
	return -1;
}

function verificaSaquePerdido(time1, time2, jogadas) {
	var perdeuSaque = jogadas.length > 1 && jogadas[1] == "REDE";
	if(perdeuSaque) {
		var quemPerdeu = extractTime(jogadas[0]);
		if(quemPerdeu == time1) {
			alert('Ponto para ' + time2);
		}
		if(quemPerdeu == time2) {
			alert('Ponto para ' + time1);
		}
	}
	
	
}

function extractTime(jogador) {
	
	return jogador.substring(0, jogador.length-2);
}