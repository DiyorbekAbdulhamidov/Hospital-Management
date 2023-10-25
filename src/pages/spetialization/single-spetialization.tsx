import axios from "axios";
import React, { FunctionComponent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { IEntity } from "../../modules/auth/types";
import { alert } from "../../utils";
import spetializationImg from "../../assets/images/soe.jpg";
import { Box, Text, Card, Image, Button, LoadingOverlay, Badge } from "@mantine/core";

interface SingleSpetializationProps {
  spetializationId: string;
}

const SingleSpetialization: FunctionComponent<SingleSpetializationProps> = () => {
  const { spetializationId } = useParams<{ spetializationId: string }>();
  const [spetializationData, setSpetializationData] = useState<IEntity.Spetialization | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const savedToken = localStorage.getItem("access_token");
  const token = savedToken ? JSON.parse(savedToken) : null;

  useEffect(() => {
    if (token) {
      axios.get("http://188.166.165.2:8082/user/get-specialty-by-id", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { specialtyId: spetializationId }
      })
        .then((response) => {
          if (response.status === 200) {
            setSpetializationData(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Xatolik yuz berdi: ", error);
          alert.error("Xatolik yuz berdi: " + error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token, spetializationId]);

  if (loading) return <LoadingOverlay visible />;

  if (!spetializationData) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '80px', alignItems: 'center' }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder w={550} mt={40}>
        <Card.Section component="a" >
          <Image src={spetializationImg} alt="spetializationImg" />
        </Card.Section>

        <Badge size="80px" fz={20} ml={10} mt="md" mb="xs">
          <Text fw={500}>{spetializationData.name}</Text>
        </Badge>

        <Text ><Text color="red" >Who is Cardiolog:</Text> {spetializationData.description}</Text>

        <Text><Text color="red">Which Treatment:</Text> {spetializationData.diseaseTreatment}</Text>

      </Card>
      <Button onClick={() => navigate(-1)} h={45} left={600}>Go Back</Button>
    </Box>
  );
}

export default SingleSpetialization;