import { FunctionComponent, useEffect, useState } from "react";
import { Box, LoadingOverlay, Text, Flex, Input, Select } from "@mantine/core";
import http from "../../services/http";
import { IEntity } from "../../modules/auth/types";
import hospitalImg from "../../assets/images/hospital-new.jpg";
import { useNavigate } from "react-router";
import { alert } from "../../utils";

interface HospitalProps {}

const Hospital: FunctionComponent<HospitalProps> = () => {
  const [hospitals, setHospitals] = useState<IEntity.Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("all City");
  const [hospitalNameFilter, setHospitalNameFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getHospitals() {
      try {
        const response = await http.get(
          "http://164.92.206.217:8083/hospital/get-all"
        );
        if (response.status === 200) {
          setHospitals(response.data.data.hospitals);
        }
      } catch (error) {
        alert.error("Error occurred: " + error);
      } finally {
        setLoading(false);
      }
    }
    getHospitals();
  }, []);

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

  const filteredHospitals = hospitals.filter((hospital) => {
    return (
      (selectedCity === "all City" || hospital.city === selectedCity) &&
      (hospitalNameFilter === "" ||
        hospital.name.toLowerCase().includes(hospitalNameFilter.toLowerCase()))
    );
  });

  return (
    <Box>
      <Flex justify={"space-around"} mb={30} gap={100}>
        <Select
          w={400}
          placeholder="Pick City"
          data={cities}
          value={selectedCity}
          onChange={(value) => setSelectedCity(value as string)}
        />

        <Input
          w={400}
          placeholder="Enter Hospital Name"
          value={hospitalNameFilter}
          onChange={(event) => setHospitalNameFilter(event.target.value)}
        />
      </Flex>

      <div className="hospitalContainer">
        {filteredHospitals.length === 0 ? (
          <Text>No hospitals found ❌</Text>
        ) : (
          filteredHospitals.map((hospital: IEntity.Hospital) => (
            <Box key={hospital.id}>
              <div className="hospitalCard">
                <img src={hospitalImg} alt="" />
                <p className="hospitalName">{hospital.name}</p>
                <div className="hospitalInfo">
                  <button>OPEN</button>
                  <button>{hospital.city}</button>
                </div>
                <div className="viweHospitalBtn">
                  <button
                    onClick={() => navigate(`single-hospital/${hospital.id}`)}
                  >
                    View Med Clinic
                  </button>
                </div>
              </div>
            </Box>
          ))
        )}
      </div>
    </Box>
  );
};

export default Hospital;
