import React, { useState } from "react";
import axios, { AxiosInstance } from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import { useNavigate, useSearchParams } from "react-router-dom";
import configuration from "../config/configuration";

export const baseURL = configuration.REACT_APP_API_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity]: [AlertColor, Function] = useState("info");

  instance.interceptors.response.use(
    (res) => {
      // If no data is available on the response throw an error and show the connection error message
      if (
        res.headers["content-type"]?.indexOf("text/html") &&
        res.headers["content-type"]?.indexOf("text/html") !== -1
      ) {
        setOpen(true);
        setMessage("Errore di connessione");
        setSeverity("error");
        throw new Error();
      }
      if (res.data?.message) {
        setOpen(true);
        setSeverity("success");
        setMessage(res.data?.message);
      }
      return res;
    },
    (err) => {
        setOpen(true);
        const msg = err?.response?.data.message || "Errore di connessione";
        setMessage(msg);
        if (err?.response?.status.toString().startsWith("4")) {
            setSeverity("warning");
        } else {
            setSeverity("error");
        }
        
        return Promise.reject(err);
    }
  );
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={2000}
      onClose={() => setOpen(false)}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default instance;