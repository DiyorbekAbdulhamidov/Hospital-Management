import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  LoadingOverlay,
  Text,
  Tabs,
  Flex,
  Grid,
  AspectRatio,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import HospitalImg from "../../assets/images/2.jpg";
import DoctorImg from "../../assets/images/doctor_1196-269.avif";
import { alert } from "../../utils";
import { IEntity } from "../../modules/auth/types";
import http from "../../services/http";

interface SingleHospitalProps {
  hospitalId: string;
}

const SingleHospital: FunctionComponent<SingleHospitalProps> = () => {
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const [hospitalData, setHospitalData] = useState<any | null>(null);
  const [doctorsData, setDoctorsData] = useState<IEntity.Doctor[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getHospitalData() {
      try {
        const response = await http.get(
          `http://164.92.206.217:8083/hospital/${hospitalId}/get-hospital`
        );
        if (response.status === 200) {
          setHospitalData(response.data.data);
          await getDoctorsData();
        }
      } catch (error: any) {
        alert.error("Xatolik yuz berdi: " + error);
      } finally {
        setLoading(false);
      }
    }

    async function getDoctorsData() {
      try {
        const response = await http.get(
          "http://164.92.206.217:8082/user/get-all-doctors-from-hospital",
          {
            params: {
              page: 0,
              size: 10,
              hospitalId,
            },
          }
        );
        if (response.status === 200) {
          setDoctorsData(response.data.data.doctors);
          console.log(response.data);
        }
      } catch (error: any) {
        alert.error("Error: " + error.message);
        console.error("Xatolik yuz berdi: ", error);
      }
    }

    getHospitalData();
  }, [hospitalId]);

  return (
    <Box p={20}>
      {loading ? (
        <LoadingOverlay visible />
      ) : (
        <Tabs variant="pills" defaultValue="about-us">
          <Tabs.List
            sx={{
              display: "flex",
              gap: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tabs.Tab value="about-us">About Us</Tabs.Tab>
            <Tabs.Tab value="Doctors">Our Doctors</Tabs.Tab>
          </Tabs.List>
          <Button h={50} sx={{ left: 1200, bottom: 34 }}>
            <Link to="/userPanel">Back to all Hospitals</Link>
          </Button>

          <Tabs.Panel value="about-us">
            <Flex p={40} gap={120}>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                w={600}
                h={530}
              >
                <Card.Section component="a">
                  <Image src={HospitalImg} alt="HospitalImage" />
                </Card.Section>
                <Group mt="md" mb="xs">
                  <Text fw={500}>{hospitalData.name}</Text>
                  <Badge color="pink" variant="light">
                    {hospitalData.status}
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  Phone Number : {hospitalData.phoneNumber}
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() =>
                    (window.location.href = hospitalData?.location)
                  }
                >
                  {hospitalData.address}
                </Button>
              </Card>
              <Flex sx={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <Box
                  sx={{ background: "#E7EFC5", borderRadius: 10, padding: 10 }}
                >
                  <Flex gap={60}>
                    <Text color="#1D1A39">Day of the Week</Text>
                    <Text color="#1D1A39">Opening Time ⌚</Text>
                    <Text color="#1D1A39">Closing Time ❌</Text>
                  </Flex>
                  {hospitalData.workingHours.map((item: any) => (
                    <Flex gap={120} key={item.id} mt={5}>
                      <Text w={80}>{item.dayOfWeek}</Text>
                      <Text w={80}>{item.openingTime}</Text>
                      <Text>{item.closingTime}</Text>
                    </Flex>
                  ))}
                </Box>
                <Box>
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      src={hospitalData?.location}
                      title="Google map"
                      style={{ border: 0 }}
                    />
                  </AspectRatio>
                </Box>
              </Flex>
            </Flex>
          </Tabs.Panel>

          <Tabs.Panel value="Doctors">
            <Box>
              <h1 style={{ textAlign: "center" }}>Our Doctors</h1>
              <Grid
                columns={2}
                align="center"
                justify="center"
                sx={{ gap: 60 }}
              >
                {doctorsData.map((doctor: IEntity.Doctor) => (
                  <Flex mt={20} gap={20}>
                    <Card
                      key={doctor.id}
                      shadow="sm"
                      padding="lg"
                      radius="md"
                      withBorder
                      w={500}
                      h={620}
                    >
                      <Card.Section component="a">
                        <Image
                          src={DoctorImg}
                          height={500}
                          alt="Doctor's Image"
                        />
                      </Card.Section>

                      <Group mt="md" mb="xs">
                        <Text fw={500}>{doctor.fullName}</Text>
                        <Badge color="green" variant="light">
                          Specialty: {doctor.specialty}
                        </Badge>
                      </Group>

                      <Link to={`/userPanel/doctor/${doctor.id}`}>
                        <Button
                          variant="light"
                          color="blue"
                          fullWidth
                          mt="md"
                          radius="md"
                        >
                          Learn more
                        </Button>
                      </Link>
                    </Card>
                  </Flex>
                ))}
              </Grid>
            </Box>
          </Tabs.Panel>
        </Tabs>
      )}
    </Box>
  );
};

export default SingleHospital;
