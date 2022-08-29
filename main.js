//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 35;
let timerInicial = 35;
let tiempoRegresivoId = null

//Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let monstrarTiempo = document.getElementById('t-restante');


//Audios
let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');

//Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(() =>{return Math.random() -0.5});
console.log(numeros);

//Funciones 
function contarTiempo(){
  tiempoRegresivoId = setInterval(()=>{
    timer--;
    monstrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if(timer == 0){
      clearInterval(tiempoRegresivoId);
      bloquearTarjetas()
      loseAudio.play()
    }
  },1000)
}

function bloquearTarjetas(){
    for (let i = 0; i<= 15; i++){
      let tarjetaBloqueada = document.getElementById(i);
      tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png" alt="">`;;
      tarjetaBloqueada.disabled = true;
    }
}

//Funcion Principal
function destapar(id){
  if(temporizador == false){
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);

  if(tarjetasDestapadas == 1){
    //Monstrar primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`;
    clickAudio.play();

    //Desabilitar primer boton
    tarjeta1.disabled = true;

  }else if(tarjetasDestapadas == 2){
    //Mosntrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML =`<img src="./images/${segundoResultado}.png" alt="">`;
    //Desabilitar segundo boton
    tarjeta2.disabled = true;
    tarjetasDestapadas++;

   //Incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if(primerResultado == segundoResultado){
      //Encerrar contador tarjetas destapadas
      tarjetasDestapadas = 0;

      //Aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
      rightAudio.play();

      if(aciertos == 8){
        winAudio.play();
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos} ¡Felicitaciones!`;
        monstrarTiempo.innerHTML = `¡Fantastico! Demoraste ${timerInicial - timer} segundos`
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
      }
    }else{
      wrongAudio.play();
      //Mostrar momentaneamente valores y vaor al tapar
      setTimeout(()=> {
        tarjeta1.innerHTML = ' ';
        tarjeta2.innerHTML = ' ';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      },800);
    }
  }
} 
