import React, { useState } from 'react';

import MyServers from "../components/MyServers";
import Setup from "../components/Setup";
import Modal from "../components/Modal";

import "../components/componentStyles/Dashboard.scss";

interface DashboardProps {

}

const Dashboard: React.FC<DashboardProps> = (/*{}*/) => {

    const [panel, setPanel] = useState<string>("Setup");

    const updatePanel = (e: React.MouseEvent) => {
        setPanel(e.currentTarget.innerHTML);
    };

    return (
        <div className="appContainer">
            <div className="dashboardContainer">
                <Modal message={"Please Login."} />
                <br/>
                <h1>Owner Dashboard</h1>
                <br/>
                <button className={`noBorderRight ${panel === "Setup" && "selected"}`} onClick={updatePanel}>Setup</button>
                <button className={`noBorderLeft ${panel === "My Servers" && "selected"}`} onClick={updatePanel}>My Servers</button>
                <br/>
                {
                    panel === "Setup" ? 
                    (
                        <Setup />
                    ) : (
                        <MyServers />
                    )
                }
            </div> 
        </div>
    );
}

export default Dashboard;