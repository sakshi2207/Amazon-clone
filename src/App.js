import React,{useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router ,Switch,Route} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login'
import Payment from './Payment';
import Orders from './Orders';
import {useStateValue} from './StateProvider';
import { auth } from './firebase';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';


const promise= loadStripe(
  "pk_test_51HTemIIP1VBgN1uxGDpaaBh3lSXVTWjkrcLgbaM4pVPTLUwU8wA2gX9rBWh65szd7TjQBy5DRRRv9WH7RyT6G4lb00SAt57mUx"
)
function App() {
const [{},dispatch] = useStateValue();

//useEffect which run on based given condition

useEffect(()=>{
// will only run once when the app component loads...

auth.onAuthStateChanged((authUser)=>{
  console.log("THE USER IS >>> ", authUser);
    if(authUser){
      //User is login
      dispatch({
        type:"SET_USER",
        user:authUser
      });
    }
    else{
      //user is logout
      dispatch({
        type:"SET_USER",
        user:null
      });
    }
  });
},[])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header/>
            <Orders/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>
          <Route path="/payment">
            <Header/>
            <Elements stripe={promise}>
            <Payment/>
            </Elements>
            
          </Route>
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
