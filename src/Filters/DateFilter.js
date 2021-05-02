const DateFilter = ({dateMin, setDateMin, dateMax, setDateMax}) => {

    return (
        <div>
            <input type="number" id="quantity" name="quantity" 
                   min="1965" max="2013" value={dateMin} onChange={e => setDateMin(e.target.valueAsNumber)} />

        </div>


    )    
}

export default DateFilter