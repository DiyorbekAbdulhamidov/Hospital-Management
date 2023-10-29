import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Flex, Input, Text } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { alert } from "../../utils";
import { useAuth } from "../../modules/auth/context";
import * as yup from "yup";
import { http } from "../../services";

const ChangePassword: React.FunctionComponent = () => {
  const { control, handleSubmit } = useForm<{ email: string; newPassword: string }>();
  const { userData } = useAuth();
  const emaill = userData?.email;

  const passwordSchema = yup.object().shape({
    newPassword: yup.string().label('Password').uppercase().lowercase().length(8).required()
  });

  const onSubmit = async (data: { email: string; newPassword: string }) => {
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
        alert.success("Password updated successfully!");
      }
      else {
        alert.error("Failed to update the password!");
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
  };

  return (
    <Flex justify="center" align="center" mt={100}>
      <Box w={400} h={400}>
        <Text ta="center" fz={30}>
          Update Password
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
            <Button type="submit" w="100%" h={50} fz={25} mt={40}>
              <Link to="/userPanel">Back to Home</Link>
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default ChangePassword;