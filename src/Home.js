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

const BTN_HEIGHT = "50px";
const BTN_MARGIN = 4;

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
                <div label="INTERACTIVE MAPS">
                    {buttonEnabled && <GraphCard btnToggle={enableButton} currentCountry={currentCountry} />}
                    {!buttonEnabled && <div>
                        <MapChart setTooltipContent={setContent} onClickCountry={showCard} />
                        <ReactTooltip>{content}</ReactTooltip>
                    </div>}
                </div>
                <div label="DIRECTIONS OF USE">
                    <h1 class="directions-title">CLICK ON A COUNTRY</h1>
                    <p class="directions-text">Clicking on a country will display a pop-up screen where you can view statistical information about the country relating to immigration.</p>
                    <h1 class="directions-title">CLICK ON TABS</h1>
                    <p class="directions-text">Navigate between various tabs to view the map, directions of use, and legend. Upon clicking on a country, you can click on different tabs to view information about the country's:
                        Migration Flows,
                        Immigrant Population,
                        Visas,
                        Education,
                        Religion,
                        Economy,
                        Crime,
                        Cost of Living</p>
                    <div class="countryData">
                        <h2 class="dataTitle">AVAILABLE COUNTRY DATA</h2>
                        <div class="container">
                            <div>
                                <h1 class="directions-title">Migration Flows</h1>
                                <p class="directions-text">Displays data about the flow of migration by country of origin</p>
                            </div>
                            <div>
                                <h1 class="directions-title">Immigrant Population</h1>
                                <p class="directions-text">Displays data about the proportion of immigrants living in the country</p>
                            </div>
                            <div>
                                <h1 class="directions-title">Visas</h1>
                                <p class="directions-text">Displays data about the average number of visas granted by country of origin</p>
                            </div>
                            <div>
                                <h1 class="directions-title">Education</h1>
                                <p class="directions-text">Displays data about the average cost of expenses and tuition in the country</p>
                            </div>
                            <div>
                                <h1 class="directions-title">Religion</h1>
                                <p class="directions-text">Displays data about the proportion of religious affiliations in the country</p>
                            </div>
                            <div>
                                <h1 class="directions-title">Employment</h1>
                                <p class="directions-text">Displays data about the most common occupation industries and average median wages</p>
                            </div>
                            <div>
                                <h1 class="directions-title">Crime</h1>
                                <p class="directions-text">Displays data about the most prevalent types of crime in the country</p>
                            </div>
                            <div>
                                <h1 class="directions-title">Cost of Living</h1>
                                <p class="directions-text">Displays data about the average cost of living and expenses in the country</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div label="ABOUT US">
                    <div> insert information about us and sources</div>
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

    let buttonStyle = { fontSize: "15px", margin: BTN_MARGIN, height: BTN_HEIGHT, width: "180px", fontFamily: "Questrial", textAlign: "left", borderTopRightRadius: "50px", borderBottomRightRadius: "50px", backgroundColor: "#EBF6FF", borderColor: "#004AAD", borderWidth: "3px", color: "#004AAD" }
    let clickedbuttonStyle = { fontSize: "15px", margin: BTN_MARGIN, height: BTN_HEIGHT, width: "180px", fontFamily: "Questrial", textAlign: "left", borderTopRightRadius: "50px", borderBottomRightRadius: "50px", backgroundColor: "#004AAD", borderColor: "#004AAD", borderWidth: "3px", color: "white" }

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
                <div style={{ align: "center", backgroundColor: "#EEF6F6" }} class="wrapper">
                    <div class="one">
                        <Button onClick={() => { setCurrentCardOption("migrantFlow"); changeClickedStyle(setMigrantButtonStyle) }} style={migrantButtonStyle}>Migration Flow</Button>
                        <Button onClick={() => { setCurrentCardOption("immigrantPopulation"); changeClickedStyle(setImmigrationButtonStyle) }} style={immigrationButtonStyle}>Immigrant Population</Button>
                        <Button onClick={() => { setCurrentCardOption("education"); changeClickedStyle(setEducationButtonStyle) }} style={educationButtonStyle}>Education</Button>
                        <Button onClick={() => { setCurrentCardOption("religion"); changeClickedStyle(setReligionButtonStyle) }} style={religionButtonStyle}>Religion</Button>
                        <Button onClick={() => { setCurrentCardOption("economy"); changeClickedStyle(setEconomyButtonStyle) }} style={economyButtonStyle}>Economy</Button>
                        <Button onClick={() => { setCurrentCardOption("crime"); changeClickedStyle(setCrimeButtonStyle) }} style={crimetButtonStyle}>Crime</Button>
                        <Button onClick={() => { setCurrentCardOption("costOfLiving"); changeClickedStyle(setCostLivingButtonStyle) }} style={costLivingButtonStyle}>Cost of Living</Button>
                        <Button onClick={() => { setCurrentCardOption("visas"); changeClickedStyle(setVisaButtonStyle) }} style={visaButtonStyle}>Visas</Button>
                    <div class="backButton">
                    <Button style={{ margin: BTN_MARGIN, height: "40px", width: "180px", borderRadius:"40px", fontFamily: "League Spartan", textAlign: "center", backgroundColor: "#004AAD" }} onClick={disableButton}>Back</Button>
                    <div class="socialMediaButtons"><FacebookShareButton url={"https://google.com"} /></div>
                    </div>
                    </div>
                    <div class="nine">
                        <CardBody>
                            <CardTitle tag="h5" style={{ fontSize: "18px", fontFamily: "Questrial" }}>{currentCountry}</CardTitle>
                            {(currentCardOption === "") && <DefaultCardContent currentCountry={currentCountry} />}
                            {(currentCardOption === "migrantFlow" && currentCountry === "United States of America") && <MigrationFlowCard currentCountry={currentCountry} />}
                            {(currentCardOption === "immigrantPopulation" && currentCountry === "United States of America") && <ImmigrantPopCard currentCountry={currentCountry} />}
                            {(currentCardOption === "education" && currentCountry === "United States of America") && <EducationCard currentCountry={currentCountry} />}
                            {(currentCardOption === "religion" && currentCountry === "United States of America") && <ReligionCard currentCountry={currentCountry} />}
                            {(currentCardOption === "economy" && currentCountry === "United States of America") && <EconomyCard currentCountry={currentCountry} />}
                            {(currentCardOption === "crime" && currentCountry === "United States of America") && <CrimeCard currentCountry={currentCountry} />}
                            {(currentCardOption === "costOfLiving" && currentCountry === "United States of America") && <CostOfLivingCard currentCountry={currentCountry} />}
                            {(currentCardOption === "visas" && currentCountry === "United States of America") && <VisaCard currentCountry={currentCountry} />}
                        </CardBody>
                    </div>

                </div>
            </Card>
        </div>
    );
}

export default Home;
