import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from "./components/ui/provider"
import Layout from './Layout'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'

// Page routes go here.
import TeachersLanding from './pages/Teachers/Landing'
import Class from './pages/Teachers/Class'


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />} >
						<Route path="/teachers">
							<Route index element={<TeachersLanding />} />
							<Route path="class/:id" element={<Class />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
)