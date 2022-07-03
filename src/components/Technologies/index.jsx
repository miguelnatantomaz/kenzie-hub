import React from "react";

import {
  Container,
  Button,
  Typography,
  Box,
  TextField,
  InputLabel,
  Select,
  Modal,
  MenuItem,
} from "@mui/material";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const customId = "custom-id-yes";

function Technologies() {
  let myUser = JSON.parse(localStorage.getItem("user"));
  let token = JSON.parse(localStorage.getItem("token"));
  const [currentId, setCurrentId] = useState({});
  const [tech, setTech] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectEdit, setSelectEdit] = useState();

  const toastId = React.useRef(null);
  const notificarSucess = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success(`${msg}`, {
        toastId: customId,
      });
    }
  };

  const notificarFailed = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(`${msg}`, {
        toastId: customId,
      });
    }
  };

  const user = async () => {
    const response = await api
      .get(`/users/${myUser.id}`)
      .then((response) => setTech(response.data.techs));
  };

  const handeChange = (selectID) => {
    setSelectEdit(selectID);
  };

  const handleEditAndDelete = (tech) => {
    console.log(tech);
    setSelectEdit(tech.status);
    setCurrentId(tech);
    setModal(true);
  };

  const formTechEditSchema = yup.object().shape({
    title: yup.string().required(),
    status: yup.string().required("faça alguma alteração"),
  });

  useEffect(() => {
    user();
  }, [tech]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formTechEditSchema),
  });

  const onSubmitEditTech = async (data) => {
    console.log(currentId.id);
    await api
      .put(`/users/techs/${currentId.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        notificarSucess("Tecnologia alterada com sucesso!");
        console.log(response);
        setModal(false);
      })
      .catch((err) => notificarFailed("Ops, algo deu errado!"));
  };

  const onSubmitDeleteTech = async () => {
    await api
      .delete(`/users/techs/${currentId.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        notificarSucess("Tecnologia excluida com sucesso!");
        setModal(false);
      })
      .catch((err) => notificarFailed("Ops, algo deu errado!"));
  };

  return (
    <Container
      component="ul"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {tech.map((techs) => {
        return (
          <Container
            sx={{
              "&:hover": {
                background: "#343B41",
                cursor: "pointer",
              },
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#121214",
              alignItems: "center",
              borderRadius: "4px",
              padding: "20px",
              margin: "10px 0px",
              flexWrap: "wrap",
            }}
            component="li"
            key={techs.id}
            onClick={() => handleEditAndDelete(techs)}
          >
            <Typography sx={{ fontWeight: "700", fontSize: "1.2rem" }}>
              {techs.title}
            </Typography>
            <Typography sx={{ color: "#868E96", fontSize: "1rem" }}>
              {techs.status}
            </Typography>
          </Container>
        );
      })}
      <Modal
        open={modal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          onSubmit={handleSubmit(onSubmitEditTech)}
          component={"form"}
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
              Tecnologia Detalhes
            </Typography>
            <Button
              onClick={() => {
                setSelectEdit("");
                setModal(false);
              }}
              variant="contained"
              sx={{
                backgroundColor: "#868E96",
                fontWeight: "800",
                letterSpacing: "0",
                padding: "0px",
              }}
            >
              X
            </Button>
          </Box>

          <TextField
            {...register("title")}
            margin="normal"
            variant="outlined"
            value={currentId.title}
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
            labelId="label"
            id="select"
            value={selectEdit}
            sx={{ width: "100%", backgroundColor: "#343B41", color: "white" }}
            onChange={(event) => handeChange(event.target.value)}
          >
            <MenuItem value="Iniciante">Iniciante</MenuItem>
            <MenuItem value="Intermediário">Intermediário</MenuItem>
            <MenuItem value="Avançado">Avançado</MenuItem>
          </Select>

          <Box
            sx={{
              margin: "20px 0px 10px 0px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#FF577F",
                fontWeight: "700",
                letterSpacing: "0",
              }}
            >
              Salvar alterações
            </Button>
            <Button
              onClick={() => onSubmitDeleteTech()}
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#868E96",
                fontWeight: "700",
                letterSpacing: "0",
                marginLeft: "20px",
              }}
            >
              Excluir
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default Technologies;
