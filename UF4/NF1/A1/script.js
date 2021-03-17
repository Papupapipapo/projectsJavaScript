window.onload = function(){
    function loadFitxerText(dir,idDesti) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById(idDesti).innerHTML = this.responseText;
                }
            };
            xhttp.open("GET", dir, true);
            xhttp.send();
        }

    var button1 = document.getElementById("btnGetText");
    button1.addEventListener("click", function(){
        loadFitxerText("dades.txt","divGetText")
    }, false);

    var button2 = document.getElementById("btnGetXML");
    button2.addEventListener("click", function(){
        var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var responseX = this.responseXML;
                    var num = document.getElementById("languages").value - 1;
                    var x = responseX.getElementsByTagName("llenguatge")[num];
                    document.getElementById("divGetXML").innerHTML = x.getAttribute("nom");
                }
            };
            xhttp.open("GET", "dades.xml", true);
            xhttp.send();
    }, false);

    var button3 = document.getElementById("btnGetJSON");
    button3.addEventListener("click", function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var responseParse = JSON.parse( this.responseText);
                var numGrup = 'grup' + document.getElementById("studentGroup").value;
                var numPos = document.getElementById("studentPosition").value - 1;
                var x = responseParse[numGrup][numPos];
                document.getElementById("divGetJSON").innerHTML = x;
            }
        };
        xhttp.open("GET", "dades.json", true);
        xhttp.send();
    }, false);
    
}
