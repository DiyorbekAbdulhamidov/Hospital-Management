import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import { Badge, Box, Card, Image, LoadingOverlay, Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { IEntity } from '../../modules/auth/types';
import { alert } from '../../utils';

interface DoctorProps {}

const Doctor: FunctionComponent<DoctorProps> = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [doctorData, setDoctorData] = useState<IEntity.Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  const savedToken = localStorage.getItem("access_token");
  const token = savedToken ? JSON.parse(savedToken) : null;

  useEffect(() => {
    async function getDoctorData() {
      try {
        const response = await axios.get(`http://134.209.20.129:8082/user/get-doctor-by-id`, {
          params: {
            doctorId: doctorId
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setDoctorData(response.data.data);
        }
      } catch (error: any) {
        alert.error('Error: ' + error.message);
        console.error('Xatolik yuz berdi: ', error);
      } finally {
        setLoading(false);
      }
    }

    getDoctorData();
  }, [doctorId, token]);

  return (
    <Box p={20}>
      {loading ? (
        <LoadingOverlay visible />
      ) : (
        <Card shadow="sm" padding="lg" radius="md" withBorder w={600}>
          <Card.Section>
            <Image
              // src={DoctorImg}  {/* Doktorning tasvirini o'zgartiring */}
              alt="Doctor's Image"
            />
          </Card.Section>

          <Text size="xl" weight={500}>
            {doctorData?.fullName}
          </Text>

          <Badge color="green" variant="light">
            Specialty: {doctorData?.specialty}
          </Badge>

          <Text size="sm" color="dimmed">
            Experience: 
          </Text>

          <Text size="sm" color="dimmed">
            Education: 
          </Text>
        </Card>
      )}
    </Box>
  );
};

export default Doctor;