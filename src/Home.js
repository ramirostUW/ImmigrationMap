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
                <p>This is the home page of the website.</p>
            </main>
            <Tabs>
                <div label="Interactive Maps">
                    {buttonEnabled && <GraphCard btnToggle={enableButton} currentCountry={currentCountry} />}
                    {!buttonEnabled && <div>
                        <MapChart setTooltipContent={setContent} onClickCountry={showCard} />
                        <ReactTooltip>{content}</ReactTooltip>
                    </div>}
                </div>
                <div label="Directions of Use">
                    Sample Text
                </div>
                <div label="Glossary">
                    Sample Text
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

    return (
        <div style={{
            display: 'block', width: "1500px", padding: 30
        }}>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
                crossorigin="anonymous" />
            <Card>
                <div class="wrapper">
                    <div class="one">
                        <Button onClick={() => { setCurrentCardOption("migrantFlow") }} style={{ margin: BTN_MARGIN, height: BTN_HEIGHT, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Migration Flow</Button>
                        <Button onClick={() => { setCurrentCardOption("immigrantPopulation") }} style={{ margin: BTN_MARGIN, height: BTN_HEIGHT, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Immigrant Population</Button>
                        <Button onClick={() => { setCurrentCardOption("education") }} style={{ margin: BTN_MARGIN, height: BTN_HEIGHT, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Education</Button>
                        <Button onClick={() => { setCurrentCardOption("religion") }} style={{ margin: BTN_MARGIN, height: BTN_HEIGHT, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Religion</Button>
                        <Button onClick={() => { setCurrentCardOption("economy") }} style={{ margin: BTN_MARGIN, height: BTN_HEIGHT, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Economy</Button>
                        <Button onClick={() => { setCurrentCardOption("crime") }} style={{ margin: BTN_MARGIN, height: BTN_HEIGHT, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Crime</Button>
                        <Button onClick={() => { setCurrentCardOption("costOfLiving") }} style={{ margin: BTN_MARGIN, height: BTN_HEIGHT, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Cost of Living</Button>
                        <Button onClick={() => { setCurrentCardOption("visas") }} style={{ margin: BTN_MARGIN, height: BTN_HEIGHT, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Visas</Button>
                    </div>
                    <div class="nine">
                        <CardBody>
                            <CardTitle tag="h5">{currentCountry}</CardTitle>
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
                <Button style={{ margin: BTN_MARGIN, height: BTN_HEIGHT, width: "180px", fontFamily: "Gill Sans", textAlign: "center" }} onClick={disableButton}>Back</Button>
                <div class="socialMediaButtons"><FacebookShareButton url={"https://google.com"}/></div>
            </Card>
        </div>
    );
}

export default Home;