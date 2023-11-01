import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Flex, Input, LoadingOverlay, Text } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { alert } from "../../utils";
import { useAuth } from "../../modules/auth/context";
import * as yup from "yup";
import { http } from "../../services";

const ChangePassword: React.FunctionComponent = () => {
  const { control, handleSubmit } = useForm<{ email: string; newPassword: string }>();
  const { userData } = useAuth();
  const emaill = userData?.email;
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const passwordSchema = yup.object().shape({
    newPassword: yup.string().label('Password').length(5).required()
  });

  const onSubmit = async (data: { email: string; newPassword: string }) => {
    setLoading(true);
    try {
      const values = { email: data.email, newPassword: data.newPassword };
      await passwordSchema.validate(values, { abortEarly: false });

      const response = await http.put("http://164.92.206.217:8082/user/auth/update-password", {
        email: emaill,
        newPassword: data.newPassword
      },
      );

      const responseData = response.data;

      if (responseData.status === "SUCCESS") {
        navigate('/userPanel')
        alert.success("Password updated successfully!");
        setLoading(false);
      }
      else {
        alert.error("Failed to update the password!");
        setLoading(false);
      }
    }
    catch (error: any) {
      if (error instanceof yup.ValidationError) {
        const errorMessage = error.inner.map((err) => err.message).join(' ');
        alert.error(errorMessage);
        setLoading(false);
      }
      else {
        alert.error("❌" + error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      {loading && <LoadingOverlay visible />}
      <Flex justify="center" align="center" mt={100}>
        <Box w={400} h={400}>
          <Text ta="center" color="white" fz={40}>
            Change Password
          </Text>
          <Box mt={70}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={userData?.email}
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder="Email"
                      value={userData?.email}
                      disabled
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="newPassword"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      type="password"
                      placeholder="New Password"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              </div>
              <Button type="submit" w="100%" h={50} fz={25} mt={40}>
                Update Password
              </Button>
              <Button onClick={() => navigate('/userPanel')} w="100%" h={50} fz={25} mt={40}>
                Back to Home
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </section>
  );
};

export default ChangePassword;