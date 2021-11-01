import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
// import context
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [ cancelled, setCancelled ] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (displayName, email, password) => {
        setError(null)
        setLoading(true)

        try {
            // sign up user
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
  

        if (!res) {
            throw new Error('Could not complete signup')
        }

        // adding displayName to user
        await res.user.updateProfile({ displayName })


        // dispatch login action
        dispatch({ type: 'LOGIN', payload: res.user })

        // update state
        if (!cancelled) {
           setLoading(false)
           setError(null)
           }

        } catch (error) {
            if (!cancelled) {
                setLoading(false)
                setError(null)
                }
        }

    }


 // clean up function
 useEffect(() => {
    return () => setCancelled(true)
}, [])


return { error, loading, signup}

}