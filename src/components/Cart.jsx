import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";
import Modal from "./UI/Modal";

export default function Cart() {

    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserProgressContext);

    function handleCloseCart() {
        userCtx.hideCart();
    }

    function handleGoToCheckout() {
        userCtx.showCheckout();
    }

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    return (
        <Modal className="cart" open={userCtx.progress === 'cart'} >
            <h2>Tour Cart</h2>
            <ul>
                {cartCtx.items.map((item) => <CartItem key={item.id} name={item.name}
                    quatntity={item.quantity} price={item.price}
                    onIncrease={() => cartCtx.addItem(item)} onDecrease={() => cartCtx.removeItem(item.id)} />)}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to checkout</Button>}
            </p>
        </Modal>
    );
}