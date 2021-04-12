import React from 'react';
import { Link } from "react-router-dom";
import Login from '../../pages/Login';
import "./Nav.scss";
// import DiscauthLogo from "../../brand/DiscauthLogo.svg";
import DiscauthLogo from "../../brand/DiscauthLogo";

interface NavProps {}

const Nav: React.FC<NavProps> = (/*{}*/) => {
    return (
    <>
        <div className="nav">
            <nav>
                <ul>
                    <Link className="leftNavLink" to="/">
                        <span className="leftNav">
                            {/* <img src={DiscauthLogo} alt="Discauth Logo"/> */}
                            <DiscauthLogo />
                            <h2>Discauth</h2>
                        </span>
                    </Link>
                    <span className="middleNav">
                        {/* <li>
                            <Link to="/">Home</Link>
                        </li> */}
                        <li>
                            <Link to="/documentation">Documentation</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/account">Account</Link>
                        </li>
                    </span>
                    <span className="rightNav"><li><Login /></li></span>
                </ul>
            </nav>
        </div>
    </>);
}

export default Nav;