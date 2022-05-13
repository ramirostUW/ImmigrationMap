import { Link } from "react-router-dom";
import { useState } from "react";
import MapChart from "./MapChart"
import { getCrimeBiasData } from "./AccessDatabase"
import Tabs from "./Tabs"
import ReactTooltip from "react-tooltip";
import "./App.css";
import {
    Card, CardImg, CardBody,
    CardTitle, CardText, Button
} from "reactstrap"
import {
    DefaultCardContent, MigrationFlowCard, ImmigrantPopCard,
    EducationCard, ReligionCard, EconomyCard, CrimeCard,
    CostOfLivingCard, VisaCard
} from './CardContents';
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";

const BTN_HEIGHT = "60px";
const BTN_MARGIN = "2px";

export function Home() {
    const [content, setContent] = useState("");
    const [buttonEnabled, enableButton] = useState(false);
    const [currentCountry, setCurrentCountry] = useState("");

    function showCard(name, populationEstimate) {
        enableButton(true);
        setCurrentCountry(name);
    }

    return (
        <>
            <main>
            </main>
            <Tabs>
                <div label="INTERACTIVE MAP">
                    {buttonEnabled && <GraphCard btnToggle={enableButton} currentCountry={currentCountry} />}
                    {!buttonEnabled && <div>
                        <MapChart setTooltipContent={setContent} onClickCountry={showCard} />
                        <ReactTooltip>{content}</ReactTooltip>
                    </div>}
                </div>
                <div label="GUIDANCE OF USE">
                    <h2 class="titleAbout">HOW TO USE EACH TAB</h2>
                    <div class="aboutProject">
<ol>
<li>Click on the Interactive Map tab to begin. </li>
<li>Explore the map of the world by clicking on a country to learn more. Highlighted countries will have data and more complete information. </li>
<li>When you click on a country, there will be a variety of tabs on the left side. </li>
<li>Click on any tab to reveal more information about the country. Some tabs may be empty as there is not enough data present for those countries. </li>
<li>To return to the map, press the back button below all the information tabs. </li>
</ol>
                    </div>

                    <h2 class="titleAbout">AVAILABLE DATA</h2>
                    <div class="aboutProject">
                        <ul>
                            <li>Migration Flows: Displays data about the flow of migration by country of origin
</li>
                            <li>Immigrant Population: Displays data about the proportion of immigrants living in the country and where
</li>
                            <li>Education: Displays data about the average cost of expenses and tuition in the country
</li>
                            <li>Religion: Displays data about the proportion of religious affiliations in the country
</li>
                            <li>Employment: Displays data about the most common occupation industries and/or average median wages
</li>
                            <li>Crime: Displays data about the most prevalent types of crime in the country and hate bias motivations
</li>
                            <li>Cost of Living: Displays data about the average cost of living in different parts of the country
</li>
                            </ul>
                    </div>

                    <h2 class="titleAbout">DATA SOURCES</h2>
                    <div class="aboutProject makeSmall">
                        <ul>
                            <li>https://www.un.org/development/desa/pd/content/international-migrant-stock
</li>
                            <li>https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/datasets/employmentbyindustryemp13

</li>
                            <li>https://www.theguardian.com/education/datablog/2012/aug/15/students-tuition-fees-2012-league-table-data#data

</li>
                            <li>https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration/datasets/populationoftheunitedkingdombycountryofbirthandnationality

</li>
                            <li>https://data.london.gov.uk/dataset/mps-hate-crime-or-special-crime-dashboard-data

</li>
                            <li>https://data.london.gov.uk/dataset/mps-hate-crime-or-special-crime-dashboard-data

</li>
                            <li>https://statistics.ukdataservice.ac.uk/dataset/religion-great-britain-2011

</li>
<li>https://www.numbeo.com/cost-of-living/country_result.jsp?country=United+Kingdom


</li>
<li>https://www.numbeo.com/cost-of-living/country_result.jsp?country=Canada

</li>
<li>https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3510004901
</li>
<li>https://www150.statcan.gc.ca/n1/pub/85-002-x/2022001/article/00005/tbl/tbl01-eng.htm

</li>
<li>https://open.canada.ca/data/en/dataset/22ccf4ad-6ec1-48d4-9d53-f68b3537d90c/resource/4e4f0bdd-c675-47ec-b55b-9c914260b250#resource-list
</li>
<li>https://www12.statcan.gc.ca/datasets/Rp-eng.cfm?LANG=E&APATH=3&DETAIL=0&DIM=0&FL=A&FREE=0&GC=0&GID=0&GK=0&GRP=1&PID=55821&PRID=0&PTYPE=55440&S=0&SHOWALL=0&SUB=0&Temporal=2001&THEME=56&VID=0&VNAMEE=&VNAMEF=
</li>
<li>https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3710000301
</li>
<li>https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/bulletins/annualmidyearpopulationestimates/mid2020#measuring-the-data
</li>
<li>https://ucr.fbi.gov/hate-crime/2019/downloads/downloads
</li>
<li>https://nces.ed.gov/programs/digest/d20/tables/dt20_330.10.asp
</li>
<li>https://www.migrationpolicy.org/programs/data-hub/charts/us-immigrant-population-state-and-county
</li>
<li>https://www.prri.org/research/2020-census-of-american-religion/ 
</li>
<li>https://livingwage.mit.edu/
</li>
<li>https://www.bls.gov/oes/current/oes_nat.htm
</li>

                            </ul>
                    </div>
                </div>

            </Tabs>

        </>
    );
}

function GraphCard(props) {

    /*.cardContent {
  grid-column: 2;
  grid-row: 1;
}
*/
    let currentCountry = props.currentCountry;
    function disableButton() {
        props.btnToggle(false);
    }
    let cardBtnStyling = {
        width: "100px",
        height: "1px"
    }

    const [currentCardOption, setCurrentCardOption] = useState("");

    let buttonStyle = { fontSize: "15px", fontWeight: "bold", textTransform: "uppercase", margin: BTN_MARGIN, height: BTN_HEIGHT, width: "240px", fontFamily: "Sora:wght@400", textAlign: "left", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", borderTopRightRadius: "10px", borderBottomRightRadius: "10px", backgroundColor: "#D0F3EB", borderColor: "#005B67", borderWidth: "3px", color: "#005B67" }
    let clickedbuttonStyle = { fontSize: "15px", fontWeight: "bold", textTransform: "uppercase", margin: BTN_MARGIN, height: BTN_HEIGHT, width: "240px", fontFamily: "Sora:wght@400", textAlign: "left", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", borderTopRightRadius: "10px", borderBottomRightRadius: "10px", backgroundColor: "#005B67", borderColor: "#005B67", borderWidth: "3px", color: "white" }

    let [migrantButtonStyle, setMigrantButtonStyle] = useState(buttonStyle)
    let [immigrationButtonStyle, setImmigrationButtonStyle] = useState(buttonStyle)
    let [educationButtonStyle, setEducationButtonStyle] = useState(buttonStyle)
    let [religionButtonStyle, setReligionButtonStyle] = useState(buttonStyle)
    let [economyButtonStyle, setEconomyButtonStyle] = useState(buttonStyle)
    let [crimetButtonStyle, setCrimeButtonStyle] = useState(buttonStyle)
    let [costLivingButtonStyle, setCostLivingButtonStyle] = useState(buttonStyle)
    let [visaButtonStyle, setVisaButtonStyle] = useState(buttonStyle)

    let [currentClickedSetter, setCurrentClickedSetter] = useState(null);

    function changeClickedStyle(newClickedSetter) {
        let buttonSetterArray = [setMigrantButtonStyle, setImmigrationButtonStyle, setEducationButtonStyle, setReligionButtonStyle, setEconomyButtonStyle, setCrimeButtonStyle, setCostLivingButtonStyle, setVisaButtonStyle]
        var filtered = buttonSetterArray.filter(function (value) {
            return value !== newClickedSetter;
        });
        newClickedSetter(clickedbuttonStyle);
        filtered.forEach(function (currentFunc) {
            currentFunc(buttonStyle)
        })
    }
    return (
        <div style={{
            display: 'block', width: "auto", padding: 30
        }}>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
                crossorigin="anonymous" />
            <link rel="stylesheet" href="App.css" />

            <Card>
                <div style={{ align: "center", backgroundColor: "#D0F3EB" }} class="wrapper">
                    <div class="one">
                        <Button onClick={() => { setCurrentCardOption("migrantFlow"); changeClickedStyle(setMigrantButtonStyle) }} style={migrantButtonStyle}>Migration Flow</Button>
                        <Button onClick={() => { setCurrentCardOption("immigrantPopulation"); changeClickedStyle(setImmigrationButtonStyle) }} style={immigrationButtonStyle}>Immigrant Population</Button>
                        <Button onClick={() => { setCurrentCardOption("education"); changeClickedStyle(setEducationButtonStyle) }} style={educationButtonStyle}>Education</Button>
                        <Button onClick={() => { setCurrentCardOption("religion"); changeClickedStyle(setReligionButtonStyle) }} style={religionButtonStyle}>Religion</Button>
                        <Button onClick={() => { setCurrentCardOption("economy"); changeClickedStyle(setEconomyButtonStyle) }} style={economyButtonStyle}>Employment</Button>
                        <Button onClick={() => { setCurrentCardOption("crime"); changeClickedStyle(setCrimeButtonStyle) }} style={crimetButtonStyle}>Crime</Button>
                        <Button onClick={() => { setCurrentCardOption("costOfLiving"); changeClickedStyle(setCostLivingButtonStyle) }} style={costLivingButtonStyle}>Cost of Living</Button>
                        <Button style={{ margin: BTN_MARGIN, padding: "0px", marginTop: "10px", marginLeft: "10px", height: "40px", width: "230px", borderRadius: "40px", fontFamily: "Sora:wght@400", textAlign: "center", backgroundColor: "#005B67" }} onClick={disableButton}>Back</Button>
                    </div>
                    <div class="nine">
                        <CardBody>
                            <CardTitle tag="h5" style={{ fontSize: "18px", textTransform: "uppercase", fontFamily: "Sora:wght@400" }}>{currentCountry}</CardTitle>
                            {(currentCardOption === "") && <DefaultCardContent currentCountry={currentCountry} />}
                            {(currentCardOption === "migrantFlow" && (currentCountry === "United States of America" || currentCountry === "United Kingdom" || currentCountry === "Germany" || currentCountry === "Canada")) && <MigrationFlowCard currentCountry={currentCountry} />}
                            {(currentCardOption === "immigrantPopulation" && (currentCountry === "United States of America" || currentCountry === "Canada" || currentCountry === "United Kingdom")) && <ImmigrantPopCard currentCountry={currentCountry} />}
                            {(currentCardOption === "education" && (currentCountry === "United States of America" || currentCountry === "Canada" || currentCountry === "United Kingdom" || currentCountry === "Germany")) && <EducationCard currentCountry={currentCountry} />}
                            {(currentCardOption === "religion" && (currentCountry === "United States of America" || currentCountry === "United Kingdom" || currentCountry === "Germany" || currentCountry === "Canada")) && <ReligionCard currentCountry={currentCountry} />}
                            {(currentCardOption === "economy" && (currentCountry === "United States of America" || currentCountry === "United Kingdom" || currentCountry === "Germany" || currentCountry === "Canada")) && <EconomyCard currentCountry={currentCountry} />}
                            {(currentCardOption === "crime" && (currentCountry === "United States of America" || currentCountry === "Canada" || currentCountry === "United Kingdom" || currentCountry === "Germany" )) && <CrimeCard currentCountry={currentCountry} />}
                            {(currentCardOption === "costOfLiving" && (currentCountry === "United States of America" || currentCountry === "Canada" || currentCountry === "United Kingdom")) && <CostOfLivingCard currentCountry={currentCountry} />}
                            {(currentCardOption === "visas" && currentCountry === "United States of America") && <VisaCard currentCountry={currentCountry} />}
                        </CardBody>
                    </div>

                </div>
            </Card>
        </div>
    );
}

export default Home;
