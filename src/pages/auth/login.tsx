import React, { useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";
import { Checkbox, Group, LoadingOverlay, PasswordInput, TextInput, Title, } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/auth/context";
import { alert } from "../../utils";

interface LoginProps { }

const Login: React.FunctionComponent<LoginProps> = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [, setVisible] = useState(false);
  const navigate = useNavigate();

  const toggle = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const form = useForm({
    initialValues: { password: "", email: "" },
    validate: {
      password: (value) =>
        value.length < 5 ? "Password must have at least 5 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSignIn = () => {
    if (form.isValid()) {
      setLoading(true);
      axios
        .post("http://188.166.165.2:8082/user/auth/sign-in", {
          email: form.values.email,
          password: form.values.password,
        })
        .then((response) => {
          login(response.data.data.accessToken);
          navigate("/userPanel");
          setLoading(false);
        })
        .catch((error: any) => {
          // console.error("Error signing in:", error);
          if (error.message === 'Request failed with status code 404') alert.error('Invalid email or password');
          else if (error.message !== 'Request failed with status code 404') alert.error('Error signing in: ' + error.message);
          setLoading(false);
        });

    }
    else {
      notifications.show({
        message: "Please fill out the form correctly.",
        color: "red",
      });
    }
  };

  return (
    <>
      <Box>
        <Flex mt={100} justify="center" align="center">
          <Paper className="formBox2" shadow="xl" pos="relative">
            <Box mt={30}>
              <LoadingOverlay visible={loading} overlayBlur={2} />
              <Text ta="center" c="#2972FE" fw={600} fz={40}>
                Doctor Q
              </Text>
              <Text mt={20} fw={600} fz={20} ta="center">
                Sign in to your account
              </Text>
            </Box>
            <Box maw={320} mx="auto">
              <form onSubmit={form.onSubmit(console.log)}>
                <TextInput
                  radius={70}
                  mt="sm"
                  size="md"
                  label="Email"
                  placeholder="Email"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  mt={20}
                  size="md"
                  radius={70}
                  label="Password"
                  placeholder="Password"
                  {...form.getInputProps("password")}
                />

                <Checkbox mt={15} label="Remember me" />

                <Button
                  fz={25}
                  size="md"
                  w="100%"
                  radius={70}
                  type="button"
                  mt="sm"
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              </form>
            </Box>
            <Text c="#2972FECC" fw={600} ta="center" fz={15} pt={10}>
              <Text className="forgorPassword">
                <Link to="/forgot-password">Forgot the password?</Link>
              </Text>
            </Text>
            <Text ta="center" pt={10}>
              or continue with
            </Text>
            <Flex mt={20} justify="space-around">
              <Button
                className="socialLink"
                bg="white"
                c="black"
                fz={20}
                w={150}
              >
                Facebook
              </Button>
              <Group position="center">
                <Button
                  className="socialLink"
                  bg="white"
                  c="black"
                  fz={20}
                  w={150}
                  onClick={toggle}
                >
                  Google
                </Button>
              </Group>
            </Flex>
            <Title fw={400} ta="center" mt={20} fz={20}>
              Don't have an account?
              <Text span c="blue" inherit>
                <Link to="/register">Sign Up</Link>
              </Text>
            </Title>
          </Paper>
        </Flex>
      </Box>
    </>
  );
};

export default Login;