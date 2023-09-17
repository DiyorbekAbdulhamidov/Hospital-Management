import { Box, PasswordInput, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

interface NewPasswordProps {}

const NewPassword: React.FunctionComponent<NewPasswordProps> = () => {
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <>
      <Box>
        <Stack maw={380} mx="auto">
          <PasswordInput
            label="Password"
            defaultValue="secret"
            visible={visible}
            onVisibilityChange={toggle}
          />
          <PasswordInput
            label="Confirm password"
            defaultValue="secret"
            visible={visible}
            onVisibilityChange={toggle}
          />
        </Stack>
      </Box>
    </>
  );
};

export default NewPassword;
