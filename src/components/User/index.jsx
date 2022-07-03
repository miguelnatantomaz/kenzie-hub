import { Container, Button, Typography, Box } from "@mui/material";

function User({ name, module, maxWidth }) {
  return (
    <Container
      component="header"
      maxWidth="0"
      sx={{
        backgroundColor: "#121214",
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px",
        paddingBottom: "20px",
        boxSizing: "border-box",
        borderTop: "1px solid #343B41",
        borderBottom: "1px solid #343B41",
      }}
    >
      <Box
        sx={{
          display: "flex",
          boxSizing: "border-box",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor: "#121214",
          maxWidth: { maxWidth },
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="h2"
          align="center"
          fontSize="2rem"
          sx={{
            margin: "20px 0px 25px 0px",
            color: "white",
            fontWeight: "700",
          }}
        >
          Olá, {name}
        </Typography>
        <Typography
          variant="h3"
          align="center"
          fontSize=".9rem"
          sx={{
            margin: "0px 0px 10px 0px",
            color: "#868E96",
            textAlign: "center",
          }}
        >
          {module}
        </Typography>
      </Box>
    </Container>
  );
}

export default User;
