import "./Count.css"
import {calcCountPerAstro, spreadToRowPerAstro} from '../Util'

const NumHours = ({filterMissionData}) => {

    let rowPerAstro = spreadToRowPerAstro(filterMissionData)
    let astroCounts = calcCountPerAstro(rowPerAstro)

    let astroCountsArr = Object.values(astroCounts)

    let minutesInSpace = 0
    astroCountsArr
        .forEach(m => {
            minutesInSpace += parseInt(m.totalMinsInSpace)
        })
    return(
        <div className="CountContainer">
            <div className="CountVal">{Math.round(minutesInSpace/60)}</div>
            <div className="CountLabel">Hours in Space</div>
        </div>

    )
}

export default NumHours