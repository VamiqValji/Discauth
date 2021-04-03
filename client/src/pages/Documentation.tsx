import React from 'react';
import DocsScrollbar from '../components/documentation/DocsScrollbar';

interface DocumentationProps {}

const Documentation: React.FC<DocumentationProps> = ({}) => {
    return (
    <> 
        <br/>
        <h1>Documentation</h1>
        <DocsScrollbar />
    </>);
}

export default Documentation;