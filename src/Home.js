import { Link } from "react-router-dom";

export function Home() {
    return (
        <>
            <main>
                <p>This is the home page of the website.</p>
            </main>
            <nav>
                <Link to="/PicturePage">Page with a picture</Link>
            </nav>
        </>
    );
}

export default Home;