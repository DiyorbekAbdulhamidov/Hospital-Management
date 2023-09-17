import { Box, Button, Flex, Text, TextInput } from "@mantine/core";
import React from "react";

interface NewEmailProps {}
const NewEmail: React.FunctionComponent<NewEmailProps> = () => {
  return (
    <>
      <Flex justify="center" align={"center"} mt={100}>
        <Box w={400} h={400}>
          <Text ta={"center"} fz={30}>
            Change Email
          </Text>
          <Box mt={70}>
            <TextInput
              mt="sm"
              size="md"
              placeholder="Email"
              label="Enter previos email"
            />
            <Button w={"100%"} h={50} fz={30} mt={40}>
              Save
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default NewEmail;
