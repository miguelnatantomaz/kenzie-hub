import React, { useEffect } from "react";
import Header from "../../components/Header";
import User from "../../components/User";
import Technologies from "../../components/Technologies";
import { useNavigate, Navigate } from "react-router-dom";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Container,
  Button,
  Typography,
  Box,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import { useMediaQuery } from "@mui/material";

import { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
const customId = "custom-id-yes";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  const history = useNavigate();

  const isActive = useMediaQuery("(max-width: 1100px)");

  const [modal, setModal] = useState(false);
  const [select, setSelect] = useState("Iniciante");

  const toastId = React.useRef(null);
  const notificarSucess = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success("Tecnologia criada com sucesso!", {
        toastId: customId,
      });
    }
  };

  const notificarFailed = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error("Essa tecnologia ja foi criada!", {
        toastId: customId,
      });
    }
  };

  const handleChangeSelect = (input) => {
    setSelect(input);
  };

  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  const formTechSchema = yup.object().shape({
    title: yup.string().required("Titulo obrigatório *"),
    status: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formTechSchema),
  });

  const onSubmitCreateTech = async (data) => {
    await api
      .post("/users/techs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        handleClose();
        notificarSucess();

        console.log(response);
      })
      .catch((error) => {
        notificarFailed();
      });
  };

  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Header
        textBtn={"Sair"}
        maxWidth={isActive ? "80%" : "60%"}
        justifyContent={"space-between"}
        onClick={() => {
          localStorage.clear();
          history("/");
        }}
      ></Header>
      <User
        name={user.name}
        module={user.course_module}
        maxWidth={isActive ? "80%" : "60%"}
      ></User>
      <Container
        component="main"
        maxWidth="0px"
        sx={{
          backgroundColor: "#121214",
          minHeight: "78.7vh",
          display: "flex",
          boxSizing: "border-box",
          flexDirection: "column",
          fontWeight: "medium",
          alignItems: "center",
        }}
      >
        <Box
          component={"section"}
          sx={
            isActive
              ? {
                  width: "100%",
                  maxWidth: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "white",
                  boxSizing: "border-box",
                  borderRadius: "10px",
                }
              : {
                  width: "100%",
                  maxWidth: "60%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "white",
                  boxSizing: "border-box",
                  borderRadius: "10px",
                }
          }
        >
          <Typography
            variant="h2"
            align="center"
            fontSize="1.2rem"
            sx={{ margin: "20px 0px 25px 0px", color: "white" }}
          >
            Tecnologias
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{
              backgroundColor: "#868E96",
              fontWeight: "800",
              letterSpacing: "0",
              padding: "0px",
            }}
          >
            +
          </Button>
        </Box>
        <Box
          component={"section"}
          sx={
            isActive
              ? {
                  width: "100%",
                  maxWidth: "80%",
                  display: "flex",
                  flexDirection: "Column",
                  alignItems: "center",
                  color: "white",
                  backgroundColor: "#212529",

                  boxSizing: "border-box",
                  borderRadius: "10px",
                }
              : {
                  width: "100%",
                  maxWidth: "60%",
                  display: "flex",
                  flexDirection: "Column",
                  alignItems: "center",
                  color: "white",
                  backgroundColor: "#212529",
                  boxSizing: "border-box",
                  borderRadius: "10px",
                }
          }
        >
          <Technologies></Technologies>
        </Box>
      </Container>

      <Modal
        open={modal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmitCreateTech)}
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
          <Box
            component={"section"}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h2"
              align="center"
              fontSize="1.2rem"
              sx={{ margin: "20px 0px 25px 0px" }}
            >
              Cadastrar tecnologias
            </Typography>
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: "#868E96",
                fontWeight: "800",
                letterSpacing: "0",
                padding: "0px",
                color: "white",
              }}
            >
              X
            </Button>
          </Box>

          <TextField
            {...register("title")}
            label={"Nome"}
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
          <InputLabel
            htmlFor="status"
            id="demo-simple-select-label"
            sx={{
              textAlign: "left",
              width: "100%",
              margin: "0px 0px 0px 10px",
              color: "white",
            }}
          >
            Selecionar status
          </InputLabel>
          <Select
            {...register("status")}
            placeholder="Tecnologias"
            labelId="label"
            id="select"
            value={select}
            sx={{ width: "100%", backgroundColor: "#343B41", color: "white" }}
            onChange={(event) => handleChangeSelect(event.target.value)}
          >
            <MenuItem value="Iniciante">Iniciante</MenuItem>
            <MenuItem value="Intermediário">Intermediário</MenuItem>
            <MenuItem value="Avançado">Avançado</MenuItem>
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
          >
            Cadastrar tecnologia
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Dashboard;
