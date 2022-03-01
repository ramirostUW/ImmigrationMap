import { Link } from "react-router-dom";
import { useState } from "react";
import MapChart from "./MapChart"
import {
    getMigrantFlowData, getImmigrantPopulationData, getEducationData,
    getReligionData, getEconomyData, getCrimeBiasData,
    getCostOfLivingData, getVisaData, getStateCoded
} from "./AccessDatabase"
import Tabs from "./Tabs"
import ReactTooltip from "react-tooltip";
import "./App.css";
import Plot from 'react-plotly.js';
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
            {!crimeDataLoading && <CardText><MigrationFlowGraph /></CardText>}
        </div>

    )
}

export function ImmigrantPopCard(props) {
    let [crimeData, crimeDataLoading] = getImmigrantPopulationData();

    return (
        <div>
            <h1>Immigrant Population for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText><ImmigrantPopGraph /></CardText>}
        </div>

    )
}

export function EducationCard(props) {
    let [crimeData, crimeDataLoading] = getEducationData();

    return (
        <div>
            <h1>Education for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText><EducationGraph /></CardText>}
        </div>

    )
}

export function ReligionCard(props) {
    let [crimeData, crimeDataLoading] = getReligionData();

    return (
        <div>
            <h1>Religion for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText><ReligionGraph /></CardText>}
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


function MigrationFlowGraph() {
    let [countryMigData, countryMigDataLoading] = getMigrantFlowData();
    if (!countryMigDataLoading) {
        let map = {}
        for (let i = 0; i < countryMigData.length; i++) {
            let country = countryMigData[i]["Region and country of last residence"];
            let num = countryMigData[i]["Total"]
            num = num.replace(",", "")
            num = parseInt(num);
            map[country] = num;
        }
        let sorter = sortObjectEntries(map, 20);
        let plotMap = {}
        for (let i = 0; i < sorter.length; i++) {
            let country = sorter[i];
            plotMap[country] = map[country];
        }


        return (
            <Plot
                data={[
                    { type: 'bar', x: Object.keys(plotMap), y: Object.values(plotMap) },
                ]}
                layout={{ width: 750, height: 750, title: 'Migration outflows for USA' ,xaxis: {tickangle:30}}}
            />

        )
    } else {
        return (
            <p>Data still loading</p>
        )
    }

}

function ImmigrantPopGraph() {
    let [migPopData, migPopDataLoading] = getImmigrantPopulationData()
    let [codes, codesLoading] = getStateCoded()
    if (!migPopDataLoading) {
        let map = {}
        let stateMap = {}
        for (let i = 0; i < migPopData.length; i++) {
            let state = migPopData[i]["State"];
            let num = migPopData[i]["State share of immigrants"]
            num = num.replace("%", "")
            num = parseFloat(num);
            map[state] = num;
        }
        for (let i = 0; i < codes.length; i++) {
            let code = codes[i]["Abbr."]
            let state = codes[i]["State"]
            stateMap[state] = code
        }
        let plotMap = {}
        //for (state in stateMap) {
        for (let x = 0; x < codes.length; x++) {
            let state = Object.keys(stateMap)[x]
            plotMap[stateMap[state]] = map[state]
        }
        return (
            <Plot
                data={[
                    {
                        type: 'choropleth', locationmode: 'USA-states', locations: Object.keys(plotMap), z: Object.values(plotMap), text: Object.keys(plotMap), colorscale: [
                            [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
                            [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
                            [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
                        ], colorbar: {
                            title: 'Percentage Population',
                            thickness: 2
                        }, marker: {
                            line: {
                                color: 'rgb(255,255,255)',
                                width: 2
                            }
                        }
                    },
                ]}
                layout={{ title: "Immigration population chloropleth", geo: { scope: 'usa' }, width: 1000, height: 1000 }
                }
            />
        )
    } else {
        return (
            <p>Data is still loading!</p>
        )
    }
}
function sortObjectEntries(map, n) {
    return Object.entries(map).sort((a, b) => b[1] - a[1]).map(el => el[0]).slice(0, n)
}

function EducationGraph() {
    let [eduData, eduDataLoading] = getEducationData()
    if (!eduDataLoading) {
        let types = []
        let tuition = []
        let roomBoard = []
        let booksSupplies = []
        let other = []
        for (let i = 0; i < eduData.length; i++) {
            let type = eduData[i]["Institution"]
            types.push(type)
            let tuit = eduData[i]["Tuition & Fees"]
            tuition.push(tuit)
            let rabs = eduData[i]["Room & Board (on campus)"]
            roomBoard.push(rabs)
            let sups = eduData[i]["Books & Supplies"]
            booksSupplies.push(sups)
            let oths = eduData[i]["Other expenses"]
            other.push(oths)
        }
        return (
            <Plot
                data={[
                    { type: 'bar', x: types, y: tuition, name: "Tuition"},
                    { type: 'bar', x: types, y: roomBoard, name: "Room & Board (on campus)"},
                    { type: 'bar', x: types, y: booksSupplies, name:  "Books & Supplies"},
                    { type: 'bar', x: types, y: other, name: "Other expenses"},
                ]}
                layout={{ width: 750, height: 750, title: 'Average cost of education',barmode: 'stack' }}
            />

        )
    } else {
        return (<p>Data is loading!</p>)
    }
}

function ReligionGraph() {
    let [relData, relDataLoading] = getReligionData()
    if (!relDataLoading) {
        let religion = []
        let share = []
        for(let i = 0; i < relData.length; i++) {
            let rel = relData[i]["Religious Affiliation"]
            let sh = relData[i]["2020 weighted %"]
            religion.push(rel)
            share.push(sh)
        }
        return (
            <Plot
                data={[
                    { type: 'bar', y: share, x: religion},
                ]}
                layout={{ width: 750, height: 500, title: 'Propotion of religious affiliations', xaxis: {size:8}}}
            />
        )
    } else {
        return (<p>Data is still loading!</p>)
    }
}
