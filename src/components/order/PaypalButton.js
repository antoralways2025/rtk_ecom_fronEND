import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateOrderMutation } from '../../features/order/orderAPI';
 
import { toast } from 'react-toastify';

const PaypalBtn = ({order }) => {

         console.log("Rendering Paypal button")

  const [updateOrder]=useUpdateOrderMutation()

  const user=useSelector(state=>state.auth.user) 

  
  const transitionSuccess= useCallback(async(paymentId)=>{

   

    if(user.role ==='user'){

      updateOrder({id:order?._id,data:{delivered:true, paid:true,method:"Paypal",
      paymentId,
      paymentOfDate:new Date().toISOString()}})
     }else{
      toast("Authorization failed!")
     }


     
  },[order?._id, updateOrder, user.role])
  

     const refBtn=useRef() ;


  useEffect(()=>{

    // eslint-disable-next-line no-undef
     paypal.Buttons({
      // Sets up the transaction when a payment button is clicked
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: order?.total // Can reference variables or functions. Example: `value: document.getElementById('...').value`
            }
          }]
        });
      },
      // Finalize the transaction after payer approval
      onApprove: function(data, actions) {


             
        return actions.order.capture().then(function(orderData) {

                                         console.log(orderData)
                                       
                             transitionSuccess(orderData?.payer?.payer_id)

                           
        });
      }
    }).render(refBtn.current);
  }
  
  ,[order?.total, transitionSuccess])


  return(
      <div ref={refBtn}>
          
      </div>
  )
};

export default memo(PaypalBtn) ;
