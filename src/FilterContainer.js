import { useEffect, useState} from 'react'
import CheckboxFilter from './Filters/CheckboxFilter.js'

const FilterContainer = ({originalMissionData, setFilterMissionData}) => {

    // declaring state objects for 
    const cosOrAstArr = ["Cosmonaut", "Astronaut"]
    let cosOrAstFilterSetupObj = {}
    cosOrAstArr.forEach(cosOrAst => {
        cosOrAstFilterSetupObj[cosOrAst] = {checked: true}
    }) 
    const [cosmoOrAstro, setCosmoOrAstro] = useState(cosOrAstFilterSetupObj)

    const spacecraftArr = ['Apollo', 'Gemini', 'ISS', 'STS', 'Skylab',
                            'Soyuz', 'Voskhod']
    let spacecraftSetupObj = {}
    spacecraftArr.forEach(spacecraft => {
        spacecraftSetupObj[spacecraft] = {checked: true}
    }) 
    const [spacecraftFilter, setSpacecraftFilters] = useState(spacecraftSetupObj)


    const uniqueAstroVehicleCombos = originalMissionData
        .reduce((accumulator,mission) => {
            let comboToCheck = {cosmoOrAstro: mission.cosmoOrAstro, spacecraft: mission.spacecraft}
            if(accumulator.filter(u => 
                u.cosmoOrAstro === comboToCheck.cosmoOrAstro &&
                u.spacecraft === comboToCheck.spacecraft
            ).length === 0) {
                accumulator.push(comboToCheck)                
            } 
            return(accumulator)
        },[])

    const updateFilterState = function (newTempState, spacecraftOrAstro, deselect) {
        
        let uniqueCombosRemaining         
        if(spacecraftOrAstro === "cosmoOrAstro" && deselect) {
            uniqueCombosRemaining = uniqueAstroVehicleCombos
            .filter(u => newTempState[u.cosmoOrAstro].checked &&
                     spacecraftFilter[u.spacecraft].checked)
        } else if (spacecraftOrAstro === "cosmoOrAstro" && !deselect) {
            uniqueCombosRemaining = uniqueAstroVehicleCombos
            .filter(u => newTempState[u.cosmoOrAstro].checked ||
                     spacecraftFilter[u.spacecraft].checked)
        } else if (spacecraftOrAstro === "spacecraft" && deselect) {
            uniqueCombosRemaining = uniqueAstroVehicleCombos
            .filter(u => cosmoOrAstro[u.cosmoOrAstro].checked &&
                        newTempState[u.spacecraft].checked)
        } else if (spacecraftOrAstro === "spacecraft" && !deselect) {
            // Only reference the spacecraft filter when selecting
            uniqueCombosRemaining = uniqueAstroVehicleCombos
            .filter(u => newTempState[u.spacecraft].checked)
        }
        
        let remainingSpacecraft =  [...new Set(uniqueCombosRemaining.map(item => item.spacecraft))];
        let remainingAstOrCos = [...new Set(uniqueCombosRemaining.map(item => item.cosmoOrAstro))];
        
        let newCountryState = {}  
        Object.keys(cosmoOrAstro)
            .forEach((astroOrCosmo) => {
                let checkedVal = remainingAstOrCos.includes(astroOrCosmo)
                newCountryState[astroOrCosmo] = {checked: checkedVal }
            })
        setCosmoOrAstro(newCountryState)

        let newSpacecraftState = {}  
        Object.keys(spacecraftFilter)
            .forEach((spacecraft) => {
                let checkedVal = remainingSpacecraft.includes(spacecraft)
                newSpacecraftState[spacecraft] = {checked: checkedVal }
            })
        setSpacecraftFilters(newSpacecraftState)
    }

    useEffect(()=>{

        let newFilteredData = originalMissionData
            .filter(m => cosmoOrAstro[m.cosmoOrAstro].checked  &&
                        spacecraftFilter[m.spacecraft].checked
            )
        setFilterMissionData(newFilteredData)

    },[cosmoOrAstro, spacecraftFilter, originalMissionData, setFilterMissionData])

    return(
        <div className="filterContainer">
            <br />
            <CheckboxFilter stateObj ={cosmoOrAstro} intermediateStateFunc={updateFilterState} 
                            spacecraftOrAstro="cosmoOrAstro"  />
            <br />
            <CheckboxFilter stateObj ={spacecraftFilter} intermediateStateFunc={updateFilterState}
                            spacecraftOrAstro="spacecraft"  />
        </div>
    )


}

export default FilterContainer    