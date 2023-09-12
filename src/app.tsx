<<<<<<< HEAD
import { Box } from "@mantine/core";
import React from "react";
import Page from "./pages/page";
=======
import React from "react";
// import FormPages from "./pages/formPages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn/signIn";
import SignUp from "./pages/signUp/signUp";
import FormPages from "./pages/formPages";
>>>>>>> 2174547ceec4b7a61340f74c7a4aaebd79a2d14a

interface AppProps {}

function App(props: AppProps) {
  return (
    <>
<<<<<<< HEAD
      <Box>
        <Page />
      </Box>
=======
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormPages />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
>>>>>>> 2174547ceec4b7a61340f74c7a4aaebd79a2d14a
    </>
  );
}

export default App;
