import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from "react-redux";
import { loggedInformation, ownerServersInformation, user } from "../ts/interface";
import { getMyServersUsersQuery } from "../queries/ownerQueries";

interface ViewUsersProps {
    serverName?: string,
    serverId?: string,
    serverIcon?: string,
    isPlaceHolder?: boolean,
}

const ViewUsers: React.FC<ViewUsersProps> = (
    {
        serverName="Placeholder Server Name",
        serverId="Select a server first!",
        serverIcon="https://cdn.discordapp.com/icons/765028026802896936/8aafa61cfff7dcda61de2b11bf4b5c49.webp",
        isPlaceHolder=true
    }) => { // ^^default values

    // console.log("viewUsersArgs:", {serverName, serverId, serverIcon});

    const [currentUsersList, setCurrentUsersList] = useState<any>([{name: "1"}, {name: "2"}]);

    const loggedInfo:loggedInformation = useSelector((state:any) => state.loggedInfo);

    const { loading: getQueryLoading, error: getQueryError, data: getQueryData } = useQuery(getMyServersUsersQuery, {
        variables: { googleId: loggedInfo.id }
    });
    console.log(getQueryLoading, getQueryError, getQueryData);

    useEffect(() => {
        // set data
        if (getQueryData) {
            getQueryData.ownerData.servers.forEach((server:ownerServersInformation) => {
                console.log("getQueryData MAP", server.serverId);
                const thisServerIsSelected = server.serverId === serverId;
                if (thisServerIsSelected) {
                    setCurrentUsersList(server.users);
                    // return server.users;
                }
            });
        }
    }, [])

    const renderData = () => { 
        // if (isPlaceHolder) {
        return (
        <>
            <div className="subHeader">
                <h2 className="title">{serverName}</h2>
                <h3 className="muted subtitle">Server ID: {serverId}</h3>
            </div>
            <img className="serverIcon" src={serverIcon} alt="Server Icon"/>
        </>);
        // } 
        // else {
        //     return (
        //     <>
        //         <div className="subHeader">
        //             <h2 className="title">{serverName}</h2>
        //             <h3 className="muted subtitle">Server ID: {serverId}</h3>
        //         </div>
        //         <img className="serverIcon" src={serverIcon} alt="Server Icon"/>
        //     </>);
        // }
    }

    return (
    <>
        <div className="viewUsersContainer">
            <div className="viewUsersInformationContainer">
                <div className="header">
                    {renderData()}
                </div>
            </div>
            {!isPlaceHolder && currentUsersList.map((user:user, idx:number) => {
                return (
                <div key={idx} className="usersList">
                    <h2>{user.name}</h2>
                    <h3 className="muted">{user.id}</h3>
                    <h4 style={user.verified ? {color:"green"} : {color:"red"} }>{user.verified ? "Verified!" : "Not Verified."}</h4>
                    <h5>Verified On: {user.timeOfVerification}</h5>
                    <img className="userAvatar" src={user.avatar} alt="User Avatar"/>
                </div>
                );
            })}
        </div>
    </>
    );
}

export default ViewUsers;