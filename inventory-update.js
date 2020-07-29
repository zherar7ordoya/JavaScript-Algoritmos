/**
 * Actualiza una colección
 * Se respeta el nombre original de la función a los fines de la evaluación
 * Repasa el array de datos nuevos y los manda a buscar en el array en uso
 * @param {*[]} arr1 Inventario en uso
 * @param {*[]} arr2 Datos nuevos
 */

function updateInventory(arr1, arr2) {
    arr2.forEach(item => {
        inventariar(arr1, item)
    })
    return arr1
}

/**
 * Busca el artículo en el array en uso. Si lo encuentra, actualiza la cantidad
 * que le corresponde. Si no lo encuentra, agrega artículo y cantidad.
 * @param {*} arr1 El inventario en uso completo
 * @param {*} item El par (sub-array) de datos nuevos
 */
const inventariar = (arr1, item) => {
    let index = -1
    // Tener en mente que compara un registro por vez del array en uso
    while (++index < arr1.length) {
        // Si el artículo es igual al artículo, sumar nueva cantidad y regresar
        if (arr1[index][1] === item[1]) {
            arr1[index][0] += item[0]
            return
        }
        /**
         * Ordenador. El mejor que he visto.
         * while no encontró coincidencia. Si alfabéticamente el artículo del 
         * array en uso es mayor que el item, escapa de while y lo entrega a 
         * splice (que lo agrega en esa posición)
         */
        if (arr1[index][1] > item[1]) {
            break
        }
    }
    /**
     * Sin coincidencia, agregar
     * splice() cambia el contenido de un array eliminando elementos existentes
     * y/o agregando nuevos elementos.
     * 
     * Sintaxis: array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
     * 
     * start: Índice donde se comenzará a cambiar el array (con 0 como origen).
     *        Si es mayor que la longitud del array, el punto inicial será la 
     *        longitud del array. Si es negativo, empezará esa cantidad de 
     *        elementos contando desde el final.
     * deleteCount: Si deleteCount es igual a 0 o negativo, no se eliminará 
     *              ningún elemento. En este caso, se debe especificar al menos 
     *              un nuevo elemento
     * item: los elementos que se agregarán al array
     */
    arr1.splice(index, 0, item)
}


// Inventario en uso
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
]

// Datos nuevos
var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
]


// Prueba de consola
console.log(updateInventory(curInv, newInv))

// Función definitiva
updateInventory(curInv, newInv)
