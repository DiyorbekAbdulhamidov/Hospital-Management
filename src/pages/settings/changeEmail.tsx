import {
  Box,
  Button,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import axios from "axios";

interface ChangeEmailProps {}

const ChangeEmail: React.FunctionComponent<ChangeEmailProps> = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState<boolean | null>(null);
  const savedToken = localStorage.getItem("access_token");
  
  const handleEmailCheck = () => {
    axios
      .post("http://134.209.20.129:8082/user/check-password", {
        email: email,
      }, {
        headers: {
          //@ts-ignore
          Authorization: `Bearer ${JSON.parse(savedToken)}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const isValid = response.data;
        console.log(isValid);
        setEmailValid(isValid);
      })
      .catch((error) => {
        console.error("Error checking email:", error);
        setEmailValid(false);
      });
  };

  return (
    <>
      <Flex justify="center" align={"center"} mt={100}>
        <Box w={400} h={400}>
          <Text ta={"center"} fz={30}>
            Change Email
          </Text>
          <Box mt={70}>
            <PasswordInput
              placeholder="Password"
              label="Enter previous password"
              description="Password must include at least one letter, number and special character"
              withAsterisk
            />
            <TextInput
              placeholder="Email"
              label="Enter new email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              mt={20}
            />
            <Button
              onClick={handleEmailCheck}
              w={"100%"}
              h={50}
              fz={30}
              mt={40}
            >
              Go
            </Button>
            {isEmailValid === true && <p>Email is valid!</p>}
            {isEmailValid === false && <p>Email is invalid!</p>}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ChangeEmail;
