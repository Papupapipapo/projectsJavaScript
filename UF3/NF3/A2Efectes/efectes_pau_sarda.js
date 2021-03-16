$(document).ready(function(){
    //Textes   
    $("#un > span:first-child").text("Soc timid, si em cliques m'envaig");
    $("#dos > span:first-child").text("Jo soc molt rapid, si em cliques dues vegades m'en vaig cap a abaix a la dreta");
    $("#tres > span:first-child").text("Si vols que m'envagi, digues la q.Torna apretar per a que torni");
    $("#quatre > span:first-child").text("Vull creixer, pots apropar el ratoli?");
    $("#cinc > span:first-child").css("color","white");
    $("#cinc > span:first-child").text("Cliquem i em moure i si em tornes a clicar tornare");
    //Funcions
    //1
    $("#un").click(function(){
        $("#un > span:first-child").text("D'acord,doncs m'envaig...");
        $("#un").fadeOut(2500);
    });

    //2
    $("#dos").dblclick(function(){
        $("#dos > span:first-child").text("Que rapid soc,no?");
        $("#dos").animate({top: '600px',
                           left:'600px'},100);
    });
    //3
    var state3 = false;
    $(document).keypress(function(e){
        console.log("entra");
        if ((e.keyCode || e.which) == 81 || (e.keyCode || e.which) == 113)  {
            if(state3){
                $("#tres > span:first-child").text("Hola de nou. Apreta la q si vols que m'en vagi");
                state3 = false;
            }else{
                $("#tres > span:first-child").text("Ok.Ja apretarás la q si vols que torni");
                state3 = true;
            }
            
            $("#tres").slideToggle(2500);
        }
       
    });
     //4
     $("#quatre").hover(function(){
        $("#quatre > span:first-child").text("Que gran soc no?");
        $("#quatre").animate({height: '+=150px',
        width: '+=150px'
    });
    },function(){
        $("#quatre > span:first-child").text("Nooo, torna amb el ratoli, que no vull ser petit :(");
        $("#quatre").animate({height: '-=150px',
        width: '-=150px'
    });
    });
    //5
    var state5 = false;
    $("#cinc").click(function(){
        
        if(state5){
            $("#cinc > span:first-child").text("Ara torno!");
            $("#cinc").animate({top: '0px',
                           right:'0px'},2000, function(){
                            $("#cinc > span:first-child").text("Ja he arribat! Cliquem de nou i tornare");
                            state5 = false;
                           });
            
                           
            
        }else{
            $("#cinc > span:first-child").text("Soc bastant lent,no?");
           
                           $("#cinc").animate({top: '600px',
                           right:'600px'},2000, function(){
                            $("#cinc > span:first-child").text("Ja he arribat! Cliquem de nou i tornare");
                            state5 = true;
                           });
        }
        
    });
}); 