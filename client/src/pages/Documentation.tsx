import React from 'react';
import DocsScrollbar from '../components/documentation/DocsScrollbar';

interface DocumentationProps {}

const Documentation: React.FC<DocumentationProps> = (/*{}*/) => {
    return (
    <div className="appContainer">
        <br/>
        <h1>Documentation</h1>
        <DocsScrollbar />
    </div>);
}

export default Documentation;