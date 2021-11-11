import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

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
    let sum = 0 ; 
    mpg_data.forEach((element) => { 
        sum+= element.city_mpg ;
        sum+= element.highway_mpg ; 
    }) ; 
    return sum / (mpg_data.length * 2) ; 
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
    avgMpgByYearAndHybrid: undefined
};

export function getMakerHybrids() {
    let newData = mpg_data.filter(element => {return element.hybrid;}) ; //Filter for only hybrids

    let makerHybridsArray = [] ;

    makerHybridsArray.push({make:newData[0].make , hybrids : [newData[0].id]}) ;

    for(let x = 1 ; x < newData.length ; x++){
        let makeInArray = false ; 
        let makeIndex = -1 ; 
        for(let y = 0 ; y<makerHybridsArray.length ; y++){
            if(makerHybridsArray[y].make == newData[x].make){
                makeInArray = true ; 
                makeIndex = y ; 
            }
        }
        if(makeInArray){
            makerHybridsArray[makeIndex].hybrids.push(newData[x].id) ; 
        }
        else{
            makerHybridsArray.push({make:newData[x].make , hybrids : [newData[x].id]}) ; 
        }
    }
    return makerHybridsArray ; 



}


