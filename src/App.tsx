import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App (): React.ReactElement {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to='/'>home</Link></li>
        </ul>
        <Switch>
          <Route path="/">
            <h1>FlashVHtml</h1>
            <div>
              <a href="../FlashVHtml">FlashVHtml</a>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
