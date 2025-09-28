export const categorizeIngredients = (ingredients) => {
    if (!ingredients || ingredients.length === 0) {
        return {};
    }
    
    return ingredients.reduce((acc, ingredient) => {
        const { category } = ingredient;
        if (!acc[category.name]) {
            acc[category.name] = [];
        }
        acc[category.name].push(ingredient);
        return acc;
    }, {});
};
