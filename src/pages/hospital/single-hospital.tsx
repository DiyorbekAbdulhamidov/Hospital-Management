import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import { Badge, Box, Button, Card, Group, Image, LoadingOverlay, Text, Tabs, Flex, Grid } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import HospitalImg from '../../assets/images/2.jpg';
import DoctorImg from "../../assets/images/doctor_1196-269.avif";
import { alert } from '../../utils';
import { IEntity } from '../../modules/auth/types';

interface SingleHospitalProps {
  hospitalId: string;
}

const SingleHospital: FunctionComponent<SingleHospitalProps> = () => {
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const [hospitalData, setHospitalData] = useState<any | null>(null);
  const [doctorsData, setDoctorsData] = useState<IEntity.Doctor[]>([]);

  console.log(doctorsData);

  const [loading, setLoading] = useState(true);

  const savedToken = localStorage.getItem("access_token");
  const token = savedToken ? JSON.parse(savedToken) : null;

  useEffect(() => {
    async function getHospitalData() {
      try {
        const response = await axios.get(`http://134.209.20.129:8083/hospital/${hospitalId}/get-hospital`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setHospitalData(response.data.data);
          await getDoctorsData();
        }
      } catch (error) {
        console.error('Xatolik yuz berdi: ', error);
      }
      finally {
        setLoading(false);
      }
    }

    async function getDoctorsData() {
      try {
        const response = await axios.get('http://134.209.20.129:8082/user/get-all-doctors-from-hospital', {
          params: {
            page: 0,
            size: 10,
            hospitalId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setDoctorsData(response.data.data.doctors);

        }
      } catch (error: any) {
        alert.error('Error: ' + error.message)
        console.error('Xatolik yuz berdi: ', error);
      }
    }

    getHospitalData();
  }, [hospitalId, token]);

  return (
    <Box p={20}>
      {loading ? (
        <LoadingOverlay visible />
      ) : (
        <Tabs variant="pills" defaultValue="about-us">
          <Tabs.List sx={{ display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Tabs.Tab value="about-us">About Us</Tabs.Tab>
            <Tabs.Tab value="Doctors">Our Doctors</Tabs.Tab>
            <Tabs.Tab value="Services">Our Services</Tabs.Tab>
          </Tabs.List>
          <Button h={50} sx={{ left: 1200, bottom: 34 }} bg={'green'}>
            <Link to="/userPanel">Back to all Hospitals</Link>
          </Button>

          <Tabs.Panel value="about-us">
            <Flex p={40} gap={120}>
              <Card shadow="sm" padding="lg" radius="md" withBorder w={600} h={530}>
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

                <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                  {hospitalData.address}
                </Button>
              </Card>
              <Flex sx={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Box sx={{ background: '#E7EFC5', borderRadius: 10, padding: 10 }}>
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
                </Box>
              </Flex>
            </Flex>
          </Tabs.Panel>

          <Tabs.Panel value="Doctors">
            <Box>
              <h1 style={{ textAlign: 'center' }}>Our Doctors</h1>
              <Grid columns={2} align='center' justify='center' sx={{ gap: 60 }}>
                {doctorsData.map((doctor: IEntity.Doctor) => (
                  <Flex mt={20} gap={20}>
                    <Card key={doctor.id} shadow="sm" padding="lg" radius="md" withBorder w={500} h={620}>
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

                      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                        Learn more
                      </Button>
                    </Card>
                  </Flex>
                ))}
              </Grid>
            </Box>
          </Tabs.Panel>

          <Tabs.Panel value="Services">Services tab content</Tabs.Panel>
        </Tabs>
      )}
    </Box>
  );
};

export default SingleHospital;