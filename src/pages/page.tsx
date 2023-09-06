import { Box } from "@mantine/core";
import React from "react";
import Form from "./form/form";

interface PageProps {}

function Page(props: PageProps) {
  const {} = props;

  return (
    <>
      <Box>
        <Form />
      </Box>
    </>
  );
}

export default Page;
