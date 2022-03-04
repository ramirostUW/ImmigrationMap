import { Link } from "react-router-dom";
import { useState } from "react";
import MapChart from "./MapChart"
import {
    getGeneralInfoData, getMigrantFlowData, getImmigrantPopulationData, getEducationData,
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
import propTypes, { oneOfType } from "prop-types";
import { findFlagUrlByCountryName, countries } from "country-flags-svg";

export function DefaultCardContent(props) {
    let [generalInfoData, generalInfoDataLoading] = getGeneralInfoData();
    let generalInfoObject = null;
    if (!generalInfoDataLoading) {
        let selectedName = props.currentCountry;
        for (let i = 0; i < generalInfoData.length; i++) {
            if (generalInfoData[i].Country === selectedName) {
                generalInfoObject = generalInfoData[i];
            }
        }


        if (selectedName === "United States of America") {
            selectedName = "United States"
        }
        let currentCountryObject = null;
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].name === selectedName) {
                currentCountryObject = countries[i];
            }
        }

        generalInfoObject = {
            ...generalInfoObject,
            ...{ iso3: currentCountryObject.iso3 }
        }
        var data = [{
            type: 'table',
            header: {
                values: Object.keys(generalInfoObject),
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "grey" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: Object.values(generalInfoObject),
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]
        return (

            <div class="flag-page">
                <img length={750} width={750} src={findFlagUrlByCountryName(selectedName)} />
                <Plot data={data} layout={{ length: 300, width: 750 }} />
            </div>
        )
    }
    else {
        return (
            <p>Data is still loading!</p>
        )
    }
}

export function MigrationFlowCard(props) {
    let [crimeData, crimeDataLoading] = getMigrantFlowData();

    return (
        <div>
            <h1 class="chart-name">Migration Flow for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText><MigrationFlowGraph /></CardText>}
        </div>

    )
}

export function ImmigrantPopCard(props) {
    let [crimeData, crimeDataLoading] = getImmigrantPopulationData();

    return (
        <div>
            <h1 class="chart-name">Immigrant Population for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText><ImmigrantPopGraph /></CardText>}
        </div>

    )
}

export function EducationCard(props) {
    let [crimeData, crimeDataLoading] = getEducationData();

    return (
        <div>
            <h1 class="chart-name">Education for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText><EducationGraph /></CardText>}
        </div>

    )
}

export function ReligionCard(props) {
    let [crimeData, crimeDataLoading] = getReligionData();

    return (
        <div>
            <h1 class="chart-name">Religion for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText><ReligionGraph /></CardText>}
        </div>

    )
}

export function EconomyCard(props) {
    let [crimeData, crimeDataLoading] = getEconomyData();

    return (
        <div>
            <h1 class="chart-name">Economy for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText><EconomyGraph /></CardText>}
        </div>

    )
}


export function CrimeCard(props) {
    let [crimeData, crimeDataLoading] = getCrimeBiasData();

    return (
        <div>
            <h1 class="chart-name">Crime for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText><CrimeBiasGraph /></CardText>}
        </div>

    )
}

export function CostOfLivingCard(props) {
    let [crimeData, crimeDataLoading] = getCostOfLivingData();

    return (
        <div>
            <h1 class="chart-name">Cost of Living for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText><CostOfLivingGraph /></CardText>}
        </div>

    )
}

export function VisaCard(props) {
    let [crimeData, crimeDataLoading] = getVisaData("https://github.com/ramirostUW/ImmigrationMap/blob/main/src/datafiles/General%20Information.csv");

    return (
        <div>
            <h1 class="chart-name">Visas for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText><VisaGraph /></CardText>}
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
                layout={{ width: 750, height: 750, title: 'Migration outflows for USA', xaxis: { tickangle: 30 } }}
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
                    { type: 'bar', x: ["Public, in state", "Private for-profit", "Private, non-profit"], y: tuition, name: "Tuition" },
                    { type: 'bar', x: ["Public, in state", "Private for-profit", "Private, non-profit"], y: roomBoard, name: "Room & Board (on campus)" },
                    { type: 'bar', x: ["Public, in state", "Private for-profit", "Private, non-profit"], y: booksSupplies, name: "Books & Supplies" },
                    { type: 'bar', x: ["Public, in state", "Private for-profit", "Private, non-profit"], y: other, name: "Other expenses" },
                ]}
                layout={{ width: 750, height: 750, title: 'Average cost of education', barmode: 'stack' }}
            />

        )
    } else {
        return (<p>Data is loading!</p>)
    }
}
function EconomyGraph() {
    let [ecoData, ecoDataLoading] = getEconomyData()
    if (!ecoDataLoading) {
        let codes = []
        let rates = []
        let states = []
        for (let i = 0; i < ecoData.length; i++) {
            let code = ecoData[i]["State code"]
            let rate = ecoData[i]["Annual avg"]
            let state = ecoData[i]["State"]
            codes.push(code)
            rates.push(rate)
            states.push(state)
        }
        return (
            <Plot
                data={[
                    {
                        type: 'choropleth', locationmode: 'USA-states', locations: codes, z: rates, text: states, colorscale: [
                            [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
                            [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
                            [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
                        ], colorbar: {
                            title: 'Annual avg. unemployment%',
                            thickness: 2
                        }, marker: {
                            line: {
                                color: 'rgb(255,255,255)',
                                width: 2
                            }
                        }
                    },
                ]}
                layout={{ title: "Unemployment rate chloropleth", geo: { scope: 'usa' }, width: 1000, height: 1000 }
                }
            />

        )
    } else {
        return (
            <p>Data is loading!</p>
        )
    }
}

function CrimeBiasGraph() {
    let [criData, criDataLoading] = getCrimeBiasData()
    if (!criDataLoading) {
        let number = []
        let bias = []
        for (let i = 0; i < criData.length; i++) {
            let num = criData[i]["value"]
            number.push(num)
            let bi = criData[i]["key"]
            bias.push(bi)
        }
        return (
            <Plot
                data={[
                    { type: 'bar', y: number, x: bias },
                ]}
                layout={{ width: 750, height: 500, title: 'Distribution of race-based crimes', xaxis: { size: 8 } }}
            />
        )
    } else {
        return (<p>Data is still loading!</p>)
    }
}

function ReligionGraph() {
    let [relData, relDataLoading] = getReligionData()
    if (!relDataLoading) {
        let religion = []
        let share = []
        for (let i = 0; i < relData.length; i++) {
            let rel = relData[i]["Religious Affiliation"]
            let sh = relData[i]["2020 weighted %"]
            religion.push(rel)
            share.push(sh)
        }
        return (
            <Plot
                data={[
                    { type: 'bar', y: share, x: religion },
                ]}
                layout={{ width: 750, height: 500, title: 'Propotion of religious affiliations', xaxis: { size: 8 } }}
            />
        )
    } else {
        return (<p>Data is still loading!</p>)
    }
}

function CostOfLivingGraph() {
    let [colData, colDataLoading] = getCostOfLivingData()
    let [codes, codesLoading] = getStateCoded()
    if (!colDataLoading) {
        let map = {}
        for (let i = 0; i < colData.length; i++) {
            let state = colData[i]["State"]
            let value = colData[i]["Average value of the dollar"] + ""
            value = value.replace("$", "")
            value = parseFloat(value);
            map[state] = value
        }
        let stateMap = {}
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
                        type: 'choropleth',
                        locationmode: 'USA-states',
                        locations: Object.keys(plotMap),
                        z: Object.values(plotMap),
                        text: Object.keys(stateMap),
                        colorscale: [
                            [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
                            [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
                            [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
                        ], colorbar: {
                            title: 'Average value of $',
                            thickness: 2
                        }, marker: {
                            line: {
                                color: 'rgb(255,255,255)',
                                width: 2
                            }
                        }
                    },
                ]}
                layout={{ title: "Chloropleth for Avg. value of the dollar vs. national average", geo: { scope: 'usa' }, width: 1000, height: 1000 }
                }
            />
        )

    } else {
        return (<p>Data is still loading!</p>)
    }
}

function VisaGraph() {
    let [visaData, visaDataLoading] = getVisaData()
    if (!visaDataLoading) {
        let map = {}

        for (let i = 0; i < visaData.length; i++) {
            let type = visaData[i]["Form Description"]
            let form = visaData[i]["Form"]
            let key = type + " (" + form + ")"
            let fy17 = visaData[i]["FY 2018"]
            let fy18 = visaData[i]["FY 2019"]
            let fy19 = visaData[i]["FY 2020"]
            let fy20 = visaData[i]["FY 2021"]
            let fy21 = visaData[i]["FY 2021"]
            let fy22 = visaData[i]["FY 2022"]
            let series = []
            series.push(parseFloat(fy17))
            series.push(parseFloat(fy18))
            series.push(parseFloat(fy19))
            series.push(parseFloat(fy20))
            series.push(parseFloat(fy21))
            series.push(parseFloat(fy22))
            map[key] = series
        }
        return (
            <div>
                <div>
                    <p class="note">Note: Double click on a line in the legend to display/hide it in the graph!</p>
                </div>  
                <Plot
                    data={[
                        { type: 'scatter', y: map[Object.keys(map)[0]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[0] },
                        { type: 'scatter', y: map[Object.keys(map)[1]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[1] },
                        { type: 'scatter', y: map[Object.keys(map)[2]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[2] },
                        { type: 'scatter', y: map[Object.keys(map)[3]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[3] },
                        { type: 'scatter', y: map[Object.keys(map)[4]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[4] },
                        { type: 'lines+markers', y: map[Object.keys(map)[5]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[5] },
                        { type: 'lines+markers', y: map[Object.keys(map)[6]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[6] },
                        { type: 'lines+markers', y: map[Object.keys(map)[7]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[7] },
                    ]}
                    layout={{
                        width: 1000,

                        height: 1000,
                        title: 'Average processing time (months)',
                        xaxis: { size: 8 },
                        legend: {
                            x: 1,
                            xanchor: 'right',
                            y: 1
                        }
                    }}
                />
            </div>
        )
    } else {
        return (<p>Data is still loading!</p>)
    }
}
