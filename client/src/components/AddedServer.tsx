import React from 'react';

interface AddedServerProps {
    serverName: string | undefined,
    code: string | undefined
}

const AddedServer: React.FC<AddedServerProps> = ({serverName, code}) => {
    return (
    <>
        <div className="addedServerContainer">
            <div className="info">
                <h3>{serverName}</h3>
                <h4>Verification Code: <span>{code}</span></h4>
            </div>
            <i onClick={() => {
                console.log(serverName);
            }} className="fas fa-trash cursorPointer"></i>
        </div>
    </>);
}

export default AddedServer;