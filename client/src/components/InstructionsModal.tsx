import React, { useState } from 'react';

interface InstructionsModalProps {}

const InstructionsModal: React.FC<InstructionsModalProps> = (/*{}*/) => {

    const [instructionsModalIsOn, setInstructionsModalIsOn] = useState<boolean>(false);
    return (
    <>
        <br/>
        <button onClick={() => setInstructionsModalIsOn(!instructionsModalIsOn)}>View Instructions</button>
        {instructionsModalIsOn && 
        <div className="instructionsModalContainer">
            <div className="instructionsContainer">
                <div className="header">
                    <h2>Instructions</h2>
                    <i className="fas fa-times cursorPointer" onClick={() => setInstructionsModalIsOn(!instructionsModalIsOn)}></i>
                </div>
                <div className="ownerInstructions">
                    <h3 className="title">Owner Instructions</h3>
                    <br/>
                    <p>Click <a href="https://discord.com/api/oauth2/authorize?client_id=822620298679287850&permissions=8&scope=bot">here</a> to add Discauth bot to your server.</p>
                    <p>As the owner of a server you would like to connect Discauth to, write `.registerServer` in a channel, then refresh this web page.</p>
                    <p>Now, write `<b>.verifyOwner {"placeHolderCode"}</b>` in a channel, then refresh this web page.</p>
                </div>
                <div className="userInstructions">
                    <h3 className="title">User Instructions</h3>
                    <br/>
                    <p>test</p>

                </div>
            </div>
        </div>}
    </>);
}

export default InstructionsModal;