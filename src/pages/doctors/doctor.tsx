import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import { Badge, Box, Button, Card, Flex, Image, LoadingOverlay, Text, Modal, Group } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { IEntity } from '../../modules/auth/types';
import { alert } from '../../utils';
import doctorImg from "../../assets/images/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg";
import { useDisclosure } from '@mantine/hooks';

interface DoctorProps { }

const Doctor: FunctionComponent<DoctorProps> = () => {
  const [opened, { close, open }] = useDisclosure();
  const { doctorId } = useParams<{ doctorId: string }>();
  const [doctorData, setDoctorData] = useState<IEntity.SingleDoctor | null>(null);
  const [bookingTimes, setBookingTimes] = useState<IEntity.BookingTimes[] | null>(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const savedToken = localStorage.getItem("access_token");
  const token = savedToken ? JSON.parse(savedToken) : null;

  const getAvailableTimes = async () => {
    try {
      const response = await axios.post(
        'http://134.209.20.129:8084/hybrid-booking/get-doctor-available-time',
        {
          bookingDay: '2023-09-19',
          doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const timesWithSelection = response.data.data.map((time: any) => ({ ...time, selected: false }));
        setBookingTimes(timesWithSelection);
      }
    }
    catch (error: any) {
      alert.error('Error: ' + error.message);
      console.error('Xatolik yuz berdi: ', error);
    }
  };

  useEffect(() => {
    async function getDoctorData() {
      try {
        const response = await axios.get(`http://134.209.20.129:8082/user/get-doctor-by-id`, {
          params: {
            doctorId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setDoctorData(response.data.data);
        }
      }
      catch (error: any) {
        alert.error('Error: ' + error.message);
        console.error('Xatolik yuz berdi: ', error);
      }
      finally {
        setLoading(false);
      }
    }
    getDoctorData();
  }, [doctorId, token]);

  const bookAppointment = async (selectedTimeSlot: any) => {
    if (!selectedTimeSlot) {
      alert.error('Please select a time slot for booking.');
      return;
    }

    try {
      const response = await axios.post(
        'http://134.209.20.129:8084/hybrid-booking/save',
        {
          timeSlotId: selectedTimeSlot.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert.success('Appointment booked successfully.');
        close();
      }
    }
    catch (error: any) {
      alert.error('Error: ' + error.message);
      console.error('Xatolik yuz berdi: ', error);
    }
  };

  return (
    <Box p={20} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30 }}>
      {loading ? (
        <LoadingOverlay visible />
      ) : (
        <Card shadow="sm" padding="lg" radius="md" withBorder w={600}>
          <Card.Section>
            <Image src={doctorImg} alt="Doctor's Image" />
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

          <Button color='red' w={200} h={50} mt={70} left={180} onClick={() => { getAvailableTimes(); open(); }}>
            See available Time
          </Button>
        </Card>
      )}
      <Button onClick={() => navigate(-1)} left={600} h={40}>
        Go Back
      </Button>

      <Modal opened={opened} onClose={close} size="auto" sx={{ borderRadius: 20 }}>
        <Text mb={20} size={24} color='black' align='center'>{doctorData?.fullName}'s available times:</Text>
        <Group sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          {bookingTimes?.map((times: any) => (
            <Button
              key={times.id}
              style={{ margin: '5px' }}
              color={times.selected ? 'green' : 'blue'}
              onClick={() => { const updatedTimes = bookingTimes.map((time) => ({ ...time, selected: time.id === times.id ? !times.selected : false, })); setBookingTimes(updatedTimes); }}
            >
              {times.bookingTime}
            </Button>
          ))}
        </Group>
        <Button size='40' left={100} w={130} h={40} color='red'
          mt={20}
          onClick={() => bookAppointment(bookingTimes?.find((time: any) => time.selected))}>
          Booking
        </Button>
      </Modal>
    </Box>
  );
};

export default Doctor;