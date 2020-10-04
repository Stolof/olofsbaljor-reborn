import {GoogleCharts} from 'google-charts'
import nutrientStyle from '../styles/Nutrients.module.css'

export default function EnergyPieChart(props) {

    GoogleCharts.load(drawChart);

    // Draw the chart and set the chart values
    function drawChart() {
    var data = GoogleCharts.api.visualization.arrayToDataTable([
    ['Energy%', 'näringsämne'],
    ['Protien', props.energyNutrients['Protein']*4],
    ['Kolhydrater', props.energyNutrients['Carbohodydrates']*4],
    ['Fett', props.energyNutrients['Fat']*9]
    ]);

    // Optional; add a title and set the width and height of the chart
    // var options = {'title':'E% per näringsämne', 'width':550, 'height':400};
    // var options = {'title':'E% per näringsämne'};

    // Display the chart inside the <div> element with id="piechart"
    var piechart = new GoogleCharts.api.visualization.PieChart(document.getElementById(props.title));
    piechart.draw(data);
    }

    return (
        <div className={nutrientStyle.pieChartDiv} >
            <h3> E% per näringsämne</h3>
            <div id={props.title}></div>
        </div>
    )
}