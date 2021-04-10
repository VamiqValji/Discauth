import React from 'react';
import { pastPayments } from "../../ts/ownersDocumentInterface";
import "./PaymentsContainer.scss";

interface PaymentsContainerProps {
    pastPayments: pastPayments[]
}

const PaymentsContainer: React.FC<PaymentsContainerProps> = ({pastPayments}) => {
    return (
        <div className="paymentsContainer">
            {pastPayments.length > 0 ? (
                <>
                    {
                        pastPayments.map((payment, idx: number) => {
                            return (
                            <div className="paymentContainer" key={idx}>
                                <h3>Membership: {payment.membership}</h3>
                                <h4>Payment Date: {payment.paymentDate}</h4>
                                <h5>Cancellation Date: {payment.cancelledDate}</h5>
                            </div>) 
                        })
                    }
                </>
            ) : (
                <h4 className="muted" style={{fontWeight: "normal"}}>You haven't bought anything before!</h4>
            )}
        </div>
    );
}

export default PaymentsContainer;