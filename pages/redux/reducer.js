import React from 'react'

export const trades = (state = {
    payload: {
        ETHUSDT: {
            id: 0,
            isBestMatch: true,
            isBuyerMaker: true,
            price: "0",
            qty: "0",
            quoteQty: "0",
            time: 0,
        },
        XRPETH: {
            id: 0,
            isBestMatch: true,
            isBuyerMaker: true,
            price: "0",
            qty: "0",
            quoteQty: "0",
            time: 0,
        },
        XRPUSDT: {
            id: 0,
            isBestMatch: true,
            isBuyerMaker: true,
            price: "0",
            qty: "0",
            quoteQty: "0",
            time: 0,
        },
    }
},
    action) => {
    switch (action.type) {
        case "GET_TRADES":
            return state.payload
        case "SET_TRADES":
            return {
                ...state,
                payload: action.payload
            }
        default:
            return state
    }
}

export const login = (state = { payload: false }, action) => {
    switch (action.type) {
        case 'GET_LOGIN_STATUS':
            return {
                ...state,
                payload: state.payload
            };
        case 'SET_LOGIN_STATUS':
            return {
                ...state,
                payload: action.payload,
            };
        default:
            return state;
    };
}

const empty = () => {
    return (<></>)
}
export default empty