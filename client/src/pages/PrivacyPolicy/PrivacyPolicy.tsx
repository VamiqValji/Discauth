import React from 'react';
import "./PrivacyPolicy.scss";

interface PrivacyPolicyProps {}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = () => {
    return (
    <div className="appContainer">
        <br/>
        <h1>Privacy Policy</h1>
        <div className="privacyPolicyContainer">
            <br/>
            <p>
                This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from https://www.discauth.herokuapp.com (the “Site”), as well as when a server member (registering and verifying in a server owner's Discord) uses Discauth's services. By using Discauth's services, you consent to the data practices described in this statement.
            </p>
            <br/>
            <h4>PERSONAL INFORMATION WE COLLECT</h4>
            <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”
                <br/>
                We collect Device Information using the following technologies:
                <br/>
                    <br/> - “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.
                    <br/> - “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
                    <br/> - “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.
                <br/>
                <br/>
                Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers, debit card numbers, or the payment information used), email address, and phone number.  We refer to this information as “Order Information.” 
                We also collect data about the users (server owners and members using the service), including but not limited to emails, Discord IDs,  Discord tags, and verification time and date; collected on sign up, registration, and or verification.
                <br/>
                <br/>
                When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.
                <br/>
            </p>
            <br/>
            <h4>HOW DO WE USE YOUR PERSONAL INFORMATION?</h4>
            <p>
                We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).  Additionally, we use this Order Information to:
                Communicate with you;
                Screen our orders for potential risk or fraud; and
                When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.
                We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
                <br/>
            </p>
            <br/>
            <h4>SHARING YOUR PERSONAL INFORMATION</h4>
            <p>
                We share your Personal Information with third parties to help us use your Personal Information, as described above. 
                <br/>
                Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
                <br/>
                <br/>
            </p>
            <h4>YOUR RIGHTS</h4>
            <p>
                If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
                <br/>
                Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above.  Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.
                <br/>
                <br/>
            </p>
            <h4>DATA RETENTION</h4>
            <p>
                When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                <br/>
                <br/>
            </p>

            <h4>CHANGES</h4>
            <p>
                We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
                <br/>
            </p>
            <br/>
            <h4>CONTACT US</h4>
    	    <p>
	            For more information about our privacy practices, if you have questions, or if you would like to 	make a complaint, please contact us by e-mail at discauth.verify@gmail.com.
	        </p>    
            <br/>
        </div>
    </div>);
}

export default PrivacyPolicy;