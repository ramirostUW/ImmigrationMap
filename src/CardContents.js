import { Link } from "react-router-dom";
import { useState } from "react";
import MapChart from "./MapChart"
import {getMigrantFlowData, getImmigrantPopulationData, getEducationData, 
        getReligionData, getEconomyData, getCrimeBiasData, 
        getCostOfLivingData, getVisaData } from "./AccessDatabase"
import Tabs from "./Tabs"
import ReactTooltip from "react-tooltip";
import "./App.css";
import {
    Card, CardImg, CardBody,
    CardTitle, CardText, Button
} from "reactstrap"
import propTypes from "prop-types";

export function DefaultCardContent(props) {
    return (
        <CardText>
            Sample Card Text to display! <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non scelerisque elit. Aenean rutrum, turpis nec porta faucibus, elit magna convallis purus, in fermentum metus lacus vel risus. Sed egestas, metus eget congue fermentum, lorem sapien porta lorem, nec tempor nisi risus sit amet metus. Morbi eu lacus enim. Cras ut nisl hendrerit quam iaculis pellentesque sed iaculis sapien. Fusce tempus vestibulum lacus. Etiam suscipit sapien a accumsan finibus. In malesuada felis justo, sollicitudin molestie est sodales porta. Ut viverra eleifend pellentesque. Etiam elit nisl, viverra id pellentesque eu, viverra in risus. Suspendisse dui velit, posuere nec eros a, pretium ultrices tellus. Pellentesque pulvinar magna est, in aliquet metus finibus in. Curabitur elementum erat ut euismod consequat. Vestibulum mattis neque ac nibh tempor lacinia. Aliquam a fringilla libero. <br />

            Nunc sed metus nibh. Nulla malesuada arcu sit amet ipsum cursus, vitae imperdiet mauris ullamcorper. Ut eget turpis tellus. In hac habitasse platea dictumst. Nulla volutpat mauris ac eros vestibulum, a gravida arcu fringilla. Donec finibus, nisi in consectetur faucibus, sem tellus imperdiet lorem, quis porta velit erat in tortor. Fusce tristique neque eget auctor aliquam. Vestibulum dignissim non nisl vel commodo.  <br />

            Suspendisse at ipsum a augue lobortis ultrices. Nulla facilisi. Integer porttitor arcu arcu, non interdum libero blandit vel. Quisque eu vestibulum nulla, quis maximus leo. Fusce ornare quis massa sit amet euismod. Aliquam vel tortor in nisl sollicitudin mattis. Cras ornare id lorem eu viverra. Aenean vel tincidunt sem.  <br />
        </CardText>
    )
}

export function MigrationFlowCard(props) {
    let [crimeData, crimeDataLoading] = getMigrantFlowData();
    
    return (
        <div>
            <h1>Migration Flow for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText>{JSON.stringify(crimeData)}</CardText>}
        </div>
        
    )
}

export function ImmigrantPopCard(props) {
    let [crimeData, crimeDataLoading] = getImmigrantPopulationData();
    
    return (
        <div>
            <h1>Immigrant Population for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText>{JSON.stringify(crimeData)}</CardText>}
        </div>
        
    )
}

export function EducationCard(props) {
    let [crimeData, crimeDataLoading] = getEducationData();
    
    return (
        <div>
            <h1>Education for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText>{JSON.stringify(crimeData)}</CardText>}
        </div>
        
    )
}

export function ReligionCard(props) {
    let [crimeData, crimeDataLoading] = getReligionData();
    
    return (
        <div>
            <h1>Religion for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText>{JSON.stringify(crimeData)}</CardText>}
        </div>
        
    )
}

export function EconomyCard(props) {
    let [crimeData, crimeDataLoading] = getEconomyData();
    
    return (
        <div>
            <h1>Economy for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText>{JSON.stringify(crimeData)}</CardText>}
        </div>
        
    )
}


export function CrimeCard(props) {
    let [crimeData, crimeDataLoading] = getCrimeBiasData();
    
    return (
        <div>
            <h1>Crime for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText>{JSON.stringify(crimeData)}</CardText>}
        </div>
        
    )
}

export function CostOfLivingCard(props) {
    let [crimeData, crimeDataLoading] = getCostOfLivingData();
    
    return (
        <div>
            <h1>Cost of Living for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText>{JSON.stringify(crimeData)}</CardText>}
        </div>
        
    )
}

export function VisaCard(props) {
    let [crimeData, crimeDataLoading] = getVisaData("https://github.com/ramirostUW/ImmigrationMap/blob/main/src/datafiles/General%20Information.csv");
    
    return (
        <div>
            <h1>Visas for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText>{JSON.stringify(crimeData)}</CardText>}
        </div>
        
    )
}