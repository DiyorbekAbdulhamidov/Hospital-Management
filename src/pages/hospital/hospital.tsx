import { FunctionComponent, useEffect, useState } from "react";
import { Box } from "@mantine/core";
import axios from "axios";
import { Link } from "react-router-dom";

interface HospitalProps { }

const Hospital: FunctionComponent<HospitalProps> = () => {
  const [hospitals, setHospitals] = useState<any[]>([]);
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
          setHospitals(response.data);
          console.log(response.data);
          
        }
      } catch (error) {
        console.error("Xatolik yuz berdi: ", error);
      }
    }

    if (token) {
      getHospitals();
    }
  }, [token]);

  if (hospitals.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <h2>Hospitals</h2>
      <ul>
      </ul>
    </Box>
  );
};

export default Hospital;
