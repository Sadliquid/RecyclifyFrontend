import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from "./components/ui/provider"
import Layout from './Layout'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import StudentsHomepage from './pages/Students/StudentsHomepage'
import Homepage from './pages/main/Homepage'
import ClassEnrolment from './pages/Students/ClassEnrolment'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Layout />} >
                        <Route index element={<Homepage />} />
                        <Route path={"student"}>
                            <Route path={"home"} element={<StudentsHomepage />} />
                            <Route path={"enrol-class"} element={<ClassEnrolment />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)