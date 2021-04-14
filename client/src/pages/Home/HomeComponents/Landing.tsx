import React from 'react';
import landingPageImage from "../../../brand/landingPageImg_final.png";
import JoinNowButton from '../../../components/JoinNowButton';

interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
    return (
        <div className="landingContainer">
            <div className="landing">
                <div className="content">
                    <div className="left">
                        <h1>Discord server member verification made easy</h1>
                        <h2>The ultimate server member verification system for Discord. Everything a server owner needs, connected with a bot and web application.</h2>
                        <JoinNowButton />
                    </div>
                    <div className="right">
                        <img src={landingPageImage} alt="Showcase of some of Discauth's user interface and functionality."/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;