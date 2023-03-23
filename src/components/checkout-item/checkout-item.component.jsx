import './checkout-item.styles.scss';
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const {updateQuantity, remove} = useContext(CartContext);
    const increaseItemQuantity = () => updateQuantity(cartItem, cartItem.quantity+1)
    const decreaseItemQuantity = () => updateQuantity(cartItem, cartItem.quantity-1)
    const removeCartItem = () => remove(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={decreaseItemQuantity}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={increaseItemQuantity}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={removeCartItem}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;