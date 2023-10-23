import { Button, Container, PinInput } from "@mantine/core";
import { FunctionComponent, useState } from "react";
import axios from "axios";
import { alert } from "../../../utils";

interface PinCodeProps {
}

const PinCode: FunctionComponent<PinCodeProps> = () => {
  const [pin, setPin] = useState("");

  const handleSendCode = async () => {
    try {
      const response = await axios.post("http://188.166.165.2:8082/user/auth/verify-code-for-update-password", {
        pin: '964453',
      });

      const responseData = response.data;

      if (responseData.status === "SUCCESS") {
        alert.success("Pin code sent successfully!");
      }
      else {
        alert.error("Failed to send pin code.");
      }
    }
    catch (error: any) {
      alert.error("An error occurred while sending the pin code: " + error.message);
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