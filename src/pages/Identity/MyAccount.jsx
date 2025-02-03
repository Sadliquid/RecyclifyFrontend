/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Box, Heading, Input, Button, Image, Spinner, HStack, VStack, Textarea } from '@chakra-ui/react';
import { Avatar, AvatarGroup } from "@/components/ui/avatar"
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import ShowToast from '../../Extensions/ShowToast';
import server from "../../../networking";
import ProfileBanner from '../../components/identity/ProfileBanner';
import AccountDetails from '../../components/identity/AccountDetails';

function MyAccount() {
    const [userDetails, setUserDetails] = useState(null);
    const [editableDetails, setEditableDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);  // To handle delete confirmation state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();
    const { user, loaded, authToken } = useSelector((state) => state.auth);
    const [accountInfo,  setAccountInfo] = useState(null);
    const dispatch = useDispatch()
    const [renderReady, setRenderReady] = useState(false);

    const fetchAccountInfo = async () => {
        console.log("Fetching Account Info...")
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

    const handleChange = (e) => {
        setEditableDetails({
            ...editableDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                setError('Authorization token is missing.');
                return;
            }
    
            const detailsToUpdate = { ...editableDetails };
    
            await server.put(`/api/Identity/editDetails`, detailsToUpdate);
    
            setUserDetails(editableDetails); // Save the updated details
            setIsEditing(false); // Exit editing mode
        } catch (err) {
            setError('Failed to save changes.' + err);
        }
    };

    const handleCancel = () => {
        setEditableDetails(userDetails); // Revert to the original details
        setIsEditing(false); // Exit editing mode
    };

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                setError('Authorization token is missing.');
                return;
            }

            await server.delete(`/api/Identity/deleteAccount`);

            // After deletion, redirect user to the home page or login page
            localStorage.removeItem('jwt');  // Clear the token
            navigate("/")
        } catch (err) {
            setError('Failed to delete account: ' + err);
        }
    };

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

    if (renderReady) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box>
                    <Heading fontSize="30px" mt={10} mb={6}>My Account</Heading>
                    <ProfileBanner />
                    <AccountDetails userDetails={userDetails}/>
                </Box>
            </motion.div>
        );
    }
}

export default MyAccount;