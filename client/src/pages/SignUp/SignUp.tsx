import React, { ChangeEvent, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { TextField, Button, Typography, Box, Link } from "@mui/material";

import { SignUpFormContainer } from "./SignUpStyles";
import { SignUpResponse, SignUpFormData } from "./types";
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
  } = useForm<SignUpFormData>();

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file || null);
  };

  const onSubmit = (data: SignUpFormData) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (selectedImage) {
      formData.append("profilePicture", selectedImage, selectedImage.name);
    }

    postRequestWithoutToken<FormData, SignUpResponse>(SIGN_UP_API, formData)
      .then((result: ServerResponse<SignUpResponse>) => {
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

        <input type="file" onChange={handleImageChange} />

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
