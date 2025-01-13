import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from "./components/ui/provider"
import Layout from './Layout'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import Dashboard from './pages/admin/landing'
import UserManagement from './pages/admin/user'
import InventoryManagement from './pages/admin/inventory'
import ContactForm from './pages/contact/contact'

// Page routes go here.


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path ={"admin"} >
                <Route path ={"dashboard"} element={<Dashboard />} />
                <Route path ={"userManagament"} element={<UserManagement />} />
                <Route path ={"inventoryManagament"} element={<InventoryManagement />} />
            </Route>
            <Route path="/contact" element={<ContactForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)