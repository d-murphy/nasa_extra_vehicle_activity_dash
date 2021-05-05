import './CheckboxFilter.css'
const CheckboxFilter = ({stateObj, intermediateStateFunc, spacecraftOrAstro}) => {

    function handleInputCheck (key) {
        var newState = {...stateObj}
        let deselect = true
        if(stateObj[key].checked) {
            newState[key].checked = false
            intermediateStateFunc({...newState}, spacecraftOrAstro, deselect)
        } else {
            newState[key].checked = true
            deselect = false
            intermediateStateFunc({...newState}, spacecraftOrAstro, deselect)
        }
    }

    return(
        <div className="filterSubset">
            {Object.keys(stateObj)
                .map((key) => {
                    let labelName = key === 'ISS' ? "Intl Space Station" : 
                                        key === 'STS' ? "Space Shuttle" : key
                    return(
                        <div key={key}>
                            <input onChange={()=> handleInputCheck(key)} type="checkbox" id={key+"Checkbox"}
                                checked={stateObj[key].checked}   />                    
                            <label for={key+"Checkbox"} id={key+"CheckboxLab"} className={spacecraftOrAstro+"CheckBox"}>
                                {labelName}
                            </label>
                        </div>
                    )
                })
            }
        </div>
    )

}

export default CheckboxFilter;