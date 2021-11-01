import { useState, useEffect, useRef } from "react";
import { projectFirestore} from "../firebase/config";



export const useCollection = (collection, _query) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // useRef - stopping infinite loop > _query is a different arrary
    const query = useRef(_query).current

    useEffect(() => {
        let ref = projectFirestore.collection(collection)

        // collection for the user only
        if (query) {
            ref = ref.where(...query)
        }
       
        // new snapshot or collection on change
        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            // pushing object to collection
            snapshot.docs.forEach((doc) => {
                results.push({...doc.data(), id: doc.id})
            })

            // update state
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('could not fetch data')
        })

        // unsubscribe on unmount
        return () => unsubscribe()

    }, [collection, query])

    return { documents, error }
}