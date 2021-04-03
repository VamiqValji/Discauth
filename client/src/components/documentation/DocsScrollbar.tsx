import React from 'react';
import "./Documentation.scss";

interface DocsScrollbarProps {}

const DocsScrollbar: React.FC<DocsScrollbarProps> = ({}) => {
    return (
    <>
        <div className="documentationContainer">
            <ul className="documentationScrollbar customScrollbarDark">
                <li className="header">Introduction</li>
                <li>Section 1</li>
                <li>Section 2</li>
                <li>Section 3</li>
                <li>Section 4</li>
                <li>Section 5</li>
            </ul>

            <div className="documentationWriting">
                <h2>Introduction</h2>
                <p></p>
                <h2>Getting Started</h2>
            </div>
        </div>
    </>);
}

export default DocsScrollbar;