import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from "./components/ui/provider"
import Layout from './Layout'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'

// Page routes go here.
import Login from './pages/Identity/Login'
import CreateAccount from './pages/Identity/CreateAccount'
import AccountRecovery from './pages/Identity/AccountRecovery'


ReactDOM.createRoot(document.getElementById('root')).render(
  	<React.StrictMode>
		<Provider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />} >
						<Route path="/auth">
							<Route path={"login"} element={<Login />} />
							<Route path={"createAccount"} element={<CreateAccount />} />
							<Route path={"accountRecovery"} element={<AccountRecovery />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
  	</React.StrictMode>
)