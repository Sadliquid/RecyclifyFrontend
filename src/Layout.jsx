import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, setLoading } from './slices/AuthState';
import { Toaster, toaster } from "@/components/ui/toaster"
import Navbar from './components/Navbar'

function App() {
	const dispatch = useDispatch();
    const { user, loaded, error } = useSelector(state => state.auth)

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            dispatch(fetchUser());
        } else {
            dispatch(setLoading(true))
        }
    }, []);

    useEffect(() => {
        if (error) {
            console.log("Auth failed to load; error: " + error)
            toaster.create({
                title: "Something went wrong",
                description: "We failed to load information for you. Please try again.",
                type: "error",
            })
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
