import { createContext, useEffect, useState, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    var result = cartItems.find((item)=>item.id === productToAdd.id)
    console.log("add to cart result", result)
    if(result) {
        return cartItems.map((item)=> 
            item.id === productToAdd.id ? {...item, quantity: item.quantity+1} : item
        )
    }
    return [...cartItems, {...productToAdd, quantity:1}];
}

const updateItemQuantity = (cartItems, item, newQuantity) => {
    console.log(item, newQuantity)
    return cartItems.map((cartItem) => 
        item.id === cartItem.id ? {...item, quantity: newQuantity } : item )
}

const removeItem = (cartItems, item) => {
    return cartItems.filter((cartItem) => cartItem !== item)
}

export const CartContext = createContext({
    cartOpen: false,
    setCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    totalCount: 0,
    updateQuantity: () => null,
    remove: () => null,
    cartTotal: 0
})

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'SET_CART_ITEMS':
            return {
                ...state,
                ...payload
            }
        case 'SET_CART_OPEN':
            return {
                ...state,
                cartOpen: payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
}

const INITIAL_STATE = {
    cartOpen: false,
    cartItems: [],
    totalCount: 0,
    cartTotal: 0
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_OPEN: 'SET_CART_OPEN'
}

export const CartProvider = ({children}) => {
    //const [cartOpen, setCartOpen] = useState(false);
    //const [cartItems, setCartItems] = useState([]);
    //const [totalCount, setTotalCount] = useState(0);
    //const [cartTotal, setCartTotal] = useState(0);
    const [ { cartItems, cartOpen, cartTotal, totalCount }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newTotalCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, 
            {
                cartItems: newCartItems,
                totalCount: newTotalCount,
                cartTotal: newTotal
            }))
    }

    const setCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN, bool));
    }

    //useEffect (()=>{
        //const newTotalCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        //setTotalCount(newTotalCount);
    //},[cartItems])

    //useEffect (()=>{
        //const newTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        //setCartTotal(newTotal);
    //},[cartItems])

    const addItemToCart = (productToAdd) => {
        //setCartItems(addCartItem(cartItems, productToAdd));
        updateCartItemsReducer(addCartItem(cartItems, productToAdd));
    }

    const updateQuantity = (item, quantity) => {
        if(quantity < 0)
            return
        var result = cartItems.find((cartItem)=>cartItem.id === item.id)
        if (result) {
            var items = updateItemQuantity(cartItems, item, quantity);
            //setCartItems(items)
            updateCartItemsReducer(items);
        }
    }

    const remove = (item) => {
        //setCartItems(removeItem(cartItems, item))
        updateCartItemsReducer(removeItem(cartItems, item))
    }

    const value = {cartOpen, setCartOpen, cartItems, addItemToCart, totalCount, updateQuantity, remove, cartTotal}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}