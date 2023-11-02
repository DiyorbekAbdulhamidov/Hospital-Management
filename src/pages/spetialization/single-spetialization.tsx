import React, { FunctionComponent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { IEntity } from "../../modules/auth/types";
import { alert } from "../../utils";
import spetializationImg from "../../assets/images/doctor-s-hand-holding-stethoscope-closeup_53876-105091.avif";
import { Box, Text, Card, Image, Button, LoadingOverlay, Badge } from "@mantine/core";
import { http } from "../../services";
import "./spetialization.scss";
interface SingleSpetializationProps {
  spetializationId: string;
}

const SingleSpetialization: FunctionComponent<SingleSpetializationProps> = () => {
  const { spetializationId } = useParams<{ spetializationId: string }>();
  const [spetializationData, setSpetializationData] = useState<IEntity.Spetialization | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    http.get("http://164.92.206.217:8082/user/get-specialty-by-id", { params: { specialtyId: spetializationId } })
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
  }, [spetializationId]);

  if (loading) return <LoadingOverlay visible />;

  if (!spetializationData) return null;

  return (
    <div className="spetialization-page">
      <div className="spetialization-card">
        <img className=".spetialization-img" src="https://cdn.create.vista.com/api/media/small/193013052/stock-photo-smiling-doctor-wearing-white-coat-stethoscope-holding-toy-heart-isolated" alt="" />
        <div className="spetialization-info">
          <h1>{spetializationData.name}</h1>


          <label htmlFor="">
            <h5 color="red" >Who is {spetializationData.name}:</h5>
            <p>{spetializationData.description}</p>
          </label>
          <label>
            <h5 color="red">Which Treatment:</h5>
            <p>{spetializationData.diseaseTreatment}</p>
          </label>
          <div>
            <Button w={200} onClick={() => navigate(-1)} h={45} mt={20} left={120}>Go Back</Button>

          </div>
        </div>
      </div>
    </div>
    /* <Box sx={{ width: "100%", height: "100vh", display: 'flex', flexDirection: 'column', gap: '80px', alignItems: 'center' }}>
       <Card shadow="sm" padding="lg" radius="md" withBorder w={1000} mt={30} >
         <Card.Section component="a" >
           <img src={spetializationImg} alt="spetializationImg" />
         </Card.Section>
 
         <Badge size="80px" fz={20} ml={120} mt="md" mb="xs">
           <Text fw={500}>{spetializationData.name}</Text>
         </Badge>
 
         <Text><Text color="red" >Who is {spetializationData.name}:</Text> {spetializationData.description}</Text>
 
         <Text><Text color="red">Which Treatment:</Text> {spetializationData.diseaseTreatment}</Text>
         <Button onClick={() => navigate(-1)} h={45} mt={20} left={200}>Go Back</Button>
 
       </Card>
     </Box>*/
  );
}

export default SingleSpetialization;