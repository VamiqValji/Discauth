import React, { useRef } from 'react'
import { useSelector } from "react-redux";

interface SetupProps {}

interface loggedInformation {
    loggedIn: boolean,
    id: string
}

const Setup: React.FC<SetupProps> = (/*{}*/) => {

    const serverAddInputRef:any = useRef(null);
    const loggedInfo:loggedInformation = useSelector((state:any) => state.loggedInfo);

    const addServer = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (serverAddInputRef.current.value.length < 1) return;
        console.log(serverAddInputRef.current.value);
        serverAddInputRef.current.value = "";
    }

    const renderIfLoggedIn = () => {
        if (loggedInfo.loggedIn) {
            return  (
                <>
                    <h1>Instructions</h1>
                    <p>Click <a href="https://discord.com/api/oauth2/authorize?client_id=822620298679287850&permissions=8&scope=bot">here</a> to add Discauth bot to your server.</p>
                    <p>As the owner of a server you would like to connect Discauth to, write `.registerServer` in a channel, then refresh this web page.</p>
                    <p>Now, write `<b>.verifyOwner {"placeHolderCode"}</b>` in a channel, then refresh this web page.</p>
                    <form onSubmit={(e) => addServer(e)}>
                        <label htmlFor="ServerName">Server Name:</label><br/>
                        <input ref={serverAddInputRef} type="text" name="serverName" placeholder="Server Name..."/><br/>
                        {/* <label htmlFor="lname">Last name:</label><br/>
                        <input type="text" id="lname" name="lname" value="Doe"/><br/><br/> */}
                        <input type="submit" value="Add Server"/>
                    </form>
                </>
            );
        }
    }

    return (
        <>
            <h1>Setup</h1>
            {renderIfLoggedIn()}
        </>
    );
}

export default Setup;