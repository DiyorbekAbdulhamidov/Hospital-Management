import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Image,
  Menu,
} from "@mantine/core";
import { FunctionComponent, useState } from "react";
import { IconExternalLink, IconLogout2 } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";

import { Header, Text } from "@mantine/core";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

interface UserPanelProps {}

const UserPanel: FunctionComponent<UserPanelProps> = () => {
  const [showMenu, setShowMenu] = useState(false);
  // localStorage.getItem("showMenu") === "true" || false

  // useEffect(() => {
  //   localStorage.setItem("showMenu", showMenu.toString());
  // }, [showMenu]);

  const { email } = useParams();
  const [opened, { toggle }] = useDisclosure(true);
  const label = opened ? "Close navigation" : "Open navigation";

  const HandleMeny = () => {
    setShowMenu(!showMenu);
    toggle();
  };

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
                  <Text fz={15} ta="center" c="gray">
                    {email}
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
                >
                  <Link to="/login">Log out</Link>
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
                  Spetialization
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
                <Grid gutter="xl" justify="center">
                  <Grid.Col w="200px" h="auto" bg="green" span={4}>
                    <Card
                      shadow="sm"
                      padding="xl"
                      component="a"
                      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      target="_blank"
                    >
                      <Card.Section>
                        <Image
                          src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                          height={120}
                          alt="No way!"
                        />
                      </Card.Section>

                      <Text weight={500} size="lg" mt="md">
                        You&apos;ve won a million dollars in cash!
                      </Text>

                      <Text mt="xs" color="dimmed" size="sm">
                        Please click anywhere on this card to claim your reward,
                        this is not a fraud, trust us
                      </Text>
                    </Card>
                  </Grid.Col>
                </Grid>
              </Container>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPanel;
