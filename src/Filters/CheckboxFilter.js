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
            {labelArr
                .map((e, i) => 
                <div key={e}>
                    <label>{e}
                        <input onChange={()=> handleInputCheck(e)} type="checkbox" id={e+"Checkbox"}
                         checked={isInputChecked(e)} disabled={true} />                    
                    </label>
                </div>
                )
            }
              {/* {stateArr.map(c => <p key={c}>{c}</p>)}  */}
        </div>
    )

}

export default CheckboxFilter;