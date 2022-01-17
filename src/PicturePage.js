import { Link } from "react-router-dom";
import logo from './logo.svg';

export function PicturePage() {
    return (
        <>
            <main>
                <h2>This page has a picture.</h2>
                <p>
                <Link to="/">Back to the Home page</Link>
                </p>
                Here's the picture:
                <img src={logo} className="App-logo" alt="logo" />
            </main>
        </>
    );
}

export default PicturePage;