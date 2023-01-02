import React, { useEffect, useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { actionTypes } from '../State/ProductState/actionTypes';
import { initialState, productReducer } from '../State/ProductState/productReducer';

const PRODUCT_CONTEXT = createContext();

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);


    useEffect(() => {
        dispatch({ type: actionTypes.FETCHING_START });
        fetch("products.json")
            .then((res) => res.json())
            .then((data) =>
                dispatch({ type: actionTypes.FETCHING_SUCCESS, payload: data })
            )
            .catch(() => {
                dispatch({ type: actionTypes.FETCHING_ERROR });
            });
    }, []);

    const value = {
        state,
        dispatch,
    };

    return (
        <PRODUCT_CONTEXT.Provider value={value}>
            {children}
        </PRODUCT_CONTEXT.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(PRODUCT_CONTEXT);
    return context;
};

export default ProductProvider;