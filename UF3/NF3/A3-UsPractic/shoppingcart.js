//PAU SARDÁ SÀNCHEZ
/* Modificar quantitat d’un article (2P): cal que l’usuari pugui canviar la quantitat
mitjançant l’input de tipus number habilitat per aquesta tasca. A través d’HTML ja està
previst que no baixi mai de 1 unitat, per tant no cal preocupar-se d’això. El que sí que cal
fer automàticament quan un usuari varia la quantitat és:*/
window.onload = function () { //Aqui declaro tot el inicial
    mirarArticles();
    refreshInfoTotal();
    botoCheckOutCheck();
    botoDescompte();
}
//------------------------- VAR GLOBALS -------------------------\\
//Var que porti variables globals, com el subtotal, el iva, el shipping, segonTotal, si ha activat descompte(bool) i si hi ha algun article(Per a activar o desactivar checkout)
var globalShop = {
    numArticles: function () {
        return document.querySelectorAll('.col-md-8 .my-3').length;
    },
    subtotal: function () {
        return sumaPreus()
    },
    iva: 0.05, //En un futur es podrien canviar
    shipping: 7,
    promoCode: false,
    discount: 0,
    total: function () {
        return this.subtotal() + (this.subtotal() * this.iva) + this.shipping - this.discount;
    },
}

function sumaPreus() {
    var preusTotals = document.querySelectorAll('.preu-producte');
    var total = 0;
    for (var i = 0; i < preusTotals.length; i++) {
        total += parseInt(preusTotals[i].innerHTML.replace('€', ''));
    }
    return total;
}

function mirarArticles() {
    var articlesAlCarro = document.querySelectorAll('.col-md-8 .my-3');

    for (var i = 0; i < globalShop.numArticles(); i++) {
        addEvents(articlesAlCarro[i]);
    }

}
/*
Resum  de  la  compra:  alclicar sobre el botó “Checkout” ha d’aparèixer un modal(ja inclòs  en  el  codi  HTML) 
amb  el  resum  de  la  compra  (subtotal,  total,  descomptes,  etc.)  i invitant a l’usuari a la passarel·la de pagament. (1P)*/
//Si no es correcte no fa res
function botoCheckOutCheck() {
    var botoCheck = document.querySelector(".my-3 .btn-success");
    botoCheck.addEventListener("click", function () {
        if (globalShop.numArticles() != 0) {
            $(".modal").show();
            var texte = "<table style='width: 100%;'>";
            texte += "<tr><td>Subtotal</td><td>IVA</td><td>Shipping</td><td>Descompte</td><td>Total</td></tr>";
            texte += "<tr><td>" + globalShop.subtotal() + " €</td><td>" + (globalShop.iva * 100) + " %</td><td>" + globalShop.shipping + " €</td><td>" + globalShop.discount + " €</td><td>" + globalShop.total() + " €</td></tr></table>";
            document.querySelector(".modal .modal-body p").innerHTML = texte;

        } else {
            alert("Carrito buit, cal tenir articles");
        }
    })

}
//Funcio master de addevent 
//Mira cuants articles hi ha i fa for, es bo per a un futur
//--------------------------------- FUNCIO AFEGIR EVENTS  -------------------------\\
/* //Funcio que afegeix el addeventlisterner de onlcick de quantitat i el de borrar item
s
o Modificar el preu total del producte (columna “Total”) en funció de les unitats.
(1P)
o Modificar el subtotal i total del carret de compra en funció dels canvis. (1P)
o Que tot l’article desaparegui amb un efecte de lliscat (slideUp) (1P)
o Que s’actualitzin el subtotal i total del carret de compra (1P)
Que s’actualitzi el badge de color blau que indica quants tipus de productes
tenim (fixa’t que el badge indica tipus de productes, no la quantitat d’articles
comprats) (1P)
o Controlar que si no hi ha cap article al carret no es pugui clicar el botó
“Checkout” (0,5P) */

function addEvents(articleActual) {
    var quantitat = articleActual.querySelector('.form-control');
    var paperera = articleActual.getElementsByTagName("button")[0];
    var preuArticle = parseInt(articleActual.querySelector('.preu-unitari').innerHTML.trim().replace('€', ''));
    var preuArticleTotal = articleActual.querySelector('.preu-producte');

    quantitat.addEventListener("click", function () {
        preuArticleTotal.innerHTML = (preuArticle * parseInt(quantitat.value)) + "€";
        refreshInfoTotal();
    }, false)

    paperera.addEventListener("click", function () {
        var pare = $(this).parent().parent(); //El row sencer
        $(pare).slideUp("slow", function () { //Li diem que fagi slideUp i cuan acabi la animacio (callback) que realitzi el remove
            $(pare).remove();
            refreshBadge();//Canvia quantitat aixi que canviem el badge i potencialment el color del boto
            refreshInfoTotal();
        });
    }, false)


    //Cadascuna de les funcions acaben en que fagi refresh les dades del modificat actualment i el subtotal total
    refreshInfoTotal();
    //; //Sol per a el de paperera
}

function refreshBadge() { //Mira cuants articles hi ha i canvia el innerHTML del badge i el color del boto si escau
    var numArticles = globalShop.numArticles();
    document.getElementsByClassName('badge ')[0].innerHTML = numArticles;
    if (numArticles == 0) { //Representa com no es pot realitzar la compra
        $(".my-3 .btn-success").css({
            "background-color": "gray",
            "border-color": "black",
        });
    }
}


function refreshInfoTotal() { //Canvia el text de la dreta
    var capsaTotal = document.querySelector('.list-group');
    var valors = capsaTotal.querySelectorAll('.text-muted');

    valors[0].innerHTML = globalShop.subtotal() + "€";
    //En posteritat si el iva o shipping fos a canviar, el podriem afegir aqui per a canbiar innerHTML
    capsaTotal.querySelector('.list-group-item strong').innerHTML = globalShop.total() + "€";

}





//----------------------- DESCOMPTE -------------------------\\
/* Aplicar codi promocional (3,5P): si l’usuari té algun codi promocional, que el pugui
escriure i el reclami clicant sobre “Redeem”. Automàticament el descompte s’aplica sobre
el subtotal i ha de canviar el total de la compra (veure il·lustració 2). El codi és
“PROMO1000”.
o Si s’aplica “PROMO1000” s’haurà d’aplicar el descompte que serà de 5€ (1P)
o Un camp de descompte (ja inclòs en el HTML però marcat com a invisible) haurà
d’aparèixer amb un efecte de lliscat (slideDown) (1P)
o Controlar que si un cop aplicat el descompte l’usuari torna a posar el mateix
descompte no faci res (els descomptes no són acumulables) (0,5P)
o Si un usuari ja ha aplicat el descompte i intenta tornar a posar un descompte
incorrecte, la casella de descompte desapareix amb un lliscat (slideUp) i es
recalculen els preus sense descompte (1P) */
function botoDescompte() { //Afegeix un onclick al boto de descompte
    $(".input-group-append .btn-secondary").click(applyDiscount);
}
function applyDiscount() {
    var textInput = $(".card .form-control");

    if (textInput.val() == "PROMO1000") {
        if (!globalShop.promoCode) { //Aixo arregla unbug que posaba el incorrecte
            globalShop.discount = 5;
            globalShop.promoCode = true;
            refreshInfoTotal();
            $(".bg-light").slideDown("slow"); //Texte verd del descompte
            //$(".input-group-append .btn-secondary").off('click');
        }

    } else if (globalShop.promoCode && textInput.val() != "PROMO1000") {
        globalShop.discount = 0;
        globalShop.promoCode = false;
        refreshInfoTotal();
        $(".bg-light").slideUp("slow"); //Texte verd del descompte
    } else {
        textInput.val('INCORRECTE');
    }
}