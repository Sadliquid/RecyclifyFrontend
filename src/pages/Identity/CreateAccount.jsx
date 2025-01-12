import React from 'react'
import { Box, VStack, Heading, Link, Text, HStack, Image
} from '@chakra-ui/react'
import { StepsItem, StepsList, StepsRoot,
} from "@/components/ui/steps"

function CreateAccount() {
  return (
            <Box
            bgPosition="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
                <Box
                    p={8}
                    borderRadius={15}
                >
                    <VStack 
                        spacing={4}
                    >
                        <Heading
                           fontSize='30px'
                           mb={10} 
                           textAlign="center"
                        >
                            Create Your Account
                        </Heading>
    
                        {/* Progress bar */}
                        <StepsRoot 
                            defaultValue={0} 
                            count={3} 
                            linear="true" 
                            size="lg" 
                            width={900}
                        >
                            <StepsList>
                                <StepsItem index={0} title="Step 1" description="Account Details" />
                                <StepsItem index={1} title="Step 2" description="Verify Email" />
                                <StepsItem index={2} title="Step 3" description="Verify Contact" />
                            </StepsList>
                        </StepsRoot>

                        <HStack gap={20} mt={10}>
                            <Box
                                w={350}
                                h={350}
                                borderColor={"grey"}
                                borderWidth={2}
                                borderRadius={30}
                                cursor={"pointer"}
                            >
                               <Image src="https://placehold.co/130x130" size="2xl" mt={30} ml={110} borderRadius={100} />
                               <Heading mt={5} mb={1}>Parent</Heading>
                               <Text w={"80%"} ml={35}>Receive the latest updates and keep track of your child's recycling progress in school.</Text>
                            </Box>

                            <Box
                                w={350}
                                h={350}
                                borderColor={"grey"}
                                borderWidth={2}
                                borderRadius={30}
                                cursor={"pointer"}
                            >
                                <Image src="https://placehold.co/130x130" size="2xl" mt={30} ml={110} borderRadius={100} />
                                <Heading mt={5} mb={1}>Student</Heading>
                                <Text w={"80%"} ml={35}>Recycle, complete tasks, earn points and redeem attractive rewards! Contribute to your class and climb the ranks of your school.</Text>
                            </Box>
                        </HStack>
    
                        {/* Login Link */}
                        <Text 
                            textAlign="center" 
                            fontSize="12px" 
                            mb={5}
                            mt={10}
                        >
                            Already have have an account?{' '}
                            <Link 
                                href="/login" 
                                color="teal.500"
                            >
                            Sign In
                            </Link>
                        </Text>
                    </VStack>
                </Box>
            </Box>
        )
    }
    

export default CreateAccount