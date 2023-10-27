import { Box, Button, Flex, PasswordInput, Text } from "@mantine/core";
import React, { useState } from "react";
import { alert } from "../../../utils";
import { useEmail } from "../../../modules/home/context";
import { useNavigate } from "react-router";
import * as yup from 'yup';
import axios from "axios";

const Password: React.FunctionComponent = () => {
  const { email } = useEmail();
  const [password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const navigate = useNavigate();
  const passwordSchema = yup.object().shape({
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  });

  const handleEmailCheck = async () => {
    try {
      const values = { password };
      await passwordSchema.validate(values, { abortEarly: false });

      const response = await axios.put("http://188.166.165.2:8082/user/auth/update-password", { email, newPassword: password },);

      const responseData = response.data;

      if (responseData.status === "SUCCESS") {
        navigate('auth/login');
        alert.success("Password updated successfully!");
      }
      else {
        alert.error("Failed to update the password!");
      }
    }
    catch (error: any) {
      if (error instanceof yup.ValidationError) {
        const errorMessage = error.inner.map((err) => err.message).join(' ');
        seterrorMessage(errorMessage);
      }
      else {
        alert.error("❌" + error.response.data.message);
      }
    }
  };

  return (
    <>
      <Flex justify="center" align={"center"} mt={100}>
        <Box w={400} h={400}>
          <Text ta={"center"} fz={30}>
            Enter New Password
          </Text>
          <Box mt={70}>
            <PasswordInput
              placeholder="Password"
              label="Enter new password"
              description="Password must include at least one letter, number, and special character"
              withAsterisk
              value={password}
              error={errorMessage}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Button onClick={handleEmailCheck} w={"100%"} h={50} fz={25} mt={40}>
              Change Password
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Password;