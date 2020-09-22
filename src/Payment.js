import React,{useState,useEffect} from 'react'
import './Payment.css';
import {useStateValue} from "./StateProvider";
import {Link,History, useHistory} from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js";
import {getBasketTotal} from "./reducer";
import axios from './axios';
import {db} from "./firebase";

function Payment() {
    const [{basket,user},dispatch]=useStateValue();
    const history= useHistory();
    const stripe =useStripe();
    const elements =useElements();
    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [error,setError]= useState(true);
    const [disabled,setDisabled]=useState(true);
    const[clientSecret,setClientSecret]=useState(true);

    useEffect(()=>{
         // generate the special stripe secret which allows us to charge a customer
        const getClientSecret =async()=>{
            const response =await axios({
                method:'post',
                url:`/payments/create?total=${getBasketTotal(basket)*100}`
    
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[basket])

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)

    const handleSubmit =async(event) => {
        event.preventDefault();//avoid refresh
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_menthod:{
                card:elements.getElement(CardElement)

            }
        }).then(({paymentIntent})=>{
            db.collection('user')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })
            setSucceeded(true);
            setError(null)
            setProcessing(false)
            dispatch({
                type:'EMPTY_BASKET'
            })
            history.replace('/orders')
        })
    }
    const handleChange=event=>{
        setDisabled(event.empty);
        setError(event.error?event.error.message:"")
    }
    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout(
                        <Link to="/checkout">{basket?.length}</Link>
                    )
                </h1>
            </div>
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment_address">
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angles, CA</p>
                </div>
            </div>
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment_items">
                    {basket.map(item=>(
                        <CheckoutProduct id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))}
                </div>

            </div>
            <div className='payment_section'>
                <div className="payment_title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment_priceContainer">
                                <CurrencyFormat renderText={(value)=>(
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}/>
                            <button disabled={processing||disabled||succeeded}>
                                <span>{processing ? <p>Processing</p>: "Buy Now"}</span>
                            </button>
                            </div>
                            {error && <div>{error}</div>}    
                        </form>
                    
                </div>
            </div>

        </div>
    )
}

export default Payment
