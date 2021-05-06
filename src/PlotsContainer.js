
import TimelineDotChart from './Plots/TimelineDotChart.js'
import AstroCountChart from './Plots/AstroCountChart'
import NumSpacewalks from './Plots/NumSpacewalks'
import NumAstro from './Plots/NumAstro'
import NumHours from './Plots/NumHours'
import NumVehicles from './Plots/NumVehicles'
import './PlotsContainer.css'

const PlotsContainer = ({filterMissionData}) => {
    return (
        <div className="PlotsContainer">
            <div className="CountRow">
                <NumSpacewalks filterMissionData={filterMissionData} />
                <NumAstro filterMissionData={filterMissionData} />
                <NumHours filterMissionData={filterMissionData} />
                <NumVehicles filterMissionData={filterMissionData} />
            </div>
            <div className="TimelineChartRow">
                <TimelineDotChart filterMissionData={filterMissionData}/>
            </div>
            <div className="SummaryChartRows">
                <div className="SummaryChart">
                    <AstroCountChart filterMissionData={filterMissionData}/>
                </div>
                <div className="SummaryChart">chart 3</div>
            </div>
        </div>
    )
}

export default PlotsContainer