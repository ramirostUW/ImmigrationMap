import { Link } from "react-router-dom";
import { useState } from "react";
import MapChart from "./MapChart"
import Tabs from "./Tabs"
import ReactTooltip from "react-tooltip";
import "./App.css";
import {
    Card, CardImg, CardBody,
    CardTitle, CardText, Button
} from "reactstrap"

/*
            <div>
                <MapChart setTooltipContent={setContent} />
                <ReactTooltip>{content}</ReactTooltip>
            </div>
*/
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

    let currentCountry = props.currentCountry;
    function disableButton() {
        props.btnToggle(false);
    }
    let cardBtnStyling = {
        width: "100px",
        height: "1px"
    }
    return (
        <div style={{
            display: 'block', width: "1000px", padding: 30
        }}>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
                crossorigin="anonymous" />
            <Card>
                <CardImg
                    width="50px"
                    height="50px"
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png"
                    alt="GFG Logo" />
                <div class="wrapper">
                    <div class="one"><Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Migration Flow</Button></div>
                    <div class="two"><Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Immigrant Population</Button></div>
                    <div class="three"><Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Education</Button></div>
                    <div class="four"><Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Religion</Button></div>
                    <div class="five"><Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Economy</Button></div>
                    <div class="six"><Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Crime</Button></div>
                    <div class="seven"><Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Cost of Living</Button></div>
                    <div class="eight"><Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Visas</Button></div>
                    <CardBody class="cardContent">
                        <CardTitle tag="h5">{currentCountry}</CardTitle>
                        <CardText>Sample Card Text to display!</CardText>
                    </CardBody>
                </div>
                <Button onClick={disableButton}>Back</Button>
            </Card>
        </div>
    );
}

export default Home;