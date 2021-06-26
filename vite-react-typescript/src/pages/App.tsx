/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 11:56 (GMT+0900)
 */
import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route,
  RouteProps
} from 'react-router-dom'
import { ProvideAuth, useAuth } from '@/components/Common/UseAuth/UseAuth'
import Login from './Login/Login'
import Welcome from './Welcome/Welcome'
import Home from './Home/Home'
import Confirm from './Confirm/Confirm'
import OrderPage from './Order/OrderPage'
import HistoryPage from './History/HistoryPage'

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <PrivateRoute path="/" exact>
            <Welcome/>
          </PrivateRoute>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivateRoute path="/home">
            <Home/>
          </PrivateRoute>
          <PrivateRoute path="/confirm">
            <Confirm/>
          </PrivateRoute>
          <PrivateRoute path="/order/detail/:id">
            <OrderPage/>
          </PrivateRoute>
          <PrivateRoute path="/order/history">
            <HistoryPage/>
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  )
}

function PrivateRoute({children, ...rest}: RouteProps) {
  let auth = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}
