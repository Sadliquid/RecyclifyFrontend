/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import { motion } from "framer-motion";
import ShowToast from '../../Extensions/ShowToast';
import { logout } from '../../slices/AuthState';
import server from "../../../networking";
import ProfileBanner from '../../components/identity/ProfileBanner';
import AccountDetails from '../../components/identity/AccountDetails';
import AccountActionButtons from '../../components/identity/AccountActionButtons';

function MyAccount() {
    const [userDetails, setUserDetails] = useState(null);
    const [editableDetails, setEditableDetails] = useState(null);
    const [error, setError] = useState(null);
    const { user, loaded } = useSelector((state) => state.auth);
    const [accountInfo,  setAccountInfo] = useState(null);
    const dispatch = useDispatch()
    const [renderReady, setRenderReady] = useState(false);

    const fetchAccountInfo = async () => {
        try {
            const token = localStorage.getItem('jwt'); 

            if (!token) {
                setError('Authorization token is missing.');
                return;
            }
            const response = await server.get(`/api/Identity/getUserDetails`);
            setEditableDetails(response.data);
            setUserDetails(response.data);
            setAccountInfo(response.data);
        } catch (err) {
            console.log("Error fetching account info:", err);
            if (err && err.response && err.response.status && err.response.status == 404) {
                dispatch(logout()); 
                localStorage.removeItem('jwt');
            };
        }
    };

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            fetchAccountInfo();
        }
    }, [loaded])

    useEffect(() => {
        if (loaded && accountInfo && editableDetails, userDetails) {
            setRenderReady(true);
        }
    }, [loaded, user, accountInfo, editableDetails, userDetails]);

    if (!loaded) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="80vh">
                <Spinner />
            </Box>
        )
    }

    if (error) {
        console.log("ERROR: " + error)
        ShowToast("error", "Error", error);
        setError(null);
    }

    if (renderReady) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box>
                    <Heading fontSize="30px" mt={10} mb={6}>My Account</Heading>
                    <ProfileBanner userDetails={userDetails}/>
                    <AccountDetails userDetails={userDetails} setUserDetails={setUserDetails}/>
                    <AccountActionButtons userDetails={userDetails}/>
                </Box>
            </motion.div>
        );
    }
}

export default MyAccount;