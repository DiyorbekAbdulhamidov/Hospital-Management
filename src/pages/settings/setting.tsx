import { Box, Button, Center, Flex, Text } from "@mantine/core";
import React from "react";

interface SettingsProps {}

const MainSettings: React.FunctionComponent<SettingsProps> = () => {
  return (
    <>
      <Flex justify="center" align="center">
        <Flex mt={150} direction="column" w={500} h={500} gap={20}>
          <Text ta="center" fz={30} fw={600}>
            Profile Settings
          </Text>
          <Button h={50} fz={20}>
            My Profile
          </Button>
          <Button h={50} fz={20}>
            Change Password
          </Button>
          <Button h={50} fz={20}>
            Change Email
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default MainSettings;
