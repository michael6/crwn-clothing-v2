import { createContext, useState, useEffect } from 'react';
import SHOP_DATA from '../shopdata.json';

export const ProductContext = createContext({
    products: [],
})

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState(SHOP_DATA);
    const value = {products};
    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}