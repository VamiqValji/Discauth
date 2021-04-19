import React from 'react';
import { Link } from "react-router-dom";
import DiscauthLogoWithText from '../../components/logoWithText/DiscauthLogoWithText';
import "./NotFound.scss";

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
    return (
    <div className="appContainer">
        <br/>
        <div className="notFoundContainer">
            <div className="logoContainer">
            <DiscauthLogoWithText />
            </div>
            <h1>Page Not Found</h1>
            <div className="buttonContainer">
                <Link to="/">
                    <button>Back to Home</button>
                </Link>
            </div>
        </div>
    </div>);
}

export default NotFound;