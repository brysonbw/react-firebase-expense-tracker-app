import React from 'react'
import TransactionList from '../../components/TransactionList'
import { useAuthContext } from '../../hooks/useAuthContext'
import TransactionForm from './TransactionForm'
import { useCollection } from '../../hooks/useCollection'

function Home() {
    const { user } = useAuthContext()
    const { documents, error } = useCollection(
        'transactions', 
        // showing data that matches user id
        // & showing data in list > desc order 
        ['uid', '==', user.uid]
        )
    
    return (
        <div className="container-fluid d-flex justify-content-around mt-4 flex-wrap-reverse">
            {error && <p>{error}</p>}
            {documents && <TransactionList transactions={documents}  />}
            <TransactionForm uid={user.uid} />
        </div>
    )
}

export default Home
