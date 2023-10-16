import { FunctionComponent, useEffect, useState } from "react";
import { Box, LoadingOverlay, Text } from "@mantine/core";
import axios from "axios";
import { useParams } from "react-router-dom";
import { alert } from "../../utils";

interface SingleHospitalProps {
  hospitalId: string;
}

const SingleHospital: FunctionComponent<SingleHospitalProps> = () => {
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const [hospitalData, setHospitalData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHospitalData() {
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
          setLoading(false);
        }
      } catch (error: any) {
        alert.error(error.message);
        console.error("Xatolik yuz berdi: ", error);
        setLoading(false);
      }
    }

    const token = localStorage.getItem("access_token");
    if (token) {
      fetchHospitalData();
    }
  }, [hospitalId]);

  if (loading) {
    return (
      <Box>
        <LoadingOverlay visible />
      </Box>
    );
  }

  return (
    <Box>
      {hospitalData ? (
        <div>
          <Text fw={600} fz={20}>
            Hospital Name: {hospitalData.name}
          </Text>
          <Text fw={500} fz={16}>
            City: {hospitalData.city}
          </Text>
        </div>
      ) : (
        <Text c="red">Hospital not found</Text>
      )}
    </Box>
  );
};

export default SingleHospital;
