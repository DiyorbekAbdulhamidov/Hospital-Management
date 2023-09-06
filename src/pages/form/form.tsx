import React from "react";
import { Box, Button, Flex, Paper, Text } from "@mantine/core";

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
                Wolcome to DoctorQ!
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
                Sign Up
              </Button>
              <Button radius="xl" w={300} h={45} fz={25} variant="outline">
                Sign In
              </Button>
            </Flex>
          </Paper>
        </Flex>
      </Box>
    </>
  );
}

export default Form;
