$(function () {


    var numFilas = 5; // Numero de filas de la tabla
    var numColumnas = 5; // Numero de columnas de la tabla

    // Funcion que añade una fila nueva a la tabla
    $("#buttonRow").click(function () {
        var texto = "";
        numFilas = numFilas + 1;
        for(var i = 0; i < numColumnas; i++){
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


    function Nodo(x,y){
        this.x = x;
        this.y = y;

        this.f = 0;
        this.h = 0;
        this.g = 0;

        this.padre = null;
        this.sucesores = [];
    }

    $("#resolverAlgoritmo").click(function () {
        /* Deshabilitamos los botones */
        $("#botonesAccion").find('button').each(function () {
            $(this).prop('disabled', true);
        })


        var ABIERTA = [];
        var CERRADA = [];
        var camino = [];

        // Leemos de la tabla la posición del INICIO, de la META y de las CASILLAS PROHIBIDAS
        var tabla;
        var i = 1;
        var casillaInicio, casillaMeta;
        tabla = new Array(numFilas);
        $("#tabla").find(".fila").each(function () {
            tabla[i-1] = new Array(numColumnas);
            var j = 1;
            $(this).find("td").each(function () {
                tabla[i-1][j-1] = new Nodo(i,j);
                if ($(this).hasClass("tdInicio") == true) {
                    casillaInicio = tabla[i-1][j-1];
                }
                else if ($(this).hasClass("tdMeta") == true) {
                    casillaMeta = tabla[i-1][j-1];
                }
                else if ($(this).hasClass("prohibida") == true){
                    CERRADA.push(tabla[i-1][j-1]);
                }
                j++;
            });
            i++;
        });

        //Aquí comienza el algoritmo como tal
        var salida = false;
        ABIERTA.push(casillaInicio);

        while(salida != true){
            if(ABIERTA.length > 0){
                var posSeleccionado = 0;
                var seleccionado = ABIERTA[0]; 

                for(var i = 0; i < ABIERTA.length; i++){
                    if(ABIERTA[i].f < ABIERTA[posSeleccionado].f){
                        posSeleccionado = i;
                        seleccionado = ABIERTA[i];
                    }
                }
                console.log(`El Seleccionado es: `);
                console.log(seleccionado);
                console.log("El final es")
                console.log(casillaMeta);
                if(seleccionado === casillaMeta){ // Si se llega al final
                    console.log("Llega al final");
                    var aux = seleccionado;
                    camino.push(aux);

                    while(aux.padre !== null){
                        aux = aux.padre;
                        camino.push(aux);
                    }

                    salida = true;
                }
                else{ // Si no se llega al final
                    // Borramos el elemento de la lista ABIERTA y lo añadimos a la CERRADA
                    ABIERTA.splice(posSeleccionado,1);
                    CERRADA.push(seleccionado);

                    var sucesores = []; // Lista de Nodos sucesores del seleccionado;
                    var ValoresG = [];
                    if(seleccionado.x - 1 > 0){ // El de la izquierda
                        sucesores.push(tabla[seleccionado.x - 2][seleccionado.y - 1]);
                        ValoresG.push(1);
                    }
                    if(seleccionado.x < numFilas){ // El de la derecha
                        sucesores.push(tabla[seleccionado.x][seleccionado.y - 1]);
                        ValoresG.push(1);
                    }
                    if(seleccionado.y - 1 > 0){ // El de arriba
                        sucesores.push(tabla[seleccionado.x - 1][seleccionado.y - 2]);
                        ValoresG.push(1);
                    }
                    if(seleccionado.y < numColumnas){ // El de abajo
                        sucesores.push(tabla[seleccionado.x - 1][seleccionado.y]);
                        ValoresG.push(1);
                    }
                    if(seleccionado.y - 1 > 0 && seleccionado.x - 1 > 0){ // El de arriba a la izquierda
                        sucesores.push(tabla[seleccionado.x - 2][seleccionado.y - 2]);
                        ValoresG.push(Math.sqrt(2));
                    }
                    if(seleccionado.y - 1 > 0 && seleccionado.x < numFilas){ // El de arriba a la derecha
                        sucesores.push(tabla[seleccionado.x][seleccionado.y - 2]);
                        ValoresG.push(Math.sqrt(2));
                    }
                    if(seleccionado.y < numColumnas && seleccionado.x - 1 > 0){ // El de abajo a la izquierda
                        sucesores.push(tabla[seleccionado.x - 2][seleccionado.y]);
                        ValoresG.push(Math.sqrt(2));
                    }
                    if(seleccionado.y < numColumnas && seleccionado.x < numFilas){ // El de abajo a la derecha
                        sucesores.push(tabla[seleccionado.x][seleccionado.y]);
                        ValoresG.push(Math.sqrt(2));
                    }

                    for(var i = 0; i < sucesores.length; i++){
                        var sucesor = sucesores[i];
                        if(!CERRADA.includes(sucesor)){
                            var newG = seleccionado.g + ValoresG[i];
                            var newH = h(sucesor, casillaMeta);
                            var newF = newG + newH;

                            if(ABIERTA.includes(sucesor)){
                                if(newF < sucesor.f){
                                    sucesor.g = newG;
                                    sucesor.h = newH;
                                    sucesor.f = newF;
                                    sucesor.padre = seleccionado;
                                }
                            }
                            else{
                                sucesor.g = newG;
                                sucesor.padre = seleccionado;
                                sucesor.h = newH;
                                ABIERTA.push(sucesor);
                            }


                            // valores de g y f

                            /* sucesor.h = h(sucesor, casillaMeta);
                            console.log("---")
                            console.log("Sucesor G:")
                            console.log(sucesor.g);
                            console.log("---")
                            sucesor.f = sucesor.g + sucesor.h;
                             */
                            
                        }
                    }

                }
            }
            else {
                salida = true;
            }
        } 

        console.log(camino);

    });


    // Función h(n)
    function h(casillaX, casillaMeta){
        return Math.sqrt(Math.pow(casillaX.fila - casillaMeta.fila) + Math.pow(casillaX.col - casillaMeta.fila) );
    }
});