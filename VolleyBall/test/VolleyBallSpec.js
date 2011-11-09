var _AMERICA = "America";
var _ABC = "ABC";
describe("VolleyBall", function() {
	it("bola na rede", function() {
		var game = new Game(_ABC, _AMERICA);
		var jogadas = ["ABC 1", "REDE"];
		var ganhador = game.jogar(jogadas);
		expect(ganhador.nome).toEqual(_AMERICA);
	});
	
	it("dois toques", function() {
		var game = new Game(_ABC, _AMERICA);
		var jogadas = ["America 4", "ABC 1", "ABC 4", "ABC 4"];
		var ganhador = game.jogar(jogadas);
		expect(ganhador.nome).toEqual(_AMERICA);
	});
	
	it("jogada incompleta", function() {
		var game = new Game(_ABC, _AMERICA);
		var jogadas = ["America 4", "ABC 1", "ABC 4"];
		var ganhador = game.jogar(jogadas);
		expect(ganhador).toEqual(null);
	});
	
	it("bola no chao do ABC", function() {
		var game = new Game(_ABC, _AMERICA);
		var jogadas = ["ABC 1", "America 2", "America 3", "America 4", "Quadra ABC", "ABC 3"];
		var ganhador = game.jogar(jogadas);
		expect(ganhador.nome).toEqual(_AMERICA);
	});
}); 