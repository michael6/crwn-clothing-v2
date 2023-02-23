import { Fragment, useContext, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import CartIcon from "../../components/card-icon/card-icon.component";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss'
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";


const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { cartOpen } = useContext(CartContext);
    const signOutHandler = async () => {
        await signOutUser();
    }

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
               <CrwnLogo className='logo' /> 
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                {
                    currentUser ? (
                        <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
                    ) : (
                        <Link className="nav-link" to='/auth'>SIGN IN</Link>
                    )
                }
                <CartIcon />
            </div>
            {cartOpen && <CartDropdown /> }
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;