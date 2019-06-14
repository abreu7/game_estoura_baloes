//Variável que armazena a chamada da função contagem_tempo
var timeId = null;

function inicia_jogo() {

	//Utilizo o atributo search para retornar o que está a partir do ? da URL
	var url = window.location.search; 

	//Utilizo a função replace para retirar o ? e pegar somente o nível
	var nivel_jogo = url.replace("?", "");
	
	//Recebe o tempo de duração do jogo
	var tempo_jogo = 0; 

	//Verifico qual nível foi escolhido para selecionar o tempo
	//Fácil
	if (nivel_jogo == 1) {
		tempo_jogo = 120;
		qtd_baloes = 30;
	}
	//Médio
	if (nivel_jogo == 2) {
		tempo_jogo = 60;
		qtd_baloes = 60;
	}
	//Difícil
	if (nivel_jogo == 3) {
		tempo_jogo = 30;
		qtd_baloes = 80;
	}

	//Inserindo segundos no span
	//innerHTML é para inserir entre a tag span
	document.getElementById('cronometro').innerHTML = tempo_jogo;

	//Inserindo os balões
	var qtd_baloes;
	cria_baloes(qtd_baloes)

	//Escrevo a quantidade de balões inteiros na tela do jogo
	document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
	//Escrevo a quantidade de balões estourados na tela do jogo
	document.getElementById('baloes_estourados').innerHTML = 0;

	//Chamo a função cronometro passando o tempo do jogo
	contagem_tempo(tempo_jogo);
}

//Função que cria os balões na tela
function cria_baloes(qtd_baloes){

	for (var i = 1; i <= qtd_baloes; i++) {
		//Criando o elemento balão
		var balao = document.createElement("img");
		//Atribuindo a imagem ao elemento
		balao.src = 'imagens/balao_azul_pequeno.png';
		//Adiciono uma margem ao elemento
		balao.style.margin = '10px';
		//Crio um id para cada balão
		balao.id = 'b'+i;
		//Adiciono o evento ao clicar no bolão e passo o próprio elemento como parametro
		balao.onclick = function(){estourar(this);}
		//Adiciona o elemento balão dentro do elemento pai cenario
		document.getElementById('cenario').appendChild(balao);

	}


}

//Função cronometro
function contagem_tempo(segundos) {

	//Decremento 1 segundo a cada chamada da função
	segundos = segundos - 1;

	if (segundos == -1) {
		//Interrompe a exucução da função setTimeout
		clearTimeout(timeId);
		//Chamo a função de Game over
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timeId = setTimeout("contagem_tempo("+segundos+")", 1000); // 1000 milisegundos = 1 segundo
	
}

function game_over() {

	alert('Fim de jogo. Você não conseguiu estourar todos os balões a tempo');
	window.location.href = 'index.html';	
	}

function estourar(ele_balao) {
	//Recupero o id do balão
	var id_balao = ele_balao.id
	//Removo o evento de onclick do balao para não ser possível clicar novamente
	document.getElementById(id_balao).setAttribute("onclick", "")
	//Altero para o balão estourado ao ser clicado
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

	//Chamo a função que calcula a pontuação
	pontuacao(1);
}

function pontuacao(acao) {
	//Recupero o conteudo das tags
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML ;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML ;
	
	//Converto para inteiro para efetuar os calculos
	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	//Efetuo a subtração pra baloes inteiros e soma para estourados 
	baloes_inteiros = baloes_inteiros - acao;
	baloes_estourados = baloes_estourados + acao;

	//Atualizo os novos valores de balões inteiros e estourados
	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	//Função que verifica se todos os balões foram estourados
	situacao_jogo(baloes_inteiros);

}

function situacao_jogo(baloes_inteiros) {

	//Verifica se todos balões foram estourados
	if (baloes_inteiros == 0) {
		alert('Parabéns, você estourou todos os balões a tempo!');

		//Interrompo a função setTimeout para parar o tempo
		parar_jogo();
	}
}

//Função que para o tempo do jogo
function parar_jogo(argument) {
	clearTimeout(timeId);
}