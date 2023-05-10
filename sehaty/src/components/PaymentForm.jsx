import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import visaLogo from '../assets/visa.jpg';
import Alert from 'react-bootstrap/Alert';

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      backgroundColor: "#fff",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" }
    },
    invalid: {
      iconColor: "#2192bf",
      color: "#2192bf"
    }
  }
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:5000/payment", {
          amount: 1000,
          id
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
          setTimeout(() => {
            navigate('../MedicalTips/chat');
          }, 2000);
        }

      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      {!success ? (
        <form onSubmit={handleSubmit} className="p-3">
          <div className="form-group">
            <h3 htmlFor="cardElement" className="mb-2 text-primary" style={{ fontSize: "1.5rem" }}>
              Enter card information:
            </h3>
            <CardElement
              id="cardElement"
              options={CARD_OPTIONS}
              className="form-control"
            />
          </div>
          <button className="btn btn-primary mt-3">Pay</button>
          <div className=" ">
            <img src={visaLogo} alt="Visa card logo" className="mt-2 mx-auto w-50" />
          </div>
        </form>
      ) : (
        <div className="text-center mt-3">
          <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
            <Alert.Heading>Your payment was successful! You can now join the video chat.</Alert.Heading>
          </Alert>
        </div>
      )}
    </div>
  );
}
