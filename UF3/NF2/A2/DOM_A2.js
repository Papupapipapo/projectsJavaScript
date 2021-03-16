window.onload = function(){
    init();
}

function init(){
    //1
    document.getElementsByTagName("input")[0].addEventListener("click",function(){
        document.getElementById("field").innerHTML = '<img src="star_on.gif">';
        /* document.getElementById("field").firstChild.remove();
        document.getElementById("field").firstElementChild.src = "star_on.gif"; */
    });
    
    //Estrelles 2
    
    document.getElementsByTagName("input")[1].addEventListener("click",function(){
        document.getElementById("fallenstar").remove();
    });

    //3

    document.getElementsByTagName("input")[2].addEventListener("click",function(){
        document.getElementById("target").appendChild(document.getElementById("source").firstElementChild);
    });

    //4
    document.getElementsByTagName("input")[3].addEventListener("click",function(){
        var operacio = document.getElementById("math").innerText;
        operacio = operacio.replace("=", "");
        document.getElementById("math").append(Node.TEXT_NODE.innerHTML = eval(operacio));
    });
    
    //5
    document.getElementsByTagName("input")[4].addEventListener("click",function(){
        var node = document.createElement("img");  
        node.src = "star_on.gif";   
        document.getElementById("sky").appendChild(node);
    });

    //7

    exercici7();
    
}

//6
function exercici6(){
    var container = document.getElementById("muntanyaRussa");

    container.innerHTML = "";   
    var grandariaInicial = 10;
    var incremental = 5;
    var grandariaActual = grandariaInicial;

    var string = "BonDiaBonHora";

    var stringDepurat = string.replace(/\//g, "");

    for(var i = 0; i < string.length; i++){
        
        var grandAct = grandariaActual + "px";

        var node = document.createElement("span"); 
        node.style.fontSize = grandAct;
        node.style.color = getRandomColor();
        node.textContent = string.charAt(i);
        container.appendChild(node);

        grandariaActual += incremental;
    }

}

function exercici7(){
    var fillsTaula = document.getElementById("taula_estrelles").firstElementChild.children;
    var fillConta = document.getElementById("taula_estrelles").firstElementChild.childElementCount;

    for(var i = 0; i < fillConta; i++){
        var fillsdeFill = fillsTaula[i].children;
        var contaDeFillsDeFill = fillsTaula[i].childElementCount;
        for(var o = 0; o < contaDeFillsDeFill; o++){
            var fillActual = fillsdeFill[o].firstElementChild;
            fillActual.addEventListener("mouseover",function(){this.src = "star_on.gif";});
        }
    }

}

//Copiat de internet
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function canviarEstat(td){
    
}