import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { IEntity } from "../../modules/auth/types";
import { alert } from "../../utils";
import { Box, Text, Tabs, Card, Image, Group, Badge, Button } from "@mantine/core";
import doctorImg from "../../assets/images/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.avif";
import { useNavigate } from "react-router";

interface BookingProps { }

const Booking: FunctionComponent<BookingProps> = () => {
  const [upcomingBookings, setupcomingBookings] = useState<IEntity.Booking[]>([]);
  const [pastBookings, setpastBookings] = useState<IEntity.Booking[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    const token = savedToken ? JSON.parse(savedToken) : null;

    if (token) {
      axios
        .get("https://docs.diordev.me:8084/hybrid-booking/get-user-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setupcomingBookings(response.data.data.upcoming);
            setpastBookings(response.data.data.past);
          }
        })
        .catch((error) => {
          console.error("Xatolik yuz berdi: ", error);
          alert.error("Error in getting Booking information");
        });
    }
  }, []);

  return (
    <Box>
      <Text align="center" size="40px">
        Bookings
      </Text>
      {upcomingBookings.length === 0 && pastBookings.length === 0 ? (
        <Text align="center" size="30px" color="red" mt={150}>
          You don't have an Appointment 😔
        </Text>
      ) : (
        <Tabs defaultValue="upcoming">
          <Tabs.List>
            <Tabs.Tab value="upcoming">Upcoming Bookings</Tabs.Tab>
            <Tabs.Tab value="past">Past Bookings</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="upcoming" mt={20}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
              {upcomingBookings.map((booking) => (
                <Card key={booking.bookingId} shadow="sm" padding="lg" radius="md" withBorder w={500} >
                  <Card.Section component="a">
                    <Image src={doctorImg} alt="DoctorImg" />
                  </Card.Section>

                  <Group mt="md" mb="xs">
                    <Text fw={500}>{booking.doctorName}</Text>
                    <Badge color="pink" variant="light">
                      {booking.status}
                    </Badge>
                  </Group>

                  <Text size="sm" c="dimmed">
                    {booking.bookingDay}, {booking.bookingTime}, {booking.weekDay}
                  </Text>

                  <Text fw={350}>Location: {booking.address}</Text>

                  <Text>Room Number: {booking.roomNumber}</Text>

                  <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={() => navigate(`/booking/${booking.bookingId}`)}>
                    View
                  </Button>
                </Card>
              ))}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="past" mt={20}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
              {pastBookings.map((booking) => (
                <Card key={booking.bookingId} shadow="sm" padding="lg" radius="md" withBorder w={500} >
                  <Card.Section component="a">
                    <Image src={doctorImg} alt="DoctorImg" />
                  </Card.Section>

                  <Group mt="md" mb="xs">
                    <Text fw={500}>{booking.doctorName}</Text>
                    <Badge color="pink" variant="light">
                      {booking.status}
                    </Badge>
                  </Group>

                  <Text size="sm" c="dimmed">
                    {booking.bookingDay}, {booking.bookingTime}, {booking.weekDay}
                  </Text>

                  <Text fw={350}>Location: {booking.address}</Text>

                  <Text>Room Number: {booking.roomNumber}</Text>


                  <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={() => { navigate(`/booking/${booking.bookingId}`); console.log(true); }} >  View </Button>
                </Card>
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      )}
    </Box>
  );
};

export default Booking;