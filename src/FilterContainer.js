import {useEffect, useState} from 'react'
import CheckboxFilter from './Filters/CheckboxFilter.js'

const FilterContainer = ({originalMissionData, setFilterMissionData}) => {

    const countryArr = ['Astronaut', 'Cosmonaut']
    const [countryFilter, setCountryFilter] = useState(countryArr)

    const spacecraftArr = ['Apollo', 'Gemini', 'ISS', 'STS', 'Skylab',
                           'Soyuz', 'Voskhod']
    const [spacecraftFilter, setSpacecraftFilters] = useState(spacecraftArr)

    useEffect(()=>{
        setFilterMissionData(
            originalMissionData
                .filter(m => countryFilter.includes(m.cosmoOrAstro) &&
                             spacecraftFilter.includes(m.spacecraft)
                )    
        )
    },[countryFilter, spacecraftFilter, originalMissionData, setFilterMissionData])
    

    return(
        <div>
            <p>Should I make filters dynamic?</p>
            <CheckboxFilter stateArr ={countryFilter} setStateArry={setCountryFilter} labelArr={countryArr}  />
            <CheckboxFilter stateArr ={spacecraftFilter} setStateArry={setSpacecraftFilters} labelArr={spacecraftArr}  />
        </div>
    )


}

export default FilterContainer    