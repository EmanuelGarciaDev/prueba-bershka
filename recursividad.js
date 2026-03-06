// shared categories data (could come from a DB or API)
const categories = require('./categories');

// TO-DO: Implement this function

//RECURSIVE SOLUTION
const getCategoryPath = (categories, categoryName) => {
  // guard rails para entradas inválidas
    if (!Array.isArray(categories) || typeof categoryName !== 'string' || categoryName.length === 0) {
        return null;
    }

    // Paso 1: recorremos todas las categorias en este primer nivel
    for (const category of categories) {
        // Paso 2: construimos la ruta hasta el nodo actual 
        const currentPath = `/${category.name}` 
        // Paso 3: si el nodo actual es el nodo buscado, retornar la ruta
        if (category.name === categoryName) {
            return currentPath; // encontramos nuestra ruta!
        }
        // Paso 4: si el nodo actual no es el nodo buscado, pero tiene subcategorias, procedemos a buscar recursivamente
        if (category.subcategories.length > 0) {
            const subPath = getCategoryPath(category.subcategories, categoryName)
            //Paso 5: tal como el paso 3, si encontramos la ruta en subcategorias, devolvemos la ruta
            if (subPath) {
                return currentPath + subPath; // concatenamos la ruta actual con la ruta encontrada en subcategorias
            }
        }
        // Paso 6: si no encontramos la ruta, retornar NULL (not found)
    }
    return null;
};

// export for testing or reuse
module.exports = getCategoryPath;

// OUTPUT SAMPLES
console.log(getCategoryPath(categories, 'category4')); // should output: '/category1/category3/category4'
console.log(getCategoryPath(categories, 'category2')); // should output: '/category1/category2'
console.log(getCategoryPath(categories, 'category5'));

// --- ejemplo con un conjunto de datos grande generado ---
// función auxiliar para crear un árbol ancho/profundo para ilustrar rendimiento
const makeTree = (depth, breadth, prefix = 'n') => {
  if (depth === 0) return [];
  const nodes = [];
  for (let i = 1; i <= breadth; i++) {
    nodes.push({
      name: `${prefix}${i}`,
      subcategories: makeTree(depth - 1, breadth, `${prefix}${i}-`)
    });
  }
  return nodes;
};

const bigCategories = makeTree(5, 10); // ~11111 nodos
const target = 'n1-1-1-1-1';
console.time('recursive-large');
console.log(getCategoryPath(bigCategories, target));
console.timeEnd('recursive-large');
// Tiempo estimado: ~0.3 ms para un árbol de ~11k nodos.
// La recursión es eficiente para árboles profundos (como este, con profundidad 5),
// ya que usa la pila nativa del sistema. Para profundidades extremas (>10k),
// podría causar stack overflow. Ideal cuando el árbol es más vertical que horizontal.