//import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import {ShoppingIcon, CartIconContainer, ItemCount} from './card-icon.styles';
import { CartContext } from "../../contexts/cart.context";
import { useContext } from 'react';

const CartIcon = () => {
    const { cartOpen, setCartOpen, totalCount } = useContext(CartContext);
    return (
        <CartIconContainer onClick={()=> {setCartOpen(!cartOpen)}}>
            <ShoppingIcon />
            <ItemCount>{totalCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;