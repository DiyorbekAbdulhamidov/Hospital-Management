import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Menu,
  SegmentedControl,
  rem,
} from "@mantine/core";
import {
  IconBrandBooking,
  IconBuildingHospital,
  IconExternalLink,
  IconHistory,
  IconLogout2,
  IconSettings,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import { Text } from "@mantine/core";
import { useAuth } from "../../modules/auth/context";
import { IEntity } from "../../modules/auth/types";
import { useNavigate } from "react-router-dom";
import Hospital from "../hospital/hospital";
import { MainSettings } from "../settings";
import Spetialization from "../spetialization/spetialization";
import Booking from "../booking/booking";
import { http } from "../../services";

interface UserPanelProps { }

const UserPanel: FunctionComponent<UserPanelProps> = () => {
  const [showHospital, setHospital] = useState(true);
  const [showSettings, setSettings] = useState(false);
  const [showSpetialization, setSpetialization] = useState(false);
  const [showBooking, setshowBooking] = useState(false);
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(
    localStorage.getItem("showMenu") === "true" || false
  );

  useEffect(() => {
    localStorage.setItem("showMenu", showMenu.toString());
  }, [showMenu]);

  const [opened, { toggle }] = useDisclosure(true);
  const label = opened ? "Close navigation" : "Open navigation";

  const HandleMenu = () => {
    setShowMenu(!showMenu);
    toggle();
  };

  const { user, logout, setUserData } = useAuth();
  const [data, setData] = useState<IEntity.User | null>(null);

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await http.get(
          "http://164.92.206.217:8082/user/get-me"
        );
        if (response.status === 200) {
          setData(response.data.data);
          setUserData(response.data.data);
          // window.location.reload();
        } else {
          console.log("Error:", response.status);
          window.location.reload();
          // logout();
        }
      } catch (error) {
        console.error("Error occurred: ", error);
        window.location.reload();
        // logout();
      }
    }

    if (user) {
      getUserData();
      // window.location.reload();
    }
  }, [user]);

  return (
    <Box h={"100%"} bg={"hsl(218, 41%, 15%)"}>
      <div className="mainHeader">
        <Flex justify="space-around" align="center" h="100%">
          <Flex>
            <Text fz={30} fw={600} color="white">
              Doctor
            </Text>
            <Text fw={600} color="#2972fe" fz={30}>
              Q
            </Text>
          </Flex>
          <Menu width={200} shadow="md">
            <Menu.Target>
              <Button radius="50%" w={55} h={55}>
                <Text fz={20}>{data?.fullName[0]}</Text>
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component="a">
                <Text fz={15} ta="center" c="green">
                  {data?.fullName}
                </Text>
              </Menu.Item>

              <Menu.Item
                icon={<IconExternalLink size={14} />}
                component="a"
                target="_blank"
                onClick={() => navigate("/userPanel/settings/my-profile")}
              >
                My Profile
              </Menu.Item>
              <Menu.Item
                c="red"
                icon={<IconLogout2 size={14} />}
                component="a"
                target="_blank"
              >
                <Text onClick={logout}>Log out</Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </div>
      <Box>
        <Flex>
          <Box
            display={`${showMenu ? "none" : "block"}`}
            h="90.6vh"
            w="20%"
            className="left_menu"
          >
            <Box mt={20} ml={30} sx={{ border: "none" }}>
              <SegmentedControl
                sx={{ border: "none" }}
                bg="hsl(218, 41%, 15%)"
                mt={100}
                w={200}
                fullWidth
                orientation="vertical"
                data={[
                  {
                    value: "Hospitals",
                    label: (
                      <Flex
                        pb={20}
                        align="center"
                        pl={20}
                        pt={20}
                        onClick={() => {
                          setHospital(true);
                          setSettings(false);
                          setSpetialization(false);
                          setshowBooking(false);
                        }}
                      >
                        <IconBuildingHospital
                          style={{
                            width: rem(16),
                            height: rem(40),
                            color: showHospital ? "" : "white",
                          }}
                        />
                        <Box
                          style={{
                            color: showHospital ? "" : "white",
                          }}
                          fz={17}
                          ml={10}
                        >
                          Hospitals
                        </Box>
                      </Flex>
                    ),
                  },
                  {
                    value: "Booking",
                    label: (
                      <Flex
                        align="center"
                        pl={20}
                        pt={20}
                        pb={20}
                        onClick={() => {
                          setSettings(false);
                          setHospital(false);
                          setSpetialization(false);
                          setshowBooking(true);
                        }}
                      >
                        <IconBrandBooking
                          style={{
                            width: rem(16),
                            height: rem(40),
                            color: showBooking ? "" : "white",
                          }}
                        />
                        <Box
                          style={{
                            color: showBooking ? "" : "white",
                          }}
                          fz={17}
                          ml={10}
                        >
                          Booking
                        </Box>
                      </Flex>
                    ),
                  },
                  {
                    value: "Spetialization",
                    label: (
                      <Flex
                        onClick={() => {
                          setHospital(false);
                          setSettings(false);
                          setshowBooking(false);
                          setSpetialization(true);
                        }}
                        align="center"
                        pl={20}
                        pt={20}
                        pb={20}
                      >
                        <IconHistory
                          style={{
                            width: rem(16),
                            height: rem(40),
                            color: showSpetialization ? "" : "white",
                          }}
                        />
                        <Box
                          style={{
                            color: showSpetialization ? "" : "white",
                          }}
                          fz={17}
                          ml={10}
                        >
                          Spetialization
                        </Box>
                      </Flex>
                    ),
                  },
                  {
                    value: "Settings",
                    label: (
                      <Flex
                        pb={20}
                        align="center"
                        pl={20}
                        pt={20}
                        onClick={() => {
                          setSettings(true);
                          setHospital(false);
                          setSpetialization(false);
                          setshowBooking(false);
                        }}
                      >
                        <IconSettings
                          style={{
                            width: rem(16),
                            height: rem(40),
                            color: showSettings ? "" : "white",
                          }}
                        />
                        <Box
                          style={{
                            color: showSettings ? "" : "white",
                          }}
                          fz={17}
                          ml={10}
                        >
                          Profile Settings
                        </Box>
                      </Flex>
                    ),
                  },
                ]}
              />
            </Box>
          </Box>

          <Box
            bg={"hsl(218, 41%, 10%)"}
            w={`${!showMenu ? "80%" : "100%"}`}
            h="auto"
          >
            <Burger
              color="red"
              ml={`${showMenu ? `3%` : "-5%"}`}
              mt={20}
              opened={opened}
              onClick={() => {
                HandleMenu();
              }}
              aria-label={label}
            />
            <Container size="xl">
              {showHospital ? <Hospital /> : ""}
              {showSettings ? <MainSettings /> : ""}
              {showSpetialization ? <Spetialization /> : ""}
              {showBooking ? <Booking /> : ""}
            </Container>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default UserPanel;
