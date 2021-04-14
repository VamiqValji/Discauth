import React from 'react';
import Login from '../../pages/Login';

interface RightNavProps {}

const RightNav: React.FC<RightNavProps> = () => {
    return (
        <li style={{padding: 0}}>
            <button className="homeButton" style={{width: "100%"}}>Login</button>
            <span style={{display: "none"}}>
                <Login />
            </span>
        </li>
    );
}

export default RightNav;