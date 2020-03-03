$(function () {
    let variable = false;
    $("#buttonRow").click(function () {
        let texto ="";
        $("#fila1").find("td").each(function(){
            texto += "<td></td>";
        })
        $("#tabla").append("<tr class=\"fila\">" + texto + "</tr>");
    });

    $("#buttonCol").click(function () {
        $("#tabla").find('tr').each(function(){
            $(this).append("<td></td>");
        })
    });
    $("#botonInicio").click( function(){
		$(this).toggleClass("pressed");
    } );
    $("#botonMeta").click( function(){
		$(this).toggleClass("pressed");
    } );
    var colorInicio = null;
    $(document).on("click", "td",function(){
        if( $("#botonInicio").hasClass("pressed") == true ){
            if(colorInicio != null){
                $(colorInicio).removeClass("tdcolorao");
            }

            colorInicio = this;
            $(colorInicio).toggleClass("tdcolorao");
        }
    })

    var colorMeta = null;
    $(document).on("click", "td",function(){
        if( $("#botonMeta").hasClass("pressed") == true ){
            if(colorMeta != null){
                $(colorMeta).removeClass("tdamari");
            }
            colorMeta = this;
            $(colorMeta).toggleClass("tdamari");
        }
    })
});