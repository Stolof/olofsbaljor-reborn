
import nutrientStyle from '../styles/Nutrients.module.css'
   export default function NutrientTableEntry(props) {
     return (
          <div className={nutrientStyle.tableRow}>
             <div>{props.name}</div>
             
             <div className={nutrientStyle.tableRowAmount}>
             <p> {Math.round((props.value + Number.EPSILON) * 100) / 100 } {props.name === "Calories" ? "kcal" :  "g" }
              </p>
             </div>
         </div>
     )
   }