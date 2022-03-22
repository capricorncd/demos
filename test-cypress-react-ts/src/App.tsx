/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/22 20:05:50 (GMT+0900)
 */
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <p>Hello Vite + React!</p>
      <p>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
      </p>
    </div>
  )
}

export default App
