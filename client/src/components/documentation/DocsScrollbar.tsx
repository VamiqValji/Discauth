import React, { useState } from 'react';
import DocsWriting from './DocsWriting';
import {sectionsText} from "../../ts/types";
import "./Documentation.scss";

interface DocsScrollbarProps {}

const DocsScrollbar: React.FC<DocsScrollbarProps> = (/*{}*/) => {

    const [selectedSection, setSelectedSection] = useState<string>("Introduction");
    
    interface section {
        text: sectionsText | string,
        className: string,
    }

    const sections = [
        {
            text: "Introduction",
            className: "header"
        },
        {
            text: "About",
            className: ""
        },
        {
            text: "Getting Started",
            className: "header"
        },
        {
            text: "Owner Instructions",
            className: ""
        },
        {
            text: "User Instructions",
            className: ""
        },
    ]


    return (
    <>
        <div className="documentationContainer">
            <ul className="documentationScrollbar customScrollbarDark">
                {sections.map((section:section, idx:number) => {
                    return <li className={section.className} key={idx} onClick={() => {
                        setSelectedSection(section.text);
                    }}>{section.text}</li>
                })}
            </ul>
            <DocsWriting selectedSection={selectedSection} />
        </div>
    </>);
}

export default DocsScrollbar;