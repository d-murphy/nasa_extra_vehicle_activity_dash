
import TimelineDotChart from './Plots/TimelineDotChart'
import AstroCountChart from './Plots/AstroCountChart'
import SpacecraftCountChart from './Plots/SpacecraftCountChart'
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
                <div className="SummaryChart">
                    <SpacecraftCountChart filterMissionData={filterMissionData} />
                </div>
            </div>
        </div>
    )
}

export default PlotsContainer