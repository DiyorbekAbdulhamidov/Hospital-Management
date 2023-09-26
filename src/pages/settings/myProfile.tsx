import React from "react";
import { Box, Button, Flex, Text } from "@mantine/core";
import { useAuth } from "../../modules/auth/context";

interface MyProfileProps { }

const MyProfile: React.FunctionComponent<MyProfileProps> = () => {
  const { user } = useAuth();


  return (
    <>
      <Box mt={50}>
        <Flex mb={40} justify="center" gap={160} align="center">
          <Text ta="center" fz={50} fw={600}>
            My Profile
          </Text>
          <Button>Edit</Button>
        </Flex>

        <Flex justify="center" gap={30} direction="column">
          <Flex direction="column" justify="center" align="center">
            <Text c="blue" fz={20}>
              Full name
            </Text>
            <Button w="30%" disabled>
              <Text c="black" fz={20}>
                {" "}
                {user?.fullName}
              </Text>
            </Button>
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Text c="blue" fz={20}>
              Phone Number
            </Text>
            <Button w="30%" disabled>
              <Text c="black" fz={20}>
                {" "}
                {user?.phoneNumber}
              </Text>
            </Button>
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Text c="blue" fz={20}>
              Date of Birth
            </Text>
            <Button w="30%" disabled>
              <Text c="black" fz={20}>
                {user?.dateOfBirth}
              </Text>
            </Button>
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Text fz={20} c="blue">
              Gender
            </Text>
            <Button w="30%" disabled>
              <Text c="black" fz={20}>
                {user?.gender}
              </Text>
            </Button>
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Text c="blue" fz={20}>
              Email
            </Text>
            <Button w="30%" disabled>
              <Text c="black" fz={20}>
                {user?.email}
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default MyProfile;