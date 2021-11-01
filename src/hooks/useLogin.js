import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
// import context
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [ cancelled, setCancelled ] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { dispatch } = useAuthContext()


    const login = async (email, password) => {
        setError(null)
        setLoading(true)

        // sign the user out
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            // dispatch login action
            dispatch({type: 'LOGIN', payload: res.user})
            
            // update state
            if (!cancelled) {
            setLoading(false)
            setError(null)
            }
        } catch (error) {
            if (!cancelled) {
            console.error(error)
            setError(error)
            setLoading(false)
            }
        }

    }


    // clean up function
    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { login, error, loading }

}