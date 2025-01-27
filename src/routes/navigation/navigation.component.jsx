import { Fragment, useContext, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import CartIcon from "../../components/card-icon/card-icon.component";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { cartOpen } = useContext(CartContext);
    const signOutHandler = async () => {
        await signOutUser();
    }

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
               <CrwnLogo className='logo' /> 
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to='/auth'>SIGN IN</NavLink>
                    )
                }
                <CartIcon />
            </NavLinks>
            {cartOpen && <CartDropdown /> }
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;