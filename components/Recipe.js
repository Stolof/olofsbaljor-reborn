import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useState } from 'react'

import NutrientTable from '../components/NutrientTable'
import EnergyPieChart from '../components/EnergyPieChart'

import nutrientStyle from '../styles/Nutrients.module.css'
import recipeStyle from '../styles/Recipe.module.css'

export default function Recipe(props){
    const [showNutrients, setShowNutrients] = useState(props.recipe.showNutrients ? true : false)

    const title = props.recipe.title
    const description = documentToReactComponents(props.recipe.descriptionRt) 
    const ingredientsDisplay = documentToReactComponents(props.recipe.ingredientsRt)
    const instructionsDisplay = documentToReactComponents(props.recipe.instructionsRt)
    
    const nutrients = props.recipe.nutrients
    let firstHalfOfNutrients = {} 
    let secondHalfOfNutrients = {}
    let secondHalf = false

    for (const nutrient in nutrients) {
        if (nutrient === 'Alkohol'){
            secondHalf = true
        }
        if (!secondHalf){
            firstHalfOfNutrients[nutrient] = nutrients[nutrient]
        } else{
            secondHalfOfNutrients[nutrient] = nutrients[nutrient]
        }
    }

    function getEnergyNutrients(nutrients) {
        const energyNutrients = {
            "Calories" : nutrients['Energi (kcal)'],
            "Protein" : nutrients['Protein'],
            "Carbohodydrates" : nutrients['Kolhydrater'],
            "Fat" : nutrients['Fett']
        }
        return  energyNutrients
    }

    return (
        <div className={recipeStyle.container} id={title}>
            <div className={recipeStyle.introduction}>
                <div>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                  { props.recipe.resultImage ? 
                  <img className={recipeStyle.recipeImg } src={ 'https:' + props.recipe.resultImage.fields.file.url}></img>
                  :
                <img className={recipeStyle.recipeImg } src="not-found.png"></img>
                }
            </div>
            <div className={recipeStyle.instructionContainer}>
      <div className={recipeStyle.ingredientsContainer}>
                <h3>Ingredients</h3>
                {ingredientsDisplay}
            </div>
      <div className={recipeStyle.howToContainer }>
                <h3> How to</h3>
                <p>
                    {instructionsDisplay}
                </p>
                </div>

            </div>
      <div className={nutrientStyle.container}>
                <NutrientTable recipeTitle={title} nutrients={getEnergyNutrients(props.recipe.nutrients)} />
                <EnergyPieChart title={title + "id"} energyNutrients={getEnergyNutrients(props.recipe.nutrients)}/>
            </div>
            <a onClick={() => setShowNutrients(!showNutrients)}> { showNutrients ? <p> Visa mindre</p> : <p>Visa fler näringsämnen</p>}</a>
            { showNutrients ? 
      <div className={nutrientStyle.container}>
                <NutrientTable recipeTitle={title} nutrients={firstHalfOfNutrients} />
                <NutrientTable nutrients={secondHalfOfNutrients} />
                </div>
            
        : null }
        </div>
    )
}