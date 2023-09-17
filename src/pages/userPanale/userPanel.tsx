import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Menu,
  Select,
} from "@mantine/core";
import { FunctionComponent, useState } from "react";
import { IconExternalLink, IconLogout2 } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";

import { Header, Text } from "@mantine/core";
import { Link } from "react-router-dom";

import { useAuth } from "../../modules/auth/context";
import Hospital from "../hospital/hospital";

interface UserPanelProps {}

const UserPanel: FunctionComponent<UserPanelProps> = () => {
  const [showMenu, setShowMenu] = useState(false);
  // localStorage.getItem("showMenu") === "true" || false

  // useEffect(() => {
  //   localStorage.setItem("showMenu", showMenu.toString());
  // }, [showMenu]);

  const [opened, { toggle }] = useDisclosure(true);
  const label = opened ? "Close navigation" : "Open navigation";

  const HandleMeny = () => {
    setShowMenu(!showMenu);
    toggle();
  };

  const { userDetails, logout } = useAuth();

  return (
    <Box>
      <Box>
        <Header height={{ base: 50, md: 70 }} p="md">
          <Flex justify="space-around" align="center" h="100%">
            <Text>Application header</Text>
            <Menu width={200} shadow="md">
              <Menu.Target>
                <Button radius="20px" w={50} h={40}>
                  <Text fz={20}>S</Text>
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item component="a">
                  <Text fz={10} ta="center" c="gray">
                    {userDetails?.email}
                  </Text>
                </Menu.Item>

                <Menu.Item
                  icon={<IconExternalLink size={14} />}
                  component="a"
                  target="_blank"
                >
                  External link
                </Menu.Item>
                <Menu.Item
                  c="red"
                  icon={<IconLogout2 size={14} />}
                  component="a"
                  target="_blank"
                  onClick={logout}
                >
                  Log out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Header>
        <Box>
          <Flex>
            <Box
              display={`${showMenu ? "none" : "block"}`}
              h="90.6vh"
              w="20%"
              bg="blue"
            >
              <Box mt={20} ml={30}>
                <Text
                  className="activeMenu"
                  c={"#fff"}
                  fw={600}
                  lts={2}
                  fz={25}
                  pt={80}
                >
                  Hospitals
                </Text>
                <Text
                  className="cursoreP"
                  c={"#fff"}
                  fw={600}
                  lts={2}
                  fz={25}
                  pt={30}
                >
                  <Link to="/userPanel/settings">Profile Settingss</Link>
                </Text>
                <Text
                  className="cursoreP"
                  c={"#fff"}
                  fw={600}
                  lts={2}
                  fz={25}
                  pt={30}
                >
                  Booking
                </Text>
                <Text
                  className="cursoreP"
                  c={"#fff"}
                  fw={600}
                  lts={2}
                  fz={25}
                  pt={30}
                >
                  History
                </Text>
                <Text
                  className="cursoreP"
                  c={"#fff"}
                  fw={600}
                  lts={2}
                  fz={25}
                  pt={30}
                >
                  Specialization
                </Text>
              </Box>
            </Box>
            <Box w={`${!showMenu ? "80%" : "100%"}  `} h="auto">
              <Burger
                color="black"
                ml={`${showMenu ? `3%` : "-5%"}`}
                mt={20}
                opened={opened}
                onClick={() => {
                  HandleMeny();
                }}
                aria-label={label}
              />
              <Container size="xl">
                <Select
                  w={200}
                  pos={"relative"}
                  bottom={35}
                  placeholder="Pick one cirt"
                  data={[
                    { value: "Toshkent", label: "Toshkent" },
                    { value: "Namangan", label: "Namangan" },
                    { value: "Buxoro", label: "Buxoro" },
                    { value: "Samarqand", label: "Samarqand" },
                  ]}
                />
                <Hospital />
              </Container>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPanel;
