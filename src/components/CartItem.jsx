import { currencyFormatter } from "../util/formatting";

export default function CartItem({ name, quatntity, price, onIncrease, onDecrease }) {
    return (
        <li className="cart-item">
            <p>{name} - {quatntity} x {currencyFormatter.format(price)}</p>
            <p className="cart-item-actions">
                <button onClick={onDecrease}>-</button>
                <span>{quatntity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    );
}