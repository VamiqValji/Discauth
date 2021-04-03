import React from 'react';
import { useSelector } from "react-redux";
import { loggedInformation } from "../ts/interface";
import "./componentStyles/Modal.css";
import { Link } from "react-router-dom";
import Login from '../pages/Login';

interface ModalProps {
    message: string,
    success?: boolean
}

const Modal: React.FC<ModalProps> = ({message, success}) => {
    const loggedInfo:loggedInformation = useSelector((state:any) => state.loggedInfo);
    const loggedIn = loggedInfo.loggedIn;
    if (!loggedIn) {
        return  (
            <div className="App">
            <div className="popBG">
              <div className="popContainer">
                <div className="pop">
                  {success ? (
                    <h1 className="lightSuccess">You are logged in!</h1>
                  ) : (
                    <h1 className="whiteSmoke">{message}</h1>
                  )}
                  <div className="flexCenter">
                    {success ? (
                      <Link to="/">
                        <button>Back to Home</button>
                      </Link>
                    ) : (
                        <Login />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
    return <></>;
}

export default Modal;