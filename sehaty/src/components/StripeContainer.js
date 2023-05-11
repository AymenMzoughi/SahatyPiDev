import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51N30ouCsHIHt4OWhqa3azqoHDHXE7IVs2EhMxx4EcYPSXKngFjbfMqpG3UVxMdegYz1xJ12JCoYE7ckiywvbWOib00a0spo9fe"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}
