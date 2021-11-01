import { useState, useEffect } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { useFirestore } from "../../hooks/useFirestore"

function TransactionForm({uid}) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const { addDocument, response } = useFirestore('transactions')

    const onSubmit = (e) => {
        e.preventDefault()
       addDocument({
           uid,
           name,
            amount
        })
    }

    // reset form on successful response
    useEffect(() => {
       if (response.success) {
           setName('')
           setAmount('')
       }
    }, [response.success])


    return (
        <div className="p-2">
            <Card border="secondary"className="mx-auto container-fluid" style={{ width: '18rem' }}>
            <h3 className="mt-2">Add a Transaction</h3>
            <Form className="mt-1 mb-3" onSubmit={onSubmit}>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Transaction Name:</Form.Label>
     <Form.Control type="text" onChange={(e) => setName(e.target.value)}
    value={name} required />
  </Form.Group>

  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Amount($):</Form.Label>
    <Form.Control type="number" onChange={(e) => setAmount(e.target.value)}
    value={amount} required />
  </Form.Group>
  <Button size="md" variant="success" type="submit">
    Add
  </Button>
  </Form>
              </Card>
        </div>
    )
}

export default TransactionForm
