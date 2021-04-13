import React from 'react';
import { FAQ_Interface } from "../../../../ts/interface";

interface FAQProps {
    faq: FAQ_Interface
}

const FAQ: React.FC<FAQProps> = ({ faq }) => {
    return (
        <div className="FAQ">
            {faq.header}
            {faq.description}
        </div>
    );
}

export default FAQ;