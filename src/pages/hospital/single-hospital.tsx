import { FunctionComponent, useEffect, useState } from "react";
import { Box, Button, LoadingOverlay, Text } from "@mantine/core";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tabs } from '@mantine/core';
import { alert } from "../../utils";

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

    fetchHospitalData();
  }, [hospitalId, token]);


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
            <Button><Link to='/userPanel'>Back to all Hospitals</Link></Button>
          </Tabs.List>

          <Tabs.Panel value="about-us">
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