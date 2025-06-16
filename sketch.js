function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let cenaAtual = "campo";

let personagem = {

  x: 0,

  y: 0,

  tamanho: 40,

  item: null

};

let frutas = [];

let entregas = 0;

let ultimoToqueX = 0;

let ultimoToqueY = 0;

function setup() {

  createCanvas(windowWidth, windowHeight);

  personagem.x = width/2;

  personagem.y = height/2;

  

  // Cria frutas no campo

  for (let i = 0; i < 5; i++) {

    frutas.push({

      x: random(width),

      y: random(height/2, height),

      tipo: floor(random(3)),

      coletada: false

    });

  }

  

  textAlign(CENTER, CENTER);

}

function draw() {

  if (cenaAtual === "campo") {

    desenharCampo();

    desenharFrutas();

  } else {

    desenharCidade();

  }

  

  moverPersonagem();

  desenharPersonagem();

  desenharUI();

  

  // Verifica coleta de frutas

  if (cenaAtual === "campo" && !personagem.item) {

    verificarColeta();

  }

}

function desenharCampo() {

  background(135, 206, 235);

  fill(34, 139, 34);

  rect(0, height*0.7, width, height*0.3);

  

  // Árvores

  fill(139, 69, 19);

  rect(width*0.2, height*0.6, 30, height*0.4);

  fill(0, 100, 0);

  ellipse(width*0.215, height*0.6, 100, 100);

}

function desenharCidade() {

  background(10, 15, 50);

  fill(50);

  rect(0, height*0.6, width, height*0.4);

  

  // Prédios

  fill(70);

  rect(width*0.3, height*0.4, 80, height*0.6);

  rect(width*0.6, height*0.5, 60, height*0.5);

}

function desenharFrutas() {

  const cores = [color(255, 0, 0), color(255, 255, 0), color(255, 165, 0)];

  for (let fruta of frutas) {

    if (!fruta.coletada) {

      fill(cores[fruta.tipo]);

      ellipse(fruta.x, fruta.y, 30, 30);

    }

  }

}

function desenharPersonagem() {

  fill(0, 0, 255);

  ellipse(personagem.x, personagem.y, personagem.tamanho, personagem.tamanho);

  

  // Mostra item carregado

  if (personagem.item !== null) {

    const cores = [color(255, 0, 0), color(255, 255, 0), color(255, 165, 0)];

    fill(cores[personagem.item]);

    ellipse(personagem.x, personagem.y - 30, 20, 20);

  }

}

function desenharUI() {

  fill(255);

  textSize(24);

  text("Entregas: " + entregas, 80, 30);

  text(cenaAtual.toUpperCase(), width/2, 30);

  

  if (cenaAtual === "cidade" && personagem.item !== null) {

    text("Toque para entregar", width/2, height - 50);

  }

}

function moverPersonagem() {

  // Movimento por mouse/toque

  let alvoX = personagem.x;

  let alvoY = personagem.y;

  

  if (mouseIsPressed || touches.length > 0) {

    alvoX = mouseX || touches[0].x;

    alvoY = mouseY || touches[0].y;

  }

  

  // Suaviza o movimento

  personagem.x = lerp(personagem.x, alvoX, 0.1);

  personagem.y = lerp(personagem.y, alvoY, 0.1);

  

  // Muda de cena ao chegar nas bordas

  if (personagem.x < 0 && cenaAtual === "cidade") {

    cenaAtual = "campo";

    personagem.x = width;

  } else if (personagem.x > width && cenaAtual === "campo") {

    cenaAtual = "cidade";

    personagem.x = 0;

  }

}

function verificarColeta() {

  for (let i = 0; i < frutas.length; i++) {

    if (!frutas[i].coletada && 

        dist(personagem.x, personagem.y, frutas[i].x, frutas[i].y) < 35) {

      frutas[i].coletada = true;

      personagem.item = frutas[i].tipo;

      break;

    }

  }

}

function mousePressed() {

  tentarEntregar();

}

function touchEnded() {

  tentarEntregar();

  return false; // Previne comportamento padrão

}

function tentarEntregar() {

  if (cenaAtual === "cidade" && personagem.item !== null) {

    entregas++;

    personagem.item = null;

    

    // Reseta frutas se todas foram coletadas

    if (frutas.every(f => f.coletada)) {

      for (let fruta of frutas) {

        fruta.coletada = false;

        fruta.x = random(width);

        fruta.y = random(height/2, height);

      }

    }

  }

}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}