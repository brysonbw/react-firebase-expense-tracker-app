import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
// import context
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [ cancelled, setCancelled ] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { dispatch } = useAuthContext()


    const logout = async () => {
        setError(null)
        setLoading(true)

        // sign the user out
        try {
            await projectAuth.signOut()

            // dispatch logout action
            dispatch({type: 'LOGOUT'})
            
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

    return { logout, error, loading }

}