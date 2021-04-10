import React, { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { loggedInformation } from "../ts/interface";
import CustomTextModal from '../components/CustomTextModal';
import Modal from '../components/Modal';
import { useQuery } from '@apollo/client';
import { getStripeDataQuery } from '../queries/ownerQueries';
import { stripeData } from "../ts/ownersDocumentInterface";
import PaymentsContainer from '../components/PaymentsContainer/PaymentsContainer';

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

    const [resData, setResData] = useState<resData | null>(null);
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
                // console.log({ id, amount: 500 });
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

    const clickedOkayOnModal = () => {
        setPaid(false);
        setCancelled(false);
        setResData(null);
    };

    const clickedPaid = () => {
        if (!resData) {
            return (
                <CustomTextModal header={"Payment processing or invalid card details."} content={"Please wait if you had entered your card details..."} updateParent={clickedOkayOnModal} />
            );
        } else {
            if (resData.success) {
                return (
                    <CustomTextModal header={"Payment processed."} content={resData.message} updateParent={clickedOkayOnModal}/>
                );
            } else {
                return (
                    <CustomTextModal header={"Payment error."} content={resData.message} updateParent={clickedOkayOnModal}/>
                );
            }
        }
    };

    const clickedCancelled = () => {
        if (!resData) {
            return (
                <CustomTextModal header={"Subscription cancelling or invalid card details."} content={"Please wait."} updateParent={clickedOkayOnModal}/>
            );
        } else {
            if (resData.success) {
                return (
                    <CustomTextModal header={"Subscription cancelled."} content={<>{resData.message}</>} updateParent={clickedOkayOnModal}/>
                );
            } else {
                return (
                    <CustomTextModal header={"Error in cancelling subscription."} content={resData.message} updateParent={clickedOkayOnModal}/>
                );
            }
        }
    };

    
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

    const loggedInfo:loggedInformation = useSelector((state:any) => state.loggedInfo);

    const { loading: stripeDataLoading, error: stripeDataError, data: stripeData } = useQuery(getStripeDataQuery, {
        variables: { googleId: loggedInfo.id }
    });
    
    if (stripeDataLoading || !stripeData) return <h3>Loading...</h3>;
    if (stripeDataError) return <h3>Error.</h3>;

    try {

        const { membership, paymentDate, pastPayments }:stripeData = stripeData.ownerData.stripeData;

        return (
            <>
                <Modal message={"Please Login."} />
                <br/>
                <h1>Account</h1>
                <br/>
                <h3>{membership}</h3>
                <h4>{paymentDate && paymentDate}</h4>
                <br/>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
                <br/>
                <h2>Your Previous Payments</h2>
                <PaymentsContainer pastPayments={pastPayments} />
            </>
        )
    } catch {
        return <>Loading...</>;
    }
}

export default Account;