import React from 'react';
import { Link } from "react-router-dom";
import DiscauthLogo from "../../../brand/DiscauthLogo";
import JoinNowButton from '../../../components/JoinNowButton';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
    return (
        <>
            <div className="joinNow">
                <JoinNowButton extraClasses={"footer"} />
            </div>
            <div className="footerContainer">
                <div className="footer">
                    <Link className="footerLogoLink" to="/">
                        <div className="footerLogo">
                            <DiscauthLogo />
                            <h2>Discauth</h2>
                        </div>
                    </Link>
                    <div className="links">
                        <Link to="/documentation">Documentation</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/account">Account</Link>
                        <Link to="/legal">Terms and Conditions</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                    </div>
                    <div className="copyright">
                        <h5 className="muted">© 2021 Vamiq Valji, All Rights Reserved.</h5>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;