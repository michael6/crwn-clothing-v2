import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    var result = cartItems.find((item)=>item.id === productToAdd.id)
    console.log("result", result)
    if(result) {
        return cartItems.map((item)=> 
            item.id === productToAdd.id ? {...item, quantity: item.quantity+1} : item
        )
    }
    return [...cartItems, {...productToAdd, quantity:1}];
}

export const CartContext = createContext({
    cartOpen: false,
    setCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    totalCount: 0
})

export const CartProvider = ({children}) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect (()=>{
        const newTotalCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setTotalCount(newTotalCount);
    },[cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const value = {cartOpen, setCartOpen, cartItems, addItemToCart, totalCount}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}