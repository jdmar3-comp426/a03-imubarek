import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";
import {getSum} from "./medium_1.js" ; 

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: getAvgMpg(), 
    allYearStats: getAllYearStats(),
    ratioHybrids: getRatioHybrids()
};

export function getAvgMpg() {
    let city_sum = 0 ; 
    let highway_sum = 0 ; 
    mpg_data.forEach((element) => { 
        city_sum+= element.city_mpg ;
        highway_sum+= element.highway_mpg ; 
    }) ; 
    let cityMean = city_sum / mpg_data.length ; 
    let highwayMean = highway_sum / mpg_data.length ; 
    return {city: cityMean , highway:highwayMean} ; 
}

export function getAllYearStats() {
    let yearsArray = [] ; 
    mpg_data.forEach((element) => { 
        yearsArray.push(element.year) ;  
    }) ; 
    return getStatistics(yearsArray) ; 
}
export function getRatioHybrids() {
    let numberHybrid = 0 ; 
    mpg_data.forEach((element) => { 
        if(element.hybrid){
            numberHybrid++ ; 
        } 
    }) ; 
    return numberHybrid /mpg_data.length;
}

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: getMakerHybrids(),
    avgMpgByYearAndHybrid: getAvgMpgByYearAndHybrid()
};

export function getMakerHybrids() {
    let filteredData = mpg_data.filter(element => {return element.hybrid;}) ; //Filter for only hybrids

    let makerHybridsArray = [] ;

    makerHybridsArray.push({make:filteredData[0].make , hybrids : [filteredData[0].id]}) ;

    for(let x = 1 ; x < filteredData.length ; x++){
        let makeInArray = false ; 
        let makeIndex = -1 ; 
        for(let y = 0 ; y<makerHybridsArray.length ; y++){
            if(makerHybridsArray[y].make == filteredData[x].make){
                makeInArray = true ; 
                makeIndex = y ; 
            }
        }
        if(makeInArray){
            makerHybridsArray[makeIndex].hybrids.push(filteredData[x].id) ; 
        }
        else{
            makerHybridsArray.push({make:filteredData[x].make , hybrids : [filteredData[x].id]}) ; 
        }
    }
    return makerHybridsArray ; 
}
export function getAvgMpgByYearAndHybrid(){
    let yearsData = {} ;

    //First collect all the datapoints for each year in the dictionary
    for(let x = 0 ; x<mpg_data.length;x++){ 
        if(mpg_data[x].year in yearsData){ 
            if(mpg_data[x].hybrid){ 
                yearsData[mpg_data[x].year]["hybrid"]["city"].push(mpg_data[x].city_mpg) ; 
                yearsData[mpg_data[x].year]["hybrid"]["highway"].push(mpg_data[x].highway_mpg) ;
            }
            else{
                yearsData[mpg_data[x].year]["notHybrid"]["city"].push(mpg_data[x].city_mpg) ; 
                yearsData[mpg_data[x].year]["notHybrid"]["highway"].push(mpg_data[x].highway_mpg) ;
            }
        }
        else{ 
            if(mpg_data[x].hyrbid){
                yearsData[mpg_data[x].year] = {"hybrid": {"city": [mpg_data[x].city_mpg] , "highway": [mpg_data[x].highway_mpg]}, "notHybrid":{"city":[] , "highway": []}  } ; 
                 
            }
            else{
                yearsData[mpg_data[x].year] = {"hybrid": {"city":[] , "highway": []} , "notHybrid":{"city": [mpg_data[x].city_mpg] , "highway": [mpg_data[x].highway_mpg]}  } ;  
            }
        }
    }
    
    //Go through each year and do the mean calculations and place this mean in each array rather than the numbers
    for ( const [key,value] of Object.entries(yearsData)) {
        let hybridCitySum = getSum(yearsData[key]["hybrid"]["city"]) ;
        yearsData[key]["hybrid"]["city"] = hybridCitySum / yearsData[key]["hybrid"]["city"].length ; 

        let hybridHighwaySum = getSum(yearsData[key]["hybrid"]["highway"]) ;
        yearsData[key]["hybrid"]["highway"] = hybridHighwaySum / yearsData[key]["hybrid"]["highway"].length ;

        let notHybridCitySum = getSum(yearsData[key]["notHybrid"]["city"]) ;
        yearsData[key]["notHybrid"]["city"] = notHybridCitySum / yearsData[key]["notHybrid"]["city"].length ;

        let notHybridHighwaySum = getSum(yearsData[key]["notHybrid"]["highway"]) ;
        yearsData[key]["notHybrid"]["highway"] = notHybridHighwaySum / yearsData[key]["notHybrid"]["highway"].length ;

    }
    return yearsData ; 
}


