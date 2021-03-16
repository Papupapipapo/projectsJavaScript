//PauSardaSanchez
$(document).ready(function(){
    //1
    $("input:eq(0)").click(function(){
        $("#star").attr("src","star_on.gif");
    });

    //2
    $("input:eq(1)").click(function(){
        $("#estrelles > img:nth-child(2)").attr("src","star_on.gif");
    });

    //3
    $("input:eq(2)").click(function(){
        $("#frase > *:first-child > img:first-child").attr("src","star_on.gif");
    });

    //4
    $("input:eq(3)").click(function(){
        $("#ultima").prev().prev().attr("src","star_on.gif");
    });

    //5
    $("input:eq(4)").click(function(){
        $("#inici").parent().next().children("img:first-child").attr("src","star_on.gif");
    });

    //6
    $("input:eq(5)").click(function(){
        var c = $("body").children().length;
        
        for(var i = 0; i < c;i++){
            $("body").children(":nth-child(" + i + ")").css("border", "thick solid red");
            if(  $("body").children(":nth-child(" + i + ")").children().length > 0){
                var elemChildCount = $("body").children(":nth-child(" + i + ")").children().length;
                
                for(var o = 0; o < elemChildCount;o++){

                    if($("body").children(":nth-child(" + i + ")").text() != null){
                        $("body").children(":nth-child(" + i + ")").css("background-color", "#add8e6");
                       
                    }
              }
            }
            
            
            
        }
    });
   
}); 
/* window.onload = function(){
    //1
    document.getElementsByTagName("input")[0].addEventListener("click",function(){
        document.getElementById("star").src = "star_on.gif";
    });
    
    //Estrelles 2
    
    document.getElementsByTagName("input")[1].addEventListener("click",function(){
        document.getElementById("estrelles").firstElementChild.nextElementSibling.src = "star_on.gif";
    });
    
    //3
    
    document.getElementsByTagName("input")[2].addEventListener("click",function(){
        document.getElementById("frase").firstElementChild.firstElementChild.src = "star_on.gif";
    });
    
    //4
    
    document.getElementsByTagName("input")[3].addEventListener("click",function(){
       
        document.getElementById("ultima").previousElementSibling.previousElementSibling.src = "star_on.gif";
    });
    
    //5
    
    document.getElementsByTagName("input")[4].addEventListener("click",function(){
        document.getElementById("inici").parentElement.nextElementSibling.firstElementChild.src = "star_on.gif";
    });
    
    //6
    
    document.getElementsByTagName("input")[5].addEventListener("click",function(){
        
        var totalFills = document.body.childElementCount;
        var c = document.body.children;

        for(var i = 0; i < totalFills;i++){
            
            c[i].style.border = "thick solid red"; 
            
            if(c[i].hasChildNodes()){
                var elemChild = c[i].childNodes;
                var elemChildCount = elemChild.length;
                for(var o = 0; o < elemChildCount;o++){
                    if(elemChild[o].nodeType == 3){
                        elemChild[o].parentElement.style.backgroundColor = "#add8e6"; 
                    }
              }
            }
            
            
            
        }
   /*  
        nodes element vora vermell
        nodes text fons blau */
 