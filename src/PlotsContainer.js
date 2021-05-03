
import TimelineDotChart from './Plots/TimelineDotChart.js'
import AstroCountChart from './Plots/AstroCountChart'
import './PlotsContainer.css'

const PlotsContainer = ({filterMissionData}) => {
    return (
        <div className="PlotsContainer">
            <div className="CountRow">
                <div className="CountBox"># of Spacewalks:</div>
                <div className="CountBox">Astronaunts and Cosmonaunts(sp?)</div>
                <div className="CountBox">Spacecrafts</div>
                <div className="CountBox">Minutes in Space</div>
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