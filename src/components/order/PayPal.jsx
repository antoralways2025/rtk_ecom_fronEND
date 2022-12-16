import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from 'react';

// import { useUpdateOrderMutation } from '../../features/order/orderAPI';
const PayPal = ({order,transitionSuccess}) => {

//   const [updateOrder]=useUpdateOrderMutation()

  
    
    const initialOptions = {
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
         currency: "USD",
        // intent: "capture",
        // "data-client-token": "abc123xyz==",
    };

    console.log("render paypal")

  return (
    < >


      <div className="p-2 bg-orange-300 mb-2 text-3xl text-center"> Total : {order?.total} USD</div>
     <PayPalScriptProvider options={ initialOptions}>
     <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value:`${order?.total}`,
                                },
                            },
                        ],
                    });
                }}
                onApprove={async(data, actions) => {
                    return actions.order.capture().then((details) => {

                        transitionSuccess(details?.payer?.payer_id,)

                    //   updateOrder({id:order?._id,data:{delivered:true, paid:true,method:"Paypal",
                    //   paymentId:details?.payer?.payer_id,
                    //   paymentOfDate:new Date().toISOString()}})
                        const name = details.payer.name.given_name;

                        
                        alert(`Transaction completed by ${name}`);
                    });
                }}
            />
        </PayPalScriptProvider>
    
     </>
  )
}

export default PayPal