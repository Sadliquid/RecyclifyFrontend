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
import SubmittedTasks from './pages/Students/SubmittedTasks'
import StudentInbox from './pages/Students/StudentInbox'
import Redemption from './pages/Students/Redemption'
import MyClass from './pages/Students/MyClass'
import ImageRecognition from './pages/Students/ImageRecognition'
import Login from './pages/Identity/Login'
import CreateAccount from './pages/Identity/CreateAccount'
import AccountRecovery from './pages/Identity/AccountRecovery'
import Dashboard from './pages/admin/landing'
import UserManagement from './pages/admin/user'
import InventoryManagement from './pages/admin/inventory'
import ContactFormManagement from './pages/admin/contact'
import ContactForm from './pages/contact/contact'
import TeachersLanding from './pages/Teachers/Landing'
import Class from './pages/Teachers/Class'
import StudentRedemption from './pages/Teachers/StudentRedemption'
import TaskVerification from './pages/Teachers/TaskVerification'
import ClassLeaderboards from './pages/Teachers/ClassLeaderboards'

ReactDOM.createRoot(document.getElementById('root')).render(
  	<React.StrictMode>
    		<Provider>
      			<BrowserRouter>
        			<Routes>
          				<Route path={"/"} element={<Layout />} >
                            <Route index element={<Homepage />} />

                            <Route path={"student"}>
                                <Route path={"enrolClass"} element={<ClassEnrolment />} />
                                <Route path={"leaderboards"} element={<Leaderboards />} />
                                <Route path={"milestones"} element={<Milestones />} />
                                <Route path={"myClass"} element={<MyClass />} />
                                <Route path={"redemption"} element={<Redemption />} />
                                <Route path={"scanItem"} element={<ImageRecognition />} />
                                <Route path={"submittedTasks"} element={<SubmittedTasks />} />
                                <Route path={"inbox"} element={<StudentInbox />} />
                                <Route path={"home"} element={<StudentsHomepage />} />
                            </Route>

                            <Route path={"auth"}>
                                <Route path={"login"} element={<Login />} />
                                <Route path={"createAccount"} element={<CreateAccount />} />
                                <Route path={"accountRecovery"} element={<AccountRecovery />} />
                            </Route>

                            <Route path={"admin"} >
                                <Route path={"dashboard"} element={<Dashboard />} />
                                <Route path={"userManagement"} element={<UserManagement />} />
                                <Route path={"inventoryManagement"} element={<InventoryManagement />} />
                                <Route path={"contactManagement"} element={<ContactFormManagement />} />
                            </Route>

                            <Route path={"contact"} element={<ContactForm />} />

                            <Route path={"teachers"}>
                                <Route index element={<TeachersLanding />} />
                                <Route path={"class/:id"} element={<Class />} />
                                <Route path={"redemption"} element={<StudentRedemption />} />
                                {/* Add task id afterward */}
                                <Route path={"tasks"} element={<TaskVerification />} /> 
                                {/* Add class id afterward */}
                                <Route path={"leaderboards"} element={<ClassLeaderboards />} />
                            </Route>
                        </Route>
                    </Routes>
      			</BrowserRouter>
    		</Provider>
  	</React.StrictMode>
)