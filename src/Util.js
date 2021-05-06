const spreadToRowPerAstro = function(missionData){
    let rowPerAstroData = []
    missionData.forEach(mission => {
        var AstroName = "";
        var CrewMemberId
        var crewMembersToFind = mission.crewArr.length/2
        for(let i=0; i<crewMembersToFind;i++){
          AstroName = mission.crewArr[i*2] + " " + mission.crewArr[i*2+1];
          CrewMemberId = i;
          rowPerAstroData.push({
            ...mission, 
            astroName: AstroName,
            crewMemberId: CrewMemberId
          })  
        }
    })
    return(rowPerAstroData)
}

const calcCountPerAstro = function(rowPerAstroData){
    let returnObject = rowPerAstroData
        .reduce((accumulator, astroObs)=>{
            if(!accumulator[astroObs.astroName]){
            accumulator[astroObs.astroName] = {
                astroName: astroObs.astroName,
                astroCountry: astroObs.country,
                numMissions: 1,
                totalMinsInSpace: astroObs.timeInMinutes, 
                yearsActiveMin: astroObs.year,
                yearsActiveMax: astroObs.year
            }
            } else {
            accumulator[astroObs.astroName].numMissions += 1
            accumulator[astroObs.astroName].totalMinsInSpace += astroObs.timeInMinutes
            accumulator[astroObs.astroName].yearsActiveMin = 
                Math.min(accumulator[astroObs.astroName].yearsActiveMin,
                astroObs.year)
            accumulator[astroObs.astroName].yearsActiveMax = 
            Math.max(accumulator[astroObs.astroName].yearsActiveMax,
                astroObs.year)
            }
            return(accumulator)
        },{})
    return(returnObject)
}

export {calcCountPerAstro, spreadToRowPerAstro}