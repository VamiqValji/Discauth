import React, { useRef } from 'react'
import { useSelector } from "react-redux";
import { loggedInformation, ownerVerificationCodesInformation } from "../ts/interface";
import { addServerMutation } from "../mutations/ownerMutations";
import { useQuery, useMutation } from '@apollo/client';
import { getAddedServersQuery } from "../queries/ownerQueries";

interface SetupProps {}

const Setup: React.FC<SetupProps> = (/*{}*/) => {

    
    const serverAddInputRef:any = useRef(null);
    const loggedInfo:loggedInformation = useSelector((state:any) => state.loggedInfo);
    
    const { loading: getAddedServersQueryLoading, error: getAddedServersQueryError, data: getAddedServersQueryData } = useQuery(getAddedServersQuery, {
        variables: { googleId: loggedInfo.id }
    });
    console.log(getAddedServersQueryLoading, getAddedServersQueryError, getAddedServersQueryData);
    
    const [addServerMutationVar, { loading: mutationLoading, error: mutationError }] = useMutation(addServerMutation, {
        // awaitRefetchQueries: true,
        refetchQueries: MutationRes => [{query: getAddedServersQuery, variables:{ googleId: loggedInfo.id }}],
    });
    console.log(mutationError, mutationLoading);

    const addServer = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (serverAddInputRef.current.value.length < 1) return;
        console.log(serverAddInputRef.current.value);
        const serverName = serverAddInputRef.current.value;
        serverAddInputRef.current.value = "";
        addServerMutationVar({
            variables: {
                googleId: loggedInfo.id, 
                serverName: serverName,
                code: Math.random().toString(36).substring(7) +
                Math.random().toString(36).substring(7),
            }
        });
    }

    const renderAddedServers = () => {

        if (getAddedServersQueryData) {
            console.log(getAddedServersQueryData.ownerData.verificationCodes);
            return getAddedServersQueryData.ownerData.verificationCodes.map((server:ownerVerificationCodesInformation, idx:number) => {
                // const isVerified = ;
                console.log(server.serverName);
                const isVerified = server.code === "" || server.code === null;
                return(
                <div key={idx}>
                    <br/>
                    {
                        !isVerified ?
                        (
                            <>
                                <h3>{server.serverName}</h3>
                                {/* <h4>{server.discordName}</h4> */}
                            </>
                        ) : (<></>)
                    }
                </div>);
            });
        } else {
            return <>Didn't load correctly.</>;
        }
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
                    <br/>
                    <h3>Your Added Servers</h3>
                    <h5 style={{color:"grey"}}>Once you verify them, they will move to the "My Servers" tab.</h5>
                    {renderAddedServers()}
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