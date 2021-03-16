//En cuant el programa s'inici volem que carregui els elements, sino no ho dona per valid si no li diem per aqui
window.onload = function() {
    if(loadPopUp('welcome')){ //Fins que no acabi el popUp, no podra jugar
        initializeGame(); //Inicalitzem
        document.getElementById("new_game").addEventListener("click", function(){initializeGame()}, false); //Li diem que si apreta el id new_Game que començi un niou joc com a event
    };  
   
}

/* Estructura "constant" del joc */
var gameConfig = {
    liveLook: ["monster5.png", "monster4.png", "monster3.png", "monster2.png", "monster1.png", "monster0.png"],
    wordsToGuess: ["elefant", "criatura", "llapis", "maduixa"],
    numberOfLives: 5,
}

/* Estructura per tenir controlat en tot moment l'estat del joc */
var gameStatus = {
    status: "playing",
    lives: gameConfig.numberOfLives,
    wordToGuess: "",
    wordCompleted: "",
    clueStop: false, //Aixo ens serveix per a evitar un bug causat per el mouseover
}

//---------------MENU------------\\
function loadPopUp(idtexte){ //Aqui canviarem el display de el popUp de none a block i en cuant ja li doni al boto tornara a ser invisible
    var popUp =  document.getElementById("info");
    popUp.style.display = "block";
    document.getElementById(idtexte).style.display = "block";
    //Opcions son : welcome , game_success, game_fail
    document.getElementById('btn_ok').addEventListener("click", function() { //Treiem els displays
        popUp.style.display = 'none'; 
        document.getElementById(idtexte).style.display = "none";}, false);
    return true;
}

//----------EVENTS--------\\
var handler = function(event){checkKey(event)}; //Aqui definim la funcio que fara el teclat, la definim aixi ja que sino no la podrem definir per a els eventsListeners
var handlerRemove = function(){removeClue()};
var handlerGive = function(){giveClue()};

var eventsListenersDinamic =  function(){ //Segons si estem playing o no, aquesta funcio afegira events o els treura, aixo ens serveix per a que el joc es pari completament
    if(gameStatus.status == "playing"){
        document.getElementById("clue").addEventListener("mouseover", handlerGive, false);
        document.getElementById("clue").addEventListener("mouseleave", handlerRemove , false);
        document.getElementsByTagName("body")[0].addEventListener("keyup", handler , false); 
    }else{
        document.getElementsByTagName("body")[0].removeEventListener("keyup",  handler , false);
        document.getElementById("clue").removeEventListener("mouseleave",handlerRemove, false);
        document.getElementById("clue").removeEventListener("mouseover", handlerGive, false);
    }
        
}

//-------------------INICIALITZAR----------------\\
function initializeGame(){//Aquest inicialitzara el joc cada vegada que li demanem
    gameStatus.status = "playing";
    eventsListenersDinamic();//Aqui definim els events que fara el nostre programa

    gameStatus.wordToGuess = gameConfig.wordsToGuess[randomNumber(gameConfig.wordsToGuess.length , 0)]; //Selecciona una paraula aleatoria nova

    var espaisblancs = '';
    for(var i = 0; i < gameStatus.wordToGuess.length;i++){
        espaisblancs+= '_';
    }

    //Reiniciem tots els valors
    gameStatus.wordCompleted = espaisblancs;
    gameConfig.numberOfLives = 5;
    

    document.getElementById('monster').src = 'img/' + gameConfig.liveLook[gameConfig.numberOfLives];
    document.getElementById('letters').innerHTML  = gameStatus.wordCompleted;
    document.getElementById('lives').innerHTML =  gameConfig.numberOfLives + ' LIVES LEFT';
}

function randomNumber(max, min){ //Amb aixo generem un numero aleatori en un rang
    return Math.round(Math.random() * (max - min) ) + min;
}

//--------------PISTA------------\\
function giveClue(){ //Li donara la pista, buscara el primer _ que trobi i retornara el caracter que va alli
    if(!gameStatus.clueStop){ //Amb aixo arreglem un bug que feia que mentres estiguesim fent hover la lletra s'aniria canviant dinamicament
        var index = gameStatus.wordCompleted.indexOf('_');
        var caracterQueMostrarem = gameStatus.wordToGuess.charAt(index);
        document.getElementById('clue').innerHTML = '<span>' + caracterQueMostrarem.toUpperCase() + '</span>';
        gameStatus.clueStop = true;
    }
}

function removeClue(){//La que s'aplica al sortir del ?, li diu que torni a ser ? i resti un punt
    document.getElementById('clue').innerHTML = '<span>?</span>';
    gameStatus.clueStop = false;
    restar();
}

//-----------------MAIN GAME------------------\\
/* Aquesta funcio mirara si la lletra que li donem sera bona o no, ha de filtrar que solament sigui texte i si esta a la paraula que volem
*  En general es la funcio principal que ja que aquesta mateixa comprova si el joc s'acaba
*/
function checkKey(e){ 
    var codi = e.code; //Li donem per var, ja que es confon bastant sino
    
    var paraulaActual = ''; //Aqui anirem guardant el nou gameStatus.wordCOmpleted
        if(codi.includes("Key")){ //Ens asegurem que es una lletra
                if(mirarSiEsCorrecte(e.key)){ //Comprovem si la lletra actual es valida i si podem continuar
                    for(var i = 0; i < gameStatus.wordToGuess.length;i++){ 
                        if(gameStatus.wordToGuess.charAt(i) == e.key){ //Si el char de la paraula ocula es correcte li direm que el proxim caracter es el que nosaltres tenim
                            paraulaActual += e.key;
                        }else{ //Sino que mantingui el caracte que ja habia
                            paraulaActual += gameStatus.wordCompleted.charAt(i);
                        }
                    }
                    correcte(paraulaActual);
                }
                else{ //En cas de error anirem aqui
                    restar();
                }
        }
    
}

function correcte(paraulaActual){ //Si es correcte la lletra
    gameStatus.wordCompleted = paraulaActual; //La nova paraula completada es paraulaActual
    document.getElementById('letters').innerHTML  = gameStatus.wordCompleted.toUpperCase(); //Li direm al html que mostri aixo
    if(gameStatus.wordCompleted == gameStatus.wordToGuess){
        stopGame("game_success");
    }
}

function restar(){ //Si es incorrecte la lletra
    gameConfig.numberOfLives--; //Restem vides
    document.getElementById('lives').innerHTML =  gameConfig.numberOfLives + ' LIVES LEFT';
    document.getElementById('monster').src = 'img/' + gameConfig.liveLook[gameConfig.numberOfLives]; //Canviem el ninot
    if(gameConfig.numberOfLives == 0){ //Si no queden vides li saltara aquesta pantalla i no podra seguint jugant(comprovant que pugui)
        stopGame("game_fail");
    }
}

function stopGame(msg){ //Aquesta funcio saltara el misatge corresponent al fi de partida i treura els events, fent que no pugui ser res modificat
    loadPopUp(msg);
    gameStatus.status = "stop";
    eventsListenersDinamic();
    
}
function mirarSiEsCorrecte(lletra){ //Ho fem en funcio ja que queda lleix lo llarg que es, busca si esta almenys una vegada i que hi hagi mes de 0 vides
    return ((gameStatus.wordToGuess.indexOf(lletra) != -1)) && (gameConfig.numberOfLives > 0);
}