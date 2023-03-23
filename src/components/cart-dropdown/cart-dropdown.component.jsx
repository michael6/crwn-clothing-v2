import {CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';
import { Link, useNavigate } from "react-router-dom";
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
    const {cartItems, setCartOpen} = useContext(CartContext);
    const navigate = useNavigate();
    const gotoCheckout = () => {
        navigate('/checkout');
        setCartOpen(false)
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                { cartItems.length ? ( cartItems.map((item) => 
                    <CartItem key={item.id} cartItem = {item} />
                )) : (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
                {/*<Link to='checkout'>*/}
                    <Button onClick={gotoCheckout}>Go To Checkout</Button>
                {/*</Link>*/}
            </CartItems>
        </CartDropdownContainer>
    )
}

export default CartDropdown;