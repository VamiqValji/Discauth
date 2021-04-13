import React from 'react';
import { Link } from "react-router-dom";
import DiscauthLogo from "../../../brand/DiscauthLogo";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
    return (
        <div className="footerContainer">
            <div className="footer">
                <span className="leftNav">
                    <DiscauthLogo />
                    <h2>Discauth</h2>
                </span>
                <Link to="/documentation">Documentation</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/account">Account</Link>
                <Link to="/legal">Terms and Conditions</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <h6 className="muted">© 2021 Vamiq Valji, All Rights Reserved.</h6>
            </div>
        </div>
    );
}

export default Footer;