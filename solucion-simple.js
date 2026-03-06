const categories = [
    {
        name: 'category1',
        subcategories: [
            {
                name: 'category2',
                subcategories: []
            },
            {
                name: 'category3',
                subcategories: [
                    {
                        name: 'category4',
                        subcategories: []
                    }
                ]
            }
        ]
    },
    {
        name: 'category5',
        subcategories: []
    }
];

// Implementación simple y directa de la función
const getCategoryPath = (categories, categoryName) => {
    // Paso 1: recorremos todas las categorías en este nivel
    for (const category of categories) {
        // Paso 2: construimos la ruta hasta este nodo
        const currentPath = `/${category.name}`;
        // Paso 3: si el nodo actual es el buscado, retornamos la ruta
        if (category.name === categoryName) {
            return currentPath; // encontramos la ruta
        }
        // Paso 4: si el nodo actual no es el buscado, pero tiene subcategorías, buscamos recursivamente
        if (category.subcategories.length > 0) {
            const subPath = getCategoryPath(category.subcategories, categoryName);
            // Paso 5: si encontramos la ruta en subcategorías, devolvemos la ruta
            if (subPath) {
                return currentPath + subPath; // concatenamos la ruta actual con la encontrada
            }
        }
    }
    // Paso 6: si no encontramos la ruta, retornamos null
    return null;
};

// Ejemplos de salida
console.log(getCategoryPath(categories, 'category4')); // debería mostrar: '/category1/category3/category4'
console.log(getCategoryPath(categories, 'category2')); // debería mostrar: '/category1/category2'
console.log(getCategoryPath(categories, 'category5')); // debería mostrar: '/category5'