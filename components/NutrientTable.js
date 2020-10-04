   
import nutrientStyle from '../styles/Nutrients.module.css'

import NutrientTableEntry from './NutrientTableEntry'
   export default function NutrientTable(props) {
     return (
         <div className={nutrientStyle.table}>
             <div>{props.recipeTitle ?
                 <h3>Näringsinnehåll: {props.recipeTitle} </h3>
: <h3> </h3>}
             </div>
             <div>
                 <div className={nutrientStyle.tableRowHeading}>
                     <div>Näringsämne</div>
                     <div className={nutrientStyle.tableRowAmount}>Mängd</div>
                 </div >
                 { 
                       Object.keys(props.nutrients).map( (key) => 
                         <NutrientTableEntry name={key} value={props.nutrients[key]} />
                      )
                 }
             </div>
         </div>
     )
   }
    