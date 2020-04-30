import React from 'react'

export const trades = (state = {}, action) => {
    switch (action.type) {
        case "GETTRADES":
            return state.payload
        case "SETTRADS":
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