import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments, addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
//import SHOP_DATA from '../shopdata';

export const CategoriesContext = createContext({
    categoriesMap: {},
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    //useEffect(()=>{
        //addCollectionAndDocuments('categories', SHOP_DATA)
    //})
    useEffect(()=>{
        const getCategoriesMap = async () =>{
            const categoryMap = await getCategoriesAndDocuments();
            console.log("categorymap", categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[]);

    const value = {categoriesMap};
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}