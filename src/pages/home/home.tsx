import React from "react";
import { Box, Button, Flex, Paper, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <Flex mt={100} justify="center" align="center">
          <Paper className="HomeBoxmain" shadow="xl">
            <Box mt={130}>
              <Text ta="center" c="#2972FE" fw={600} fz={40}>
                Doctor Q
              </Text>
              <Text mt={60} fw={600} fz={30} ta="center">
                Welcome to DoctorQ!
              </Text>
            </Box>
            <Flex justify="center" gap={10} mt={120} align="center" direction="column">
              <Button onClick={() => navigate('register')} radius="xl" w={300} h={45} fz={25}>
                Register
              </Button>
              <Button onClick={() => navigate('/login')} radius="xl" w={300} h={45} fz={25} variant="outline">
                Login
              </Button>
            </Flex>
          </Paper>
        </Flex>
      </Box>
    </>
  );
};

export default Home;