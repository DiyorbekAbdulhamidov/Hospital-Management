import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
  rem,
  LoadingOverlay,
} from "@mantine/core";
import { alert } from "../../../utils";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "./forgot-password.module.scss";
import { useEmail } from "../../../modules/home/context";
import * as yup from "yup";
import axios from "axios";

interface ForgotPasswordProps {}

const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = () => {
  const { email, setNewEmail } = useEmail();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const values = { email };
      await validationSchema.validate(values, { abortEarly: false });

      const response = await axios.get("http://164.92.206.217:8082/user/auth/forgot-password", { params: { email } });
      const responseData = response.data;

      if (responseData.status === "SUCCESS") {
        alert.success("Reset link sent successfully!");
        navigate("/auth/forgot-password/verify");
      } 
      else {
        alert.error("Failed to send the reset link.");
      }
    } 
    catch (error: any) {
      if (error instanceof yup.ValidationError) {
        const errorMessage = error.inner.map((err) => err.message).join(" ");
        setErrorMessage(errorMessage);
      } 
      else {
        const errorMessage = error.response.data.message || "An error occurred.";
        alert.error("❌" + errorMessage);
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
        <Box mt={100}>
          <Container size={460} my={30}>
            <Title className="  fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }} ta="center">
              Forgot your password?
            </Title>
            <Text c="dimmed" fz="sm" ta="center">
              Enter your email to get a reset link
            </Text>

            <Paper className="card bg-glass" withBorder shadow="md" p={30} radius="md" mt="xl">
              <TextInput
                label="Your email"
                required
                placeholder="youremail@gmail.com"
                onChange={(event) => setNewEmail(event.target.value)}
                value={email}
                error={errorMessage}
              />

              <Group mt="lg" className={classes.controls}>
                <Anchor c="dimmed" size="sm" className={classes.control}>
                  <Center inline>
                    <IconArrowLeft style={{ width: rem(14), height: rem(17), color: "blue" }} stroke={1.5} />
                    <Box ml={5}>
                      <Link color="black" to="/auth/login">
                        Back to the login page
                      </Link>
                    </Box>
                  </Center>
                </Anchor>
                <Button className={classes.control} onClick={handleResetPassword}>
                  Reset password
                </Button>
              </Group>
            </Paper>
          </Container>
        </Box>
      </section>
    </>
  );
};

export default ForgotPassword;