import { Card, Button } from "react-bootstrap"
import { useFirestore } from "../hooks/useFirestore"


function TransactionList({transactions}) {
    const { deleteDocument, response } = useFirestore('transactions')
        console.log(response)

    return (
        <div className="p-2">
            <h4>Transaction List</h4>
            {transactions.map((transaction) => (
                <Card border="secondary"  className="d-flex flex-row mt-3 mb-3" key={transaction.id}>
                <Card.Body>{transaction.name}</Card.Body>
                <Card.Body>${transaction.amount}</Card.Body>
                <Card.Body><Button onClick={() => deleteDocument(transaction.id)} size="sm" variant="danger">Delete</Button></Card.Body>
              </Card>
            ))}
        </div>
    )
}

export default TransactionList
