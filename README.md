# Buscador de rutas en árbol de categorías

En este pequeño proyecto se muestran varias maneras de resolver el mismo problema: dada una estructura
anidada de categorías, encontrar la ruta completa hacia un nodo concreto.

Ambas implementaciones suponen que los objetos tienen la forma `{ name: string, subcategories: [] }`.
En un entorno real esa información podría provenir de una base de datos; por eso las funciones comienzan
con validaciones sencillas que retornan `null` si se les pasa algo distinto de un array o un nombre
válido.

## Implementaciones disponibles

### Solución simple (`solucion-simple.js`)
Una implementación básica y directa de la función recursiva, sin validaciones ni suposiciones sobre la entrada.
Solo implementa la lógica pura, con datos hardcodeados y logs de ejemplo.

### Soluciones avanzadas (`recursividad.js` e `iteracion.js`)
Estas versiones aíslan la base de datos en un módulo separado (`categories.js`) y la importan desde dos componentes distintos.
Cada uno ejecuta un algoritmo diferente, con validaciones de entrada, exports para reutilización y benchmarks de rendimiento.

- **Recursiva**: Conviene para árboles **profundos** (verticales), donde la profundidad es moderada (<10k niveles).
  Ventajas: simple, eficiente en memoria para casos comunes, usa la pila nativa del sistema.
  Desventajas: riesgo de stack overflow en profundidades extremas.

- **Iterativa**: Conviene para árboles **anchos** (horizontales) o muy profundos, donde el número de ramas es alto.
  Ventajas: evita límites de recursión, maneja mejor la memory heap para estructuras grandes.
  Desventajas: más lento en casos pequeños por el overhead de la pila manual.

En bases de datos reales, elige recursiva para jerarquías como categorías de productos (profundas pero no extremas),
e iterativa para estructuras como redes sociales o grafos amplios donde la profundidad puede variar mucho.

### Comparativa

| Característica        | Recursivo                                                                | Iterativo                                                        |
| --------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Uso de memoria        | Cada llamada recursiva ocupa stack → cuidado si el árbol es muy profundo | Pila en heap → generalmente más estable para árboles muy grandes |
| Flexibilidad          | Fácil de modificar y entender                                            | Se puede complicar si necesitas recorrido especial               |
| Estilo                | Muy natural para árboles                                                 | Útil para evitar límites de recursión en JS                      |
| Rendimiento típico    | Más rápido en árboles profundos/moderados (~0.3ms en benchmark)          | Más lento en casos pequeños (~7ms), pero seguro en extremos      |
| Caso ideal            | Árboles verticales (profundos)                                           | Árboles horizontales (anchos) o profundidades >10k               |


## Precauciones y validaciones
- Se comprueba que la entrada sea un array y que `categoryName` sea un string no vacía.
- En un sistema real tendríamos que sanitizar datos, comprobar `null`/`undefined` y quizá normalizar
mayúsculas/minúsculas.

## Casos de prueba recomendados
1. Árbol vacío (`[]`).
2. Nombre inexistente.
3. Nombre vacío o no string.
4. Búsquedas en árboles muy profundos o amplios.

## Demostración con grandes volúmenes
Ambos archivos (`recursividad.js` y `iteracion.js`) incluyen un generador `makeTree(depth, breadth)`
que crea rápidamente un árbol de `~breadth^depth` nodos. Al ejecutar con profundidad 5 y abanico 10
la búsqueda de un nodo profundo tarda sólo unos pocos milisegundos, lo que demuestra que los
algoritmos escalan linealmente respecto al número de nodos examinados.

```bash
# Solución simple (sin validaciones)
node simple.js

# Soluciones avanzadas (con validaciones y benchmarks)
node recursividad.js
node iteracion.js
```

El rendimiento dependerá de la profundidad y el tamaño del árbol; la versión iterativa evita límites de
recursión de Node.js en bases de datos muy grandes.