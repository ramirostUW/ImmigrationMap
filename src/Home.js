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
                <div label="ABOUT US">
                    <h2 class="titleAbout">ABOUT THE PROJECT</h2>
                    <div class="aboutProject"> In the Winter of 2022, a team of four Informatics students posessing various skillsets came together to ask the question: How can we effectively communicate information to prospective immigrants so that they can assess a host country based on quality of life?

                        Research indicates that immigrants today feel they need to be more knowledgable to transition successful into a new country, as differences in culture and language cause them to feel like they need as much information as possible to understand the host country and adapt smoothly. They need more information that can help them understand a country prior to moving. There is a lack of centralized and useful information pertaining to immigration on the internet today; this lack of information can hamper the quality of decisions prospective immigrants may take in regards to their host destinations.

                        Immigrants' wellbeing are impacted in all facets of their life as they attempt to reach their destination; in these travels, they face barriers in accessing adequate healthcare, housing, education, employment, and more. Immigrants are also subject to exploitation and abuse due to lack of support and resources. To better protect immigrants and ensure that they are making well-informed decisions in choosing where to immigrate, more resources and information are vital to prevent potential harm and poor quality of life in their host countries. Immigration Inc. advocates to promote the necessary transfer of knowledge and resources for those interested in moving out of their home country. This project seeks to alleviate stressors associated with immigration and help individuals feel confident in their decisions.
                    </div>
                    <h2 class="titleAbout">ABOUT THE DATA</h2>
                    <div>
                        <div class="sources">FBI: UCR. (2018, November 5). Hate Crime Statistics 2019. FBI. Retrieved March 11, 2022, from https://ucr.fbi.gov/hate-crime/2019/downloads/downloads</div>

                        <div class="sources">Glasmeier, Amy K. Living Wage Calculator. 2020. Massachusetts Institute of Technology. livingwage.mit.edu.</div>

                        <div class="sources"> Migration Policy Institute. (2021, March 26). U.S. Immigrant Population by State and County. migrationpolicy.org. Retrieved February 28, 2022, from https://www.migrationpolicy.org/programs/data-hub/charts/us-immigrant-population-state-and-county</div>

                        <div class="sources"> National Center for Education Statistics. (n.d.). Digest of Education Statistics, 2020. National Center for Education Statistics (NCES). Retrieved March 11, 2022, from https://nces.ed.gov/programs/digest/d20/tables/dt20_330.10.asp</div>

                        <div class="sources">“The American Religious Landscape in 2020” PRRI (July 8, 2021). https://www.prri.org/research/2020-census-of-american-religion/</div>

                        <div class="sources"> United Nations. (2021). International Migrant Stock 2020. United Nations Population Division. Retrieved February 28, 2022, from https://www.un.org/development/desa/pd/content/international-migrant-stock</div>

                        <div class="sources"> United States Census Bureau. (n.d.). Census - Table Results. Decennial Census 2020. Retrieved February 28, 2022, from https://data.census.gov/cedsci/table?q=population&amp;tid=DECENNIALPL2020.P1</div>

                        <div class="sources">U.S. Bureau of Labor Statistics. (2021, March 31). May 2020 National Occupational Employment and Wage Estimates United States. Occupational Employment and Wage Statistics. Retrieved March 11, 2022, from https://www.bls.gov/oes/current/oes_nat.htm</div>

                        <div class="sources"> U.S. Department of State. (2021, March 30). Nonimmigrant visa issuances by Visa category and by nationality for Fiscal Years 1997-2014. Data.gov. Retrieved March 11, 2022, from https://catalog.data.gov/dataset/nonimmigrant-visa-issuances-by-visa-category-and-by-nationality-for-fiscal-years-1997-2014</div>

                        <div class="sources"> U.S. Citizenship and Immigration Services. (2022). Historical National Median Processing Time (in Months) for All USCIS Offices for Select Forms By Fiscal Year. USCIS Case Processing Times. Retrieved February 28, 2022, from https://egov.uscis.gov/processing-times/historic-pt </div>

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
                        <Button onClick={() => { setCurrentCardOption("economy"); changeClickedStyle(setEconomyButtonStyle) }} style={economyButtonStyle}>Employment</Button>
                        <Button onClick={() => { setCurrentCardOption("crime"); changeClickedStyle(setCrimeButtonStyle) }} style={crimetButtonStyle}>Crime</Button>
                        <Button onClick={() => { setCurrentCardOption("costOfLiving"); changeClickedStyle(setCostLivingButtonStyle) }} style={costLivingButtonStyle}>Cost of Living</Button>
                        <Button onClick={() => { setCurrentCardOption("visas"); changeClickedStyle(setVisaButtonStyle) }} style={visaButtonStyle}>Visas</Button>
                        <Button style={{ margin: BTN_MARGIN, height: "40px", width: "180px", borderRadius: "40px", fontFamily: "League Spartan", textAlign: "center", backgroundColor: "#004AAD" }} onClick={disableButton}>Back</Button>
                    </div>
                    <div class="nine">
                        <CardBody>
                            <CardTitle tag="h5" style={{ fontSize: "18px", fontFamily: "Questrial" }}>{currentCountry}</CardTitle>
                            {(currentCardOption === "") && <DefaultCardContent currentCountry={currentCountry} />}
                            {(currentCardOption === "migrantFlow" && (currentCountry === "United States of America" || currentCountry === "United Kingdom" || currentCountry === "Germany" || currentCountry === "Canada")) && <MigrationFlowCard currentCountry={currentCountry} />}
                            {(currentCardOption === "immigrantPopulation" && (currentCountry === "United States of America" || currentCountry === "United Kingdom")) && <ImmigrantPopCard currentCountry={currentCountry} />}
                            {(currentCardOption === "education" && (currentCountry === "United States of America" || currentCountry === "Canada" || currentCountry === "United Kingdom" || currentCountry === "Germany")) && <EducationCard currentCountry={currentCountry} />}
                            {(currentCardOption === "religion" && (currentCountry === "United States of America" || currentCountry === "United Kingdom" || currentCountry === "Germany" || currentCountry === "Canada")) && <ReligionCard currentCountry={currentCountry} />}
                            {(currentCardOption === "economy" && (currentCountry === "United States of America" || currentCountry === "United Kingdom" || currentCountry === "Germany" || currentCountry === "Canada")) && <EconomyCard currentCountry={currentCountry} />}
                            {(currentCardOption === "crime" && (currentCountry === "United States of America" || currentCountry === "Canada" || currentCountry === "United Kingdom" || currentCountry === "Germany" )) && <CrimeCard currentCountry={currentCountry} />}
                            {(currentCardOption === "costOfLiving" && (currentCountry === "United States of America" || currentCountry === "Canada")) && <CostOfLivingCard currentCountry={currentCountry} />}
                            {(currentCardOption === "visas" && currentCountry === "United States of America") && <VisaCard currentCountry={currentCountry} />}
                        </CardBody>
                    </div>

                </div>
            </Card>
        </div>
    );
}

export default Home;
