//Pau Sarda
var electricityOn = false;
var yellowBulbs; //Bombetes Grogues
var blueBulbs; //Bombetes Blaves
var star; //Estrella
var greenPixel; //Pixels verds
var lightsOff = false; //Si la electricitat esta
var girnaldaActivada = false; //MIrara si la girnalda ha sigut activada
var regalsActivats = false; //MIrara si els reglas han sigut activada

window.onload = function(){
    init();
    hoverLight();
    allOfTheLights();
    txtCatcher();   
}

//Agafem totes les funcions globals que utilitzarem i son dinamiques
function init(){
    yellowBulbs = document.querySelectorAll('.fork .yellow');//variable que siguin totes les bombetes grogues
    blueBulbs = document.querySelectorAll('.fork .blue'); //variable que siguin totes les bombetes blau
    star = document.querySelectorAll('.star .yellow'); //variable que pilli estrella d'adalt 
    greenPixel = document.querySelectorAll('.fork .green'); //variable que pilli tots els blocs green
}

//----------------------------------KEYBOARD MASTER---------------------------------\\
//En lloc de crear molts events listener fem un event listener master
function txtCatcher(){
    document.body.addEventListener("keydown",  function(event){
        var lletra = event.key; //Agafem la lletra que ha sigut apretada

        if(lletra.toUpperCase() == "Q"){
            allOfTheLights();
        }else if (lletra.toUpperCase() == "G" && !girnaldaActivada){
            addGirnaldas();
        }else if (lletra.toUpperCase() == "R" && !regalsActivats){
            addRegals();
        }else if (lletra.toUpperCase() == "L" && !lightsOff){
            allOfTheBulbs();
        }else if (lletra.toUpperCase() == "E" && !lightsOff){
            switchStar();
        }
    });
}


//----------------------------------ACT 1---------------------------------\\
/* Al  passar  el  ratolí  per  damunt  de  les  bombetes  o  l’estrella,  si  estan  enceses,  cal canviar de color 
(si estan de color blau es posaran grogues i a l’inrevés). 
Quan el ratolí surti de damunt la bombeta o l’estrella recuperarà el clor original. */

function hoverLight(){
    //Loops que defineixen a cada bulb que si es pasa per damunt i surt passara algo
    for(var i = 0; i < yellowBulbs.length;i++){
        yellowBulbs[i].addEventListener("mouseover",function(){hoverLightYellowToBlue(this)},false);
        yellowBulbs[i].addEventListener("mouseleave",function(){hoverLightBlueToYellow(this)}, false);
    }

    for(var i = 0; i < blueBulbs.length;i++){
        blueBulbs[i].addEventListener("mouseover",function(){hoverLightBlueToYellow(this)},false);
        blueBulbs[i].addEventListener("mouseleave",function(){hoverLightYellowToBlue(this)}, false);
    }
    //Aqui defineix estrelles events
    for(var i = 0; i < star.length;i++){
        star[i].addEventListener("mouseover",function(){hoverStarYellowToBlue(this)},false);
        star[i].addEventListener("mouseleave",function(){hoverStarBlueToYellow(this)}, false);
    }
    
}

//Canviara el color original per un nou
function hoverLightYellowToBlue(llum){
    llum.classList.replace("yellow","blue");
}
function hoverLightBlueToYellow(llum){
    llum.classList.replace("blue","yellow");
} 

//El mateix que els d'abans pero actua en conjunt en lloc de individual, cambiant tots
function hoverStarYellowToBlue(){
    for(var i = 0; i < star.length;i++){
        star[i].classList.replace("yellow","blue");
    }
}   
function hoverStarBlueToYellow(){
    for(var i = 0; i < star.length;i++){
        star[i].classList.replace("blue","yellow");
    }
}   




//----------------------------------ACT 2---------------------------------\\
/* Quan es polsi la lletra ‘Q’ es commutarà l’interruptor elèctric (virtual) 
general, és a dir, subministrarem llum a l’arbre o l’apagarem.Un exemple de l’arbre apagat és la figura 1. */
function allOfTheLights(){
    //Aqui cridarem als interruptors de les llums per a que s'activin
            
            switchStar(); //La estrella
        if(lightsOff){
            allOfTheBulbs(); //Encen bulbs
            lightsOff = false;
        }else{
            offAllOfTheLights(); //Apaga tot
            lightsOff = true;
        }
}

function offAllOfTheLights(){
    //El sistema va que comprova quin color tenen actualment i li treu el color que tingui tot per aixi donar igual quin estat estiguin
    for(var i = 0; i < yellowBulbs.length;i++){
        if(yellowBulbs[i].classList.contains('blue') ){
            yellowBulbs[i].classList.remove('blue');
        }else{
            yellowBulbs[i].classList.remove('yellow');
        }
    }
    for(var i = 0; i < blueBulbs.length;i++){
        if(blueBulbs[i].classList.contains('yellow')){
            blueBulbs[i].classList.remove('yellow');
        }else{
            blueBulbs[i].classList.remove('blue');
        }
    }
    for(var i = 0; i < star.length;i++){
        if(star[i].classList.contains('blue')){
            star[i].classList.remove('blue');
        }else{
            star[i].classList.remove('yellow');
        }
        
    }
}



//----------------------------------ACT 3---------------------------------\\
/* Quan es polsi la lletra ‘G’ decorarem l’arbre amb unes garlandes tal com es 
pot veure enla figura 2.Aquesta acció és única, no cal posar i treure garlandes. */
function addGirnaldas(){
    var pos = [7,13,20,21,22,23,40,47,55,56,61,65,66,74,75,76,85,100,115,116,117,132,133,134,135,136,123,124,109,97];
    for(var i = 0; i < pos.length;i++){
         greenPixel[pos[i]].style.backgroundColor = "red";
    }
    girnaldaActivada = true;
}


//----------------------------------ACT 4---------------------------------\\
/* Quan es polsi la tecla ‘R’ omplirem l’arbre de regals com es pot veure enla figura 
3. Aquesta acció és única, no cal posar i treure regals. */

    //Esdeveniment on key down r
        //Pilla en ultimas dos lineas de pot 
            //!QUE SEA SIN NODE TEXT ENTREMEDIO!!!!!!!
            //Primera 3r - 1 - 2r - 2 - 5m - 1- 1r - 3 - 1r -1
            //Segona  3r - 1 - 2r - 2 - 5m - 1- 3r - 3 - 3r -1
function addRegals(){
    //Agafarem la part d'abaix del tronc
    var trunk = document.getElementsByClassName("pot");
    var linea1Trunk = trunk[1];
    var linea2Trunk = trunk[2]; 

    //Primer agafa totes les posicions on hauran d'apareixer 1 sent regal i 0 sent buit
    var poslinea1i2 = [0,1,1,1,0,1,1,0];
    var poslinea1r = [0,0,1,0,0,0,0,1,0]; //Esta al reves
    var poslinea2r = [0,1,1,1,0,1,1,1];

    //Aqui mirara del 8 al 0 per les posicions, donat que estem afegint al reves
    for(var o = 8; o > 0;o--){
        var node = document.createElement("div");  //Node esquerra, es el mateix adalt i abaix
        var noder = document.createElement("div"); //Node dreta 
        var nodeur = document.createElement("div"); //Node dretaAdalt

         node.classList.add('light_pixel');
         noder.classList.add('light_pixel');
         nodeur.classList.add('light_pixel');

        if(poslinea1i2[o] == 1){
            node.classList.add('red');
        }
        if(poslinea1r[o] == 1){
            noder.classList.add('red');
        }
        if(poslinea2r[o] == 1){
            nodeur.classList.add('red');
        }

        linea1Trunk.appendChild(noder);
        linea2Trunk.appendChild(nodeur);

        var nodeCopy = node.cloneNode(); //Es clona ja que no li agrada pegar el node dues vegades.
        linea1Trunk.insertBefore(node,linea1Trunk.childNodes[0]); 
        linea2Trunk.insertBefore(nodeCopy,linea2Trunk.childNodes[0]); 
    }

    regalsActivats = true;

}


//----------------------------------ACT 5---------------------------------\\
/* Quan es polsi la tecla ‘L’ encendrem i apagarem les bombetes (tant les grogues com les blaves). S’ha de  vigilari
saber si l’arbre rep corrent elèctrica, és a dir, tenir en compte l’interruptor virtual.
Un exemple d’arbre amb corrent elèctrica, però amb les bombetes apagades el trobem a la figura 4. */
        function allOfTheBulbs(){
            //El sistema va que comprova quin color te actualment (arregla un bug que feia que si estaves hover es mantenia)
                    //Si esta actiu li farem toggle de la clase de color corresponent
            for(var i = 0; i < yellowBulbs.length;i++){
                if(yellowBulbs[i].classList.contains('blue')){
                    yellowBulbs[i].classList.toggle('blue');
                }else{
                    yellowBulbs[i].classList.toggle('yellow');
                }
            }
            for(var i = 0; i < blueBulbs.length;i++){
                if(blueBulbs[i].classList.contains('yellow')){
                    blueBulbs[i].classList.toggle('yellow');
                }else{
                    blueBulbs[i].classList.toggle('blue');
                }
            }
        }
        

//----------------------------------ACT 6---------------------------------\\
/* Quan es polsi la tecla ‘E’ encendrem i apagarem l’estrella. 
Igual que amb les bombetes cal controlar com està l’interruptor virtual.Exemple a la figura 5. */
function switchStar(){
    //El sistema va que comprova quin color te actualment (arregla un bug que feia que si estaves hover es mantenia)
                    //Si esta actiu li farem toggle de la clase de color corresponent
    for(var i = 0; i < star.length;i++){
        if(star[i].classList.contains('blue')){
            star[i].classList.toggle('blue');
        }else{
            star[i].classList.toggle('yellow');
        }
        
    }
}