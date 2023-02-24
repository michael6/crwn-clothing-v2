import './cart-dropdown.styles.scss';
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
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem = {item} />
                ))}
                {/*<Link to='checkout'>*/}
                    <Button onClick={gotoCheckout}>Go To Checkout</Button>
                {/*</Link>*/}
            </div>
        </div>
    )
}

export default CartDropdown;