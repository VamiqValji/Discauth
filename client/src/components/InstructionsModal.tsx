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
                    <div className="subHeader">
                        <h2>Quick Instructions</h2>
                        <h4 className="muted">For detailed instructions with examples, visit the documentation.</h4>
                    </div>
                    <i className="fas fa-times cursorPointer" onClick={() => setInstructionsModalIsOn(!instructionsModalIsOn)}></i>
                </div>
                <div className="ownerInstructions customScrollbarLight">
                    <h3 className="title">Server Owner Instructions</h3>
                    <br/>
                    <p>1. Click <a href="https://discord.com/api/oauth2/authorize?client_id=822620298679287850&permissions=8&scope=bot">here</a> to add Discauth bot to your server.</p>
                    <p>2. Add a role to your server named <b>Verified</b>. This is the role that users will get on verification, and it is case-sensitive.</p>
                    <p>3. Add your server below! Use the given code from adding your server, in the next step!</p>
                    <p>4. Now, write <span className="command">.registerServer <b>{"givenCode"}</b></span> in any channel of that server, then refresh this web page.</p>
                    <br/>
                    <p className="gradient">If you did everything right, your added server should be gone from the list below, and should be able to be seen in the "My Servers" tab found above. This means that your server has been verified. <i className="fas fa-check"></i></p>
                </div>
                <div className="userInstructions customScrollbarLight">
                    <h3 className="title">User Instructions</h3>
                    <br/>
                    <p>It is recommended to paste the following in a certain Discord channel on your server, so that users understand how to get setup.</p>
                    <br/>
                    <p>1. Write <span className="command">.register</span> in the server you'd like to register in.</p>
                    <p>2. Then reply to the bot's DM with <span className="command">.registerEmail <b>YOUR_EMAIL_HERE</b> <b>NAME_OF_SERVER_YOU_WANT_TO_REGISTER_IN_WITH_UNDERSCORES_INSTEAD_OF_SPACES</b></span>.</p>
                    <p>3. Check the code emailed to you. Write <span className="command">.verify <b>CODE_FROM_EMAIL_HERE</b></span> in a channel on that server.</p>
                    <br/>
                    <p className="gradient">Nice, you're now verified on that server! Check to make sure you got the 'Verified' role on the server.<i className="fas fa-check"></i></p>
                </div>
            </div>
        </div>}
    </>);
}

export default InstructionsModal;