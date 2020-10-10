import { createClient } from 'contentful'

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})

async function getEntry(id) {
    const recipe = await client.getEntry(id)
    return parseForm(recipe)
  }

async function getAllRecipes() {
    const recipes = await client.getEntries({'content_type': 'recipe'})
    return recipes
  }

function parseForm(recipe) {
    return {
        recipe: recipe.fields,
    }
}

async function getNutrientForAllRecipes(recipes){
  let nutrientsPerRecipe = {}
   for (const recipe of recipes) {
    const ingredients = recipe.fields.ingredients
    const amounts = recipe.fields.amount
    const portions = recipe.fields.portions

    // console.log('Portions: ', recipe.fields.portions);
    // console.log('Recipe: ', recipe.fields.title);
    // console.log('Amounts: ', amounts.length);
    // console.log('ingredients: ', ingredients.length);
    
    const recipeNutrients = await getNutrientsForRecipe(ingredients, amounts, portions)
    nutrientsPerRecipe[recipe.fields.title] = recipeNutrients
  };
  return nutrientsPerRecipe
}

async function getNutrientsForRecipe(ingredients, amounts, portions) {
  let recipeNutrients = {}
  let amountIndex = 0
  for (const ingredient of ingredients){
    const productId = ingredient.fields.id
    // Stand portions are set to 8
    const amount = (amounts[amountIndex].fields.gram / 100 ) / (portions ? portions : 8)
    
    const productNutrients = await getNutrientsForProduct(productId) 
      for (const nutrient of productNutrients ) {
        if(nutrient.name in recipeNutrients) {
          recipeNutrients[nutrient.name] = nutrient.value * amount + recipeNutrients[nutrient.name]
        } else {
          recipeNutrients[nutrient.name] = nutrient.value * amount
        }
      };
    amountIndex += 1
  }
  return recipeNutrients
}

async function getNutrientsForProduct(productId){
  const livsmedelkollenAPI = 'https://api.livsmedelkollen.se/foodstuffs/'
    const res = await fetch(livsmedelkollenAPI + productId,{
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    const nutrients = await res.json()
    return await nutrients
}


module.exports = {
  getEntry: getEntry,
  getAllRecipes: getAllRecipes,
  getNutrientForAllRecipes: getNutrientForAllRecipes,
}