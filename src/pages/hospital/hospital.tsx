import { FunctionComponent, useEffect, useState } from "react";
import { Box, LoadingOverlay, Grid, Col, Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import axios from "axios";
import { IEntity } from "../../modules/auth/types";

interface HospitalProps { }

const Hospital: FunctionComponent<HospitalProps> = () => {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const savedToken = localStorage.getItem("access_token");
  const token = savedToken ? JSON.parse(savedToken) : null;

  useEffect(() => {
    async function getHospitals() {
      try {
        const response = await axios.get(
          "http://134.209.20.129:8083/hospital/get-all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setHospitals(response.data.data.hospitals);
          setLoading(false);
          console.log(response.data.data);
        }
      } catch (error) {
        console.error("Xatolik yuz berdi: ", error);
        setLoading(false);
      }
    }

    if (token) {
      getHospitals();
    }
  }, [token]);

  if (loading) {
    return (
      <Box>
        <LoadingOverlay visible />
      </Box>
    );
  }

  return (
    <Box>
      <Grid gutter="md">
        {hospitals.map((hospital: IEntity.Hospital) => (
          <Col span={4} key={hospital.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a" href={`https://mantine.dev/${hospital.id}`}>
                <Image
                  src={`https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80`}
                  height={160}
                  alt="Norway"
                />
              </Card.Section>
        
              <Group  mt="md" mb="xs">
                <Text fw={500}>{hospital.name}</Text>
                <Badge color="pink" variant="light">
                  OPEN
                </Badge>
              </Group>
        
              <Text size="sm" c="dimmed">
               {hospital.city}
              </Text>
        
              <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                View Med Clinic
              </Button>
            </Card>
          </Col>
        ))}
      </Grid>
    </Box>
  );
};

export default Hospital;
