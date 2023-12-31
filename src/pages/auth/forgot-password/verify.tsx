import React, { useState } from "react";
import { Button, Container, LoadingOverlay, PinInput } from "@mantine/core";
import * as yup from 'yup';
import { alert } from "../../../utils";
import { useEmail } from "../../../modules/home/context";
import { useNavigate } from "react-router";
import axios from "axios";

interface PinCodeProps { }

const PinCode: React.FC<PinCodeProps> = () => {

  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const { email } = useEmail();
  const navigate = useNavigate();

  const pinSchema = yup.object().shape({
    pin: yup.string().length(6, 'Pin code must be 6 characters'),
  });

  const handleSendCode = async () => {
    try {
      setLoading(true);
      const values = { pin };
      await pinSchema.validate(values, { abortEarly: false });

      const response = await axios.post("http://164.92.206.217:8082/user/auth/verify-code-for-update-password", {
        email,
        code: pin
      });

      const responseData = response.data;

      if (responseData.status === "SUCCESS") {
        alert.success("Enter new Password!");
        navigate('/auth/forgot-password/code');
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
        alert.error("❌" + error.response.data.message);
      }
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay visible />}
      <section className="background-radial-gradient overflow-hidden">
        <Container>
          <PinInput pl={280} mt={190} size="xl" length={6} placeholder="0" type="number" value={pin} onChange={(value) => setPin(value)} />
          <Button ml={360} w={180} h={50} mt={20} onClick={handleSendCode}>
            Send Code
          </Button>
        </Container>
      </section>
    </>
  );
};

export default PinCode;