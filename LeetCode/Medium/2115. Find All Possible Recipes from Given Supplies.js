/**
 * @param {string[]} recipes
 * @param {string[][]} ingredients
 * @param {string[]} supplies
 * @return {string[]}
 */
var findAllRecipes = function(recipes, ingredients, supplies) {
    var result = [];
    var finished = Array(recipes.length).fill(0);
    var supplySet = new Set(supplies);
    var ingredientMap = new Map();
    ingredients.forEach((ingredient, i) => {
        ingredientMap.set(recipes[i], ingredient);
    })

    var isAvailable = recipe => {
        var ingredient = ingredientMap.get(recipe);
        for (let ing of ingredient) {
            if (!supplySet.has(ing)) {
                return false;
            }
        }
        return true;
    }

    var finishedCount = 1;
    while (finishedCount > 0) {
        finishedCount = 0;

        recipes.forEach((recipe, idx) => {
            if (finished[idx] === 0) {
                const bool = isAvailable(recipe);

                if (bool) {
                    supplySet.add(recipe);
                    result.push(recipe);
                    finished[idx] = 1;
                    finishedCount++;
                }
            }
        })
    }

    return result;
};