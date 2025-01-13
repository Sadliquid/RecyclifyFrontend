import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from "./components/ui/provider"
import Layout from './Layout'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import StudentsHomepage from './pages/Students/StudentsHomepage'
import Homepage from './pages/main/Homepage'
import ClassEnrolment from './pages/Students/ClassEnrolment'
import Leaderboards from './pages/Students/Leaderboards'
import Milestones from './pages/Students/Milestones'
import StudentInbox from './pages/Students/StudentInbox'
import Redemption from './pages/Students/Redemption'
import MyClass from './pages/Students/MyClass'
import ImageRecognition from './pages/Students/ImageRecognition'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Layout />} >
                        <Route index element={<Homepage />} />
                        <Route path={"student"}>
                            <Route path={"enrol-class"} element={<ClassEnrolment />} />
                            <Route path={"leaderboards"} element={<Leaderboards />} />
                            <Route path={"milestones"} element={<Milestones />} />
                            <Route path={"my-class"} element={<MyClass />} />
                            <Route path={"redemption"} element={<Redemption />} />
                            <Route path={"scan-item"} element={<ImageRecognition />} />
                            <Route path={"inbox"} element={<StudentInbox />} />
                            <Route path={"home"} element={<StudentsHomepage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)