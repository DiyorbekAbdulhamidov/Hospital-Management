import { FunctionComponent, useEffect, useState } from "react";
import {
  Box,
  LoadingOverlay,
  Grid,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Col,
  Flex,
  Input,
  Select,
} from "@mantine/core";
import axios from "axios";
import { IEntity } from "../../modules/auth/types";
import hospitalImg from "../../assets/images/hospital-new.jpg";
import { useNavigate } from "react-router";

interface HospitalProps {}

const Hospital: FunctionComponent<HospitalProps> = () => {
  const [hospitals, setHospitals] = useState<IEntity.Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("all City"); // Set "all City" as the default value
  const [hospitalNameFilter, setHospitalNameFilter] = useState(""); // Initialize with an empty string for filtering

  const navigate = useNavigate();

  const savedToken = localStorage.getItem("access_token");
  const token = savedToken ? JSON.parse(savedToken) : null;

  useEffect(() => {
    async function getHospitals() {
      try {
        const response = await axios.get(
          "http://188.166.165.2:8083/hospital/get-all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setHospitals(response.data.data.hospitals);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error occurred: ", error);
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

  const cities = Array.from(
    new Set(hospitals.map((hospital) => hospital.city))
  );
  cities.push("all City");

  // Filter hospitals by selected city and hospital name
  const filteredHospitals = hospitals.filter((hospital) => {
    return (
      (selectedCity === "all City" || hospital.city === selectedCity) &&
      (hospitalNameFilter === "" ||
        hospital.name.toLowerCase().includes(hospitalNameFilter.toLowerCase()))
    );
  });

  return (
    <Box>
      <Flex mb={30} gap={100}>
        <Select
          w={300}
          placeholder="Pick City"
          data={cities}
          value={selectedCity}
          onChange={(value) => setSelectedCity(value as string)}
        />

        <Input
          w={300}
          placeholder="Enter Hospital Name"
          value={hospitalNameFilter}
          onChange={(event) => setHospitalNameFilter(event.target.value)}
        />
      </Flex>
      <Grid gutter="md">
        {filteredHospitals.length === 0 ? (
          <Text>No hospitals found.</Text>
        ) : (
          filteredHospitals.map((hospital: IEntity.Hospital) => (
            <Col span={4} key={hospital.id}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a">
                  <Image src={hospitalImg} alt="Hospital" />{" "}
                </Card.Section>

                <Group mt="md" mb="xs">
                  <Text fw={500}>{hospital.name}</Text>
                  <Badge color="pink" variant="light">
                    OPEN
                  </Badge>
                </Group>

                <Text size="sm" color="dimmed">
                  {hospital.city}
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => {
                    navigate(`/single-hospital/${hospital.id}`);
                  }}
                >
                  View Med Clinic
                </Button>
              </Card>
            </Col>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Hospital;
