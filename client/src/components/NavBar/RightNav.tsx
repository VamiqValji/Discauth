import React from 'react';
import Login from '../../pages/Login';
import { useSelector, useDispatch } from "react-redux";
import { loggedInformation, loginModalState } from '../../ts/interface';
import LoginModal from '../LoginModal/LoginModal';
import { activateLoginModal, deactivateLoginModal } from "../../actions/loginModalAction";

interface RightNavProps {}

const RightNav: React.FC<RightNavProps> = () => {
    const { active }:loginModalState = useSelector((state:any) => state.loginModalState);
    const { loggedIn }:loggedInformation = useSelector((state:any) => state.loggedInfo);
    
    const dispatch = useDispatch();

    const toggleModal = () => {
        if (active) {
            dispatch(deactivateLoginModal());
        } else {
            dispatch(activateLoginModal());
        }
    };

    return (
        <li style={{padding: 0}}>
            <button className="homeButton" style={{width: "100%"}} onClick={() =>{
                toggleModal();
            }}>{loggedIn ? "Log Out" : "Login"}</button>
            <LoginModal active={active} loggedIn={loggedIn} toggleParentFunction={toggleModal} />
            {/* 
            display is none because i want the same functionality
            to occur as if <Login /> was being rendered, such as
            auto sign in to still occur, though with my own styled
            button in place.
            */}
            <span style={{display: "none"}}>
                <Login />
            </span>
        </li>
    );
}

export default RightNav;