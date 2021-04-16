import React from 'react';
import { Link } from 'react-router-dom';
import DiscauthLogo from '../../brand/DiscauthLogo';
import Login from '../../pages/Login';
import "./LoginModal.scss";

interface LoginModalProps {
    active: boolean,
    loggedIn?: boolean,
    toggleParentFunction: () => void,
}

const LoginModal: React.FC<LoginModalProps> = ({ active, loggedIn, toggleParentFunction }) => {
    if (active) {
        return (
            <>
                <div className="loginModal">
                    <div className="popContainer">
                        <div className="pop">
                            <div className="closeModal" style={{marginBottom: "1rem"}}>
                                <button onClick={() => {
                                        toggleParentFunction();
                                }}><i className="fas fa-times"></i></button>
                            </div>
                            <div className="logo">
                                <Link className="leftNavLink" to="/">
                                    <span className="leftNav">
                                        <DiscauthLogo />
                                        <h2>Discauth</h2>
                                    </span>
                                </Link>
                            </div>
                            {/* <h2 className="h2">{loggedIn ? "Log Out" : "Login / Sign Up"}</h2> */}
                            <p className="whiteSmoke">More methods of signing in <br/> may be coming soon!</p>
                            <div className="flexCenter">
                                <Login />
                            </div>
                        </div>
                    </div>
                </div>
            </>);
    }
    return <></>;
}

export default LoginModal;