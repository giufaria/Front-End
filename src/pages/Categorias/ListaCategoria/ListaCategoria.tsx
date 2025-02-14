import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Button, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import Categoria from "../../../models/Categoria";
import useLocalStorage from "react-use-localstorage";
import { useNavigate } from "react-router-dom";
import { busca } from "../../../services/Service";
import "./ListaCategoria.css";

function ListaCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [token, setToken] = useLocalStorage("token");
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [token]);

  async function getCategoria() {
    await busca("/categorias", setCategorias, {
      headers: {
        'Authorization': token,
      },
    });
  }

  useEffect(() => {
    getCategoria();
  }, [categorias.length]);

  return (
    <>
      {categorias.map((categoria) => (
        <Box m={2} >
          <Card variant="outlined" className="cardlista">
            <CardContent >
              <Typography color="textSecondary" gutterBottom>
                Categoria
              </Typography>
              <Typography variant="h5" component="h2">
                {categoria.tipo}
              </Typography>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link
                  to={`/formularioCategoria/${categoria.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button
                      variant="contained"
                      className="marginLeft"
                      size="small"
                      color="primary"
                    >
                      Atualizar
                    </Button>
                  </Box>
                </Link>
                <Link
                  to={`/deletarCategoria/${categoria.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button variant="contained" size="small" color="secondary">
                      Deletar
                    </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  );
}

export default ListaCategoria;
