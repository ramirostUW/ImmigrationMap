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
                    <div class="one">
                        <Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Migration Flow</Button>
                        <Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Immigrant Population</Button>
                        <Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Education</Button>
                        <Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Religion</Button>
                        <Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Economy</Button>
                        <Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Crime</Button>
                        <Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Cost of Living</Button>
                        <Button style={{ margin: 2, width: "180px", fontFamily: "Gill Sans", textAlign: "left" }}>Visas</Button>
                    </div>
                    <div class="nine">
                        <CardBody>
                            <CardTitle tag="h5">{currentCountry}</CardTitle>
                            <CardText>
                                Sample Card Text to display! <br />
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non scelerisque elit. Aenean rutrum, turpis nec porta faucibus, elit magna convallis purus, in fermentum metus lacus vel risus. Sed egestas, metus eget congue fermentum, lorem sapien porta lorem, nec tempor nisi risus sit amet metus. Morbi eu lacus enim. Cras ut nisl hendrerit quam iaculis pellentesque sed iaculis sapien. Fusce tempus vestibulum lacus. Etiam suscipit sapien a accumsan finibus. In malesuada felis justo, sollicitudin molestie est sodales porta. Ut viverra eleifend pellentesque. Etiam elit nisl, viverra id pellentesque eu, viverra in risus. Suspendisse dui velit, posuere nec eros a, pretium ultrices tellus. Pellentesque pulvinar magna est, in aliquet metus finibus in. Curabitur elementum erat ut euismod consequat. Vestibulum mattis neque ac nibh tempor lacinia. Aliquam a fringilla libero. <br />

                                Nunc sed metus nibh. Nulla malesuada arcu sit amet ipsum cursus, vitae imperdiet mauris ullamcorper. Ut eget turpis tellus. In hac habitasse platea dictumst. Nulla volutpat mauris ac eros vestibulum, a gravida arcu fringilla. Donec finibus, nisi in consectetur faucibus, sem tellus imperdiet lorem, quis porta velit erat in tortor. Fusce tristique neque eget auctor aliquam. Vestibulum dignissim non nisl vel commodo.  <br />

                                Suspendisse at ipsum a augue lobortis ultrices. Nulla facilisi. Integer porttitor arcu arcu, non interdum libero blandit vel. Quisque eu vestibulum nulla, quis maximus leo. Fusce ornare quis massa sit amet euismod. Aliquam vel tortor in nisl sollicitudin mattis. Cras ornare id lorem eu viverra. Aenean vel tincidunt sem.  <br />
                            </CardText>
                        </CardBody>
                    </div>

                </div>
                <Button onClick={disableButton}>Back</Button>
            </Card>
        </div>
    );
}

export default Home;