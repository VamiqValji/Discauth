import React from 'react'

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
    console.log("viewUsersArgs:", {serverName, serverId, serverIcon});

        const renderData = () => { 
            if (isPlaceHolder) {
                return (
                <>
                    <div className="subHeader">
                        <h2 className="title">{serverName}</h2>
                        <h3 className="muted subtitle">Server ID: {serverId}</h3>
                    </div>
                    <img className="serverIcon" src={serverIcon} alt="Server Icon"/>
                </>);
            } else {
                return (
                <>
                    <div className="subHeader">
                        <h2 className="title">{serverName}</h2>
                        <h3 className="muted subtitle">Server ID: {serverId}</h3>
                    </div>
                    <img className="serverIcon" src={serverIcon} alt="Server Icon"/>
                </>);
            }
        }

    return (
    <>
        <div className="viewUsersContainer">
            <div className="viewUsersInformationContainer">
                <div className="header">
                    {renderData()}
                </div>
            </div>
        </div>
    </>
    );
}

export default ViewUsers;