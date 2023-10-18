import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import { Badge, Box, Button, Card, Flex, Image, LoadingOverlay, Text } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { IEntity } from '../../modules/auth/types';
import { alert } from '../../utils';
import doctorImg from "../../assets/images/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg";

interface DoctorProps { }

const Doctor: FunctionComponent<DoctorProps> = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [doctorData, setDoctorData] = useState<IEntity.SingleDoctor | null>(null);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

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
      }
      finally {
        setLoading(false);
      }
    }
    getDoctorData();
  }, [doctorId, token]);

  return (
    <Box p={20} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30 }}>
      {loading ? (
        <LoadingOverlay visible />
      ) : (
        <Card shadow="sm" padding="lg" radius="md" withBorder w={600}>
          <Card.Section>
            <Image
              src={doctorImg}
              alt="Doctor's Image"
            />
          </Card.Section>
          <Flex align={'center'} justify={'space-between'} mt={20}>
            <Text size="xl" weight={500}>
              {doctorData?.fullName}
            </Text>

            <Badge color="green" variant="light">
              Specialty: {doctorData?.specialty}
            </Badge>
          </Flex>

          <Text size="sm" color="dimmed">
            {doctorData?.info}
          </Text>

          <Text size="sm" color="dimmed">
            Working Days: {doctorData?.workingDays}
          </Text>

          <Button color='red' w={200} h={50} mt={70} left={180}>Book This Doctor</Button>
        </Card>
      )}
      <Button onClick={goBack} left={600} h={40}>Back to hospital</Button>
    </Box>
  );
};

export default Doctor;