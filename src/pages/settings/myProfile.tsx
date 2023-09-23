import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@mantine/core";
import { IEntity } from "../../modules/auth/types";

interface MyProfileProps {}

const MyProfile: React.FunctionComponent<MyProfileProps> = () => {
  const [data, setData] = useState<IEntity.User | null>(null);
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
                {data?.fullName}
              </Text>
            </Button>
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Text c="blue" fz={20}>
              Phone Number
            </Text>
            <Button w="30%" disabled>
              <Text c="black" fz={20}>
                {data?.phoneNumber}
              </Text>
            </Button>
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Text c="blue" fz={20}>
              Date of Birth
            </Text>
            <Button w="30%" disabled>
              <Text c="black" fz={20}>
                {data?.dateOfBirth}
              </Text>
            </Button>
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Text fz={20} c="blue">
              Gender
            </Text>
            <Button w="30%" disabled>
              <Text c="black" fz={20}>
                {data?.gender}
              </Text>
            </Button>
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Text c="blue" fz={20}>
              Email
            </Text>
            <Button w="30%" disabled>
              <Text c="black" fz={20}>
                {data?.email}
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default MyProfile;
