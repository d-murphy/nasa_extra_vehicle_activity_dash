import "./Count.css"
import {calcCountPerAstro, spreadToRowPerAstro} from '../Util'

const NumAstro = ({filterMissionData}) => {

    let rowPerAstro = spreadToRowPerAstro(filterMissionData)
    let astroCounts = calcCountPerAstro(rowPerAstro)

    let numberOfAstros = Object.keys(astroCounts).length
    return(
        <div className="CountContainer">
            <div className="CountVal">{numberOfAstros}</div>
            <div className="CountLabel"># of Astronaunts / Cosmonaunts</div>
        </div>

    )
}

export default NumAstro