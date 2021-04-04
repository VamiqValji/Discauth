import React from 'react';
import DocsWriting from './DocsWriting';
import "./Documentation.scss";

interface DocsScrollbarProps {}

const DocsScrollbar: React.FC<DocsScrollbarProps> = (/*{}*/) => {
    return (
    <>
        <div className="documentationContainer">
            <ul className="documentationScrollbar customScrollbarDark">
                <li className="header">Introduction</li>
                <li>About</li>
                <li>Section 2</li>
                <li>Section 3</li>
                <li className="header">Getting Started</li>
                <li>Owner Instructions</li>
                <li>User Instructions</li>
            </ul>
            <DocsWriting />
        </div>
    </>);
}

export default DocsScrollbar;