let comarques = [];

$(document).ready(function () {
    const defineComarques = () => { //Definieix les comarques al array de comarques donantli un numeroId per ala entrada que sigui i llavors guarda el nom i minmax temp
        $.ajax({
            url: "https://static-m.meteo.cat/content/opendata/ctermini_comarcal.xml",
            type: "get",
            success: function (result) {
                $(result).find('comarca').each(function () {
                    let numId = $(this).attr('id');
                    let nomComarca = $(this).attr('nomCOMARCA');
                    comarques[numId] = [nomComarca, searchGeneralInfo(numId)];
                });
                comarcaToInput();
            }
        });

    };

    const searchGeneralInfo = (id) => {//Fa query que segueix buscant fins que troba el minMax temperatura segons la idComarcal
        var texteRetornar = "";
        $.ajax({
            url: "https://static-m.meteo.cat/content/opendata/ctermini_comarcal.xml",
            type: "get",
            async: false,
            success: function (result) {
                $(result).find("prediccio").each(function () {
                    if ($(this).attr("idcomarca") == id) {
                        let variable = $(this).find("variable")[0];
                        let minTemp = $(variable).attr("tempmin");
                        let maxTemp = $(variable).attr("tempmax");
                        let icoMati = "https://static-m.meteo.cat/assets-w3/images/meteors/estatcel-ombra/" + $(variable).attr("simbolmati");
                        let icoTarda = "https://static-m.meteo.cat/assets-w3/images/meteors/estatcel-ombra/" + $(variable).attr("simboltarda");
                        texteRetornar = minTemp + ";" + maxTemp + ";" + icoMati +";" + icoTarda;
                        return;
                    }
                });
            }

        });
        return texteRetornar;
    }
    

    const comarcaToInput = () => { //Pasarem el array a codi html que sera per a un selector al final de tot
        let textMaster = "";
        for (let i = 1; i < comarques.length; i++) {
            textMaster += "<option value='" + i+ "'>" + comarques[i][0] + "</option>";
        }
        $("#comarques").html(textMaster);
        modificarGrid();
        $("#comarques").click(modificarGrid);
    }
    const modificarGrid = () => {
        let valors = comarques[$("#comarques").val()][1].split(";");

        $("#tempMin").html("Tempertaura minima: " + valors[0] + "º");
        $("#tempMax").html("Tempertaura max: " + valors[1] + "º");
        $("#tempMati").html("TempsMati: <img src='" + valors[2] + "'>");
        $("#tempTard").html("TempsTarda:  <img src='" + valors[3]+"'>");
    }

    const dataActual = () =>{
        let d = new Date();
        let months = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Septembre", "Octubre", "Novembre", "Decembre"];
        $("#dia").html(d.getDate() + " de "+ months[d.getMonth()]);
    }
    
    dataActual();
    defineComarques();
});
