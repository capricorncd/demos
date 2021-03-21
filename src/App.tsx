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
          <li><a href="../FlashVHtml" target="_blank">FlashVHtml</a></li>
          <li><a href="../bilibili" target="_blank">bilibili</a></li>
        </ul>
        {/* <Switch> */}
        {/*  <Route path="/"> */}
        {/*    <h1>Demos</h1> */}
        {/*    <div> */}
        {/*      <a href="../FlashVHtml">FlashVHtml</a> */}
        {/*    </div> */}
        {/*    <div> */}
        {/*      <a href="../bilibili">bilibili header</a> */}
        {/*    </div> */}
        {/*  </Route> */}
        {/* </Switch> */}
      </div>
    </Router>
  )
}

export default App
