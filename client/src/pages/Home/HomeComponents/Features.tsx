import React from 'react';

interface FeaturesProps {}

interface feature {
    showcase: any,
    header: string,
    paragraph: string,
}

const Features: React.FC<FeaturesProps> = () => {

    const features:feature[] = [
        {
            showcase: "Picture Here",
            header: "Easy",
            paragraph: "Verification is simple and easy."
        },
        {
            showcase: "Picture Here",
            header: "Easy",
            paragraph: "Verification is simple and easy."
        },
        {
            showcase: "Picture Here",
            header: "Easy",
            paragraph: "Verification is simple and easy."
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