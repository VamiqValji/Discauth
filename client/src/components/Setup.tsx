import React, { useRef } from 'react'
import { useSelector } from "react-redux";
import { loggedInformation, ownerVerificationCodesInformation } from "../ts/interface";
import { addServerMutation } from "../mutations/ownerMutations";
import { useQuery, useMutation } from '@apollo/client';
import { getAddedServersQuery } from "../queries/ownerQueries";
import "./componentStyles/Setup.scss";
import AddedServer from "./AddedServer";
import InstructionsModal from "./InstructionsModal";

interface SetupProps {}

const Setup: React.FC<SetupProps> = (/*{}*/) => {

    const serverAddInputRef:any = useRef(null);
    const loggedInfo:loggedInformation = useSelector((state:any) => state.loggedInfo);
    
    const { /*loading: getAddedServersQueryLoading, error: getAddedServersQueryError,*/ data: getAddedServersQueryData } = useQuery(getAddedServersQuery, {
        variables: { googleId: loggedInfo.id }
    });
    
    const [addServerMutationVar/*, { loading: mutationLoading, error: mutationError }*/] = useMutation(addServerMutation, {
        // awaitRefetchQueries: true,
        refetchQueries: MutationRes => [{query: getAddedServersQuery, variables:{ googleId: loggedInfo.id }}],
    });

    const addServer = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const MAX_ADDED_SERVERS = 3;
        const filteredAddedServers:object[] = getAddedServersQueryData.ownerData.verificationCodes.filter((verifCode:any) => verifCode.code !== "")
        if (filteredAddedServers.length >= MAX_ADDED_SERVERS) {
            return;
        }

        if (serverAddInputRef.current.value.length < 1) return;
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
            if (getAddedServersQueryData.ownerData.verificationCodes.length < 1) return (
                <p className="tip gradient">First, add some servers using the above instructions.</p>);
                
            return getAddedServersQueryData.ownerData.verificationCodes.map((server:ownerVerificationCodesInformation, idx:number) => {
                const isVerified = server.code === "" || server.code === null;
                return(
                <div key={idx}>
                    {!isVerified ? <AddedServer serverName={server.serverName} code={server.code} /> : (<></>)}
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
                    <InstructionsModal />
                    <form onSubmit={(e) => addServer(e)}>
                        <br/><br/>
                        <label htmlFor="ServerName">Server Name:</label><br/>
                        <input ref={serverAddInputRef} type="text" name="serverName" placeholder="Server Name..."/>
                        <input type="submit" style={{padding: 8}} value="Add Server"/>
                    </form>
                    <h5 className="muted">
                        You can only have a few added servers<br/> 
                        concurrently. You may need to reload<br/> 
                        the page for changes to take place.
                    </h5>
                    <br/>
                    <h3>Your Added Servers</h3>
                    <h5 className="muted">Once you verify them, they will move to the "My Servers" tab.</h5>
                    <div className="addServersContainer customScrollbarDark" >
                        {renderAddedServers()}
                    </div>
                </>
            );
        }
    }

    return (
        <>
            <br/>
            <h1 style={{fontWeight: 600}}>Setup</h1>
            {renderIfLoggedIn()}
        </>
    );
}

export default Setup;