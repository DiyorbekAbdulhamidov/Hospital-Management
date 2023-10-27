import React, { useState } from "react";
import { Box, Button, Flex, Text, TextInput } from "@mantine/core";
import { alert } from "../../../utils";
import { useNavigate } from "react-router";
import { useEmail } from "../../../modules/home/context";
import { http } from "../../../services";

interface SendVerificationProps { }

const SendVerification: React.FunctionComponent<SendVerificationProps> = () => {
  const { email, setNewEmail } = useEmail();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendVerification = async () => {
    try {
      if (!isValidEmail(email)) {
        setEmailError("Invalid email");
        return;
      }
      setLoading(true);

      const response = await http.get("http://188.166.165.2:8082/user/send-verification-for-changing-email", { params: {email},});
      navigate('/userPanel/settings/change-email');
      console.log(response.data);
      alert.success('Code sent successfully. Check your email');
    }
    catch (error: any) {
      alert.error('❌:' + error.response.data.message);
    }
    finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
    setEmailError(null);
  };

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  return (
    <>
      <Flex justify="center" align="center" mt={100}>
        <Box w={400} h={400}>
          <Text ta="center" fz={30}>
            Send Verification
          </Text>
          <Box mt={70}>
            <TextInput
              placeholder="Email"
              label="Enter new email"
              value={email}
              onChange={handleChangeEmail}
              required
              error={emailError}
            />
            <Button
              onClick={handleSendVerification}
              w="100%"
              h={50}
              fz={30}
              mt={40}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Send'}
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SendVerification;