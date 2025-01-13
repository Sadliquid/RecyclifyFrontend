import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from "./components/ui/provider"
import Layout from './Layout'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import Dashboard from './pages/admin/landing'
import UserManagement from './pages/admin/user'
import InventoryManagement from './pages/admin/inventory'

// Page routes go here.


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="/admin" element={<Dashboard />} ></Route>
            <Route path="/admin/user_management" element={<UserManagement />} > /</Route>
            <Route path="/admin/inventory_management" element={<InventoryManagement />} > /</Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)