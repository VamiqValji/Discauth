import React from 'react'

interface ViewUsersProps {
    serverName: string,
    serverId: string,
    serverIcon: string,
}

const ViewUsers: React.FC<ViewUsersProps> = ({serverName, serverId, serverIcon}) => {
    return (
    <>
        <div className="viewUsersContainer">
            <div className="viewUsersInformationContainer">
                <div className="header">
                    <div className="subHeader">
                        <h2 className="title">{serverName}</h2>
                        <h3 className="muted subtitle">Server ID: {serverId}</h3>
                    </div>
                    <img className="serverIcon" src={serverIcon} alt="Server Icon"/>
                </div>
            </div>
        </div>
    </>
    );
}

export default ViewUsers;