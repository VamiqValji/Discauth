import React from 'react';
import { Link } from "react-router-dom";

interface FeaturesProps {}

interface feature {
    showcase: JSX.Element,
    header: JSX.Element,
    paragraph: JSX.Element,
}

const Features: React.FC<FeaturesProps> = () => {

    const features:feature[] = [
        {
            showcase: <i className="fas fa-sign-in-alt"></i>,
            header: <>Easy To Start</>,
            paragraph: <>Get started as a server owner by simply logging into the website and following the organized <Link to="/documentation">documentation</Link>.</>
        },
        {
            showcase: <i className="fas fa-money-check-alt"></i>,
            header: <>Free</>,
            paragraph: <>Discauth's starts with a free tier, so that you may upgrade if your server scales with greater needs. <Link to="/account">More information</Link>.</>
        },
        {
            showcase: <i className="fas fa-fast-forward"></i>,
            header: <>Speed</>,
            paragraph: <>Server owners must only go through a few quick steps to register their server. The same applies to server members, thought with even less steps! <Link to="/documentation">More information</Link></>
        },
        {
            showcase: <i className="fas fa-user-check"></i>,
            header: <>Trustful Information Based Verification</>,
            paragraph: <>By getting your server members to verify with their email, you can trust that they are serious about your server. This is especially helpful for exclusive chat channels or tournament-based servers.</>
        },
        {
            showcase: <i className="fas fa-database"></i>,
            header: <>Displayed Data</>,
            paragraph: <>You can easily view all of your server members and their verified data, for each server you have registered using Discauth, right here on the web application.</>
        },
        {
            showcase: <i className="fas fa-tasks"></i>,
            header: <>Minimal Management</>,
            paragraph: <>Once you as a server owner setup your server on the web application and with the Discord bot, there is minimal to zero management you will have to do to keep using Discauth.</>
        },
    ];

    return (
        <div className="featuresContainer">
            {/* <h2 className="title">Features</h2> */}
            <div className="featuresCardsContainer">
                {
                    features.map((feature, idx:number) => {
                        return (
                            <div className="card" key={idx}>
                                <div className="showcase">{feature.showcase}</div>
                                <h2 className="header">{feature.header}</h2>
                                <p>{feature.paragraph}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Features;