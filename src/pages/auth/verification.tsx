import {
  Box,
  Flex,
  // Group,
  LoadingOverlay,
  // PinInput,
  // Text,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";

interface VerificationProps {}

const Verification: React.FunctionComponent<VerificationProps> = () => {
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible((prevVisible) => !prevVisible);
  const { email } = useParams();

  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);
  const inputsRef = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (value && index < inputsRef.length - 1) {
      const nextInput = inputsRef[index + 1]?.current;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && !inputValues[index]) {
      const prevInput = inputsRef[index - 1]?.current;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleNumbers = () => {
    if (inputValues.length < 6) {
      alert("enter numbers");
    } else {
      toggle();
    }
  };

  return (
    <>
      <Flex justify="center" align="center" className="verification">
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <Box className="verificationBox">
          <p className="backLogin">
            <Link to="/login">{`<Back to Login`}</Link>
          </p>
          <Box>
            <p className="verificationText">
              Code has been sent to{" "}
              {email?.slice(0, 3) + "****" + email?.slice(-13)}
            </p>
          </Box>
          <Flex className="verificationInputs">
            {inputValues.map((value, index) => (
              <input
                key={index}
                ref={inputsRef[index]}
                maxLength={1}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyPress(e, index)}
              />
            ))}
          </Flex>
          <button onClick={() => handleNumbers()}>Send</button>
        </Box>
      </Flex>
    </>
  );
};

export default Verification;
