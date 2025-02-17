/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot, DrawerTrigger } from "@/components/ui/drawer"
import { Flex, Heading, Button, Image, Text, Box, VStack, DrawerActionTrigger } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsGift, BsMailbox, BsNewspaper, BsPeople, BsQuestionCircle } from "react-icons/bs";
import { MdOutlineLeaderboard } from "react-icons/md";
import { IoSparklesOutline } from "react-icons/io5";
import { FcStatistics } from "react-icons/fc";
import { FaTasks } from "react-icons/fa";
import { BiLeaf, BiLogIn } from "react-icons/bi";
import { LuNotebookPen } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import { CgUserList } from "react-icons/cg";
import { TbMessageShare } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import ProfilePictureIcon from "./identity/ProfilePictureIcon";

function Navbar({ onLogout }) {
    const navigate = useNavigate();

    const { user, loaded, error } = useSelector((state) => state.auth);
    const [sidebar, setSidebar] = useState(<LoginSidebar />);

    function conditionallyRenderSidebar() {
        if (localStorage.getItem('jwt')) {
            if (user.userRole === "student") {
                setSidebar(<StudentsSidebar />);
            } else if (user.userRole === "teacher") {
                setSidebar(<TeachersSidebar />);
            } else if (user.userRole === "admin") {
                setSidebar(<AdminSidebar />);
            } else if (user.userRole === "parent") {
                setSidebar(<ParentSidebar />);
            }
        } else {
            setSidebar(<LoginSidebar />);
        }
    }

    function handleNavbarTitleClick() {
        if (localStorage.getItem('jwt')) {
            if (!error && loaded && user) {
                if (user.userRole === "student") {
                    navigate("/student/home");
                } else if (user.userRole === "teacher") {
                    navigate("/teachers");
                } else if (user.userRole === "parent") {
                    navigate("/parents");
                } else if (user.userRole === "admin") {
                    navigate("/admin/dashboard");
                }
            } else {
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }

    useEffect(() => {
        if (!error) {
            if (loaded) {
                if (user) {
                    conditionallyRenderSidebar();
                } else {
                    setSidebar(<LoginSidebar />);
                }
            }
        } else {
            console.log("Error", "An error occured while fetching user state");
        }
    }, [loaded, error, user]);

    // Login Sidebar
    function LoginSidebar() {
        return (
            <DrawerRoot placement={"start"}>
                <DrawerBackdrop />
                <DrawerTrigger asChild>
                    <RxHamburgerMenu size="24px" color="white" cursor="pointer" />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <Image src="../RecyclifyTransparentLogoV1.png" alt="logo" mt={3} />
                    </DrawerHeader>
                    <DrawerBody textAlign="center">
                        <Text>Please Login or Sign up first.</Text>
                    </DrawerBody>
                    <DrawerFooter display={"flex"} flexDirection={"column"}>
                        <VStack width="100%">
                            <Box display="flex" flexDirection="column" width="100%">
                                <DrawerActionTrigger asChild>
                                    <Button
                                        color="#515F7C"
                                        mb={2}
                                        justifyContent={"left"}
                                        colorScheme="white"
                                        onClick={() => navigate("/auth/login")}
                                        _hover={{ bg: "#E4EBF8" }}
                                        borderRadius={"30px"}
                                        width="100%"
                                    >
                                        <BiLogIn ml={1} />
                                        <Text ml={2}>Login</Text>
                                    </Button>
                                </DrawerActionTrigger>

                                <DrawerActionTrigger asChild>
                                    <Button
                                        color="#515F7C"
                                        mb={2}
                                        justifyContent={"left"}
                                        colorScheme="white"
                                        onClick={() => navigate("/auth/createAccount")}
                                        _hover={{ bg: "#E4EBF8" }}
                                        borderRadius={"30px"}
                                        width="100%"
                                    >
                                        <LuNotebookPen ml={1} />
                                        <Text ml={2}>Sign Up</Text>
                                    </Button>
                                </DrawerActionTrigger>
                            </Box>
                            <Box textAlign="center">
                                <Text color={"#515F7C"}>©2025 Recyclify</Text>
                            </Box>
                        </VStack>
                    </DrawerFooter>
                    <DrawerCloseTrigger />
                </DrawerContent>
            </DrawerRoot>
        );
    }


    // Student Sidebar
    function StudentsSidebar() {
        return (
            <DrawerRoot placement={"start"}>
                <DrawerBackdrop />
                <DrawerTrigger asChild>
                    <RxHamburgerMenu size="24px" color="white" cursor="pointer" />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <Image src="../RecyclifyTransparentLogoV1.png" alt="logo" mt={3} />
                    </DrawerHeader>
                    <DrawerBody display={"flex"} flexDirection={"column"}>
                        <Box display="flex" flexDirection="column" height="100%">
                            <DrawerActionTrigger asChild>
                                <Button color={"#515F7C"} mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/student/home")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <FcStatistics ml={1} />
                                    <Text ml={2}>Dashboard</Text>
                                </Button>
                            </DrawerActionTrigger>

                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/student/leaderboards")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <Box>
                                        <MdOutlineLeaderboard fontSize={"20px"} />
                                    </Box>
                                    <Text ml={2}>Leaderboards</Text>
                                </Button>
                            </DrawerActionTrigger>

                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/student/redemption")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <BiLeaf ml={1} />
                                    <Text ml={2}>Redeem my leafs</Text>
                                </Button>
                            </DrawerActionTrigger>

                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/student/myRewards")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <Text as={BsGift} fontSize="20px" color="#515F7C" />
                                    <Text ml={2}>My Rewards</Text>
                                </Button>
                            </DrawerActionTrigger>

                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/student/scanItem")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <IoSparklesOutline ml={4} />
                                    <Text ml={2}>Recyclable Item Detector</Text>
                                </Button>
                            </DrawerActionTrigger>

                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/student/inbox")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <Text as={BsMailbox} fontSize="20px" color="#515F7C" />
                                    <Text ml={2}>Inbox</Text>
                                </Button>
                            </DrawerActionTrigger>

                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/student/myClass")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <Text as={BsPeople} fontSize="20px" color="#515F7C" />
                                    <Text ml={2}>My Class</Text>
                                </Button>
                            </DrawerActionTrigger>
                        </Box>

                        <Box textAlign="center" >
                            <Text color={"#515F7C"}>©2025 Recyclify</Text>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>

                    </DrawerFooter>
                    <DrawerCloseTrigger />
                </DrawerContent>
            </DrawerRoot>
        )
    }

    // Teacher Sidebar
    function TeachersSidebar() {
        return (
            <DrawerRoot placement={"start"}>
                <DrawerBackdrop />
                <DrawerTrigger asChild>
                    <RxHamburgerMenu size="24px" color="white" cursor="pointer" />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <Image src="../RecyclifyTransparentLogoV1.png" alt="logo" mt={3} />
                    </DrawerHeader>
                    <DrawerBody display={"flex"} flexDirection={"column"}>
                        <Box display="flex" flexDirection="column" height="100%">
                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/teachers/tasks")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <FaTasks ml={1} />
                                    <Text ml={3}>Task Verification</Text>
                                </Button>
                            </DrawerActionTrigger>

                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/teachers/classLeaderboards")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <Box ml={0.5}>
                                        <MdOutlineLeaderboard fontSize={"20px"} />
                                    </Box>
                                    <Text ml={2.5}>Class Leaderboards</Text>
                                </Button>
                            </DrawerActionTrigger>
                        </Box>

                        <Box textAlign="center" >
                            <Text color={"#515F7C"}>©2025 Recyclify</Text>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>

                    </DrawerFooter>
                    <DrawerCloseTrigger />
                </DrawerContent>
            </DrawerRoot>
        )
    }

    // Admin Sidebar
    function AdminSidebar() {
        return (
            <DrawerRoot placement={"start"}>
                <DrawerBackdrop />
                <DrawerTrigger asChild>
                    <RxHamburgerMenu size="24px" color="white" cursor="pointer" />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <Image src="../RecyclifyTransparentLogoV1.png" alt="logo" mt={3} />
                    </DrawerHeader>
                    <DrawerBody display={"flex"} flexDirection={"column"}>
                        <Box display="flex" flexDirection="column" height="100%">
                            <DrawerActionTrigger asChild>
                                <Button color={"#515F7C"} mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/admin/dashboard")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <MdOutlineLeaderboard fontSize={"20px"} />
                                    <Text ml={2}>Dashboard</Text>
                                </Button>
                            </DrawerActionTrigger>

                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/admin/userManagement")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <CgUserList />
                                    <Text ml={3}>User Managament</Text>
                                </Button>
                            </DrawerActionTrigger>

                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/admin/inventoryManagement")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <FaTasks ml={1} />
                                    <Text ml={2.5}>Manage Rewards</Text>
                                </Button>
                            </DrawerActionTrigger>
                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/admin/eventsManagement")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <LuClipboardList />
                                    <Text ml={2.5}>Manage Events</Text>
                                </Button>
                            </DrawerActionTrigger>
                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/admin/contactManagement")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <TbMessageShare />
                                    <Text ml={2.5}>View Contact Messages</Text>
                                </Button>
                            </DrawerActionTrigger>
                        </Box>

                        <Box textAlign="center" >
                            <Text color={"#515F7C"}>©2025 Recyclify</Text>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>

                    </DrawerFooter>
                    <DrawerCloseTrigger />
                </DrawerContent>
            </DrawerRoot>
        )
    }

    // Parent Sidebar
    function ParentSidebar() {
        return (
            <DrawerRoot placement={"start"}>
                <DrawerBackdrop />
                <DrawerTrigger asChild>
                    <RxHamburgerMenu size="24px" color="white" cursor="pointer" />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <Image src="../RecyclifyTransparentLogoV1.png" alt="logo" mt={3} />
                    </DrawerHeader>
                    <DrawerBody display={"flex"} flexDirection={"column"}>
                        <Box display="flex" flexDirection="column" height="100%">
                            <DrawerActionTrigger asChild>
                                <Button color={"#515F7C"} mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/parents")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <BsNewspaper fontSize={"20px"} />
                                    <Text ml={2}>Events Bulletin</Text>
                                </Button>
                            </DrawerActionTrigger>

                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/parents/emailNewsletter")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <BsMailbox />
                                    <Text ml={3}>Email Newsletter</Text>
                                </Button>
                            </DrawerActionTrigger>

                            <DrawerActionTrigger asChild>
                                <Button color="#515F7C" mb={2} justifyContent={"left"} colorScheme='white' onClick={() => navigate("/parents/faq")} _hover={{ bg: "#E4EBF8" }} borderRadius={"30px"}>
                                    <BsQuestionCircle ml={1} />
                                    <Text ml={2.5}>Frequently Asked Questions</Text>
                                </Button>
                            </DrawerActionTrigger>
                        </Box>

                        <Box textAlign="center" >
                            <Text color={"#515F7C"}>©2025 Recyclify</Text>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>

                    </DrawerFooter>
                    <DrawerCloseTrigger />
                </DrawerContent>
            </DrawerRoot>
        )
    }

    return (
        <>
            <Flex as="nav" bg="#4DCBA4" w="100%" p="8px 24px 8px 24px" rounded="10px" justify="space-between" align="center" alignItems="center">

                {sidebar}

                <Heading color="white" cursor="pointer" onClick={() => handleNavbarTitleClick()}>RECYCLIFY</Heading>
                <ProfilePictureIcon onLogout={onLogout}/>
            </Flex>
        </>
    );
}

export default Navbar;