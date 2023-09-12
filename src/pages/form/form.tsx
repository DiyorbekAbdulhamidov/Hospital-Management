<<<<<<< HEAD
import React from "react";
import { Box, Button, Flex, Paper, Text } from "@mantine/core";
=======
// Form.tsx
import React from "react";
import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Link } from "react-router-dom";
>>>>>>> 2174547ceec4b7a61340f74c7a4aaebd79a2d14a

interface FormProps {}

function Form(props: FormProps) {
  return (
    <>
      <Box>
        <Flex mt={100} justify="center" align="center">
          <Paper className="formBox" shadow="xl">
            <Box mt={130}>
              <Text ta="center" c="#2972FE" fw={600} fz={40}>
                Doctor Q
              </Text>
              <Text mt={60} fw={600} fz={30} ta="center">
<<<<<<< HEAD
                Wolcome to DoctorQ!
=======
                Welcome to DoctorQ!
>>>>>>> 2174547ceec4b7a61340f74c7a4aaebd79a2d14a
              </Text>
            </Box>
            <Flex
              justify="center"
              gap={10}
              mt={120}
              align="center"
              direction="column"
            >
              <Button radius="xl" w={300} h={45} fz={25}>
<<<<<<< HEAD
                Sign Up
              </Button>
              <Button radius="xl" w={300} h={45} fz={25} variant="outline">
                Sign In
=======
                <Link to="/signUp">Sign Up</Link>
              </Button>
              <Button radius="xl" w={300} h={45} fz={25} variant="outline">
                <Link to="/signIn">Sign In</Link>
>>>>>>> 2174547ceec4b7a61340f74c7a4aaebd79a2d14a
              </Button>
            </Flex>
          </Paper>
        </Flex>
      </Box>
    </>
  );
}

export default Form;
