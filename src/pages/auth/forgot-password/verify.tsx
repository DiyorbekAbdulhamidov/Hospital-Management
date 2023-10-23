import React, { useState } from "react";
import { Button, Container, PinInput } from "@mantine/core";
import * as yup from 'yup';
import axios from "axios";
import { alert } from "../../../utils";

const PinCode = () => {
  const [pin, setPin] = useState("");

  const pinSchema = yup.object().shape({
    pin: yup.string().length(6, 'Pin code must be 6 characters'),
  });

  const handleSendCode = async () => {
    try {
      const values = { pin };
      await pinSchema.validate(values, { abortEarly: false });

      const response = await axios.post("http://188.166.165.2:8082/user/auth/verify-code-for-update-password", {
        pin: pin,
      });

      const responseData = response.data;

      if (responseData.status === "SUCCESS") {
        alert.success("Pin code sent successfully!");
      } else {
        alert.error("Failed to send pin code.");
      }
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        const errorMessage = error.inner.map((err) => err.message).join(' ');
        alert.error(errorMessage);
      } else {
        alert.error("An error occurred while sending the pin code: " + error.message);
      }
    }
  };

  return (
    <Container>
      <PinInput pl={280} mt={190} size="xl" length={6} placeholder="0" type="number" value={pin} onChange={(value) => setPin(value)} />
      <Button ml={360} w={180} h={50} mt={20} onClick={handleSendCode}>
        Send Code
      </Button>
    </Container>
  );
};

export default PinCode;