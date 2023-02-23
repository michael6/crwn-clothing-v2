import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './card-icon.styles.scss';
import { CartContext } from "../../contexts/cart.context";
import { useContext } from 'react';

const CartIcon = () => {
    const { cartOpen, setCartOpen, totalCount } = useContext(CartContext);
    return (
        <div className='cart-icon-container' onClick={()=> {setCartOpen(!cartOpen)}}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{totalCount}</span>
        </div>
    )
}

export default CartIcon;