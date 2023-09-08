import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Link } from "react-router-dom";
interface SignUpProps {}

function SignUp(props: SignUpProps) {
  const form = useForm({
    initialValues: { name: "", email: "" },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleError = (errors: typeof form.errors) => {
    if (errors.name) {
      notifications.show({ message: "Please fill name field", color: "red" });
    } else if (errors.email) {
      notifications.show({
        message: "Please provide a valid email",
        color: "red",
      });
    }
  };

  return (
    <>
      <Box>
        <Flex mt={100} justify="center" align="center">
          <Paper className="formBox" shadow="xl">
            <Box mt={30}>
              <Text ta="center" c="#2972FE" fw={600} fz={40}>
                Doctor Q
              </Text>
              <Text mt={60} fw={600} fz={20} ta="center">
                Sign up for free!
              </Text>
            </Box>
            <Box maw={320} mx="auto">
              <form onSubmit={form.onSubmit(console.log, handleError)}>
                <TextInput
                  radius={70}
                  mt="sm"
                  size="md"
                  label="Email"
                  placeholder="Email"
                  {...form.getInputProps("email")}
                />
                <TextInput
                  mt={20}
                  size="md"
                  radius={70}
                  label="Name"
                  placeholder="Name"
                  {...form.getInputProps("name")}
                />

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
              <Button
                className="socialLink"
                bg="white"
                c="black"
                fz={20}
                w={150}
              >
                Google
              </Button>
            </Flex>
            <Title fw={400} ta="center" mt={20} fz={20}>
              Already have an account?
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
