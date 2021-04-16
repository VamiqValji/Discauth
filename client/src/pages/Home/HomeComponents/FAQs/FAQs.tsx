import React from 'react';
import { FAQ_Interface } from "../../../../ts/interface";
import FAQ from "./FAQ";
import { Link } from "react-router-dom";

interface FAQsProps {}

const FAQs: React.FC<FAQsProps> = () => {

    const FAQQuestions:FAQ_Interface[] = [
        {
            question: <>What does Discauth do?</>,
            description: <>
            Discauth is a server member verification system that connects a 
            Discord bot with a web application. Once server owners get verify 
            their their server on the website, members of their registered servers 
            are able to verify on these servers. 
            These steps are included in the <Link to="/documentation">documentation</Link>. 
            At this point, server 
            members have received a "Verified" role on the server they verified on, 
            and the server member can view all of the verified users' information they 
            verified with (email, Discord account, etc.), on this website. With the 
            server member "Verified" role only being able to be received through 
            verifying with Discauth, server admins and the owner can set in place 
            certain permissions on Discord, to enable those users to access different 
            channels in comparision to those with the "Verified" role.
            <br/><br/>
            A real world example would include hosting a gaming tournament. 
            Let's say that their is a prize pool, and so you would like to have 
            serious members participating that you can trust. You can get them to 
            take the extra step of verifying with Discauth before participation, in 
            order to let them prove to you that they are willing enough to share their 
            email, a sensitive piece of information, to play in the tournament. Between 
            server owners and members, this solidifes trust and connects them with contact 
            information outside of just Discord.
            </>
        },
        {
            question: <>Who is Discauth for?</>,
            description: <>
            Discauth is for server owners looking for a way to automate verifying 
            users in a trustful fashion. By using Discauth, server owners are also able to view extra 
            information about their server members on Discauth.
            </>
        },
        {
            question: <>How does Discauth work?</>,
            description: <>
            A server owners signs up on this website, 
            invites the bot to their Discord server,
            registers their 
            server following the <Link to="/documentation">documentation</Link>.
             Then 
            server members will verify on that server using Discauth,
            for them to be able to receive a "Verified" role on that server.
            This verification process includes a verification code being
            sent to the user. 
            The "Verified" role should be given special permissions by server
            owners.
            </>
        },
        {
            question: <>Do my server's members ever have to visit or log in to this site?</>,
            description: <>No, this site is only for server owners.</>
        },
        {
            question: <>How do I get started?</>,
            description: <>Visit the <Link to="/documentation">documentation</Link>.</>
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