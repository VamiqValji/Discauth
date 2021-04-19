import React from 'react';
import { Link } from "react-router-dom";

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
    return (
    <div className="appContainer">
        <br/>
        <h1>Page Not Found</h1>
        <Link to="/">
            <button>Back to Home</button>
        </Link>
    </div>);
}

export default NotFound;