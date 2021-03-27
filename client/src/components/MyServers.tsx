import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { loggedInformation, ownerServersInformation } from "../ts/interface";
import { getMyServersQuery } from "../queries/ownerQueries";
import { useQuery } from '@apollo/client';
import "./componentStyles/MyServers.css";
import ViewUsers from './ViewUsers';
// import MyButton from "./MyButton";

interface MyServersProps {}

const MyServers: React.FC<MyServersProps> = (/*{}*/) => {

    const [userSelected, setUserSelected] = useState<string>("");

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
                            {console.log(`should render ${server.serverName}`)}
                            <div className="myServerCardContainer">
                                <h2 className="title">{server.serverName}</h2>
                                <h3 className="muted subtitle">Server ID: {server.serverId}</h3>
                                <img className="serverIcon" src={server.icon} alt="Server Icon"/>
                                <button className="btn">View Users</button>
                            </div>
                        </>
                    ) : (<></>)
                }
            </div>);
        });
    }

    return (
        <>
            <br/>
            <h1>My Servers</h1>
            <div className="myServerContainer">
                {renderIfLoggedIn()}
                {userSelected === "" ? (<ViewUsers serverName={"Placeholder Server Name"} serverId={"Select a server first!"} serverIcon={"https://cdn.discordapp.com/icons/765028026802896936/8aafa61cfff7dcda61de2b11bf4b5c49.webp"} />) : (<></>)}
            </div>
        </>
    );
}

export default MyServers;