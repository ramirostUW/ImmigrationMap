import { Link } from "react-router-dom";
import { useState } from "react";
import MapChart from "./MapChart"
import Tabs from "./Tabs"
import ReactTooltip from "react-tooltip";
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
                <CardBody>
                    <CardTitle tag="h5">{currentCountry}</CardTitle>
                    <CardText>Sample Card Text to display!</CardText>
                    <Button onClick={disableButton}>Back</Button>
                </CardBody>
            </Card>
        </div>
    );
}

export default Home;