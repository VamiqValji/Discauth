import React, { useState } from 'react';
import { FAQ_Interface } from "../../../../ts/interface";

interface FAQProps {
    faq: FAQ_Interface
}

const FAQ: React.FC<FAQProps> = ({ faq }) => {

    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <div className={`FAQ ${expanded && `expanded`}`}>
            <div className="head">
                <h3>{faq.question}</h3>
                <i className={`fas fa-${expanded ? `minus` : `plus` }-circle`} onClick={() => {
                    setExpanded(!expanded);
                }} style={{marginLeft: "1rem"}}></i>
            </div>
            <div className="expand">
                <p style={{marginTop: "1rem"}}>{faq.description}</p>
            </div>
        </div>
    );
}

export default FAQ;