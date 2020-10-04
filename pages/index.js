import Head from 'next/head'
import styles from '../styles/Home.module.css'
import indexStyle from '../styles/Index.module.css'
import Recipe from '../components/Recipe.js'
import { getAllRecipes, getNutrientForAllRecipes } from '../lib/api'

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Olofsbaljor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1> Välkommen till Olofs baljor</h1>
        <p> Detta är en sida innehållande mina favoritbaljväxtrecept</p>
      </div>

      <div className={indexStyle.container}>
        <h2>Baljor</h2>

        <ul className={indexStyle.list}>
        { props.recipes.length > 0 ? props.recipes.map(
          r => (
              <li className={indexStyle.listItem} href={"#" + r.fields.title}>
                <a href={"#" + r.fields.title}>
                  <p>{r.fields.title}</p>
                  { r.fields.resultImage ? 
                  <img className={indexStyle.image} src={ 'https:' + r.fields.resultImage.fields.file.url}></img>
                  :
                  <img className={indexStyle.image} src="not-found.png"></img>
                }
                </a>
              </li>
          )
        ): null }
        </ul>
      </div>

      { props.recipes.length > 0 ? props.recipes.map(
        r => (
          <Recipe recipe={r.fields}></Recipe>
        )
      ): null
      }
      </div>
)}

export async function getStaticProps() {
  let recipes = await getAllRecipes()
  recipes = recipes.items

  const nutrientsPerRecipe = await getNutrientForAllRecipes(recipes)
  for (const recipe of recipes) {
    recipe.fields["nutrients"] = nutrientsPerRecipe[recipe.fields.title]
    recipe.fields["showNutrients"] = false
  }
  console.log('Recipes', recipes )
  // const result = await Promise.all(Object.values(nutrientsPerRecipe))

  return {
    props: {recipes}
  }
}