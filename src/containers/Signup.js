import React, { useState } from 'react'
import { Header, Button, Container, Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import Message from '../components/Message'
import { history } from "../helpers";
import { authenticationService } from "../services"

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault()
    authenticationService.signup(username, email, password, confirmPassword)
      .then(res => {
        setLoading(false);
        history.push('/')
      })
      .catch(error => {
        setLoading(false);
        setError(error.message || error)
      })
  }

  console.log(authenticationService.isAuthenticated)

  if (authenticationService.isAuthenticated) {
    return <Redirect />
  }

  return (
    <Container>
      <Header>Signup for an account</Header>
      {error && (
        <Message danger message={error} />
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Usename</label>
          <input
            placeholder='Usename'
            value={username}
            type='text'
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder='Email'
            value={email}
            type='email'
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder='Password'
            value={password}
            type='password'
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder='Confirm Password'
            value={confirmPassword}
            type='password'
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Form.Field>
        <Button primary fluid loading={loading} disabled={loading} type='submit'>Signup</Button>
      </Form>
    </Container>
  )
}

export default Signup;
