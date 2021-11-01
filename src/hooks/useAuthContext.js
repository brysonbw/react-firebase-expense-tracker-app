import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    // if no value for context
    if(!context) {
        throw Error ('useAuthContext must be inside an AuthContextProvider')
    }



    // getting context in hook
    return context
}