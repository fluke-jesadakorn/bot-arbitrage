import React from 'react'

const countInitialState = {
    count: 0,
}

export const count = (state = countInitialState, action) => {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                count: state.count + 1,
            }
        default:
            return state
    }
}

let isLogin = false

export const login = (state = isLogin, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                payload: true
            }
        case "LOOUT":
            return {
                ...state,
                payload: false
            }
        default:
            return state
    }
}

const empty = () => {
    return (<></>)
}
export default empty