import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { TextField, Button, Typography, Box, Link } from "@mui/material";

import { SignUpFormContainer } from "./SignUpStyles";
import { SignUpRequestPayload, SignUpResponse, SignupFormData } from "./types";
import { HOME, LOG_IN, SIGN_UP_API } from "../../components/services/constants";
import {
  ServerResponse,
  postRequestWithoutToken,
} from "../../components/services/server";

const SignUp: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>();
  const navigate = useNavigate();

  const onSubmit = (data: SignupFormData) => {
    const payload: SignUpRequestPayload = {
      ...data,
    };

    postRequestWithoutToken<SignUpRequestPayload, SignUpResponse>(
      SIGN_UP_API,
      payload
    )
      .then((result: ServerResponse<SignUpResponse>) => {
        const data = result.data;

        if (data.success) {
          localStorage.setItem("authUser", JSON.stringify(data.response));
          localStorage.setItem("token", JSON.stringify(data.token));

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

  const password = watch("password");

  return (
    <SignUpFormContainer maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username && "Username is required"}
            />
          )}
        />

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

        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
          )}
        />

        <Box textAlign="center" style={{ marginTop: "10px" }}>
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </form>

      <Typography align="center" variant="body2" style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <Link component={RouterLink} to={LOG_IN}>
          Login
        </Link>
      </Typography>
      <ToastContainer />
    </SignUpFormContainer>
  );
};

export default SignUp;
