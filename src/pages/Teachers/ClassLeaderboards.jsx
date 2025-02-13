import { Box, Flex, Heading, HStack, Image, Text, Button } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import server from "../../../networking";
import ShowToast from "../../Extensions/ShowToast";
import LeaderboardPlaceCard from "../../components/teachers/LeaderboardPlaceCard";

function Leaderboards() {
	const navigate = useNavigate();
	const { user, loaded, error } = useSelector((state) => state.auth);
	const [schoolClassesData, setSchoolClassesData] = useState([]);
	const [classes, setClasses] = useState([]);
	const [students, setStudents] = useState([]);
	const [topContributor, setTopContributor] = useState(null);
	const [topContributors, setTopContributors] = useState({});
	const [selectedClass, setSelectedClass] = useState(null); // Start as null


	const fetchSchoolClasses = async () => {
		try {
			const response = await server.get(`/api/Teacher/get-overall-classes-data/`);
			if (response.status === 200) {
				const sortedClasses = Array.isArray(response.data.data) ? sortSchoolClassesData(response.data.data) : [];
				setSchoolClassesData(sortedClasses);
				await fetchStudentsForClasses(sortedClasses);
			}
		} catch (error) {
			console.error("Error fetching classes:", error);
			if (error.response.status === 400) {
				ShowToast("error", "Error fetching classes", error.response.data.message.split("UERROR: "));
				setSchoolClassesData([]);
			} else {
				ShowToast("error", "Error fetching classes", "Please try again.");
				setSchoolClassesData([]);
			}
			setSchoolClassesData([]);
		}
	};

	// Fetch the students for each class
	const fetchStudentsForClasses = async (classes) => {
		// Create a mapping of classID to students
		const updatedClasses = await Promise.all(classes.map(async (cls) => {
			try {
				const response = await server.get(`/api/Teacher/get-students/?classId=${cls.classID}`);
				if (response.status === 200) {
					const studentsData = response.data.data || [];
					cls.students = studentsData; // Link the students with their class
					return cls;
				} else {
					cls.students = [];
					return cls;
				}
			} catch (error) {
				console.error("Error fetching students:", error);
				cls.students = [];
				return cls;
			}
		}));

		// Once all students are fetched, update the state
		setClasses(updatedClasses);

		// Set top contributors after students are fetched for all classes
		await fetchTopContributors(updatedClasses);
	};

	// Fetch students data from the backend
	const fetchStudents = async (classID) => {
		try {
			const response = await server.get(`/api/Teacher/get-students/?classId=${classID}`);
			if (response.status === 200) {
				setStudents(response.data.data);
				findTopContributor(response.data.data);
			}
		} catch (error) {
			console.error("Error fetching students:", error);
			if (error.response.status === 400) {
				ShowToast("error", "Error fetching students", error.response.data.message.split("UERROR: "));
				setStudents([]);
			} else {
				ShowToast("error", "Error fetching students", "Please try again.");
				setStudents([]);
			}
			setStudents([]);
		}
	};

	// Find the student with the highest total points
	const findTopContributor = (students) => {
		if (!students || students.length === 0) {
			setTopContributor(null);
			return;
		}
	
		const validStudents = students.filter(student => student && student.totalPoints !== undefined);
		if (validStudents.length === 0) {
			setTopContributor(null);
			return;
		}
	
		const topStudent = validStudents.reduce((max, student) => 
			student.totalPoints > max.totalPoints ? student : max
		);
	
		setTopContributor(topStudent);
	};

	const fetchTopContributors = async (classes) => {
		const contributorsMap = {};
	
		classes.forEach((cls) => {
	
			const students = cls.students || []; 
			if (students.length === 0) {
				console.warn(`No students found for class ${cls.classID}`);
			}
	
			const topStudent = students.reduce((max, student) =>
				student.totalPoints > max.totalPoints ? student : max,
				students[0] || null
			);
	
			contributorsMap[cls.classID] = topStudent || null;
		});
	
		setTopContributors(contributorsMap);
	};
	
	const handleClassSelection = (classID) => {
		const foundClass = classes.find((cls) => cls.classID === classID);
		setSelectedClass(foundClass);
		fetchStudents(classID);
		findTopContributor(students);
	};

	//Function to sort school classes data in descending order
	function sortSchoolClassesData(schoolClassesData) {
		if (!Array.isArray(schoolClassesData) || schoolClassesData.length === 0) {
			return [];
		}

		return [...schoolClassesData].sort((a, b) => b.classPoints - a.classPoints);
	}

	useEffect(() => {
		if (classes.length > 0) {
			setSelectedClass(classes[0]); // Automatically select the first class
			fetchStudents(classes[0].classID); // Fetch students for the first class
		}
	}, [classes]);

	useEffect(() => {
		if (user) {
			fetchSchoolClasses();
			fetchStudentsForClasses();
		}
	}, [user]);

	if (!error && loaded && user) {
		return (
			<Box>
				<Flex direction="row" align="center" justify="space-between" h="12vh">
					<Box bg="#96E2D6" borderRadius="full" p={2}>
						<IoArrowBack size={50} color="black" cursor="pointer" onClick={() => navigate(`/teachers`)} />
					</Box>
					<Box mt={4} fontSize="2xl" textAlign="center" flex="1" mr={20}>
						<Heading fontSize={40} fontWeight="bold" mb={4}>
							Class Leaderboards
						</Heading>
					</Box>
				</Flex>

				{/* Main Content */}
				<Box display="flex" justifyContent={"space-between"} width="100%" height={"67vh"} mt={10} boxSizing={"border-box"} gap={5}>
					{/* Leaderboard Panel */}
					<Flex direction="column" justifyContent={"space-between"} width="28%">
						<Box display="flex" flexDir={"column"} justifyContent={"space-between"} width="100%" height="100%" backgroundColor="#E5ECFF" borderRadius={20} padding={4}>
							{/* Class brief information card */}
							<Flex justifyContent={"center"} mb={3}>
								{classes.map((cls) => (
									<Button key={cls.classID} onClick={() => handleClassSelection(cls.classID)} mx={1}>
										{cls.className}
									</Button>
								))}
							</Flex>

							<Box
								display="flex"
								flexDir={"column"}
								justifyContent={"center"}
								alignItems={"center"}
								height="85%"
								padding={5}
							>
								<Heading fontSize={"30px"}>{selectedClass?.className || "Class Name"}</Heading>
								<Text fontSize={"md"} mt={2} textAlign={"center"}>
									{selectedClass?.classDescription || "Class description goes here."}
								</Text>
								<Heading fontSize={"24px"} mt={4} color="#2CD776">
									{selectedClass?.classPoints || 0} Clovers
								</Heading>
							</Box>

							{/* Top Contributor Panel */}
							<Box display="flex" flexDir={"column"} justifyContent={"center"} alignItems={"center"} width="100%">
								<Box
									display="flex"
									flexDir={"column"}
									justifyContent={"space-around"}
									alignItems={"center"}
									backgroundColor="#E5ECFF"
									borderRadius={20}
									height="85%"
									padding={5}
								>
									{topContributor ? (
										<>
											{topContributor && topContributor.user && (
												<Avatar name={topContributor.user.name} src={"https://bit.ly/dan-abramov"} size="sm" cursor="pointer" />
											)}
											<Heading fontSize={"24px"} mt={2}>{topContributor.user.name}</Heading>
											<Heading color="#2CD776">{topContributor.totalPoints} Leafs</Heading>
											<Box
												display="flex"
												justifyContent={"center"}
												alignItems={"center"}
												border="3px solid #4DCBA4"
												borderRadius={20}
												height="20%"
												mt={2}
												padding={3}
											>
												<Image
													src={
														topContributor.league === "Bronze" ? "/bronze-medal.png" :
															topContributor.league === "Silver" ? "/silver-medal.png" :
																"/gold-medal.png"
													}
													boxSize={8}
												/>
												<Text fontSize={"md"} ml={2}>{topContributor.league}</Text>
											</Box>
										</>
									) : (
										<Text>No top contributor available.</Text>
									)}
								</Box>
							</Box>
						</Box>
					</Flex>

					<Box
						display="flex"
						flexDir={"column"}
						alignItems={"center"}
						width="100%"
						backgroundColor="#E5ECFF"
						borderRadius={20}
						overflowY="auto"
						padding={4}
					>
						<HStack
							mt={2}
							display="flex"
							justifyContent={"space-between"}
							alignItems="center"
							width="98%"
							padding="10px"
							backgroundColor="#CBD8F7"
							borderRadius={12}
							fontWeight="bold"
						>
							<Box width="10%" textAlign="center">
								<Text fontSize="md">Rank</Text>
							</Box>

							<Box width="20%" textAlign="center">
								<Text fontSize="md">Class Name</Text>
							</Box>

							<Box width="50%" textAlign="center">
								<Text fontSize="md">Top Contributor</Text>
							</Box>

							<Box width="20%" textAlign="center">
								<Text fontSize="md">Class Clovers</Text>
							</Box>
						</HStack>

						{/* Sort classes by classPoints in descending order */}
						{schoolClassesData
							.sort((a, b) => b.classPoints - a.classPoints)
							.map((schoolClass, index) => (
								<LeaderboardPlaceCard key={schoolClass.classID} rank={index + 1} schoolClass={schoolClass} topContributor={topContributors[schoolClass.classID] || null} />
							))}
					</Box>
				</Box>
			</Box>
		);
	}
}

export default Leaderboards