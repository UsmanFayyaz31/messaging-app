import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Button, TextField, Typography, Link } from "@mui/material";

import { LogInFormContainer } from "./LogInStyles";
import { LogInFormData, LogInRequestPayload, LogInResponse } from "./types";
import { HOME, LOG_IN_API, SIGN_UP } from "../../components/services/constants";
import {
  ServerResponse,
  postRequestWithoutToken,
} from "../../components/services/server";

const LogIn: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LogInFormData>();
  const navigate = useNavigate();

  const onSubmit = (data: LogInFormData) => {
    const payload: LogInRequestPayload = {
      ...data,
    };

    postRequestWithoutToken<LogInRequestPayload, LogInResponse>(
      LOG_IN_API,
      payload
    )
      .then((result: ServerResponse<LogInResponse>) => {
        const data = result.data;

        if (data.success) {
          localStorage.setItem("authUser", JSON.stringify(data.response));
          localStorage.setItem("t", data.response.token);

          navigate(HOME);
        } else handleError(data.message);
      })
      .catch(() => {
        handleError("Something went wrong!");
      });
  };

  const handleError = (error: string) => {
    toast.error(error, {
      position: "bottom-left",
    });
  };

  return (
    <LogInFormContainer maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Log In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email && "Email is required"}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password && "Password is required"}
            />
          )}
        />

        <Box textAlign="center" style={{ marginTop: "10px" }}>
          <Button type="submit" variant="contained" color="primary">
            Log In
          </Button>
        </Box>
      </form>

      <Typography align="center" variant="body2" style={{ marginTop: "10px" }}>
        Did not have an account?{" "}
        <Link component={RouterLink} to={SIGN_UP}>
          Sign Up
        </Link>
      </Typography>
      <ToastContainer />
    </LogInFormContainer>
  );
};

export default LogIn;
