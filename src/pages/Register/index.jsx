import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "../../components/Input";
import Header from "../../components/Header";
import api from "../../services/api";
import { toast } from "react-toastify";

import { useNavigate, Navigate } from "react-router-dom";

import {
  Container,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function Register() {
  const [select, setSelect] = useState(
    "Primeiro módulo (Introdução ao Frontend)"
  );

  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    navigate("/home");
  }

  const handeChange = (select) => {
    setSelect(select);
  };

  const formRegisterSchema = yup.object().shape({
    name: yup
      .string()
      .required("Nome obrigatório *")
      .min(3, "Minimo 3 letras *"),
    email: yup
      .string()
      .required("E-mail obrigatório *")
      .email("E-mail inválido *"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Deve conter ao menos um dígito, uma letra minúscula, uma letra maiúscula, um caractere especial, e o minimo de 8 caracteres"
      ),
    confirmPassword: yup
      .string()
      .required("Confirmar a senha é obrigatório *")
      .oneOf([yup.ref("password")], "A senha não é igual *"),
    contact: yup.string().required("Deixe seu contato *"),
    bio: yup.string().required("Deixe a sua Bio *"),
    course_module: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formRegisterSchema),
  });

  const onSubmitFunction = async (data) => {
    await api
      .post("/users", data)
      .then((response) => {
        console.log(response);
        toast.success("Conta criada com sucesso!");
        response.data.id && navigate("/");
      })
      .catch((error) => {
        if (
          !errors.name?.message &&
          !errors.email?.message &&
          !errors.password?.message &&
          !errors.confirmPassword?.message &&
          !errors.contact?.message &&
          !errors.course_module?.message
        )
          toast.error("Ops! Algo deu errado");
      });
  };

  if (token) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Header
        textBtn={"Voltar"}
        maxWidth={"370px"}
        justifyContent={"space-between"}
        onClick={() => navigate("/")}
      ></Header>
      <Container
        component="main"
        maxWidth="0px"
        sx={{
          backgroundColor: "#121214",
          minHeight: "93.7vh",
          display: "flex",
          width: "100%",
          boxSizing: "border-box",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "medium",
        }}
      >
        <Box
          component={"form"}
          sx={{
            width: "100%",
            maxWidth: "370px",
            maxHeight: "880px",
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
            flexDirection: "Column",
            alignItems: "center",
            color: "white",
            backgroundColor: "#212529",
            padding: "10px 20px",
            boxSizing: "border-box",
            borderRadius: "10px",
          }}
          onSubmit={handleSubmit(onSubmitFunction)}
        >
          <Typography
            variant="h2"
            align="center"
            fontSize="1.2rem"
            sx={{ margin: "20px 0px 25px 0px" }}
          >
            Crie sua conta
          </Typography>
          <Typography
            variant="h3"
            align="center"
            fontSize=".9rem"
            sx={{ margin: "0px 0px 10px 0px", color: "#868E96" }}
          >
            Rapido e grátis, vamos nessa
          </Typography>

          <TextField
            label={"Nome"}
            {...register("name")}
            helperText={errors.name?.message}
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
            color="primary"
          ></TextField>
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
            color="primary"
          ></TextField>
          <TextField
            label={"Confirmar senha"}
            {...register("confirmPassword")}
            helperText={errors.confirmPassword?.message}
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
            color="primary"
          ></TextField>
          <TextField
            label={"Contato"}
            {...register("contact")}
            helperText={errors.contact?.message}
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
            color="primary"
          ></TextField>
          <TextField
            label={"Bio"}
            {...register("bio")}
            helperText={errors.bio?.message}
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
            color="primary"
          ></TextField>

          <InputLabel
            htmlFor="modulos"
            id="demo-simple-select-label"
            sx={{
              textAlign: "left",
              width: "100%",
              margin: "0px 0px 0px 10px",
              color: "white",
            }}
          >
            Selecionar módulos
          </InputLabel>
          <Select
            {...register("course_module")}
            placeholder="Modulos"
            labelId="label"
            id="select"
            value={select}
            sx={{ width: "100%", backgroundColor: "#343B41", color: "white" }}
            onChange={(event) => handeChange(event.target.value)}
          >
            <MenuItem value="Primeiro módulo (Introdução ao Frontend)">
              Primeiro módulo (Introdução ao Frontend)
            </MenuItem>
            <MenuItem value="Segundo módulo (Frontend Avançado)">
              Segundo módulo (Frontend Avançado)
            </MenuItem>
            <MenuItem value="Terceiro módulo (Introdução ao Backend)">
              Terceiro módulo (Introdução ao Backend)
            </MenuItem>
            <MenuItem value="Quarto módulo (Backend Avançado)">
              Quarto módulo (Backend Avançado)
            </MenuItem>
          </Select>

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
            Cadastrar
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Register;
