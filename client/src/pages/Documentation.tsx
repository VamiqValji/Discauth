import React from 'react';
import DocsScrollbar from '../components/documentation/DocsScrollbar';

interface DocumentationProps {}

const Documentation: React.FC<DocumentationProps> = (/*{}*/) => {
    return (
    <div className="documentationContainerContainer">
        <br/>
        <div className="documentationHeader">
            <span>
                <h1>Documentation</h1>
            </span>
        </div>
        <DocsScrollbar />
    </div>);
}

export default Documentation;