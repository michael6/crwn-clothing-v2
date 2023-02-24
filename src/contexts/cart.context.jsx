import { createContext, useEffect, useState } from "react";

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

export const CartProvider = ({children}) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect (()=>{
        const newTotalCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setTotalCount(newTotalCount);
    },[cartItems])

    useEffect (()=>{
        const newTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newTotal);
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const updateQuantity = (item, quantity) => {
        if(quantity < 0)
            return
        var result = cartItems.find((cartItem)=>cartItem.id === item.id)
        if (result) {
            var items = updateItemQuantity(cartItems, item, quantity);
            setCartItems(items)
        }
    }

    const remove = (item) => {
        setCartItems(removeItem(cartItems, item))
    }

    const value = {cartOpen, setCartOpen, cartItems, addItemToCart, totalCount, updateQuantity, remove, cartTotal}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}