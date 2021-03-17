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
                    comarques[numId] = [nomComarca, searchMinMaxTemp(numId)];
                });
                comarcaToInput();
            }
        });

    };

    const searchMinMaxTemp = (id) => {//Fa query que segueix buscant fins que troba el minMax temperatura segons la idComarcal
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
                        texteRetornar = "tempMin = " + minTemp + " tempMax = " + maxTemp;
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
            textMaster += "<option value='" + comarques[i][1] + "'>" + comarques[i][0] + "</option>";
        }
        $("#comarques").html(textMaster);

        $("#temperatures").html($("#comarques").val());
        $("#comarques").click(function () {
            $("#temperatures").html($("#comarques").val());
        });
    }
    
    defineComarques();
});
