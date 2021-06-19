/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 11:56 (GMT+0900)
 */
import React from 'react'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import Welcome from './Welcome/Welcome'
import Home from './Home/Home'
import Confirm from './Confirm/Confirm'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact children={Welcome}/>
        <Route path="/home" children={Home}/>
        <Route path="/confirm" children={Confirm}/>
      </Switch>
    </Router>
  )
}
