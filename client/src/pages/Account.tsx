import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { loggedInformation } from "../ts/interface";

interface AccountProps {}

const stripePromise = loadStripe("pk_test_51IciNGEdCEoU8nXuSTPSTm2Fn5GDe0QgKYwLOrjuKUaPEH2iL5a7reysQcdZId1pJveyukcW4jB5Xwdu0xZMaIr800MvkfxBRv");


const CheckoutForm = () => {
    const elements = useElements();

    const stripe = useStripe();

    const loggedInfo:loggedInformation = useSelector((state:any) => state.loggedInfo);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe!.createPaymentMethod({
            type: "card",
            card: elements!.getElement(CardElement)!,
        })

        if (!error) {
            console.log(paymentMethod);

            try {
                const { id } = paymentMethod!;
                console.log({ id, amount: 500 });
                const { data } = await axios.post("http://localhost:3001/api/charge", { id, amount: 500, email: loggedInfo.email });
                console.log(data);
            } catch(err) {
                console.log(err);
            }

        }
    };
    
    return (<>
    <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>Submit</button>
    </form>
    </>);
};

const Account: React.FC<AccountProps> = (/*{}*/) => {

    return (
    <>
        <br/>
        <Elements stripe={stripePromise}>
            <h1>Account</h1>
            <CheckoutForm />
        </Elements>

    </>);
}

export default Account;