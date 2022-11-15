import React, { useEffect } from 'react'
import CouponData from '../coupons/CouponData'
import CustomerData from '../customer/CustomerData'
import PizzaData from '../pizza/PizzaListData'

export default function OrderData(custId) {

  return (
    <>

      <div><CustomerData /></div>   {/*Displays customer data */}
      <div><br /><br /></div>       
      <div><PizzaData /></div>      {/*Displays pizza list data */}
      <div><br /><br /></div>
      <div><CouponData /></div>     {/*Displays coupon data */}
    </>
  )
}
