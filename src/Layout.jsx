/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, setLoading } from './slices/AuthState';
import { Toaster } from "@/components/ui/toaster"
import Navbar from './components/Navbar'
import ShowToast from './Extensions/ShowToast';
import { useNavigate, useLocation } from 'react-router-dom';

function App() {
    const navigate = useNavigate();
	const dispatch = useDispatch();
    const location = useLocation();
    const { loaded, user, error, authToken } = useSelector(state => state.auth)
    const [isLoggingOut, setIsLoggingOut] = useState(false);

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
                if (!user && !isLoggingOut && ((location.pathname !== "/auth/login") && (location.pathname !== "/auth/createAccount") && (location.pathname !== "/auth/accountRecovery") && (location.pathname !== "/student/claimReward") && (location.pathname !== "/"))) {
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
            localStorage.removeItem('jwt');
            navigate("/auth/login");
            ShowToast("error", "Please log in first");
        }
    }, [user, error, loaded, authToken]);

    const handleLogout = () => {
        navigate("/auth/login")
        setIsLoggingOut(true);
        ShowToast("success", "Logged out successfully");
    };


	return (
		<div className='defaultLayout'>
			<Navbar onLogout={handleLogout} />
			<Outlet />
            <Toaster />
		</div>
	)
}

export default App
