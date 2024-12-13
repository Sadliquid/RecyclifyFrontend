import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from "./components/ui/provider"
import ReactDOM from 'react-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Demo from './pages/Demo.jsx'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Demo />} />
        </Routes>
      </BrowserRouter>
    </Provider>
)

export default App
