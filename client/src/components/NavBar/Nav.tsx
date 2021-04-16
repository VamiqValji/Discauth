import React, { useState } from 'react';
import { Link } from "react-router-dom";
// import Login from '../../pages/Login';
import "./Nav.scss";
// import DiscauthLogo from "../../brand/DiscauthLogo.svg";
import DiscauthLogo from "../../brand/DiscauthLogo";
import RightNav from './RightNav';

interface NavProps {}

const Nav: React.FC<NavProps> = (/*{}*/) => {

    const [burgerMenuIsOn, setBurgerMenuIsOn] = useState<boolean>(false);


    const logoWithText = () => {
        return (
            <Link className="leftNavLink" to="/">
                <span className="leftNav">
                    <DiscauthLogo />
                    <h2>Discauth</h2>
                </span>
            </Link>
        );
    }

    return (
    <>
        <div className="nav">
            <nav>
                <ul>
                    <div className="burgerContainer">
                        <div className={`burger ${burgerMenuIsOn && "toggled"}`} onClick={() => setBurgerMenuIsOn(!burgerMenuIsOn)}>
                            <div className="line1"></div>
                            <div className="line2"></div>
                            <div className="line3"></div>
                        </div>
                    </div>
                        {logoWithText()}
                    <span className={`middleNavOuter ${burgerMenuIsOn && "toggled"}`}></span>
                    <span className={`middleNav ${burgerMenuIsOn && "toggled"}`}>
                        <div className="middleNavInner">
                            <div className="logoContainer">
                                <div>
                                    <button onClick={() => {
                                            setBurgerMenuIsOn(!burgerMenuIsOn)
                                    }}><i className="fas fa-times"></i></button>
                                </div>
                                <div>
                                    {logoWithText()}
                                </div>
                            </div>
                            <li>
                                <Link to="/documentation">Documentation</Link>
                            </li>
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/account">Account</Link>
                            </li>
                        </div>
                    </span>
                    <span className="rightNav">
                        <RightNav />
                    </span>
                </ul>
            </nav>
        </div>
    </>);
}

export default Nav;