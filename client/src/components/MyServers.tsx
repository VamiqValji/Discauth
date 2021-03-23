import React from 'react'

interface MyServersProps {}
interface addServersProps {}

const AddServer: React.FC<addServersProps> = (/*{}*/) => {
    return (
        <>
            
        </>
    );
}

const MyServers: React.FC<MyServersProps> = (/*{}*/) => {
    return (
        <>
            <h1>My Servers</h1>
            <AddServer />
            <ul>
                <li>Server 1</li>
                <li>Server 2</li>
                <li>Server 3</li>
            </ul>
        </>
    );
}

export default MyServers;