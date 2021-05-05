//import './CheckboxFilter.css'
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
        <div>
            {Object.keys(stateObj)
                .map((key) => 
                <div key={key}>
                    <label>{key}
                        <input onChange={()=> handleInputCheck(key)} type="checkbox" id={key+"Checkbox"}
                         checked={stateObj[key].checked}  />                    
                    </label>
                </div>
                )
            }
              {/* {stateArr.map(c => <p key={c}>{c}</p>)}  */}
        </div>
    )

}

export default CheckboxFilter;