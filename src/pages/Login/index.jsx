import React from "react";
import Input from "../../components/Input";
import Header from "../../components/Header";
import { useNavigate, Navigate } from "react-router-dom";

import api from "../../services/api";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Container, Button, Typography, Box, TextField } from "@mui/material";

import { toast } from "react-toastify";
const customId = "custom-id-yes";

function Login() {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

  const formLoginSchema = yup.object().shape({
    email: yup
      .string()
      .required("E-mail obrigatório *")
      .email("E-mail inválido *"),
    password: yup.string().required("Senha obrigatória *"),
  });

  const toastId = React.useRef(null);

  const notificarSucess = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success("Login com Sucesso!", {
        toastId: customId,
      });
    }
  };

  const notificarFailed = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error("Erro na autenticação", {
        toastId: customId,
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formLoginSchema),
  });

  const onSubmitFunction = async (data) => {
    await api
      .post("/sessions", data)
      .then((response) => {
        notificarSucess();
        const { token, user } = response.data;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      })
      .catch((err) => {
        if (!errors.email?.message && !errors.password?.message) {
          notificarFailed();
        }
      });
  };

  if (token) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Header maxWidth={"370px"} justifyContent={"center"}></Header>
      <Container
        component="main"
        maxWidth="0px"
        sx={{
          backgroundColor: "#121214",
          minHeight: "92.2vh",
          display: "flex",
          boxSizing: "border-box",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "medium",
        }}
      >
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmitFunction)}
          sx={{
            width: "100%",
            maxWidth: "370px",
            maxHeight: "450px",
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
            flexDirection: "Column",
            alignItems: "center",
            marginBottom: "310px",
            color: "white",
            backgroundColor: "#212529",
            padding: "10px 20px",
            boxSizing: "border-box",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h2"
            align="center"
            fontSize="1.2rem"
            sx={{ margin: "20px 0px 25px 0px" }}
          >
            Login
          </Typography>

          <TextField
            label={"Email"}
            {...register("email")}
            helperText={errors.email?.message}
            margin="normal"
            variant="outlined"
            fullWidth
            sx={{
              marginTop: "10px",
              input: {
                color: "white",
                backgroundColor: "#343B41",
                borderRadius: "4px",
              },
              "& p": {
                color: "red",
              },
              label: { color: "white" },
            }}
            color="primary"
          ></TextField>
          <TextField
            label={"Senha"}
            type="password"
            {...register("password")}
            helperText={errors.password?.message}
            margin="normal"
            variant="outlined"
            fullWidth
            sx={{
              marginTop: "10px",
              input: {
                color: "white",
                backgroundColor: "#343B41",
                borderRadius: "4px",
              },
              label: { color: "white" },
              "& p": {
                color: "red",
              },
            }}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "100%",
              margin: "20px",
              backgroundColor: "#FF577F",
              fontWeight: "700",
              letterSpacing: "0",
            }}
            onClick={() => onSubmitFunction}
          >
            Entrar
          </Button>
          <Typography
            variant="h3"
            align="center"
            fontSize=".9rem"
            sx={{ margin: "0px 0px 10px 0px", color: "#868E96" }}
          >
            Ainda não possui uma conta?
          </Typography>

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "100%",
              margin: "20px",
              backgroundColor: "#868E96",
              fontWeight: "700",
              letterSpacing: "0",
            }}
            onClick={() => navigate("/register")}
          >
            Cadastre-se
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Login;
