import { Link } from "react-router-dom";
import { useState } from "react";
import MapChart from "./MapChart"
import {
    getGeneralInfoData, getMigrantFlowData, getImmigrantPopulationData, getEducationData,
    getReligionData, getEconomyData, getCrimeBiasData,
    getCostOfLivingData, getVisaData, getStateCoded, getCrimeTypeData, getVisaWaitData, 
    getMigrationFlowDataUK, getMigrationFlowDataGermany
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
                font: { family: "Questrial", size: 12, color: "white" }
            },
            cells: {
                values: Object.values(generalInfoObject),
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Questrial", size: 11, color: ["black"] }
            }
        }]
        return (

            <div class="flag-page">
                <img length={550} width={550} src={findFlagUrlByCountryName(selectedName)} />
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
            {!crimeDataLoading && <CardText><MigrationFlowGraph currentCountry={props.currentCountry}/></CardText>}
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
            {!crimeDataLoading && <CardText><CrimeGraphs /></CardText>}
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
    if(currentCountry === "United States of America")
        [countryMigData, countryMigDataLoading] = getMigrantFlowData();
    if(currentCountry === "Germany")
        [countryMigData, countryMigDataLoading] = getMigrationFlowDataGermany();
    if(currentCountry === "United Kingdom")
        [countryMigData, countryMigDataLoading] = getMigrationFlowDataUK();
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

        return (
            <div>
                <Plot
                    data={[
                        {
                            type: 'choropleth', locationmode: 'country names', locations: Object.keys(map), z: Object.values(map), text: Object.keys(map), colorscale: [
                                [0, '#ebecf0'], [0.2, '#8587d6'],
                                [0.4, '#768acc'], [0.6, '#4973c9'],
                                [0.8, '#2354b8'], [1, '#004AAD'],
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
                        plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Questrial" }
                    }
                    }
                />
                <Plot
                    data={[
                        { type: 'bar', x: Object.keys(map), y: Object.values(map)/*, orientation: "h" */
                            ,   marker: {
                                color: '#004AAD'}
                     },
                    ]}
                    layout={{
                        width: 1100, height: 700, title: 'Where are immigrants coming from by nationality?', xaxis: {
                            rangeslider: {}
                        }, yaxis: { fixedrange: false, title: "# of Immigrants" }, paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Questrial" }, barmode: "horizontal"
                    }}
                />
            </div>



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
                            [0, '#ebecf0'], [0.2, '#8587d6'],
                            [0.4, '#768acc'], [0.6, '#4973c9'],
                            [0.8, '#2354b8'], [1, '#004AAD'],
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
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Questrial" }
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
                    { type: 'bar', x: types, y: tuition, name: "Tuition", font: { family: "Questrial" }, marker: {color: '#004AAD'}},
                    { type: 'bar', x: types, y: roomBoard, name: "Dormitory rooms", font: { family: "Questrial" }, marker: {color: '#00ad62'}},
                    { type: 'bar', x: types, y: booksSupplies, name: "Board", font: { family: "Questrial" }, marker: {color: '#ffcf33'}},
                ]}
                layout={{
                    width: 750, height: 750, title: 'How much does post-secondary education & expenses cost?', barmode: 'stack', paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Questrial" }, yaxis: { title: "US Dollars ($)" }
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
            marker: {color: '#004AAD'}
            //orientation: "h"
        };

        var trace2 = {
            x: occupation,
            y: wage,
            name: 'Mean Annual Wage in thousands (USD)',
            yaxis: 'Mean Annual Wage (USD)',
            type: 'bar',
            marker: {color: '#00ad62'}
            //orientation: "h"
        };

        var data = [trace1, trace2];
        return (
            <Plot data={data} layout={{
                title: "What is the mean annual wage of top occupations?",
                length: 750, width: 1100, paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Questrial" },
                xaxis: { rangeslider: {} },
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
                    { type: 'pie', values: number, labels: types },
                ]}
                layout={{
                    width: 700, height: 500, title: 'What types of crimes are most prevalent?', paper_bgcolor: 'rgba(0,0,0,0)',
                    fontTitle: "Raleway",
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Questrial" }
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
                    { type: 'bar', y: share, x: religion, marker: {color: '#004AAD'} },
                ]}
                layout={{
                    width: 1100, height: 600, title: 'What is the distribution of religious affiliations?', xaxis: { size: 8 }, paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Questrial" }, yaxis: { "title": "Percentage" }
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
                        font: { family: "Questrial" },
                        colorscale: [
                            [0, '#ebecf0'], [0.2, '#8587d6'],
                            [0.4, '#768acc'], [0.6, '#4973c9'],
                            [0.8, '#2354b8'], [1, '#004AAD']
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
                    title: "What is the value of a dollar in different parts of the country?", geo: { scope: 'usa' }, width: 1100, height: 600, paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Questrial" }
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
                            font: { family: "Questrial" },
                            colorscale: [
                                [0, '#ebecf0'], [0.2, '#8587d6'],
                                [0.4, '#768acc'], [0.6, '#4973c9'],
                                [0.8, '#2354b8'], [1, '#004AAD']
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
                            font: { family: "Questrial" }
                        }, geo: {
                            projection: {
                                type: 'projection'
                            }
                        }, width: 1150, height: 600, paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)'
                    }
                    }
                />
                <VisaWaitGraph/>
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
                    { type: 'pie', values: Object.values(plotMap), labels: Object.keys(plotMap) },
                ]}
                layout={{
                    width: 700, height: 500, title: 'What biases propogate through crimes?', paper_bgcolor: 'rgba(0,0,0,0)',
                    fontTitle: "Raleway",
                    plot_bgcolor: 'rgba(0,0,0,0)', font: { family: "Questrial" }
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
                        xaxis: { size: 8, rangeselector:{}},
                        title: "How much time does it take to process visa applications?",
                        legend: {
                            orientation: "h"
                        },
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        yaxis:{title:"months"}
                    }}
                />
            </div>
        )
    } else {
        return (<p>Data is still loading!</p>)
    }
}