import React, { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { loggedInformation } from "../ts/interface";
import CustomTextModal from '../components/CustomTextModal';

interface AccountProps {}

const stripePromise = loadStripe("pk_test_51IciNGEdCEoU8nXuSTPSTm2Fn5GDe0QgKYwLOrjuKUaPEH2iL5a7reysQcdZId1pJveyukcW4jB5Xwdu0xZMaIr800MvkfxBRv");

interface resData {
    success: boolean,
    tracking?: string,
    message?: string,
    status: string,
    client_secret: string,
}

const CheckoutForm = () => {
    const elements = useElements();

    const stripe = useStripe();

    const loggedInfo:loggedInformation = useSelector((state:any) => state.loggedInfo);

    const [resData, setResData] = useState<resData>();
    const [paid, setPaid] = useState<boolean>(false);
    const [cancelled, setCancelled] = useState<boolean>(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setPaid(true);
        setCancelled(false);

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
                setResData(data);
            } catch(err) {
                console.log(err);
            }

        }
    };

    const handleCancel = async (e:any) => {
        e.preventDefault();
        setCancelled(true);
        setPaid(false);

        // const { error, paymentMethod } = await stripe!.createPaymentMethod({
        //     type: "card",
        //     card: elements!.getElement(CardElement)!,
        // })

        // if (!error) {
            try {
                // const { id } = paymentMethod!;
                const { data } = await axios.post("http://localhost:3001/api/cancel", { /*id,*/ amount: 500, email: loggedInfo.email });
                console.log(data);
                setResData(data);
            } catch(err) {
                console.log(err);
            }

        // }
    };

    const clickedPaid = () => {
        if (!resData) {
            return (
                <CustomTextModal header={"Payment processing."} content={"Please wait."} />
            );
        } else {
            if (resData.success) {
                return (
                    <CustomTextModal header={"Payment processed."} content={resData.message}/>
                );
            } else {
                return (
                    <CustomTextModal header={"Payment error."} content={resData.message}/>
                );
            }
        }
    };

    const clickedCancelled = () => {
        if (!resData) {
            return (
                <CustomTextModal header={"Subscription cancelling."} content={"Please wait."} />
            );
        } else {
            if (resData.success) {
                return (
                    <CustomTextModal header={"Subscription cancelled."} content={<>{resData.message}</>}/>
                );
            } else {
                return (
                    <CustomTextModal header={"Error in cancelling subscription."} content={resData.message}/>
                );
            }
        }
    };

    console.log(resData);
    return (<>
        {paid && clickedPaid()}
        {cancelled && clickedCancelled()}
        <form onSubmit={handleSubmit}>
            Basic Membership Tier: $5.00 CAD
            <CardElement />
            <button type="submit" disabled={!stripe || !elements}>Pay</button>
        </form>
        <form onSubmit={handleCancel}>
            <button type="submit" disabled={!stripe || !elements}>Cancel Subscription</button>
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