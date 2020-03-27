$(function () {


    let numFilas = 5; // Numero de filas de la tabla
    let numColumnas = 5; // Numero de columnas de la tabla

    // Funcion que añade una fila nueva a la tabla
    $("#buttonRow").click(function () {
        let texto = "";
        numFilas = numFilas + 1;
        for(let i = 0; i < numColumnas; i++){
            texto += "<td></td>"
        }
        $("#tabla").append("<tr class=\"fila\"> <th scope=\"row\">" + numFilas + "</th>" + texto + "</tr>");
    });

    // Funcion que añade una columna nueva a la tabla
    $("#buttonCol").click(function () {
        numColumnas = numColumnas + 1;
        $("tr.filatitulo").append("<th>" + numColumnas + "</th>")
        $("#tabla").find('.fila').each(function () {
            $(this).append("<td></td>");
        })
    });

    // Si se pulsa botonInicio deshabilita los demás botones
    $("#botonInicio").click(function () {
        $(this).toggleClass("pressed");
        if ($("#botonMeta").is(":disabled")) {
            $("#botonMeta").prop('disabled', false);
        }
        else {
            $("#botonMeta").prop('disabled', true);
        }
        if ($("#botonCasillasProhibidas").is(":disabled")) {
            $("#botonCasillasProhibidas").prop('disabled', false);
        }
        else {
            $("#botonCasillasProhibidas").prop('disabled', true);
        }
    });

    // Si se pulsa botonMeta deshabilita los demás botones
    $("#botonMeta").click(function () {
        $(this).toggleClass("pressed");
        if ($("#botonInicio").is(":disabled")) {
            $("#botonInicio").prop('disabled', false);
        }
        else {
            $("#botonInicio").prop('disabled', true);
        }
        if ($("#botonCasillasProhibidas").is(":disabled")) {
            $("#botonCasillasProhibidas").prop('disabled', false);
        }
        else {
            $("#botonCasillasProhibidas").prop('disabled', true);
        }
    });

    // Si se pulsa botonCasillasProhibidas deshabilita los demás botones
    $("#botonCasillasProhibidas").click(function () {
        $(this).toggleClass("pressed");
        if ($("#botonMeta").is(":disabled")) {
            $("#botonMeta").prop('disabled', false);
        }
        else {
            $("#botonMeta").prop('disabled', true);
        }
        if ($("#botonInicio").is(":disabled")) {
            $("#botonInicio").prop('disabled', false);
        }
        else {
            $("#botonInicio").prop('disabled', true);
        }
    });

    // Añade la clase tdInicio a la casilla a la que se le hace click si esta activado el botonInicio
    var colorInicio = null;
    $(document).on("click", "td", function () {
        if ($("#botonInicio").hasClass("pressed") == true) {
            if (colorInicio != null) {
                $(colorInicio).removeClass("tdInicio");
                $(colorInicio).empty();
            }

            colorInicio = this;
            $(colorInicio).toggleClass("tdInicio");
            $(colorInicio).text("I")
        }
    })

    // Añade la clase tdMeta a la casilla a la que se le hace click si esta activado el botonMeta
    var colorMeta = null;
    $(document).on("click", "td", function () {
        if ($("#botonMeta").hasClass("pressed") == true) {
            if (colorMeta != null) {
                $(colorMeta).removeClass("tdMeta");
                $(colorMeta).empty();
            }

            colorMeta = this;
            $(colorMeta).toggleClass("tdMeta");
            $(colorMeta).text("M")
        }
    })

    // Añade o quita la clase "prohibida" a la casilla sobre la que se hace click si botonCasillasProhibidas esta activado
    $(document).on("click", "td", function () {
        if ($("#botonCasillasProhibidas").hasClass("pressed") == true) {
            $(this).toggleClass("prohibida");
        }
    })


    $("#resolverAlgoritmo").click(function () {
        /* Deshabilitamos los botones */
        $("#botonesAccion").find('button').each(function () {
            $(this).prop('disabled', true);
        })


        var ABIERTA = [];
        var CERRADA = [];


        // Leemos de la tabla la posición del INICIO, de la META y de las CASILLAS PROHIBIDAS
        let tablita = [];
        let i = 1;
        let casillaInicio = {}, casillaMeta = {};
        $("#tabla").find(".fila").each(function () {
            tablita[i] = [];
            let j = 1;
            $(this).find("td").each(function () {
                if ($(this).hasClass("tdInicio") == true) {
                    //tablita[i][j] = 1;
                    casillaInicio.fila = i;
                    casillaInicio.col = j;
                }
                else if ($(this).hasClass("tdMeta") == true) {
                    //tablita[i][j] = 3;
                    casillaMeta.fila = i;
                    casillaMeta.col = j;
                }
                else if ($(this).hasClass("prohibida") == true){
                    CERRADA.push( // Los obstaculos se incluyen directamente en la lista cerrada
                        {fila: i,
                        col: j}
                    )
                }
                j++;
            });
            i++;
        });

        /* console.log(tablita);
        console.log(casillaInicio);
        console.log(casillaMeta); */
        console.log(CERRADA);

        //Aquí comienza el algoritmo como tal
        let salida = false;
        ABIERTA.push(casillaInicio);
        /* if(salida != true){
            if(ABIERTA.length > 0){
                let posSeleccionado = 0;
                let seleccionado; 

                for(let i = 0; i < ABIERTA.length; i++){

                }
            }
        } */

    });

    // Funcion f(n)
    function f(casillaX, casillaMeta, casillaInicio){
        
    }

    // Función g(n)
    function g(casillaX, casillaMeta, casillaInicio){

    }

    // Función h(n)
    function h(casillaX, casillaMeta){
        return Math.sqrt(Math.pow(casillaX.fila - casillaMeta.fila) + Math.pow(casillaX.col - casillaMeta.fila) );
    }
});