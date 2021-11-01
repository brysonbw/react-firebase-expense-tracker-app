import { useState } from 'react'
import {  Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'


function Signup() {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   const { signup, loading, error } = useSignup()

    const onSubmit = (e) => {
        e.preventDefault()
        signup(displayName, email, password)
        setDisplayName('')
        setEmail('')
        setPassword('')
    }
    return (
        <div className="signup">
            <div className="text-center mt-4">
                <h1>MyExpenses</h1>
                <p>Personal Expense Tracker</p>
            </div>
        <Card className="mx-auto mt-5 w-75" style={{ width: '18rem' }}>
 <Card.Title className="text-center mt-3">Sign Up</Card.Title>
 <Card.Body>

 <Form onSubmit={onSubmit}>

 <Form.Group className="mb-3" controlId="formBasicPassword">
 <Form.Label>Display Name</Form.Label>
 <Form.Control type="text" placeholder="Display Name" required
 onChange={(e) => setDisplayName(e.target.value)}
 value={displayName}/>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicEmail">
 <Form.Label>Email address</Form.Label>
 <Form.Control type="email" placeholder="Enter email" required 
 onChange={(e) => setEmail(e.target.value)}
 value={email}/>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
 <Form.Label>Password</Form.Label>
 <Form.Control type="password" placeholder="Password" required
 onChange={(e) => setPassword(e.target.value)}
 value={password}/>
</Form.Group>


{!loading && <Button variant="primary" type="submit">
 Sign Up
</Button>}
{loading && <Button variant="primary" disabled>loading</Button>}
{error && <p>{error}</p>}
</Form>

<p className="pt-3">
  Already have an account?
</p>
<Link to='/login'>Login</Link>
 </Card.Body>
</Card>
<br />
     </div>
    )
}

export default Signup
