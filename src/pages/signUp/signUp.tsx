import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import {
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface SignUpProps {}

function SignUp(props: SignUpProps) {
  const [visible, { toggle }] = useDisclosure(false);

  useEffect(() => {
    axios
      .post("http://134.209.20.129:8082/user/auth/sign-up", {
        email: form.values.email,
        password: form.values.password,
      })
      .then((response) => {
        // Handle successful response here
        console.log("User signed up successfully:", response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error signing up:", error);
      });
  }, []);

  const form = useForm({
    initialValues: { password: "", email: "" },
    validate: {
      password: (value) =>
        value.length < 5 ? "Password must have at least 5 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.email) {
      notifications.show({
        message: "Invalid email",
        color: "red",
      });
    } else if (errors.password) {
      notifications.show({
        message: "Password must have at least 5 letters",
        color: "red",
      });
    }
  };

  const handleSubmit = () => {
    if (form.isValid()) {
      toggle();
      const userData = {
        email: form.values.email,
        password: form.values.password,
      };
      axios
        .post("http://134.209.20.129:8082/user/auth/sign-up", userData)
        .then((response) => {
          console.log("User signed up successfully:", response.data);
          toggle();
        })
        .catch((error) => {
          console.error("Error signing up:", error);
          toggle();
        });
    }
  };

  return (
    <>
      <Box>
        <Flex mt={100} justify="center" align="center">
          <Paper className="formBox" shadow="xl" pos="relative">
            <Box mt={30}>
              <LoadingOverlay visible={visible} overlayBlur={2} />

              <Text ta="center" c="#2972FE" fw={600} fz={40}>
                Doctor Q
              </Text>
              <Text mt={20} fw={600} fz={20} ta="center">
                Sign up for free!
              </Text>
            </Box>
            <Box maw={320} mx="auto">
              <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
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
                  type="submit"
                  mt="sm"
                >
                  Sign Up
                </Button>
              </form>
            </Box>
            <Text ta="center" pt={20}>
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
              Already have an account?{" "}
              <Text span c="blue" inherit>
                {" "}
                <Link to="/signIn">Sign In</Link>
              </Text>
            </Title>
          </Paper>
        </Flex>
      </Box>
    </>
  );
}

export default SignUp;
