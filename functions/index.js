const functions = require('firebase-functions');
const express =require("express");
const cors= require("cors");
const stripe =require("stripe");
const { RepeatOneSharp } = require('@material-ui/icons');
("pk_test_51HTemIIP1VBgN1uxGDpaaBh3lSXVTWjkrcLgbaM4pVPTLUwU8wA2gX9rBWh65szd7TjQBy5DRRRv9WH7RyT6G4lb00SAt57mUx")

//API

//App config
const app=express();

//Middlewares
app.use(cors({origin:true}));
app.use(express.json());

//API router
app.get("/",(request,response)=> response.status(200).send("hello world"));
app.post('/payments/create',async(request,response)=>{
    const total=request.query.total;
    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,
        currency:"usd",
    });
    RepeatOneSharp.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});
//Listen command
exports.api =functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
