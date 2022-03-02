import mongoose from "mongoose";
import { useFetch } from './hooks/useFetch'
import * as React from "react";

export async function connectToDb() {
    await mongoose.connect('mongodb+srv://ramirost:ramirost@cluster0.tlydu.mongodb.net/infoCapstone?retryWrites=true&w=majority')
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
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/Distribution%20of%20college%20costs%202022%20UPDATED.csv");

    return [crimeData, crimeDataLoading];
    
}

export function getReligionData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/Religious%20Affiliation%20Sample%20Survey.csv");

    return [crimeData, crimeDataLoading];
    
}

export function getEconomyData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/unemployment_state_rates.csv")
    return [crimeData, crimeDataLoading];
    
}


export function getCrimeBiasData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/crime-bias%20motivation.csv");

    return [crimeData, crimeDataLoading];
    
}

export function getCostOfLivingData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/cost_of_living_USA.csv");

    return [crimeData, crimeDataLoading];
    
}

export function getVisaData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/National%20Median%20Application%20Processing%20Times.csv");

    return [crimeData, crimeDataLoading];
    
}

export function getStateCoded() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/state_codes.csv");

    return [crimeData, crimeDataLoading];
    
}
