import "./Count.css"

const NumVehicles = ({filterMissionData}) => {

    let vehicles = filterMissionData
        .reduce((accumulator, mission)=> {
            if(!accumulator[mission.spacecraft]){
                accumulator[mission.spacecraft] = 1
            }
            return(accumulator)
        },{})
    console.log(vehicles)
    let numberOfVehicles = Object.keys(vehicles).length
    return(
        <div className="CountContainer">
            <div className="CountVal">{numberOfVehicles}</div>
            <div className="CountLabel">Spacecraft Count</div>
        </div>

    )
}

export default NumVehicles