import { Link } from "react-router-dom";
import { useState } from "react";
import MapChart from "./MapChart"
import ReactTooltip from "react-tooltip";

/*
            <div>
                <MapChart setTooltipContent={setContent} />
                <ReactTooltip>{content}</ReactTooltip>
            </div>
*/
export function Home() {
    const [content, setContent] = useState("");
    return (
        <>
            <main>
                <p>This is the home page of the website.</p>
            </main>
            <div>
                <MapChart setTooltipContent={setContent} />
                <ReactTooltip>{content}</ReactTooltip>
            </div>
            <nav>
                <Link to="/PicturePage">Page with a picture</Link>
            </nav>
        </>
    );
}

export default Home;