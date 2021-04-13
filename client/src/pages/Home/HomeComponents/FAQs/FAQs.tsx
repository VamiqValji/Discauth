import React from 'react';
import { FAQ_Interface } from "../../../../ts/interface";
import FAQ from "./FAQ";

interface FAQsProps {}

const FAQs: React.FC<FAQsProps> = () => {

    const FAQQuestions:FAQ_Interface[] = [
        {
            header: <></>,
            description: <></>
        }
    ];

    return (
    <>
        <div className="FAQsContainer">
            <div className="FAQs">
                {
                    FAQQuestions.map((faq, idx:number) => {
                        return <FAQ faq={faq} key={idx} />;
                    })
                }
            </div>
        </div>
    </>);
}

export default FAQs;