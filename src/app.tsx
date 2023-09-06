import { Box } from "@mantine/core";
import React from "react";
import Page from "./pages/page";

interface AppProps {}

function App(props: AppProps) {
  return (
    <>
      <Box>
        <Page />
      </Box>
    </>
  );
}

export default App;
