import React, { useState } from 'react';
import { FAQ_Interface } from "../../../../ts/interface";

interface FAQProps {
    faq: FAQ_Interface
}

const FAQ: React.FC<FAQProps> = ({ faq }) => {

    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <div className={`FAQ ${expanded && `expanded`}`}>
            <div className="text">
                <h3>{faq.question}</h3>
                <div className="expand">
                    <p>{faq.description}</p>
                </div>
            </div>
            <i className="fas fa-plus-circle" onClick={() => {
                setExpanded(!expanded);
            }}></i>
        </div>
    );
}

export default FAQ;