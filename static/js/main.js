$(function () {


    var numFilas = 5; // Numero de filas de la tabla
    var numColumnas = 5; // Numero de columnas de la tabla
    $("#mensajesError").hide();
    $("#mensajeCamino").hide();

    // Funcion que añade una fila nueva a la tabla
    $("#buttonRow").click(function () {
        var texto = "";
        numFilas = numFilas + 1;
        for (var i = 0; i < numColumnas; i++) {
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


    function Nodo(x, y) { // "Clase" Nodo para usarla en las casillas de la tabla
        this.x = x;
        this.y = y;

        this.f = 0;
        this.h = 0;
        this.g = 0;

        this.padre = null;
        this.sucesores = [];
    }

    $("#resolverAlgoritmo").click(function () {




        var ABIERTA = []; // Lista ABIERTA
        var CERRADA = []; // Lista CERRADA
        var camino = []; // Camino más corto

        // Leemos de la tabla la posición del INICIO, de la META y de las CASILLAS PROHIBIDAS
        var tabla;
        var i = 1;
        var casillaInicio = null, casillaMeta = null;
        tabla = new Array(numFilas);
        $("#tabla").find(".fila").each(function () {
            tabla[i - 1] = new Array(numColumnas);
            var j = 1;
            $(this).find("td").each(function () {
                tabla[i - 1][j - 1] = new Nodo(i, j);
                if ($(this).hasClass("tdInicio") == true) {
                    casillaInicio = tabla[i - 1][j - 1];
                }
                if ($(this).hasClass("tdMeta") == true) {
                    casillaMeta = tabla[i - 1][j - 1];
                }
                if ($(this).hasClass("prohibida") == true) {
                    CERRADA.push(tabla[i - 1][j - 1]);
                }
                j++;
            });
            i++;
        });

        //Aquí comienza el algoritmo como tal
        var salida = false;
        ABIERTA.push(casillaInicio);
        if (casillaMeta === null || casillaInicio === null) {
            alert('Posicion de Meta o Inicio no definida');
        }
        else {
            /* Deshabilitamos los botones */
            $("#botonesAccion").find('button').each(function () {
                $(this).prop('disabled', true);
            })
            let proInicio = false, proMeta = false;
            if (CERRADA.includes(casillaInicio)) {
                proInicio = true;
            }
            if (CERRADA.includes(casillaMeta)) {
                proMeta = true;
            }
            while (salida != true) { // Si la salida es false prosigue el algoritmo
                if (ABIERTA.length > 0 && !proMeta && !proInicio) { // Si aun quedan nodos en la lista abierda  && !CERRADA.includes(casillaInicio) && !CERRADA.includes(casillaMeta)
                    var posSeleccionado = 0;
                    var seleccionado = ABIERTA[0];


                    for (var i = 0; i < ABIERTA.length; i++) { // Se selecciona de la lista ABIERTA el que tenga un menor valor f
                        if (ABIERTA[i].f < ABIERTA[posSeleccionado].f) {
                            posSeleccionado = i;
                            seleccionado = ABIERTA[i];
                        }
                    }

                    if (seleccionado === casillaMeta) { // Si se selecciona la casillaMeta
                        var aux = seleccionado;
                        camino.push(aux);

                        while (aux.padre !== null) { // Se guarda el camino en un array
                            aux = aux.padre;
                            camino.push(aux);
                        }

                        salida = true; // Se cambia salida a true
                    }
                    else { // Si no se llega al final
                        // Borramos el elemento de la lista ABIERTA y lo añadimos a la CERRADA
                        ABIERTA.splice(posSeleccionado, 1);
                        CERRADA.push(seleccionado);

                        var sucesores = []; // Lista de Nodos sucesores del seleccionado;
                        var ValoresG = []; // Lista del valor a sumar al g en cada caso sqrt(2) en el caso de los vecinos diagonales, y 1 en el caso de los horizontales y verticales
                        if (seleccionado.x - 1 > 0) { // El de la izquierda
                            sucesores.push(tabla[seleccionado.x - 2][seleccionado.y - 1]);
                            ValoresG.push(1);
                        }
                        if (seleccionado.x < numFilas) { // El de la derecha
                            sucesores.push(tabla[seleccionado.x][seleccionado.y - 1]);
                            ValoresG.push(1);
                        }
                        if (seleccionado.y - 1 > 0) { // El de arriba
                            sucesores.push(tabla[seleccionado.x - 1][seleccionado.y - 2]);
                            ValoresG.push(1);
                        }
                        if (seleccionado.y < numColumnas) { // El de abajo
                            sucesores.push(tabla[seleccionado.x - 1][seleccionado.y]);
                            ValoresG.push(1);
                        }
                        if (seleccionado.y - 1 > 0 && seleccionado.x - 1 > 0) { // El de arriba a la izquierda
                            sucesores.push(tabla[seleccionado.x - 2][seleccionado.y - 2]);
                            ValoresG.push(Math.sqrt(2));
                        }
                        if (seleccionado.y - 1 > 0 && seleccionado.x < numFilas) { // El de arriba a la derecha
                            sucesores.push(tabla[seleccionado.x][seleccionado.y - 2]);
                            ValoresG.push(Math.sqrt(2));
                        }
                        if (seleccionado.y < numColumnas && seleccionado.x - 1 > 0) { // El de abajo a la izquierda
                            sucesores.push(tabla[seleccionado.x - 2][seleccionado.y]);
                            ValoresG.push(Math.sqrt(2));
                        }
                        if (seleccionado.y < numColumnas && seleccionado.x < numFilas) { // El de abajo a la derecha
                            sucesores.push(tabla[seleccionado.x][seleccionado.y]);
                            ValoresG.push(Math.sqrt(2));
                        }

                        for (var i = 0; i < sucesores.length; i++) { // Recorre la lista de los sucesores
                            var sucesor = sucesores[i];
                            if (!CERRADA.includes(sucesor)) { // Si se no se encuentra en la lista CERRADA
                                var newG = seleccionado.g + ValoresG[i];
                                var newH = h(sucesor, casillaMeta);
                                var newF = newG + newH;

                                if (ABIERTA.includes(sucesor)) {
                                    if (newF < sucesor.f) { // Si se encuentra en la lista ABIERTA ya, se selecciona el menor valor de f
                                        sucesor.g = newG;
                                        sucesor.h = newH;
                                        sucesor.f = newF;
                                        sucesor.padre = seleccionado;
                                    }
                                }
                                else { // Si no se encuetra se añade
                                    sucesor.g = newG;
                                    sucesor.padre = seleccionado;
                                    sucesor.h = newH;
                                    ABIERTA.push(sucesor);
                                }

                            }
                        }

                    }
                }
                else { // Si no quedan Nodos en la Lista Abierta
                    salida = true;
                    $("#mensajesError").show();
                    $("#mensajesError").text("NO HAY CAMINO POSIBLE ENTRE LOS DOS PUNTOS");
                    $("#mensajesError").css("color", "red");
                }


            }
            if (camino.length !== 0) { // Forma el mensaje inferior a mostrar en la pantalla
                let textamon = "El Camino mas corto entre el Inicio y la meta es: ";
                for (let i = 0; i < camino.length; i++) {
                    textamon += "(" + camino[i].x + "," + camino[i].y + ")";
                    if (i !== camino.length - 1) {
                        textamon += ",";
                    }
                }
                $("#mensajeCamino").show(); //Muestra el mensaje del camino
                $("#mensajeCamino").text(textamon);
                $("#mensajeCamino").css("color", "green");
                let i = 1;
                $("#tabla").find(".fila").each(function () {
                    let j = 1;
                    $(this).find("td").each(function () {
                        for (let q = 0; q < camino.length; q++) {
                            if (camino[q].x == i && camino[q].y == j) { // Se cambia el color a un rosa claro si la casilla forma parte del camino
                                $(this).css("background-color", "#ff6deb");
                            }
                        }
                        j++;
                    });
                    i++;
                });

                /*Para el debug por consola*/
                console.log("Lista ABIERTA: ");
                console.log(ABIERTA);
                console.log("---------");
                console.log("Lista CERRADA: ");
                console.log(CERRADA);
                console.log("---------");

            }
        }


    });


    // Función h(n)
    function h(casillaX, casillaMeta) {
        return Math.sqrt(Math.pow(casillaX.fila - casillaMeta.fila) + Math.pow(casillaX.col - casillaMeta.fila));
    }
});