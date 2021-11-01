import { useState } from 'react'
import {  Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, loading } = useLogin()


    const onSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(password)
        setEmail('')
        setPassword('')
        login(email, password)
    }


    return (
        <div className="login">
           <Card className="mx-auto mt-5 w-75" style={{ width: '18rem' }}>
    <Card.Title className="text-center mt-3">Login</Card.Title>
    <Card.Body>

    <Form onSubmit={onSubmit}>
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
    Login
  </Button>}
  {loading && <Button variant="primary" disabled>
    Loading
  </Button> }
  {error && <p>{error}</p>}
</Form>
<p className="pt-3">
  Don't Have an account?
</p>
<Link to='/signup'>Sign Up</Link>
    </Card.Body>
  </Card>
  <br />
        </div>
    )
}

export default Login
