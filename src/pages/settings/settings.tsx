import { Button, Flex, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

interface SettingsProps {}

const MainSettings: React.FunctionComponent<SettingsProps> = () => {
  return (
    <>
      <Flex justify="center" align="center">
        <Flex mt={100} direction="column" w={500} h={500} gap={20}>
          <Text ta="center" fz={30} fw={600}>
            Profile Settings
          </Text>
          <Link to="/userPanel/settings/myProfile">
            <Button w="100%" h={50} fz={20}>
              My Profile
            </Button>
          </Link>
          <Link to="/userPanel/settings/changePassword">
            <Button w="100%" h={50} fz={20}>
              Change Password
            </Button>
          </Link>
          <Link to="/userPanel/settings/changeEmail">
            <Button w="100%" h={50} fz={20}>
              Change Email
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default MainSettings;
