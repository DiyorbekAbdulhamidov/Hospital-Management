import React, { useState } from "react";
import { Box, Button, Flex, Input, Select, Text } from "@mantine/core";
import { useAuth } from "../../modules/auth/context";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { alert } from "../../utils";
import { http } from "../../services";

const schema = yup.object({
  fullName: yup.string().min(2).required().label("Full Name"),
  dateOfBirth: yup
    .string()
    .matches(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/, {
      excludeEmptyString: true,
      message: "Date of Birth must be in dd.mm.yyyy format",
    })
    .required()
    .label("Date of Birth"),
  phoneNumber: yup.string().min(5).required().label("Phone Number"),
  gender: yup.string().label("Gender"),
});

interface MyProfileProps { }

const MyProfile: React.FunctionComponent<MyProfileProps> = () => {
  const { userData, setUserData } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    fullName: userData?.fullName || "",
    dateOfBirth: userData?.dateOfBirth || "",
    phoneNumber: userData?.phoneNumber || "",
    gender: userData?.gender || "",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    schema.validate(updatedData).then(() => {

      http.put("http://164.92.206.217:8082/user/update-user", updatedData,)
        .then((response) => {
          if (response.status === 200) {
            setIsEditing(false);
            //@ts-ignore
            setUserData(updatedData);
            alert.success("User info updated successfully!");
          }
          else {
            alert.error(response.data.error);
          }
        })
        .catch((error) => {
          alert.error("Error updating user info");
        });
    })
      .catch((error: any) => {
        alert.error("❌: " + error);
      });
  };

  const handleChange = (field: string, value: string) => {
    setUpdatedData({ ...updatedData, [field]: value });
  };

  return (
    <>
      <Box mt={50}>
        <Flex mb={40} justify="center" gap={160} align="center">
          <Text ta="center" fz={50} fw={600}>
            My Profile
          </Text>
          {isEditing ? (
            <Button onClick={handleSaveClick}>Save</Button>
          ) : (
            <Button onClick={handleEditClick}>Edit</Button>
          )}
        </Flex>

        <Flex justify="center" gap={30} direction="column">
          <Flex direction="column" justify="center" align="center">
            <Text c="blue" fz={20}>
              Full name
            </Text>
            {isEditing ? (
              <Input
                w={400}
                type="text"
                value={updatedData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            ) : (
              <Button w="30%" disabled>
                <Text c="black" fz={20}>
                  {userData?.fullName}
                </Text>
              </Button>
            )}
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Text c="blue" fz={20}>
              Phone Number
            </Text>
            {isEditing ? (
              <Input
                w={400}
                type="tel"
                value={updatedData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            ) : (
              <Button w="30%" disabled>
                <Text c="black" fz={20}>
                  {userData?.phoneNumber}
                </Text>
              </Button>
            )}
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Text c="blue" fz={20} aria-required>
              Date of Birth (dd.mm.yyyy)
            </Text>
            {isEditing ? (
              <Input
                w={400}
                type="text"
                placeholder="dd.mm.yyyy"
                value={updatedData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              />
            ) : (
              <Button w="30%" disabled>
                <Text c="black" fz={20}>
                  {userData?.dateOfBirth}
                </Text>
              </Button>
            )}
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Text fz={20} c="blue">
              Gender
            </Text>
            {isEditing ? (
              <Select
                data={["MALE", "FEMALE"]}
                w={400}
                value={updatedData.gender}
                //@ts-ignore
                onChange={(value) => handleChange("gender", value)}
              />
            ) : (
              <Button w="30%" disabled>
                <Text c="black" fz={20}>
                  {userData?.gender}
                </Text>
              </Button>
            )}
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Button onClick={() => navigate("/userPanel")} fz={20} mt={50} w={300} h={50}>
              Go to Home
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default MyProfile;