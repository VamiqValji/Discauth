import React from 'react';
import { useSelector } from "react-redux";
import { loggedInformation } from "../ts/interface";

interface MyServersProps {}

const MyServers: React.FC<MyServersProps> = (/*{}*/) => {

    const loggedInfo:loggedInformation = useSelector((state:any) => state.loggedInfo);

    const renderIfLoggedIn = () => {
        if (loggedInfo.loggedIn) {
            return  (
                <>
                    <ul>
                        <li>Server 1</li>
                        <li>Server 2</li>
                        <li>Server 3</li>
                    </ul>
                </>
            );
        }
    }

    return (
        <>
            <h1>My Servers</h1>
            {renderIfLoggedIn()}
        </>
    );
}

export default MyServers;