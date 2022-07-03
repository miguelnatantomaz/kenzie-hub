import { TextField } from "@mui/material";

function Input({ text, yup }) {
  return (
    <TextField
      margin="normal"
      variant="outlined"
      fullWidth
      sx={{
        heigth: "26px",
        input: {
          color: "white",
          backgroundColor: "#343B41",
          borderRadius: "4px",
        },
        label: { color: "white" },
      }}
      color="primary"
      label={text}
    />
  );
}

export default Input;
