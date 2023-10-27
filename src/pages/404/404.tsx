import { Box, Button, createStyles, Group, Title } from "@mantine/core";
import { useNavigate } from "react-router";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
  },
}));

function Page404() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Box h="100vh" w='100%' bg='black' className={classes.root}>
      <div color="black" className={classes.label}>404</div>
      <Title color="white" sx={{ fontSize: 30 }} className={classes.title}>The page you are looking for not available!</Title>
      <Group position="center">
        <Button size="md" mt={40} w={300} radius={8} h={50} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Group>
    </Box>
  );
}

export default Page404;