const CheckboxFilter = ({stateArr, setStateArry, labelArr}) => {

    function isInputChecked (label) {
        return (stateArr.includes(label))
    }

    function handleInputCheck (label) {
        if(stateArr.includes(label)) {
            setStateArry (stateArr.filter(e => e!==label))
        } else {
            setStateArry ([...stateArr,label])
        }
    }
    
    return(
        <div>
            {labelArr.map(e => 
                <div key={e}>
                    <label>{e}
                        <input onChange={()=> handleInputCheck(e)} type="checkbox" id={e+"Checkbox"} checked={isInputChecked(e)} />                    
                    </label>
                </div>

            )
            }
              {stateArr.map(c => <p key={c}>{c}</p>)} 
        </div>

        // <div>
        //     <label>USA
        //         <input onClick={()=> handleCountryCheck("USA")}  type="checkbox" id="usaCheck" checked={isCountryChecked("USA")} />
        //     </label>
        //     <label>France
        //         <input onClick={()=> handleCountryCheck("France")} type="checkbox" id="franceCheck" checked={isCountryChecked("France")} />
        //     </label>
        //     {countryFilter.map(c => <p>{c}</p>)}
        // </div>
    )

}

export default CheckboxFilter;