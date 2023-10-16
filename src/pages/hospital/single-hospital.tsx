import { FunctionComponent, useEffect, useState } from "react";
import { Badge, Box, Button, Card, Group, Image, LoadingOverlay, Text } from "@mantine/core";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Tabs } from '@mantine/core';
import { alert } from "../../utils";
import HospitalImg from "../../assets/images/2.jpg";

interface SingleHospitalProps {
  hospitalId: string;
}

const SingleHospital: FunctionComponent<SingleHospitalProps> = () => {
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const [hospitalData, setHospitalData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const savedToken = localStorage.getItem("access_token");
  const token = savedToken ? JSON.parse(savedToken) : null;

  useEffect(() => {
    async function getHospitalData() {
      try {
        const response = await axios.get(
          `http://134.209.20.129:8083/hospital/${hospitalId}/get-hospital`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setHospitalData(response.data.data);
        }
      }
      catch (error: any) {
        alert.error(error.message);
        console.error("Xatolik yuz berdi: ", error);
      }
      finally {
        setLoading(false);
      }
    }

    getHospitalData();
  }, [hospitalId, token]);

  console.log(hospitalData);



  return (
    <Box p={20}>
      {loading ? (
        <LoadingOverlay visible />
      ) : (
        <Tabs variant="pills" defaultValue="about-us">
          <Tabs.List sx={{ display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'center' }} >
            <Tabs.Tab value="about-us" >
              About Us
            </Tabs.Tab>
            <Tabs.Tab value="Doctors">
              Doctors
            </Tabs.Tab>
            <Tabs.Tab value="Services">
              Services
            </Tabs.Tab>
          </Tabs.List>
          <Button h={50} sx={{ left: 1200, bottom: 34 }} bg={'green'}><Link to='/userPanel'>Back to all Hospitals</Link></Button>

          <Tabs.Panel value="about-us">
            <Box p={40} sx={{ display: 'flex', gap: 20 }}>
              {hospitalData ? (
                <Card shadow="sm" padding="lg" radius="md" withBorder w={600} h={600}>
                  <Card.Section component="a">
                    <Image
                      src={HospitalImg}
                      alt="HospitalImage"
                    />
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

              ) : (
                <Text c="red">Hospital not found</Text>
              )}
            </Box>
          </Tabs.Panel>

          <Tabs.Panel value="Doctors">
            Doctors tab content
          </Tabs.Panel>

          <Tabs.Panel value="Services">
            Services tab content
          </Tabs.Panel>
        </Tabs>
      )}
    </Box>
  );
};

export default SingleHospital;