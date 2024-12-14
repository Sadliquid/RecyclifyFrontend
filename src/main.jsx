import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from "./components/ui/provider"
import Layout from './Layout'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'

// Page routes go here.


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)