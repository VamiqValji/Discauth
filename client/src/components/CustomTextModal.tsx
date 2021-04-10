import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { loggedInformation } from "../ts/interface";
import "./componentStyles/Modal.css";

interface buttonOptions {
    on?: boolean,
    text?: string,
}

interface customTextModalProps {
    header: string,
    content: any,
    buttonOptions?: buttonOptions,
    updateParent: () => void,
}

const CustomTextModal: React.FC<customTextModalProps> = ({header, content, buttonOptions={ on: true, text: "" }, updateParent }) => {
    const { loggedIn }:loggedInformation = useSelector((state:any) => state.loggedInfo);
    const [active, setActive] = useState<boolean>(true);
    if (loggedIn && active) {
        return  (
            <div className="popBG">
              <div className="popContainer">
                <div className="pop">
                    <h2>{header}</h2>
                <div className="flexCenter whiteSmoke" style={{marginTop: 10}}>
                    <p>{content}</p>
                </div>
                {buttonOptions.on &&
                    <div className="flexCenter" style={{marginTop: 10}}>
                        <><button style={{margin: "0 auto"}} onClick={() => {
                            setActive(false);
                            updateParent();
                        }}>{buttonOptions.text ? <>{buttonOptions.text}</> : <>Okay.</> }</button></>
                    </div>
                }
                </div>
              </div>
            </div>
        );
    }
    return <></>;
}

export default CustomTextModal;