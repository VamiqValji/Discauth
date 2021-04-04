import React from 'react';

interface DocsWritingProps {}

const DocsWriting: React.FC<DocsWritingProps> = ({}) => {
    return (
    <>
        <div className="documentationWriting customScrollbarDark">
            <h2>Introduction</h2>
            <p className="muted">Discauth is the only user-verification bot you'll ever need!</p>
            <br/>
            <h3>About</h3>
            <p>Learn a bit about Discauth!</p>
            <br/>
            <h4>What is Discauth and what does it do?</h4>
            <p>Discauth is a Discord server bot and service that helps you verify users in a server. This is helpful for more formal servers, or servers that need participants to provide credentials (email). For example, hosting a game tournament on Discord would be easier with the help of Discauth, because participants would need to verify on the server with their email, instead of going through the manual monotonous verifying process with server admins.</p>
            <br/>
            <h4>Why should I use Discauth?</h4>
            <p>It starts with a free tier, and you can get started within a few steps.</p>
            <br/>
            <h4>How do I integrate Discauth verification to my server?</h4>
            <p>You can find this information in the "Getting Started" section of the documentation.</p>
            <br/><br/>
            <h2>Getting Started</h2>
            <p className="muted">Time to get started!</p>
            <br/>
            <h4>Owner Instructions</h4>
            <br/>
            <p>1. Click <a href="https://discord.com/api/oauth2/authorize?client_id=822620298679287850&permissions=8&scope=bot">here</a> to add Discauth bot to your server.</p>
            <p>2. Add a role to your server named <b>Verified</b>. This is the role that users will get on verification, and it is case-sensitive.</p>
            <p>3. Add your server below! Use the given code from adding your server, in the next step!</p>
            <p>4. Now, write <span className="command">.registerServer <b>{"givenCode"}</b></span> in any channel of that server, then refresh this web page.</p>
            <br/>
            <p className="gradient">If you did everything right, your added server should be gone from the list below, and should be able to be seen in the "My Servers" tab found above. This means that your server has been verified. <i className="fas fa-check"></i></p>
            <br/>
            <h4>User Instructions</h4>
            <br/>
            <p>It is recommended to paste the following in a certain Discord channel on your server, so that users understand how to get setup.</p>
            <br/>
            <p>1. Write <span className="command">.register</span> in the server you'd like to register in.</p>
            <p>2. Then reply to the bot's DM with <span className="command">.registerEmail <b>YOUR_EMAIL_HERE</b> <b>NAME_OF_SERVER_YOU_WANT_TO_REGISTER_IN_WITH_UNDERSCORES_INSTEAD_OF_SPACES</b></span>.</p>
            <p>3. Check the code emailed to you. Write <span className="command">.verify <b>CODE_FROM_EMAIL_HERE</b></span> in a channel on that server.</p>
            <br/>
            <p className="gradient">Nice, you're now verified on that server! Check to make sure you got the 'Verified' role on the server.<i className="fas fa-check"></i></p>
            <br/>
        </div>
    </>);
}

export default DocsWriting;