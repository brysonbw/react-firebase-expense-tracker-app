import { createContext, useReducer } from "react";
import { useEffect } from "react";
import { projectAuth } from "../firebase/config";


export const AuthContext = createContext()

// take in current state and action object
export const authReducer = (state, action) => {
    // check type and based on type update state
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true }
        default: 
            return state
    }
    
}



// custom provider
export const AuthContextProvider = ({ children }) => {
    // authReducer = function to update state
    const [state, dispatch] = useReducer(authReducer, {
        // initial state
        user: null,
        // render component tree when true
        authIsReady: false
    })

    useEffect(() => {
       const unsub =  projectAuth.onAuthStateChanged((user) => {
            dispatch({ type: 'AUTH_IS_READY', payload: user})
            unsub()
        })
    }, [])


    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>



    )


}