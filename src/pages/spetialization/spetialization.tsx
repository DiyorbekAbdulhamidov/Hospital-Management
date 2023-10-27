import { FunctionComponent, useEffect, useState } from "react";
import {
  Box,
  LoadingOverlay,
  Grid,
  Card,
  Image,
  Text,
  Button,
  Group,
  Col,
} from "@mantine/core";
import axios from "axios";
import { IEntity } from "../../modules/auth/types";
import spetializationImg from "../../assets/images/spetialization-img.jpg";
import { useNavigate } from "react-router";
import { alert } from "../../utils";

interface SpetializationProps {}

const Spetialization: FunctionComponent<SpetializationProps> = () => {
  const [spetialization, setSpetialization] = useState<
    IEntity.Spetialization[]
  >([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const savedToken = localStorage.getItem("access_token");
  const token = savedToken ? JSON.parse(savedToken) : null;

  useEffect(() => {
    async function getSpetialization() {
      try {
        const response = await axios.get(
          "http://188.166.165.2:8082/user/get-all-specialties",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setSpetialization(response.data.data);
          setLoading(false);
          console.log(response.data.data);
        }
      } catch (error: any) {
        alert.error("Xatolik yuz berdi: " + error.message);
        setLoading(false);
      }
    }

    if (token) {
      getSpetialization();
    }
  }, [token]);

  if (loading) {
    return (
      <Box>
        <LoadingOverlay visible />
      </Box>
    );
  }

  return (
    <Box>
      <Grid gutter="md">
        {spetialization.map((spetialization: IEntity.Spetialization) => (
          <Col span={4} key={spetialization.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a">
                <Image src={spetializationImg} alt="Norway" height={400} />
              </Card.Section>

              <Group mt="md" mb="xs">
                <Text align="center" fw={500}>
                  {spetialization.name}
                </Text>
              </Group>

              <Text size="sm" c="dimmed">
                {spetialization.diseaseTreatment}
              </Text>

              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                onClick={() => {
                  navigate(`/userPanel/single-spetialization/${spetialization.id}`);
                }}
              >
                View
              </Button>
            </Card>
          </Col>
        ))}
      </Grid>
    </Box>
  );
};

export default Spetialization;
