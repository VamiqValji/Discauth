import React from 'react';
import { pastPayments } from "../../ts/ownersDocumentInterface";
import "./PaymentsContainer.scss";

interface PaymentsContainerProps {
    pastPayments: pastPayments[]
}

const PaymentsContainer: React.FC<PaymentsContainerProps> = ({pastPayments}) => {
    return (
        <div className="paymentsContainer customScrollbarDark">
            {pastPayments.length > 0 ? (
                <>
                    <div className="payments">
                        {
                            pastPayments.map((payment, idx: number) => {
                                return (
                                    <div className="payment" key={idx}>
                                    <h3>Membership: {payment.membership}</h3>
                                    <h4>Payment Date: {new Date(payment.paymentDate).toLocaleString()}</h4>
                                    <h5>Cancellation Date: {new Date(payment.cancelledDate).toLocaleString()}</h5>
                                </div>) 
                            })
                        }
                    </div>
                </>
            ) : (
                <h4 className="muted" style={{fontWeight: "normal", padding: "1rem"}}>You haven't bought anything before!</h4>
            )}
        </div>
    );
}

export default PaymentsContainer;