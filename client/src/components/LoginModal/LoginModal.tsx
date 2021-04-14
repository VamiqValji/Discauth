import React from 'react';
import Login from '../../pages/Login';

interface LoginModalProps {
    active: boolean,
    toggleParentFunction: () => void,
}

const LoginModal: React.FC<LoginModalProps> = ({ active, toggleParentFunction }) => {
    if (active) {
        return (
            <>
                <div className="popBG">
                    <div className="popContainer">
                        <div className="pop">
                            <h1 className="lightSuccess">You are logged in!</h1>
                            <h1 className="whiteSmoke">{"message"}</h1>
                            <div className="flexCenter">
                                <Login />
                                <button onClick={() => {
                                    toggleParentFunction();
                                }}>X</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>);
    }
    return <></>;
}

export default LoginModal;