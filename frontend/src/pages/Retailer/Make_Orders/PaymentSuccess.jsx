import React from 'react'

function PaymentSuccess() {
  return (
    <div>
        <h1 className='text-center text-2xl font-bold mt-10'>Payment Successful!</h1>
        <p className='text-center mt-4'>Thank you for your order. Your payment has been processed successfully.</p>
        <button className='btn btn-primary mt-5 mx-auto block' onClick={() => window.location.href = '/retailer/view_cart'}>
          View Cart
        </button>
    </div>
  )
}

export default PaymentSuccess