import React, { useState } from 'react';

import MyServers from "../components/MyServers";
import Setup from "../components/Setup";
import Modal from "../components/Modal";

interface DashboardProps {

}

const Dashboard: React.FC<DashboardProps> = (/*{}*/) => {

    const [panel, setPanel] = useState<string>("");

    const updatePanel = (e: React.MouseEvent) => {
        setPanel(e.currentTarget.innerHTML);
    };

    console.log(panel);

    return (
        <>  
            <Modal message={"Please Login."} />
            <br/>
            <h1>Owner Dashboard</h1>
            <br/>
            <button onClick={updatePanel}>Setup</button>
            <button onClick={updatePanel}>My Servers</button>
            <br/>
            {
                panel === "" || panel === "Setup" ? 
                (
                    <Setup />
                ) : (
                    <MyServers />
                )
            }
        </>
    );
}

export default Dashboard;