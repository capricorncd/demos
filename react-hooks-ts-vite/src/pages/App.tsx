/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 11:56 (GMT+0900)
 */
import React, { useState } from 'react'
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route,
  RouteProps,
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { ProvideAuth, useAuth } from './UseAuth'
import Home from './Home'

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Welcome />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  )
}

function PrivateRoute({ children, ...rest }: RouteProps) {
  const auth = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

function Welcome() {
  return (
    <>
      <h1>Welcome</h1>
      <Link to="/home">Home</Link>
    </>
  )
}

function Login() {
  const [disabled, setDisabled] = useState(false)
  const history = useHistory()
  const location = useLocation()

  const auth = useAuth()

  // @ts-ignore
  const { from } = location.state || { from: { pathname: '/home' } }

  async function login() {
    if (disabled) return
    setDisabled(true)
    await auth.signIn()
    history.replace(from)
  }

  return (
    <div>
      <h1>Login</h1>
      <button disabled={disabled} onClick={login}>
        login
      </button>
    </div>
  )
}
