import React from 'react';
import { FAQ_Interface } from "../../../../ts/interface";
import FAQ from "./FAQ";

interface FAQsProps {}

const FAQs: React.FC<FAQsProps> = () => {

    const FAQQuestions:FAQ_Interface[] = [
        {
            question: <>What does Discauth do?</>,
            description: <>Placeholder</>
        },
        {
            question: <>Who is Discauth for?</>,
            description: <>Placeholder</>
        },
        {
            question: <>How does Discauth work?</>,
            description: <>Placeholder</>
        },
        {
            question: <>Do my server's members ever have to visit or log in to this site?</>,
            description: <>No, this site is only for server owners.</>
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