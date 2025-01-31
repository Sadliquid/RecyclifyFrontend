/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, setLoading } from './slices/AuthState';
import { Toaster, toaster } from "@/components/ui/toaster"
import Navbar from './components/Navbar'
import ShowToast from './Extensions/ShowToast';
import { useNavigate, useLocation } from 'react-router-dom';

function App() {
    const navigate = useNavigate();
	const dispatch = useDispatch();
    const location = useLocation();
    const { loaded, user, error, authToken } = useSelector(state => state.auth)

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            dispatch(fetchUser());
        } else {
            dispatch(setLoading(true))
        }
    }, []);

    useEffect(() => {
        if (!error) {
            if (loaded) {
                if (!user && ((location.pathname !== "/auth/login") && (location.pathname !== "/auth/createAccount"))) {
                    navigate("/auth/login");
                    ShowToast("error", "Please log in first");
                } else {
                    if (localStorage.getItem('jwt')) {
                        if (user && authToken) {     
                            if (!error && loaded) {
                                if ((location.pathname.startsWith("/student") && user.userRole != "student") || (location.pathname.startsWith("/teachers") && user.userRole != "teacher") || (location.pathname.startsWith("/parents") && user.userRole != "parent") || (location.pathname.startsWith("/admin") && user.userRole != "admin")) {
                                    navigate("/");
                                    setTimeout(() => ShowToast("error", "Access unauthorized"));
                                }
                            }
                        }
                    }
                }
            }
        } else {
            ShowToast("error", "Error", "An error occured while fetching user state");
        }
    }, [user, error, loaded, authToken]);

    useEffect(() => {
        if (error) {
            console.log("Auth failed to load; error: " + error)
            toaster.create({
                title: "Something went wrong",
                description: "We failed to load information for you. Please try again.",
                type: "error",
            })
            ShowToast("error", "Something went wrong", "We failed to load information for you. Please try again.")
        }
    }, [error])

	return (
		<div className='defaultLayout'>
			<Navbar />
			<Outlet />
            <Toaster />
		</div>
	)
}

export default App
