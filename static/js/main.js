$(function () {
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
        if($("#botonMeta").is(":disabled")){
            $("#botonMeta").prop('disabled', false);
        }
        else{
            $("#botonMeta").prop('disabled', true);
        }
        if($("#botonCasillasProhibidas").is(":disabled")){
            $("#botonCasillasProhibidas").prop('disabled', false);
        }
        else{
            $("#botonCasillasProhibidas").prop('disabled', true);
        }
    } );

    $("#botonMeta").click( function(){
        $(this).toggleClass("pressed");
        if($("#botonInicio").is(":disabled")){
            $("#botonInicio").prop('disabled', false);
        }
        else{
            $("#botonInicio").prop('disabled', true);
        }
        if($("#botonCasillasProhibidas").is(":disabled")){
            $("#botonCasillasProhibidas").prop('disabled', false);
        }
        else{
            $("#botonCasillasProhibidas").prop('disabled', true);
        }
    } );
    $("#botonCasillasProhibidas").click( function(){
        $(this).toggleClass("pressed");
        if($("#botonMeta").is(":disabled")){
            $("#botonMeta").prop('disabled', false);
        }
        else{
            $("#botonMeta").prop('disabled', true);
        }
        if($("#botonInicio").is(":disabled")){
            $("#botonInicio").prop('disabled', false);
        }
        else{
            $("#botonInicio").prop('disabled', true);
        }
    } );
    

    var colorInicio = null;
    $(document).on("click", "td",function(){
        if( $("#botonInicio").hasClass("pressed") == true ){
            if(colorInicio != null){
                $(colorInicio).removeClass("tdInicio");
            }

            colorInicio = this;
            $(colorInicio).toggleClass("tdInicio");
        }
    })

    var colorInicio = null;
    $(document).on("click", "td",function(){
        if( $("#botonInicio").hasClass("pressed") == true ){
            if(colorInicio != null){
                $(colorInicio).removeClass("tdInicio");
            }

            colorInicio = this;
            $(colorInicio).toggleClass("tdInicio");
        }
    })
    
    var colorMeta = null;
    $(document).on("click", "td",function(){
        if( $("#botonMeta").hasClass("pressed") == true ){
            if(colorMeta != null){
                $(colorMeta).removeClass("tdMeta");
            }
            colorMeta = this;
            $(colorMeta).toggleClass("tdMeta");
        }
    })

    $("#resolverAlgoritmo").click( function(){

        /* Deshabilitamos los botones */
        $("#botonesAccion").find('button').each(function(){
            $(this).prop('disabled', true);
        })
        let numFilas = 1;
        let numColumnas = 1;
		$("#tabla").find("tr").each(function(){
            numFilas++;
        });
        $("#fila1").find("td").each(function(){
            numColumnas++;
        });

        let tablita = [];
        let i = 0;
        let casillaInicio = {}, casillaMeta = {};
        $("#tabla").find("tr").each(function(){
            tablita[i] = [];
            let j = 0;
            $(this).find("td").each(function(){
                if($(this).hasClass("tdInicio") == true ){
                    tablita[i][j] = 1;
                    casillaInicio.fila = i;
                    casillaInicio.col = j; 
                }
                else if($(this).hasClass("tdMeta") == true ){
                    tablita[i][j] = 3;
                    casillaMeta.fila = i;
                    casillaMeta.col = j; 
                }
                else{
                    tablita[i][j] = 0;
                }
                j++;
            });
            i++;
        });




    } );
    
});