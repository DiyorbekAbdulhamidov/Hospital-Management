import React from "react";
// import FormPages from "./pages/formPages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn/signIn";
import SignUp from "./pages/signUp/signUp";
import FormPages from "./pages/formPages";

interface AppProps {}

function App(props: AppProps) {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormPages />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
