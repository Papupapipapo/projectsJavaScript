$(document).ready(function(){
    //1
    $("input:eq(0)").click(function(){
        $("#field").html('<img src="star_on.gif">');
    });

     //2
     $("input:eq(1)").click(function(){
        $("#fallenstar").remove();
    });
    //3
    $("input:eq(2)").click(function(){
        $("#source").children("img:first-child").appendTo("#target");
    });
    //4
    $("input:eq(3)").click(function(){
        var operacio = $("#math").text();
        operacio = operacio.replace("=", "");
        $("#math").append(eval(operacio));
    });
    //5
    $("input:eq(4)").click(function(){
        $("#sky").append($("<span>").append($("<img>").attr("src","star_on.gif")));
    });
  

    exercici7();
}); 

function exercici6(){
    var container = $("#muntanyaRussa");
    container.html(''); //Nateixa contenidor

    //Inicialitzem
    var grandariaInicial = 10;
    var incremental = 5;
    var grandariaActual = grandariaInicial;

    var string = "BonDiaBonHora";

    var stringDepurat = string.replace(/\//g, ""); //Posteritat depuraria el texte

    for(var i = 0; i < string.length; i++){
        var node = $("<span>"); //Creem el span
        node.css("fontSize", grandariaActual); //Li donem fontsize
        node.css("color",  getRandomColor()); //Li donem color
        node.text(string.charAt(i)); //Mira quin caracter li toca

        container.append(node); //Afegeix el node span nou a el contenidor

        grandariaActual += incremental; //Augmentem
    }

}
 

function exercici7(){
    var fillsTaula = $("#taula_estrelles").children(":first-child").children();
    var fillConta = fillsTaula.length;

    for(var i = 0; i < fillConta; i++){
        var fillsdeFill = $(fillsTaula[i]).children();
        var contaDeFillsDeFill = fillsdeFill.length;
        for(var o = 0; o < contaDeFillsDeFill; o++){
            var fillActual = $(fillsdeFill[o]).children(":first-child");
            fillActual.mouseover(function(){this.src = "star_on.gif";})
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