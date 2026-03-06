// (emulamos una carga de fuente de datos)
const categories = require('./categories');

// Usamos una pila para realizar un DFS iterativo.
// Cada elemento de la pila guarda el nodo actual y el path acumulado.
// Al extraer un nodo comprobamos si coincide; si no, empujamos sus subcategorías junto con la ruta extendida.
// Devolvemos `null` cuando agotamos la pila sin encontrar nada.

const getCategoryPath = (categories, categoryName) => {
  // guard rails para entradas inválidas
  if (!Array.isArray(categories) || typeof categoryName !== 'string' || categoryName.length === 0) {
    return null;
  }

  // La pila almacena objetos: { category, path }
  const stack = categories.map(cat => ({ category: cat, path: `/${cat.name}` }));

  while (stack.length > 0) {
    // Tomamos el último elemento (DFS)
    const { category, path } = stack.pop();

    // Si encontramos la categoría, devolvemos el path
    if (category.name === categoryName) {
      return path;
    }

    // Si tiene subcategorías, las agregamos a la pila
    for (const sub of category.subcategories) {
      stack.push({ category: sub, path: `${path}/${sub.name}` });
    }
  }

  // Si no se encuentra
  return null;
};

// export for testing
module.exports = getCategoryPath;

// OUTPUT SAMPLES
console.log(getCategoryPath(categories, 'category4')); // should output: '/category1/category3/category4'
console.log(getCategoryPath(categories, 'category2')); // should output: '/category1/category2'
console.log(getCategoryPath(categories, 'category5'));

// --- demostración con conjunto de datos grande ---
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

const bigCategories = makeTree(5, 10);
const target = 'n1-1-1-1-1';
console.time('iterative-large');
console.log(getCategoryPath(bigCategories, target));
console.timeEnd('iterative-large');
// Tiempo estimado: ~7 ms para un árbol de ~11k nodos.
// La versión iterativa usa una pila en heap, lo que añade overhead pero evita
// stack overflow en árboles muy profundos. Es mejor para árboles anchos o
// cuando la profundidad supera los límites de recursión de JS (~10k llamadas).