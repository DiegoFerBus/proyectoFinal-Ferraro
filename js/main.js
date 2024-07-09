iniciarSimulador();

function iniciarSimulador() {
    const edadMinima = 18;
    const bebidas = [];

    function preguntarEdad() {
        let edad = prompt("¿Cuál es tu edad?");

        // Convertir la edad a número
        edad = parseInt(edad);

        if (edad >= edadMinima) {
            alert("Bienvenido a Tienda Drinks");
            solicitarBebidas();
        } else if (!isNaN(edad)) {
            alert("No puedes ingresar a la web porque eres menor de edad.");
            alert("Vuelve cuando seas mayor de edad.");
        } else {
            alert("Por favor, ingresa un número válido.");
            preguntarEdad();
        }
    }

    function solicitarBebidas() {
        let agregarMas = true;

        while (agregarMas) {
            let bebida = prompt("Ingresa una bebida que quieras comprar:").toUpperCase();

            if (bebida) {
                bebidas.push(bebida);
                console.log(`Bebida agregada: ${bebida}`);
                console.log(`Bebidas actuales: ${bebidas.join(", ")}`);

                let respuesta = prompt("¿Deseas agregar otra bebida? (sí/no)").toUpperCase();
                agregarMas = respuesta === "SÍ" || respuesta === "SI";
            } else {
                alert("Por favor, ingresa un nombre de bebida válido.");
            }
        }

        mostrarBebidas();
        preguntarEliminar();
        buscarBebida();
    }

    function mostrarBebidas() {
        if (bebidas.length > 0) {
            alert(`Has agregado las siguientes bebidas: ${bebidas.join(", ")}`);
        } else {
            alert("No has agregado ninguna bebida.");
        }
    }

    function preguntarEliminar() {
        let eliminar = prompt("¿Quieres eliminar alguna bebida? (sí/no)").toUpperCase();
        if (eliminar === "SÍ" || eliminar === "SI") {
            let bebidaAEliminar = prompt(`¿Qué bebida deseas eliminar? (${bebidas.join(", ")})`).toUpperCase();
            let index = bebidas.indexOf(bebidaAEliminar);
            if (index !== -1) {
                bebidas.splice(index, 1);
                alert(`La bebida ${bebidaAEliminar} ha sido eliminada.`);
                mostrarBebidas();
            } else {
                alert("La bebida ingresada no se encuentra en la lista.");
            }
        } else {
            alert("No se eliminará ninguna bebida.");
        }
    }

    function buscarBebida() {
        let buscar = prompt("¿Quieres buscar alguna bebida en tu lista? (sí/no)").toUpperCase();
        if (buscar === "SÍ" || buscar === "SI") {
            let bebidaABuscar = prompt("Ingresa el nombre de la bebida que deseas buscar:").toUpperCase();
            let index = bebidas.indexOf(bebidaABuscar);
            if (index !== -1) {
                alert(`La bebida ${bebidaABuscar} se encuentra en la lista.`);
            } else {
                alert(`La bebida ${bebidaABuscar} no se encuentra en la lista.`);
            }
        } else {
            alert("No se realizará ninguna búsqueda.");
        }
    }

    preguntarEdad();
}