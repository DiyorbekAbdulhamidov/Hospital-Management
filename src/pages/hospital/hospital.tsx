import { FunctionComponent, useEffect, useState } from "react";
import { Box } from "@mantine/core";
import axios from "axios";
import { Link } from "react-router-dom";

interface HospitalProps { }

const Hospital: FunctionComponent<HospitalProps> = () => {
  const [hospitals, setHospitals] = useState<any[]>([]);

  useEffect(() => {
    async function getHospitals() {
      try {
        const response = await axios.get(
          "http://134.209.20.129:8083/hospital/get-all"
      );
        if (response.status === 200) {
          setHospitals(response.data);
        }
      }
      catch (error) {
        console.error("Xatolik yuz berdi: ", error);
      }
    }

    getHospitals();
  }, []);

  return (
    <Box>
      <h2>Hospitals</h2>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.id}>
            {/* Link komponentini foydalaning */}
            <Link to={`/link/${hospital.id}`}>{hospital.name}</Link>
            {/* Bu yerda har bir klinikani olish uchun tegishli linkni yaratishingiz mumkin */}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Hospital;