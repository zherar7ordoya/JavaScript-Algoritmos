/**
 * @author GERARDO TORDOYA <zherar7ordoya@outlook.com>
 * -----------------------------------------------------------------------------
 * 
 * SOLUCION CON LODASH:
 * var _ = require('lodash');
 * console.log(_.xor(_.xor([1, 2, 5], [2, 3, 5]), [3, 4, 5]));
 * 
 * -----------------------------------------------------------------------------
 * 
 * @description
 * ¿Cómo obtener la diferencia simétrica? Dadas dos colecciones (arrays), eliminar uno de los duplicados propios de cada colección, luego unir en un conjunto esos arrays y volver a eliminar los duplicados, ambos en esta ocasión. Lo que queda es la diferencia simétrica.
 * 
 * @example console.log(sym([1, 2, 2, 5], [2, 3, 5, 5], [3, 4, 5]))
 * PSEUDOCÓDIGO
 * 1) Eliminar duplicados propios, dejando uno de sus elementos (primeras dos colecciones, [1, 2, 2, 5] y [2, 3, 5, 5] quedan [1, 2, 5] y [2, 3, 5]).
 * 2) Concatenar las colecciones resultantes ([1, 2, 2, 3, 5, 5]).
 * 3) Eliminar duplicados, amobos elementos (quedando [1, 3]).
 * 4) Iterar el proceso con el tercer array (quedando, luego del primer paso, [1, 3] y [3, 4, 5])
 * 5) Concatenado (quedando [1, 3, 3, 4, 5]).
 * 6) 2da eliminación de duplicados (quedando [1, 4, 5]).
 * 
 * -----------------------------------------------------------------------------
 * 
 * SOBRE LA ELIMINACIÓN DE DUPLICADOS
 * 1) Eliminación dejando uno de los elementos duplicados: Set is a new data object introduced in ES6. Because Set only lets you store unique values, when you pass in an array, it will remove any duplicate values.
 * 2) Eliminación eliminando ambos elementos duplicados: (ver anotaciones al respecto en el uso combinado de filter + indexOf y la lógica del elemento actual encontrado en el pasado o en el futuro.)
 * 
 * -----------------------------------------------------------------------------
 * @see {@link https://jsdoc.app/|JSDoc} for further information about JSDoc.
 */



function sym() {
    /**
     * @summary Convert arguments into an array and eliminate duplicate elements within each argument.
     * @description El objeto arguments es un objeto similar a un Array que se corresponde con los argumentos pasados a la función.
     * @example
     *  function func1(a, b, c) {
     *      console.log(arguments[0]); // expected output: 1
     *      console.log(arguments[1]); // expected output: 2
     *      console.log(arguments[2]); // expected output: 3
     *  }
     *  func1(1, 2, 3); // OUTPUT: 1, 2, 3
     * @see {@link https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/arguments|MDN} for further information about the Object Arguments.
     */
    return [...arguments]
        /**
         * @summary Eliminar duplicados (dejando uno de ellos).
         */
        .map(arg => [...new Set(arg)])
        /**
         * 
         */
        .reduce((a, b) =>
            /**
             * Ahora, cada argumento es un array ya despojado de duplicados internos. El siguiente paso es concatenarlos.
             */
            a.concat(b)
                /**
                 * @summary Eliminar AMBOS duplicados.
                 * @description Ese concatenado tendrá duplicados de arrays ya depurados de duplicados propios. Lo que sucede a continuación:
                 * @example
                 * Dada la colección [1, 2, 2, 3, 5, 5]:
                 * 
                 * [0]=1 => !(indexOf(1)=0<0=F || indexOf(1,0+1)=-1>-1 )=F) = T
                 * [1]=2 => !(indexOf(2)=1<1=F || indexOf(2,1+1)= 2>-1 )=T) = F
                 * [2]=2 => !(indexOf(2)=1<2=T || indexOf(2,2+1)=-1>-1 )=F) = F
                 * [3]=3 => !(indexOf(3)=3<3=F || indexOf(3,3+1)=-1>-1 )=F) = T
                 * [4]=5 => !(indexOf(5)=4<4=F || indexOf(5,4+1)= 5>-1 )=T) = F
                 * [5]=5 => !(indexOf(5)=4<5=T || indexOf(5,5+1)=-1>-1 )=F) = F
                 * 
                 * (Al margen del !), si el índice del elemento encontrado es menor que el índice, significa que el mismo elemento lo voy a encontrar en el pasado, o si buscando desde el siguiente índice del elemento actual me tira un valor distinto a -1 significa que lo voy a encontrar en el futuro.
                 * Habiendo identificado ambos elementos, invirtiendo su evaluación (de Verdadero a Falso) ambos elementos fallan la prueba para que filter los incluya en el nuevo array.
                 */
                .filter((element, index, array) =>
                    !(array.indexOf(element) < index || array.indexOf(element, index + 1) > -1)
                )
        )
        /**
         * @summary Ordenar cada concatenado/filtrado resultante.
         * Aunque no completamente necesario (no ha sido un requirimiento explícito), sin embargo, las pruebas a las que se someten el script siempre están ordenadas (véase las notas del challenge).
         */
        .sort()
}



/**
 * @argument sym
 * @return [1, 4, 5]
 */
console.log(sym([1, 2, 5], [2, 3, 5], [3, 4, 5]))
