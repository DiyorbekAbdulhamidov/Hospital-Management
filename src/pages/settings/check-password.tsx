import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Flex, PasswordInput, Text } from "@mantine/core";
import axios from "axios";
import { alert } from "../../utils";

interface CheckPasswordProps {}

const CheckPassword: React.FunctionComponent<CheckPasswordProps> = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const savedToken = localStorage.getItem("access_token");

  const handlePasswordCheck = () => {
    axios
      .post(
        "http://134.209.20.129:8082/user/check-password",
        {
          password: currentPassword,
        },
        {
          headers: {
            //@ts-ignore
            Authorization: `Bearer ${JSON.parse(savedToken)}`,
          },
        }
      )
      .then((response) => {
        const isValid = response.data;
        console.log(isValid);

        if (isValid) {
          alert.success("Password is valid!");
        } 
        else {
          alert.error("Password is invalid!");
        }
      })
      .catch((error) => {
        alert.error("An error occurred while checking the password.");
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
              description="Password must include at least one letter, number, and special character"
              withAsterisk
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.currentTarget.value)}
            />
            <Button onClick={handlePasswordCheck} w={"100%"} h={50} fz={30} mt={40}>
              Go
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default CheckPassword;