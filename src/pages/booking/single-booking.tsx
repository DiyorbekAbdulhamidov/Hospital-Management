import axios from "axios";
import React, { FunctionComponent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { IEntity } from "../../modules/auth/types";
import { alert } from "../../utils";
import doctorImg from "../../assets/images/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.avif";
import { Box, Text, Card, Image, Group, Badge, Button, LoadingOverlay } from "@mantine/core";

interface SingleBookingProps {
  bookingId: string;
}

const SingleBooking: FunctionComponent<SingleBookingProps> = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [bookingData, setBookingData] = useState<IEntity.Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const savedToken = localStorage.getItem("access_token");
  const token = savedToken ? JSON.parse(savedToken) : null;

  useEffect(() => {
    if (token) {
      axios.get("http://134.209.20.129:8084/hybrid-booking/get-booking", {
        headers: {
          Authorization: `Bearer ${token}`,
        }, params: { bookingId }
      })
        .then((response) => {
          if (response.status === 200) {
            setBookingData(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Xatolik yuz berdi: ", error);
          alert.error("Error in getting Booking information");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });

  const handleCancel = () => {
    axios.get("http://134.209.20.129:8084/hybrid-booking/cancel", {
      headers: {
        Authorization: `Bearer ${token}`,
      }, params: { bookingId }
    })
      .then((response) => {
        if (response.status === 200) {
          alert.success('Booking successfully cancelled')
        }
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi: ", error);
        alert.error("Error in Cancel Booking");
      })
  };

  if (loading) return <LoadingOverlay visible />;

  if (!bookingData) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '80px', alignItems: 'center' }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder w={550} mt={40}>
        <Card.Section component="a" href={`/doctor/${bookingData.doctorId}`}>
          <Image src={doctorImg} alt="DoctorImg" />
        </Card.Section>

        <Group mt="md" mb="xs">
          <Text fw={500}>{bookingData.doctorName}</Text>
          <Badge color="pink" variant="light">
            {bookingData.status}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          {bookingData.bookingDay}, {bookingData.bookingTime}, {bookingData.weekDay}
        </Text>

        <Text fw={350}>Location: {bookingData.address}</Text>

        <Text>Room Number: {bookingData.roomNumber}</Text>

        <Button variant="light" color="red" fullWidth mt="md" radius="md" disabled={bookingData.status !== 'SCHEDULED'} onClick={() => { if (bookingData.status === 'SCHEDULED') { handleCancel(); window.location.reload() } }} > {bookingData.status === 'SCHEDULED' ? 'CANCEL BOOKING' : 'disabled'} </Button>
      </Card>
      <Button onClick={() => navigate(-1)} h={45} left={600}>Go Back</Button>
    </Box>
  );
}

export default SingleBooking;