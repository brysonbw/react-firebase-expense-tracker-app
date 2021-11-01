import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
    document: null,
    loading: false,
    error: null,
    success: null
}


const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { loading: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { loading: false, document: action.payload, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { loading: false, document: null, success: true, error: null }
        case 'ERROR':
            return { loading: false, document: null, success: false, error: action.payload }
        default: 
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [cancelled, setCancelled] = useState(false)

    // collection reference
    const ref = projectFirestore.collection(collection)

    // dispatch when not cancelled
    const dispatchIfNotCancelled = (action) => {
        if(!cancelled) {
            dispatch(action)
        }
    }

    // add a document
    const addDocument = async (doc) => {
        // starting to load document
        dispatch ({ type: 'LOADING'})

        try {
            // adding timestamp with added document
            const createdAt = timestamp.fromDate(new Date())
           const addedDocument =  await ref.add({...doc, createdAt })
           dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })

        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
        }
    }

    // delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: 'LOADING'})

        try {
           await ref.doc(id).delete()
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT'})
        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete'  })
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])


    return { addDocument, deleteDocument, response }

}