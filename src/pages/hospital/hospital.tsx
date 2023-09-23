import { Box, Card, Grid, Image, Text } from "@mantine/core";
import { FunctionComponent, useEffect } from "react";
import axios from "axios";

interface HospitalProps {}

const Hospital: FunctionComponent<HospitalProps> = () => {
  useEffect(() => {
    axios
      .get("http://134.209.20.129:8083/hospital/get-all")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
      });
  }, []);
  return (
    <>
      <Box>
        <Grid gutter="xl" justify="center">
          <Grid.Col w="200px" h="auto" span={4}>
            <Card shadow="sm" padding="xl" component="a" target="_blank">
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                  height={120}
                  alt="No way!"
                />
              </Card.Section>

              <Text weight={500} size="lg" mt="md">
                You&apos;ve won a million dollars in cash!
              </Text>

              <Text mt="xs" color="dimmed" size="sm">
                Please click anywhere on this card to claim your reward, this is
                not a fraud, trust us
              </Text>
            </Card>
          </Grid.Col>
          {/* <Grid.Col w="200px" h="auto" span={4}>
            <Card shadow="sm" padding="xl" component="a" target="_blank">
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                  height={120}
                  alt="No way!"
                />
              </Card.Section>

              <Text weight={500} size="lg" mt="md">
                You&apos;ve won a million dollars in cash!
              </Text>

              <Text mt="xs" color="dimmed" size="sm">
                Please click anywhere on this card to claim your reward, this is
                not a fraud, trust us
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col w="200px" h="auto" span={4}>
            <Card shadow="sm" padding="xl" component="a" target="_blank">
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                  height={120}
                  alt="No way!"
                />
              </Card.Section>

              <Text weight={500} size="lg" mt="md">
                You&apos;ve won a million dollars in cash!
              </Text>

              <Text mt="xs" color="dimmed" size="sm">
                Please click anywhere on this card to claim your reward, this is
                not a fraud, trust us
              </Text>
            </Card>
          </Grid.Col> */}
        </Grid>
      </Box>
    </>
  );
};

export default Hospital;
