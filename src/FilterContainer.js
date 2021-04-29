import {useEffect, useState} from 'react'
import CheckboxFilter from './Filters/CheckboxFilter.js'

const FilterContainer = ({originalMissionData, setFilterMissionData}) => {

    const countryArr = ['USA', 'Russia']
    const [countryFilter, setCountryFilter] = useState(countryArr)

    const spacecraftArr = ['Apollo', 'Gemini', 'ISS', 'STS', 'Skylab',
                           'Soyuz', 'Voskhod']
    const [spacecraftFilter, setSpacecraftFilters] = useState(spacecraftArr)

    useEffect(()=>{
        setFilterMissionData(
            originalMissionData
                .filter(m => countryFilter.includes(m.country) &&
                             spacecraftFilter.includes(m.spacecraft)
                )    
        )
    },[countryFilter, spacecraftFilter, originalMissionData, setFilterMissionData])
    

    return(
        <div>
            <CheckboxFilter stateArr ={countryFilter} setStateArry={setCountryFilter} labelArr={countryArr}  />
            <CheckboxFilter stateArr ={spacecraftFilter} setStateArry={setSpacecraftFilters} labelArr={spacecraftArr}  />
        </div>
    )


}

export default FilterContainer    