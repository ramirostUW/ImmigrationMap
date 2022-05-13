import { Link } from "react-router-dom";
import { useState } from "react";
import MapChartUK from "./MapChartUK"
import MapChartUKCOL from "./MapChartUKCOL"
import MapChartCanada from "./MapChartCanada"
import MapChartSample from "./MapChartSample"
import {
    getGeneralInfoData, getMigrantFlowData, getImmigrantPopulationData, getEducationData,
    getReligionData, getEconomyData, getCrimeBiasData,
    getCostOfLivingData, getVisaData, getStateCoded, getCrimeTypeData, getVisaWaitData,
    getMigrationFlowDataUK, getMigrationFlowDataGermany, getMigrationFlowDataCanada, getEducationDataCanada, getEmploymentDataCanada,
    getCrimeDataCanada, getCanadaReligionData, getCanadaColData, getUKrelData, getUKcrimeData, getUKeduData, getUKEconomyData
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
            ...generalInfoObject
        }
        var data = [{
            type: 'table',
            header: {
                values: Object.keys(generalInfoObject),
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "grey" },
                font: { family: "Sora:wght@300", size: 12, color: "white" }
            },
            cells: {
                values: Object.values(generalInfoObject),
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Sora:wght@300", size: 11, color: ["black"] }
            }
        }]
        return (

            <div class="flag-page">
                <img class="centerFlag" length={550} width={550} src={findFlagUrlByCountryName(selectedName)} />
                <Plot data={data} layout={{
                    length: 300, width: 750, paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)', margin: 0
                }} />
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
            {!crimeDataLoading && <CardText><MigrationFlowGraph currentCountry={props.currentCountry} /></CardText>}
        </div>

    )
}

export function ImmigrantPopCard(props) {
    let [crimeData, crimeDataLoading] = getImmigrantPopulationData();
    let isUK = false
    let isCanada = false;
    let isUS = false;
    if (props.currentCountry === "United Kingdom") {
        isUK = true
    }
    if (props.currentCountry === "United States of America") {
        isUS = true
    }
    if (props.currentCountry === "Canada") {
        isCanada = true
    }
    return (
        <div>
            <h1 class="chart-name">Immigrant Population for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {(!crimeDataLoading && isUK) && <CardText><ImmigrationPopulationUK /></CardText>}
            {(!crimeDataLoading && isUS) && <CardText><ImmigrantPopGraph /></CardText>}
            {(!crimeDataLoading && isCanada) && <CardText><MapChartCanada /></CardText>}
            
        </div>

    )
}

export function EducationCard(props) {
    let [crimeData, crimeDataLoading] = getEducationData();
    let isCanada = false
    let isUK = false
    if (props.currentCountry === "Canada") {
        isCanada = true
    }
    if (props.currentCountry === "United Kingdom") {
        isUK = true
    }
    return (
        <div>
            <h1 class="chart-name">Education for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {(!crimeDataLoading && !isCanada && !isUK) && <CardText><EducationGraph /></CardText>}
            {(!crimeDataLoading && isCanada && !isUK) && <CardText><EducationGraphCanada /></CardText>}
            {(!crimeDataLoading && !isCanada && isUK) && <CardText><EduGraphUk /></CardText>}
        </div>

    )
}

export function ReligionCard(props) {
    let [crimeData, crimeDataLoading] = getReligionData();
    let isCanada = false
    let isUK = false
    if (props.currentCountry === "Canada") {
        isCanada = true
    }
    if (props.currentCountry === "United Kingdom") {
        isUK = true
    }

    return (
        <div>
            <h1 class="chart-name">Religion for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {(!crimeDataLoading && !isCanada && !isUK) && <CardText><ReligionGraph /></CardText>}
            {(!crimeDataLoading && isCanada && !isUK) && <CardText><ReligionGraphCanada /></CardText>}
            {(!crimeDataLoading && !isCanada && isUK) && <CardText><RelGraphUk /></CardText>}
        </div>

    )
}

export function EconomyCard(props) {
    let [crimeData, crimeDataLoading] = getEconomyData();
    let isUK = false
    let isCanada = false;
    let isUS = false;
    if (props.currentCountry === "United Kingdom") {
        isUK = true
    }
    if (props.currentCountry === "United States of America") {
        isUS = true
    }
    if (props.currentCountry === "Canada") {
        isCanada = true
    }
    return (
        <div>
            <h1 class="chart-name">Economy for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {(!crimeDataLoading && isUS) && <CardText><EconomyGraph /></CardText>}
            {(!crimeDataLoading && isCanada) && <CardText><EmploymentGraphCanada /></CardText>}
            {(!crimeDataLoading && isUK) && <CardText><EmploymentGraphUK /></CardText>}
        </div>

    )
}


export function CrimeCard(props) {
    let [crimeData, crimeDataLoading] = getCrimeBiasData();
    let isCanada = false
    let isUK = false
    if (props.currentCountry === "Canada") {
        isCanada = true
    }
    if (props.currentCountry === "United Kingdom") {
        isUK = true
    }
    return (
        <div>
            <h1 class="chart-name">Crime for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {(!crimeDataLoading && !isCanada && !isUK) && <CardText><CrimeGraphs /></CardText>}
            {(!crimeDataLoading && isCanada && !isUK) && <CardText><CrimeGraphCanada /></CardText>}
            {(!crimeDataLoading && !isCanada && isUK) && <CardText><CrimeGraphUk /></CardText>}
        </div>

    )
}

export function CostOfLivingCard(props) {
    let [crimeData, crimeDataLoading] = getCostOfLivingData();
    let isUK = false
    let isCanada = false;
    let isUS = false;
    if (props.currentCountry === "United Kingdom") {
        isUK = true
    }
    if (props.currentCountry === "United States of America") {
        isUS = true
    }
    if (props.currentCountry === "Canada") {
        isCanada = true
    }
    return (
        <div>
            <h1 class="chart-name">Cost of Living for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {(!crimeDataLoading && isUS) && <CardText><CostOfLivingGraph /></CardText>}
            {(!crimeDataLoading && isCanada) && <CardText><ColGraphCanada /></CardText>}
            {(!crimeDataLoading && isUK) && <CardText><MapChartUKCOL /></CardText>}
        </div>

    )
}

export function VisaCard(props) {
    let [crimeData, crimeDataLoading] = getVisaData();

    return (
        <div>
            <h1 class="chart-name">Visas for {props.currentCountry}</h1>
            {crimeDataLoading && <CardText>Loading Data. . .</CardText>}
            {!crimeDataLoading && <CardText><VisaGraph /></CardText>}
        </div>

    )
}


function MigrationFlowGraph(props) {
    let currentCountry = props.currentCountry;
    var countryMigData;
    var countryMigDataLoading;
    if (currentCountry === "United States of America")
        [countryMigData, countryMigDataLoading] = getMigrantFlowData();
    if (currentCountry === "Germany")
        [countryMigData, countryMigDataLoading] = getMigrationFlowDataGermany();
    if (currentCountry === "United Kingdom")
        [countryMigData, countryMigDataLoading] = getMigrationFlowDataUK();
    if (currentCountry === "Canada")
        [countryMigData, countryMigDataLoading] = getMigrationFlowDataCanada();
    if (!countryMigDataLoading) {
        let map = {}
        for (let i = 0; i < countryMigData.length; i++) {
            let country = countryMigData[i]["Region and country of last residence"];
            let num = countryMigData[i]["Total"]
            num = num.replace(",", "")
            num = parseInt(num);
            map[country] = num;
        }
        /*let sorter = sortObjectEntries(map, 20);
        let plotMap = {}
        for (let i = 0; i < sorter.length; i++) {
            let country = sorter[i];
            plotMap[country] = map[country];
        }
        */
        let countryNames = Object.keys(map);
        countryNames.sort(function (val1, val2) {
            return map[val1] - map[val2];
        })
        let sortedMap = {};
        let sortedMapLimit25 = {};
        for (let i = 0; i < countryNames.length; i++) {
            let currentCountry = countryNames[i];
            sortedMap[currentCountry] = map[currentCountry];
            if(i >= countryNames.length - 26){
                sortedMapLimit25[currentCountry] = map[currentCountry];
            }
        }
        return (
            <div>
                <Plot
                    data={[
                        {
                            type: 'choropleth', locationmode: 'country names', locations: Object.keys(sortedMap), z: Object.values(sortedMap), text: Object.keys(sortedMap), colorscale: [
                                [0, '#fff5de'], [0.2, '#ffe6a7'],
                                [0.4, '#ffd874'], [0.6, '#ffca41'],
                                [0.8, '#ffc327'], [1, '#ffbc0e'],
                            ], colorbar: {
                                title: 'Number of immigrants',
                                thickness: 15,
                                len: 1.05
                            }, marker: {
                                line: {
                                    color: 'white',
                                    width: 0.5
                                }
                            }
                        },
                    ]}
                    layout={{
                        title: "Where are immigrants coming from?", geo: {
                            projection: {
                                type: 'projection'
                            }
                        }, width: 1100, height: 600, paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }, autorange: "reversed"
                    }
                    }
                />
                <Plot
                    data={[
                        {
                            type: 'bar', x: Object.values(sortedMapLimit25), y: Object.keys(sortedMapLimit25), orientation: "h"
                            , marker: {
                                color: '#6FC1C2', orientation: 'v'
                            }
                        },
                    ]}
                    layout={{
                        width: 1100, height: 1000, title: 'Where are immigrants coming from by nationality?', xaxis: {
                            side: 'top'
                        }, yaxis: { fixedrange: false, title: "# of Immigrants" }, paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }
                    }}
                />
            </div>
            /*
                <Plot
                    data={[
                        { type: 'bar', x: Object.values(sortedMap), y: Object.keys(sortedMap), orientation: "h" 
                        ,   marker: {
                            color: '#004AAD',  orientation: 'v'}
                 },
                ]}
                layout={{
                    width: 1100, height: 700, title: 'Where are immigrants coming from by nationality?', yaxis: {
                        rangeslider: {}
                    }, xaxis: { fixedrange: false, title: "# of Immigrants" }, paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Questrial" }
                }}
            />
            */



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
                        type: 'choropleth', locationmode: 'USA-states', locations: Object.keys(plotMap), z: Object.values(plotMap), text: Object.keys(stateMap), hovertext: "%", colorscale: [
                            [0, '#fff5de'], [0.2, '#ffe6a7'],
                                [0.4, '#ffd874'], [0.6, '#ffca41'],
                                [0.8, '#ffc327'], [1, '#ffbc0e'],
                        ], colorbar: {
                            title: '% of Immigrant Population',
                            thickness: 15,
                            len: 1.1
                        }, marker: {
                            line: {
                                color: 'rgb(255,255,255)',
                                width: 2
                            }
                        }
                    },
                ]}
                layout={{
                    title: "How many and where are immigrants living?", geo: { scope: 'usa' }, width: 1100, height: 600, paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }
                }
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
        for (let i = 0; i < eduData.length; i++) {
            let type = eduData[i]["Institution"]
            types.push(type)
            let tuit = eduData[i]["Tuition and required fees"]
            tuition.push(tuit)
            let rabs = eduData[i]["Dormitory rooms"]
            roomBoard.push(rabs)
            let sups = eduData[i]["Board"]
            booksSupplies.push(sups)
        }
        return (
            <Plot
                data={[
                    { type: 'bar', x: types, y: tuition, name: "Tuition", font: { family: "Questrial" }, marker: { color: '#005B67' } },
                    { type: 'bar', x: types, y: roomBoard, name: "Dormitory rooms", font: { family: "Questrial" }, marker: { color: '#6FC1C2' } },
                    { type: 'bar', x: types, y: booksSupplies, name: "Living Expenses/Board", font: { family: "Questrial" }, marker: { color: '#FFD15A' } },
                ]}
                layout={{
                    width: 750, height: 750, title: 'What is the cost of post-secondary education & expenses?', barmode: 'stack', paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }, yaxis: { title: "US Dollars ($)" }
                }}
            />
        )
    } else {
        return (<p>Data is loading!</p>)
    }
}
function EconomyGraph() {
    let [ecoData, ecoDataLoading] = getEconomyData()
    if (!ecoDataLoading) {
        let occupation = []
        let share = []
        let wage = []
        for (let i = 0; i < ecoData.length; i++) {
            let occ = ecoData[i]["Occupation"]
            let shar = ecoData[i]["Employment per 1000 jobs"]
            shar = parseFloat(shar)
            let wag = ecoData[i]["Annual Mean Wage"]
            wag = wag.replace("$", "")
            wag = parseFloat(wag);
            occupation.push(occ)
            share.push(shar)
            wage.push(wag)
        }
        var trace1 = {
            x: occupation,
            y: share,
            name: 'Employment in Industy per 1000 jobs',
            type: 'bar',
            marker: { color: '#6FC1C2' }
            //orientation: "h"
        };

        var trace2 = {
            x: occupation,
            y: wage,
            name: 'Mean Annual Wage in thousands (USD)',
            yaxis: 'Mean Annual Wage (USD)',
            type: 'bar',
            marker: { color: '#005B67' }
            //orientation: "h"
        };

        var data = [trace1, trace2];
        return (
            <Plot data={data} layout={{
                title: "What is the mean annual wage of top occupations?",
                length: 750, width: 1100, paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Questrial" },
                xaxis: { },
                yaxis: { title: "Number per 1000, USD in 1000s" }
            }} />

        )
    } else {
        return (
            <p>Data is loading!</p>
        )
    }
}

function CrimeTypeGraph() {
    let [criData, criDataLoading] = getCrimeBiasData()
    if (!criDataLoading) {
        let number = []
        let types = []
        for (let i = 0; i < criData.length; i++) {
            let num = criData[i]["Incidents"]
            number.push(num)
            let type = criData[i]["Offense type"]
            types.push(type)
        }
        return (
            <Plot
                data={[
                    { type: 'pie', values: number, labels: types,
                    marker: {
                        'colors': [
                          '#5a88ff',
                          '#ffd15a',
                          '#ff5a88',
                          '#5affd1',
                          '#ff7f5a',
                          '#7f5aff',
                          '#d15aff',
                          '#005B67',
                          '#dbff5a'
                        ]
                      } },
                ]}
                layout={{
                    width: 700, height: 500, title: 'What types of crimes are most prevalent?', paper_bgcolor: 'rgba(0,0,0,0)',
                    fontTitle: "Sora:wght@300",
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }
                }}
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
                    { type: 'bar', y: share, x: religion, marker: { color: '#6FC1C2' } },
                ]}
                layout={{
                    width: 1100, height: 600, title: 'What is the distribution of religious affiliations?', xaxis: { size: 8 }, paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }, yaxis: { "title": "Percentage (%)" }
                }}
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
                        font: { family: "Sora:wght@300" },
                        colorscale: [
                            [0, '#fff5de'], [0.2, '#ffe6a7'],
                                [0.4, '#ffd874'], [0.6, '#ffca41'],
                                [0.8, '#ffc327'], [1, '#ffbc0e']
                            // [0, '#ebecf0'], [0.2, '#8587d6'],
                            //[0.4, '#768acc'], [0.6, '#4973c9'],
                            //[0.8, '#2354b8'], [1, '#004AAD']
                        ], colorbar: {
                            title: 'Average value of $',
                            thickness: 15,
                            len: 1.05
                        }, marker: {
                            line: {
                                color: 'rgb(255,255,255)',
                                width: 2
                            }
                        }
                    },
                ]}
                layout={{
                    title: "Where is it more expensive to live in parts of the country?", geo: { scope: 'usa' }, width: 1100, height: 600, paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }
                }
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
        let countries = []
        let totals = []


        for (let i = 0; i < visaData.length; i++) {
            let country = visaData[i]["Fiscal Year 2014"]
            let total = visaData[i]["Grand Total"]
            total = total.replace(",", "")
            total = parseFloat(total)
            countries.push(country)
            totals.push(total)

        }
        return (
            <div>
                <Plot
                    data={[
                        {
                            type: 'choropleth',
                            locationmode: 'country names',
                            locations: countries,
                            z: totals,
                            text: countries,
                            font: { family: "Sora:wght@300" },
                            colorscale: [
                                [0, '#fff5de'], [0.2, '#ffe6a7'],
                                [0.4, '#ffd874'], [0.6, '#ffca41'],
                                [0.8, '#ffc327'], [1, '#ffbc0e']
                            ], colorbar: {
                                title: {
                                    text: 'Number of Visas issued (2020)'
                                }, thickness: 15,
                                len: 1.00

                            }, marker: {
                                line: {
                                    color: 'rgb(255,255,255)',
                                    width: 1
                                }
                            }
                        },
                    ]}
                    layout={{
                        title: {
                            text: "How many visas are issued by nationality?",
                            font: { family: "Sora:wght@300" }
                        }, geo: {
                            projection: {
                                type: 'projection'
                            }
                        }, width: 1150, height: 600, paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)'
                    }
                    }
                />
            </div>

        )
    } else {
        return (<p>Data is still loading!</p>)
    }
}

function CrimeBiasGraph() {
    let [criData, criDataLoading] = getCrimeTypeData()
    if (!criDataLoading) {
        let plotMap = {}
        let otherCount = 0
        for (let i = 0; i < criData.length; i++) {
            let num = criData[i]["value"]
            num = parseFloat(num)
            let type = criData[i]["key"]
            if (num <= 80) {
                otherCount = otherCount + num
            } else {
                plotMap[type] = num
            }
        }
        plotMap["Others"] = otherCount
        return (
            <Plot
                data={[
                    { type: 'pie', values: Object.values(plotMap), labels: Object.keys(plotMap), marker: {
                        'colors': [
                          '#5a88ff',
                          '#ffd15a',
                          '#ff5a88',
                          '#5affd1',
                          '#ff7f5a',
                          '#7f5aff',
                          '#d15aff',
                          '#005B67',
                          '#dbff5a'
                        ]
                      } },
                ]}
                layout={{
                    width: 700, height: 500, title: 'What biases propogate through crimes?', paper_bgcolor: 'rgba(0,0,0,0)',
                    fontTitle: "Sora:wght@300",
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }
                }}
            />
        )
    } else {
        return (
            <p>Data is still loading!</p>
        )
    }
}

function CrimeGraphs() {
    let [criData, criDataLoading] = getCrimeTypeData()
    let [crimeData, crimeDataLoading] = getCrimeBiasData()
    return (<div>{!(crimeDataLoading && criDataLoading) && <CardText><CrimeTypeGraph /></CardText>}
        {!(crimeDataLoading && criDataLoading) && <CardText><CrimeBiasGraph /></CardText>}</div>)
}

function VisaWaitGraph() {
    let [visaData, visaDataLoading] = getVisaWaitData()
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
                <Plot
                    data={[
                        { type: 'scatter', y: map[Object.keys(map)[0]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[0] },
                        { type: 'scatter', y: map[Object.keys(map)[1]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[1] },
                        { type: 'scatter', y: map[Object.keys(map)[2]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[2] },
                        { type: 'scatter', y: map[Object.keys(map)[3]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[3] },
                        { type: 'scatter', y: map[Object.keys(map)[4]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[4] },
                        { type: 'scatter', y: map[Object.keys(map)[5]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[5] },
                        { type: 'scatter', y: map[Object.keys(map)[6]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[6] },
                        { type: 'scatter', y: map[Object.keys(map)[7]], x: [2017, 2018, 2019, 2020, 2021, 2022], name: Object.keys(map)[7] },
                    ]}
                    layout={{
                        width: 1000,
                        height: 1000,
                        xaxis: { size: 8, rangeselector: {} },
                        title: "How much time does it take to process visa applications?",
                        legend: {
                            orientation: "h"
                        },
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        yaxis: { title: "months" }
                    }}
                />
            </div>
        )
    } else {
        return (<p>Data is still loading!</p>)
    }
}

function EducationGraphCanada() {
    let [eduData, eduDataLoading] = getEducationDataCanada();
    if (!eduDataLoading) {
        let costs = []
        let majors = []
        let plotMap = {}
        for (let i = 0; i < eduData.length; i++) {
            let major = eduData[i]["Field"]
            let cost = eduData[i]["Amount (Can$)"]
            majors.push(major)
            costs.push(cost)
        }
        return (
            <Plot
                data={[
                    { type: 'bar', x: majors, y: costs, font: { family: "Sora:wght@300" }, marker: { color: '#005B67' } },
                ]}
                layout={{
                    width: 800, height: 650, title: 'How does cost of education vary across different fields?', paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }, yaxis: { title: "CAN Dollars ($)" }, xaxis: { tickangle: 45, tickfont: { size: 9 } }
                }}
            />
        )
    } else {
        return (<p>Data is still loading!</p>)
    }
}


function EmploymentGraphCanada() {
    let [empData, empDataLoading] = getEmploymentDataCanada();
    if (!empDataLoading) {
        let wages = []
        let industries = []
        for (let i = 0; i < empData.length; i++) {
            let wage = empData[i]["Median Annual wage"]
            let industry = empData[i]["Industry"]
            wages.push(wage)
            industries.push(industry)
        }
        return (
            <Plot
                data={[
                    { type: 'bar', x: industries, y: wages, name: "Mean Annual Wage", font: { family: "Sora:wght@300" }, marker: { color: '#005B67' } },
                ]}
                layout={{
                    width: 750, height: 750, title: 'How does the mean annual wage vary across industries?', paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }, yaxis: { title: "CAN Dollars ($)" }, xaxis: { tickangle: 20, tickfont: { size: 9 } }
                }}
            />
        )
    } else {
        return (
            <p>Data is still loading!</p>
        )
    }
}

function CrimeGraphCanada() {
    let [criData, criDataLoading] = getCrimeDataCanada();
    if (!criDataLoading) {
        let myString = "";
        let plotMap = {}
        for (let i = 0; i < criData.length; i++) {
            myString = myString + JSON.stringify(criData[i]["Violations"])
            let num = criData[i]["values"]
            num = parseFloat(num)
            let type = criData[i]["Violations"]
            plotMap[type] = num
        }
        return (
            <div>
                <Plot
                    data={[
                        { type: 'bar', x: Object.keys(plotMap), y: Object.values(plotMap), name: "Type of Crime", font: { family: "Sora:wght@300" }, marker: { color: '#005B67' } },
                    ]}
                    layout={{
                        width: 750, height: 750, title: 'What are the most prevalent types of crime?', paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }, yaxis: { title: "proportion per 100,000 people" }, xaxis: { tickangle: 45, tickfont: { size: 12 } }
                    }}
                />
            </div>
        )
    } else {
        return (
            <p>Data is still loading!</p>
        )
    }
}

function ImmigrationPopulationUK() {
    return (
        <MapChartUK />
    )
}

function ReligionGraphCanada() {
    let [relData, relDataLoading] = getCanadaReligionData();
    if (!relDataLoading) {
        let plotMap = {}
        for (let i = 0; i < relData.length - 1; i++) {
            let num = relData[i]["propotion"]
            num = parseFloat(num)
            let type = relData[i]["religion"]
            plotMap[type] = num
        }
        return (
            <Plot
                data={[
                    { type: 'pie', values: Object.values(plotMap), labels: Object.keys(plotMap), marker: {
                        'colors': [
                          '#5a88ff',
                          '#ffd15a',
                          '#ff5a88',
                          '#5affd1',
                          '#ff7f5a',
                          '#7f5aff',
                          '#d15aff',
                          '#005B67',
                          '#dbff5a'
                        ]
                      } },
                ]}
                layout={{
                    width: 700, height: 500, title: 'What is the distribution of religious affiliations in Canada?', paper_bgcolor: 'rgba(0,0,0,0)',
                    fontTitle: "Sora:wght@300",
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }
                }}
            />
        )
    } else {
        return (
            <p>Data is still loading!</p>
        )
    }
}

function ColGraphCanada() {
    let [colData, colDataLoading] = getCanadaColData();
    if (!colDataLoading) {
        let cities = []
        let housing = []
        let transportation = []
        let food = []
        let preschool = []
        let plotMap = {}
        for(let i = 0; i < colData.length; i++) {
            let city = colData[i]["City"]
            cities.push(city)
            let house = colData[i]["Monthly Housing Costs"]
            house = house.replace(",", "")
            house = house.replace("$", "")
            house = parseFloat(house)
            housing.push(house)
            let trans = colData[i]["Transportation"]
            trans = trans.replace("$", "")
            trans = trans.replace(",", "")
            trans = parseFloat(trans)
            transportation.push(trans)
            let foods = colData[i]["Food"]
            foods = foods.replace("$", "")
            foods = foods.replace(",", "")
            foods = parseFloat(foods)
            food.push(foods)
            let school = colData[i]["Preschool"]
            school = school.replace("$", "")
            school = school.replace(",", "")
            school = parseFloat(school)
            preschool.push(school)
        }
        return ( <Plot
            data={[
                { type: 'bar', x: cities, y: housing, name: "Housing", font: { family: "Sora:wght@300" }, marker: { color: '#005B67' } },
                { type: 'bar', x: cities, y: transportation, name: "Transportation", font: { family: "Sora:wght@300" }, marker: { color: '#6FC1C2' } },
                { type: 'bar', x: cities, y: food, name: "Food", font: { family: "Sora:wght@300" }, marker: { color: '#FFD15A' } },
                { type: 'bar', x: cities, y: preschool, name: "Preschool", font: { family: "Sora:wght@300" }, marker: { color: '#FFD15A' } },
            ]}
            layout={{
                width: 750, height: 750, title: 'How do the average monthly expenses for a 3-member family vary across major cities?', barmode: 'stack', paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }, yaxis: { title: "CAN Dollars ($)" }
            }}
        />
    )
           
                
        
    } else {
        return (
            <p>Data is still loading!</p>
        )
    }
}

function RelGraphUk() {
    let [relData, relDataLoading] = getUKrelData();
    if (!relDataLoading) {
        let plotMap = {}
        for(let i = 0; i < relData.length; i++) {
            let religion = relData[i]["RELIGION"]
            let value = relData[i]["VALUE"]
            plotMap[religion] = value
        }
        return (  <Plot
            data={[
                { type: 'pie', values: Object.values(plotMap), labels: Object.keys(plotMap), marker: {
                    'colors': [
                      '#5a88ff',
                      '#ffd15a',
                      '#ff5a88',
                      '#5affd1',
                      '#ff7f5a',
                      '#7f5aff',
                      '#d15aff',
                      '#005B67',
                      '#dbff5a'
                    ]
                  } },
            ]}
            layout={{
                width: 700, height: 500, title: 'What is the distribution of religious affiliations in the UK?', paper_bgcolor: 'rgba(0,0,0,0)',
                fontTitle: "Sora:wght@300",
                plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }
            }}
        />
    )         
        
    } else {
        return (
            <p>Data is still loading!</p>
        )
    }
}

function CrimeGraphUk() {
    let [criData, criDataLoading] = getUKcrimeData();
    if (!criDataLoading) {
        let plotMap = {}
        for(let i = 0; i < criData.length; i++) {
            let religion = criData[i]["MinorText"]
            let value = criData[i]["pct"]
            plotMap[religion] = value
        }
        return ( <Plot
            data={[
                { type: 'pie', values: Object.values(plotMap), labels: Object.keys(plotMap), marker: {
                    'colors': [
                      '#5a88ff',
                      '#ffd15a',
                      '#ff5a88',
                      '#5affd1',
                      '#ff7f5a',
                      '#7f5aff',
                      '#d15aff',
                      '#005B67',
                      '#dbff5a'
                    ]
                  } },
            ]}
            layout={{
                width: 700, height: 500, title: 'What are the prevalent types of crime in the UK?', paper_bgcolor: 'rgba(0,0,0,0)',
                fontTitle: "Sora:wght@300",
                plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }
            }}
        />
        
    )         
        
    } else {
        return (
            <p>Data is still loading!</p>
        )
    }
}

function EduGraphUk() {
    let [eduData, eduDataLoading] = getUKeduData();
    if (!eduDataLoading) {
        let plotMap = {}
        for(let i = 0; i < eduData.length; i++) {
            let religion = eduData[i]["type"]
            let value = eduData[i]["cost"]
            plotMap[religion] = parseInt(value)
        }
        return ( <Plot
            data={[
                { type: 'bar', x: Object.keys(plotMap), y: Object.values(plotMap), name: "Cost of Attendance", font: { family: "Sora:wght@300" }, marker: { color: '#6FC1C2' } },
            ]}
            layout={{
                width: 700, height: 500, title: 'What is the average minimum/maximum cost of attendance at the top 100 instuitions?', paper_bgcolor: 'rgba(0,0,0,0)',
                fontTitle: "Sora:wght@300",
                plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }
            }}
        />
        
    )         
        
    } else {
        return (
            <p>Data is still loading!</p>
        )
    }
}

function EmploymentGraphUK(){
    let [empData, empDataLoading] = getUKEconomyData();
    if (!empDataLoading) {
        let wages = []
        let industries = []
        let firstRow = empData[0];
        let firstRowKeys = Object.keys(firstRow);
        let processedData = {};
        for (i = 0; i  < firstRowKeys.length; i++){
            let currKey = firstRowKeys[i];
            if(currKey !== ""){
                processedData[currKey] = parseInt(firstRow[currKey]);
            }
        }
        return (
            <Plot
                data={[
                    { type: 'bar', x: Object.keys(processedData), y: Object.values(processedData), name: "Employment per industry in FY2021Q4", font: { family: "Sora:wght@300" }, marker: { color: '#005B67' } },
                ]}
                layout={{
                    width: 750, height: 750, title: 'How many people were employed in each industry in the UK at the end of 2021?', paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Sora:wght@300" }, yaxis: { title: "people employed" }, xaxis: { tickangle: 20, tickfont: { size: 9 } }
                }}
            />
        )
    } else {
        return (
            <p>Data is still loading!</p>
        )
    }
}
