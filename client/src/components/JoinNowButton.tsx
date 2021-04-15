import React from 'react';
import { loginModalState } from '../ts/interface';
import { activateLoginModal, deactivateLoginModal } from "../actions/loginModalAction";
import { useSelector, useDispatch } from "react-redux";

interface JoinNowButtonProps {
    extraClasses?: string,
}

const JoinNowButton: React.FC<JoinNowButtonProps> = ({ extraClasses }) => {
    const dispatch = useDispatch();
    const { active }:loginModalState = useSelector((state:any) => state.loginModalState);

    const toggleModal = () => {
        if (active) {
            dispatch(deactivateLoginModal());
        } else {
            dispatch(activateLoginModal());
        }
    };

    return (
        <button className={`homeButton ${extraClasses}`} onClick={toggleModal}>
            Join Now
        </button>
    );
}

export default JoinNowButton;