import { Container, Typography, Button, Box } from "@mui/material";

function Header({ textBtn, maxWidth, onClick, justifyContent }) {
  return (
    <Container
      component="nav"
      maxWidth="0"
      sx={{
        backgroundColor: "#121214",
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px",
        paddingBottom: "10px",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          boxSizing: "border-box",
          width: "100%",
          justifyContent: { justifyContent },
          backgroundColor: "#121214",
          maxWidth: { maxWidth },
          marginBottom: "15px",
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="h1"
          fontSize="1.5rem"
          sx={{
            margin: "0px",
            color: "#FF577F",
            fontWeight: "700",
          }}
        >
          Kenzie Hub
        </Typography>
        {textBtn && (
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "#212529", fontSize: ".6rem" }}
            onClick={onClick}
          >
            {textBtn}
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default Header;
