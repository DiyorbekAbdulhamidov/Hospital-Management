import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@mantine/core";
import { useAuth } from "../../modules/auth/context";
import axios from 'axios';

interface MyProfileProps { }

const MyProfile: React.FunctionComponent<MyProfileProps> = () => {
  const { userData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    fullName: userData?.fullName || "",
    dateOfBirth: userData?.dateOfBirth || "",
    phoneNumber: userData?.phoneNumber || "",
    gender: userData?.gender || "",
  });

  // To'g'rilash funksiyalari
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const savedToken = localStorage.getItem("access_token");

    axios.put("http://134.209.20.129:8082/user/update-user", updatedData, {
      headers: {
        //@ts-ignore
        'Authorization': `Bearer ${JSON.parse(savedToken)}`,
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setIsEditing(false);
        }
        else {
          console.error("Serverdan qaytgan xatolik:", response.data.error);
        }
      })
      .catch((error) => {
        console.error("Tarmoq bilan bog'liq xatolik:", error);
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
              <input
                type="text"
                value={updatedData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
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
              <input
                type="text"
                value={updatedData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
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
            <Text c="blue" fz={20}>
              Date of Birth
            </Text>
            {isEditing ? (
              <input
                type="text"
                value={updatedData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
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
              <input
                type="text"
                value={updatedData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
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
            <Text c="blue" fz={20}>
              Email
            </Text>
            <Button w="30%" disabled>
              <Text c="black" fz={20}>
                {userData?.email}
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default MyProfile;