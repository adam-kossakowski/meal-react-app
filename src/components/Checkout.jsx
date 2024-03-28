import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./UI/Input"
import useHttp from "../hooks/useHttp";

import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout() {

    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleClose() {
        userCtx.hideCheckout();
    }

    const { data, isLoading: isSending, error, sendRequest, clearData } =
        useHttp('http://localhost:3000/orders', requestConfig);

    function handleFinish() {
        userCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const customerData = Object.fromEntries(formData.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));

        // fetch('http://localhost:3000/orders', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         order: {
        //             items: cartCtx.items,
        //             customer: customerData
        //         }
        //     })
        // })
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose} >Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>
    }

    if (data && !error) {
        return <Modal open={userCtx.progress === 'checkout'} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your order was submitted successully!</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }

    return (<Modal open={userCtx.progress === 'checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label="Full Name" type="text" id="name" />
            <Input label="Email" type="email" id="email" />
            <Input label="Street" type="text" id="street" />

            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="City" type="text" id="city" />
            </div>

            {error && <Error title="Failed to submit order" error={error} />}

            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>);
}