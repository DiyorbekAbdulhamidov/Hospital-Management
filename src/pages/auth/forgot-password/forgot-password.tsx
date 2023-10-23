import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Anchor, Box, Button, Center, Container, Group, Paper, Text, TextInput, Title, rem } from "@mantine/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from './forgot-password.module.scss';

const ForgotPassword: React.FunctionComponent = () => {
  const { control, handleSubmit } = useForm<{ email: string; newPassword: string }>();

  const onSubmit = async (data: { email: string; newPassword: string }) => {
    try {
      const response = await axios.put(
        "http://134.209.20.129:8082/user/auth/update-password", data
      );

      const responseData = response.data;

      if (responseData.status === "SUCCESS") {
        toast.success("Password updated successfully!");
      } else {
        toast.error("Failed to update the password!");
      }
    } catch (error: any) {
      toast.error("An error occurred while updating the password.", error.message);
    }
  };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="Your email" placeholder="me@mantine.dev" required />
        <Group mt="lg" className={classes.controls}>
          <Anchor c="dimmed" size="sm" className={classes.control}>
            <Center inline>
              <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              <Box ml={5}>
                <Link to="/login">Back to the login page</Link> {/* to propertisini ishlatamiz */}
              </Box>
            </Center>
          </Anchor>
          <Button className={classes.control}>Reset password</Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;