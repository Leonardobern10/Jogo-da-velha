const pagina = {
  visual: {
    espaco: document.getElementsByClassName("espaco"),
    tempo_jogo: document.getElementById("tempo-de-jogo"),
    placar: document.getElementById("placar"),
    vez: document.getElementById("vez"),
    xPontos: document.getElementById("xPontos"),
    oPontos: document.getElementById("oPOntos"),
    botao: document.getElementsByTagName("button")[0],
  },

  logica: {
    vezX: function (elemento) {
      elemento.textContent = "X";
    },
    
    vezO: function (elemento) {
      elemento.textContent = "O";
    },

    mostraVez: function (vezAtual) {
      let jogadorAtual = vezAtual === "X" ? "O" : "X";
      pagina.visual.vez.textContent = `Jogador ${jogadorAtual} é a sua vez!`
    }
  },
};

const resetButton = pagina.visual.botao;
resetButton.addEventListener("click", () => {
  location.reload()
})


const elementos = [];
let indice = 0;
let xVitorias = 0;
let oVitorias = 0;
let jogoAcabou = false;
let tempoCorrido = null;
const eventListeners = [];
for (let i = 0; i < 3; i++) {
  const linha = [];
  for (let j = 0; j < 3; j++) {
    linha.push(pagina.visual.espaco[indice]);
    indice++;
  }
  elementos.push(linha);
}
pagina.visual.xPontos.textContent = xVitorias;
pagina.visual.oPontos.textContent = oVitorias;

function determinaVez(el) {
  let jogadorX = true; // Começa com o jogador X
  for (let i = 0; i < 3; i++) {
    eventListeners[i] = []
    for (let j = 0; j < 3; j++) {
      const callback = () => {
        if(jogadorX && el[i][j].textContent === ""){
          pagina.logica.vezX(el[i][j]);
          pagina.logica.mostraVez("X");
          jogadorX = false;
          condicaoVitoria(elementos)
        } else if (!jogadorX && el[i][j].textContent === "") {
          pagina.logica.vezO(el[i][j]);
          jogadorX = true;
          condicaoVitoria(elementos);
          pagina.logica.mostraVez("O");
        }
      };
      el[i][j].addEventListener("click", callback);
      eventListeners[i][j] = callback;
    }
  }
}

function condicaoVitoria(tabuleiro) {
  let jogadorOGanhou = false;
  let jogadorXGanhou = false;
  let empate = true;
  // Verificação das linhas
  for (let i = 0; i < 3; i++) {
    if (
      tabuleiro[i][0].textContent === "X" &&
      tabuleiro[i][1].textContent === "X" &&
      tabuleiro[i][2].textContent === "X"
    ) {
      console.log("Jogador X venceu na linha " + (i + 1));
      jogadorXGanhou = true; // Termina a função assim que encontrar uma vitória
    } else if (
      tabuleiro[i][0].textContent === "O" &&
      tabuleiro[i][1].textContent === "O" &&
      tabuleiro[i][2].textContent === "O"
    ) {
      console.log("Jogador O venceu na linha " + (i + 1));
      jogadorOGanhou = true; // Termina a função assim que encontrar uma vitória
    }
  }

  // Verificação das colunas
  for (let i = 0; i < 3; i++) {
    if (
      tabuleiro[0][i].textContent === "X" &&
      tabuleiro[1][i].textContent === "X" &&
      tabuleiro[2][i].textContent === "X"
    ) {
      console.log("Jogador X venceu na coluna " + (i + 1));
      jogadorXGanhou = true;
    } else if (
      tabuleiro[0][i].textContent === "O" &&
      tabuleiro[1][i].textContent === "O" &&
      tabuleiro[2][i].textContent === "O"
    ) {
      console.log("Jogador O venceu na coluna " + (i + 1));
      // Faça algo para indicar a vitória do jogador O
      jogadorOGanhou = true;
    }
  }

  // Verificação da diagonal principal (de cima para baixo da esquerda para a direita)
  if (
    tabuleiro[0][0].textContent === "X" &&
    tabuleiro[1][1].textContent === "X" &&
    tabuleiro[2][2].textContent === "X"
  ) {
    console.log("Jogador X venceu na diagonal principal");
    jogadorXGanhou = true;
  } else if (
    tabuleiro[0][0].textContent === "O" &&
    tabuleiro[1][1].textContent === "O" &&
    tabuleiro[2][2].textContent === "O"
  ) {
    console.log("Jogador O venceu na diagonal principal");
    // Faça algo para indicar a vitória do jogador O
    jogadorXGanhou = true;
  }

  // Verificação da diagonal secundária (de cima para baixo da direita para a esquerda)
  if (
    tabuleiro[0][2].textContent === "X" &&
    tabuleiro[1][1].textContent === "X" &&
    tabuleiro[2][0].textContent === "X"
  ) {
    console.log("Jogador X venceu na diagonal secundária");
    // Faça algo para indicar a vitória do jogador X
    jogadorXGanhou = true;
  } else if (
    tabuleiro[0][2].textContent === "O" &&
    tabuleiro[1][1].textContent === "O" &&
    tabuleiro[2][0].textContent === "O"
  ) {
    console.log("Jogador O venceu na diagonal secundária");
    // Faça algo para indicar a vitória do jogador O
    jogadorOGanhou = true;
  }
    if(jogadorXGanhou) {
      xVitorias++;
      pagina.visual.xPontos.textContent = xVitorias;
      terminoJogo();
      clearTimeout(tempoCorrido);
      jogoAcabou = true;
      alert("O jogador X ganhou!");
      reiniciarJogo();
    } else if (jogadorOGanhou) {
      oVitorias++;
      pagina.visual.oPontos.textContent = oVitorias;
      terminoJogo();
      clearTimeout(tempoCorrido);
      jogoAcabou = true;
      alert("O jogador O ganhou!");
      reiniciarJogo();
    }
    for(let x = 0; x < 3; x++){
      for(let y = 0; y < 3; y++){
        if(tabuleiro[x][y].textContent === ""){
        empate = false;
        break;
      }
    }
    if(!empate) {
      break;
    }
    }
    if(!jogadorXGanhou && !jogadorOGanhou && empate){
      clearInterval(tempoCorrido);
      alert("partida empatada!");
      reiniciarJogo()
    }
  }





function cronometro() {
  let segundos = 0;
  let minutos = 0;
  function incrementaTempo() {
    let segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;
    let minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
    pagina.visual.tempo_jogo.textContent = `${minutosFormatados}:${segundosFormatados}`;
    segundos++;
    tempoCorrido = setTimeout(incrementaTempo, 1000);
    if (segundos > 59) {
      minutos++;
      segundos = 0;
    }
  }
  incrementaTempo();
}

function reiniciarJogo() {
  jogoAcabou = false;
  for(let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++) {
      elementos[i][j].textContent = '';
    }
  }
  determinaVez(elementos);
  cronometro();
}

function terminoJogo() {
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      elementos[i][j].removeEventListener("click", eventListeners[i][j])
    }
  }
}

function main() {
  determinaVez(elementos);
  cronometro();
}



main();
