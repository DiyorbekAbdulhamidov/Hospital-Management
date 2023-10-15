import { Box, Button, Flex, PasswordInput, Text } from "@mantine/core";
import React, { useState } from "react";
import axios from "axios";

interface ChangePasswordProps {}

const ChangePassword: React.FunctionComponent<ChangePasswordProps> = () => {
  const [isPasswordValid, setPasswordValid] = useState<boolean | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");

  const handlePasswordCheck = () => {
    axios
      .post("http://134.209.20.129:8082/user/check-password", {
        password: currentPassword,
      })
      .then((response) => {
        const isValid = response.data;
        console.log(isValid);
        setPasswordValid(isValid);
      })
      .catch((error) => {
        console.error("Error checking password:", error);
        setPasswordValid(false);
      });
  };

  return (
    <>
      <Flex justify="center" align={"center"} mt={100}>
        <Box w={400} h={400}>
          <Text ta={"center"} fz={30}>
            Change Password
          </Text>
          <Box mt={70}>
            <PasswordInput
              placeholder="Current Password"
              label="Enter current password"
              description="Password must include at least one letter, number and special character"
              withAsterisk
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.currentTarget.value)}
              />
            <Button
              onClick={handlePasswordCheck}
              w={"100%"}
              h={50}
              fz={30}
              mt={40}
            >
              Go
            </Button>
            {isPasswordValid === true && <p>Password is valid!</p>}
            {isPasswordValid === false && <p>Password is invalid!</p>}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ChangePassword;