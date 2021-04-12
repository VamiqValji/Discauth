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
            showcase: <>Picture Here</>,
            header: <>Easy To Start</>,
            paragraph: <>Get started as a server owner by simply logging into the website and following the <Link to="/documentation">documentation</Link>.</>
        },
        {
            showcase:<>Picture Here</>,
            header: <>Free</>,
            paragraph: <>Discauth's starts with a free tier, so that you may upgrade only if your server has greater needs.</>
        },
        {
            showcase:<>Picture Here</>,
            header: <>Speed</>,
            paragraph: <>Server owners must only go through a few quick steps to register their server. The same applies to server members, thought with even less steps! More information <Link to="/documentation">here</Link>.</>
        },
        {
            showcase:<>Picture Here</>,
            header: <>Trustful Information Based Verification</>,
            paragraph: <>By getting your server members to verify with their email, you can trust that they are serious about your server. This is especially helpful for exclusive chat channels or tournament-based servers.</>
        },
        {
            showcase:<>Picture Here</>,
            header: <>Displayed Data</>,
            paragraph: <>You can easily view all of your server members and their verified data, for each server you have registered using Discauth.</>
        },
        {
            showcase:<>Picture Here</>,
            header: <>Other</>,
            paragraph: <>Other</>
        },
    ];

    return (
        <div className="featuresContainer">
            <h2>Features</h2>
            <div className="featuresCardsContainer">
                {
                    features.map((feature) => {
                        return (
                            <div className="card">
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