import mongoose from "mongoose";
import { useFetch } from './hooks/useFetch'
import * as React from "react";

export async function connectToDb() {
    await mongoose.connect('mongodb+srv://ramirost:ramirost@cluster0.tlydu.mongodb.net/infoCapstone?retryWrites=true&w=majority')
}

export function getMigrantFlowData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/Migration%20Flows%20out%20from%20USA%20-%202005%20-%202020.csv");

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
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/unemployment%20over%20time%20-%20Sheet1.csv");

    return [crimeData, crimeDataLoading];
    
}


export function getCrimeBiasData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/crime-bias%20motivation.csv");

    return [crimeData, crimeDataLoading];
    
}

export function getCostOfLivingData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/living%20wage%20by%20state%202020.csv");

    return [crimeData, crimeDataLoading];
    
}

export function getVisaData() {
    
    let [crimeData, crimeDataLoading] = useFetch("https://raw.githubusercontent.com/ramirostUW/ImmigrationMap/main/src/datafiles/General%20Information.csv");

    return [crimeData, crimeDataLoading];
    
}
