import { useFetch } from './hooks/useFetch'
import * as React from "react";

export function getGeneralInfoData() {
       
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/General%20Information.csv");

    return [crimeData, crimeDataLoading];    
}

export function getMigrantFlowData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/migration-flows-in.csv");

    return [crimeData, crimeDataLoading];
    
}

export function getImmigrantPopulationData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/Historical%20population%20density.csv");

    return [crimeData, crimeDataLoading];
    
}

export function getEducationData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/EDUCATION%20education%20expenses.xls%20-%20Digest%202020%20Table%20330.10.csv")
    return [crimeData, crimeDataLoading];
    
}

export function getReligionData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/Religious%20Affiliation%20Sample%20Survey.csv");

    return [crimeData, crimeDataLoading];
    
}

export function getEconomyData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/EMPLOYMENT%20Top%20Occupations%20and%20median%20wage%20-%20Sheet1.csv")
    return [crimeData, crimeDataLoading];
    
}


export function getCrimeBiasData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/crime_by_offense_new.csv")
    return [crimeData, crimeDataLoading];
    
}

export function getCostOfLivingData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/cost_of_living_USA.csv");

    return [crimeData, crimeDataLoading];
    
}

export function getVisaData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/VISA%20visa%20issuance%20by%20nationality%20and%20visa%20type.xls%20-%20FY14.csv")
    return [crimeData, crimeDataLoading];
}

export function getStateCoded() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/state_codes.csv");

    return [crimeData, crimeDataLoading];
    
}

export function getCrimeTypeData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/crime-bias%20motivation.csv");

    return [crimeData, crimeDataLoading];
}  