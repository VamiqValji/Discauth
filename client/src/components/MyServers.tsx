import React from 'react';
import { useSelector } from "react-redux";
import { loggedInformation, ownerServersInformation } from "../ts/interface";
import { getMyServersQuery } from "../queries/ownerQueries";
import { useQuery } from '@apollo/client';

interface MyServersProps {}

const MyServers: React.FC<MyServersProps> = (/*{}*/) => {

    const loggedInfo:loggedInformation = useSelector((state:any) => state.loggedInfo);

    const { loading: getMyServersQueryLoading, error: getMyServersQueryError, data: getMyServersQueryData } = useQuery(getMyServersQuery, {
        variables: { googleId: loggedInfo.id }
    });
    console.log(getMyServersQueryLoading, getMyServersQueryError, getMyServersQueryData);

    const renderIfLoggedIn = () => {

        if (!getMyServersQueryData) return <>Didn't load correctly.</>;

        return getMyServersQueryData.ownerData.servers.map((server:ownerServersInformation, idx:number) => {
            return(
            <div key={idx}>
                <br/>
                {
                    server.ownerVerified ?
                    (
                        <>
                            <h3>{server.serverName}</h3>
                            {console.log(`should render ${server.serverName}`)}
                            {/* <h4>{server.discordName}</h4> */}
                        </>
                    ) : (<></>)
                }
            </div>);
        });
    }

    return (
        <>
            <h1>My Servers</h1>
            {renderIfLoggedIn()}
        </>
    );
}

export default MyServers;