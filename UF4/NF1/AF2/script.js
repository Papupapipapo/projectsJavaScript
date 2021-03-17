window.onload = function(){
    getJSONCarrersTotal();
}
var total;
var carrers;

function getJSONCarrersTotal(){ //AGafa el numero de total de una query petita
    var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange =  function() {
        if (this.readyState == 4 && this.status == 200) {
            var responseParse = JSON.parse( this.responseText);
            total = responseParse["result"]["total"];
            getJSONCarrers(); //Crida a agafar el array de carrers
        }
    };
    xhttp.open("GET", "https://opendata.reus.cat/api/3/action/datastore_search?resource_id=79b0c5e2-d62c-4dd1-80cf-dd52ad543350&limit=1", true);
    xhttp.send();
    
}


function getJSONCarrers(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var responseParse = JSON.parse( this.responseText);
            carrers = responseParse["result"]["records"]; //Es creen els carrers
            
            carrersToInput();
        }
    };
    var linkValTotal = "https://opendata.reus.cat/api/3/action/datastore_search?resource_id=79b0c5e2-d62c-4dd1-80cf-dd52ad543350&limit=" + total; //Es fa la query junt el numero de valors que tenen en total, aixi estalviant recursos
    xhttp.open("GET", linkValTotal, true);
    xhttp.send();
}


function carrersToInput(){ //Mira tots els carrers i els afegeix
    var htmlTxt = "";
    for(var i = 0; i < total;i++){
        var nomCarrer = carrers[i] ["NOM CARRER"];
        var tipusViaCarrer = carrers[i] ["TIPUS VIA"];
        var codiPostalCarrer = carrers[i] ["CODI POSTAL"];
        
       htmlTxt += "<option value='"+codiPostalCarrer+"'>"+nomCarrer+" ("+tipusViaCarrer+")</option>";
    }
    document.getElementById("carrers").innerHTML = htmlTxt;

    document.getElementById("codiPostal").innerHTML=  document.getElementById("carrers").value;
    document.getElementById("carrers").addEventListener("click",function(){ //Cada vegada que es cliqui es canviara el innerHTML de codiPostal 
        document.getElementById("codiPostal").innerHTML=  document.getElementById("carrers").value;
    },false);
}