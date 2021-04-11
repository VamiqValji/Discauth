import React from 'react';
import "./Home.scss";

interface HomeProps {

}

const Home: React.FC<HomeProps> = (/*{}*/) => {
    return (
        <>
            <div className="landingContainer">
                <div className="landing">
                    <div className="content">
                        <div className="left">
                            <h1>Discord server verification made easy</h1>
                            <h2>The ultimate server member verification system for Discord. Everything you need, connected with a bot and web application.</h2>
                            <button>Join Now</button>
                        </div>
                        <div className="right">
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;