import React, { useState } from 'react';
import Login from '../../pages/Login';
import { useSelector } from "react-redux";
import { loggedInformation } from '../../ts/interface';
import LoginModal from '../LoginModal/LoginModal';

interface RightNavProps {}

const RightNav: React.FC<RightNavProps> = () => {
    const [modalIsOn, setModalIsOn] = useState<boolean>(false);
    const { loggedIn }:loggedInformation = useSelector((state:any) => state.loggedInfo);

    const toggleModal = () => {
        setModalIsOn(!modalIsOn);
    };

    return (
        <li style={{padding: 0}}>
            <button className="homeButton" style={{width: "100%"}} onClick={() =>{
                toggleModal();
            }}>{loggedIn ? "Log Out" : "Login / Sign Up"}</button>
            <LoginModal active={modalIsOn} loggedIn={loggedIn} toggleParentFunction={toggleModal} />
            {/* 
            display is none because i want the same functionality
            to occur as if <Login /> was being rendered, such as
            auto sign in to still occur, though with my own styled
            button.
            */}
            <span style={{display: "none"}}>
                <Login />
            </span>
        </li>
    );
}

export default RightNav;