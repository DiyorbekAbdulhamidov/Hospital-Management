import React from "react";
import { Anchor, Box, Button, Center, Container, Group, Paper, Text, TextInput, Title, rem } from "@mantine/core";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { alert } from "../../../utils";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "./forgot-password.module.scss";
import { useEmail } from "../../../modules/home/context";

interface ForgotPasswordProps { }

const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = () => {
  const { email, setNewEmail } = useEmail();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.get("http://188.166.165.2:8082/user/auth/forgot-password", {
        params: { email: email },
      });

      const responseData = response.data;

      if (responseData.status === "SUCCESS") {
        alert.success("Reset link sent successfully!");
        navigate('/forgot-password/verify');
      }
      else {
        alert.error("Failed to send the reset link.");
      }
    } catch (error: any) {
      alert.error("An error occurred while sending the reset link: " + error.message);
    }
  };

  return (
    <Box mt={100}>
      <Container size={460} my={30}>
        <Title className={classes.title} ta="center">
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput
            label="Your email"
            required
            placeholder="youremail@gmail.com"
            onChange={(event) => setNewEmail(event.target.value)}
            value={email}
          />
          <Group mt="lg" className={classes.controls}>
            <Anchor c="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Box ml={5}>
                  <Link to="/login">Back to the login page</Link>
                </Box>
              </Center>
            </Anchor>
            <Button className={classes.control} onClick={handleSubmit}>
              Reset password
            </Button>
          </Group>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;