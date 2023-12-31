import React, { useState } from "react";
import { Button, Container, PinInput } from "@mantine/core";
import * as yup from 'yup';
import { alert } from "../../../utils";
import { useEmail } from "../../../modules/home/context";
import { useNavigate } from "react-router";
import axios from "axios";

interface ChangeEmailProps { }

const ChangeEmail: React.FC<ChangeEmailProps> = () => {
  const [pin, setPin] = useState("");
  const { email } = useEmail();
  const navigate = useNavigate();

  const pinSchema = yup.object().shape({
    pin: yup.string().length(6, 'Pin code must be 6 characters'),
  });

  const handleSendCode = async () => {
    try {
      const values = { pin };
      await pinSchema.validate(values, { abortEarly: false });

      const response = await axios.post("http://164.92.206.217:8082/user/verify-code-for-changing-email", { email, code: pin });

      const responseData = response.data;

      if (responseData.status === "SUCCESS") {
        alert.success("Pin code sent successfully!");
        navigate('/userPanel');
      }
      else {
        alert.error("Failed to send pin code.");
      }
    }
    catch (error: any) {
      if (error instanceof yup.ValidationError) {
        const errorMessage = error.inner.map((err) => err.message).join(' ');
        alert.error(errorMessage);
      } 
      else {
        alert.error("❌: " + error.response.data.message);
      }
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <Container>
        <PinInput required pl={280} mt={190} size="xl" length={6} placeholder="0" type="number" value={pin} onChange={(value) => setPin(value)} />
        <Button ml={360} w={180} h={50} mt={20} onClick={handleSendCode}>
          Send Code
        </Button>
      </Container>
    </section>
  );
};

export default ChangeEmail;