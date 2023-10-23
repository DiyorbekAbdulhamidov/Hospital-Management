import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Flex, Input, Text } from "@mantine/core";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const ChangePassword: React.FunctionComponent = () => {
  const { control, handleSubmit } = useForm<{ email: string; newPassword: string }>();
  const savedToken: string = localStorage.getItem("access_token") || "";

  const onSubmit = async (data: { email: string; newPassword: string }) => {
    try {
      const response = await axios.put(
        "http://188.166.165.2:8082/user/auth/update-password",
        data,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(savedToken)}`,
          },
        }
      );

      const responseData = response.data;

      if (responseData.status === "SUCCESS") {
        toast.success("Password updated successfully!");
      } else {
        toast.error("Failed to update the password!");
      }
    } catch (error: any) {
      toast.error("An error occurred while updating the password.", error.message);
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
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="email"
                    placeholder="Email"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    required
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
                    required
                  />
                )}
              />
            </div>
            <Button type="submit" w="100%" h={50} fz={30} mt={40}>
              Update Password
            </Button>
            <Button type="submit" w="100%" h={50} fz={30} mt={40}>
              <Link to='/userPanel'> Back to Home</Link>
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default ChangePassword;