import React from 'react';
import { Link } from "react-router-dom";
import DiscauthLogo from '../../brand/DiscauthLogo';

interface DiscauthLogoWithTextProps {}

const DiscauthLogoWithText: React.FC<DiscauthLogoWithTextProps> = ({}) => {
    return (
    <div className="logoWithTextContainer">
        <Link className="footerLogoLink" to="/">
            <div className="footerLogo">
                <DiscauthLogo />
                <h2>Discauth</h2>
            </div>
        </Link>
    </div>);
}

export default DiscauthLogoWithText;