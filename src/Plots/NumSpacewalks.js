import "./Count.css"

const NumSpacewalks = ({filterMissionData}) => {
    let numberOfSpacewalks = filterMissionData.length
    return(
        <div className="CountContainer">
            <div className="CountVal">{numberOfSpacewalks}</div>
            <div className="CountLabel"># of Spacewalks</div>
        </div>

    )
}

export default NumSpacewalks