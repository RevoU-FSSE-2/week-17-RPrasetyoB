import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Button, TextField, Card, Typography, CardContent } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ApiUrl } from "../../utils/api";
import Swal from "sweetalert2";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
interface loginValue {
  username: string;
  password: string;
}
const initialValues = {
  username: "",
  password: "",
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (values: loginValue) => {
    setIsLoading(true);

    const Url = ApiUrl + "/v1/auth/login";
    try {
      const response = await fetch(Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Login",
          text: "Login successfull",
        });
        window.location.replace("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Username or Password incorrect",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "An error occurred while processing your request. Please try again later.",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, touched, errors, handleChange, handleBlur }) => (
          <Card
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "300px",
              padding: "20px",
            }}
          >
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              Login Form
            </Typography>
            <Form onSubmit={handleSubmit}>
              <CardContent>
                <TextField
                  label="Username"
                  variant="outlined"
                  name="username"
                  placeholder="Enter username"
                  fullWidth
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  fullWidth
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ mb: 2 }}
                />
              </CardContent>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <h4
                style={{
                  color: "grey",
                  fontSize: "18px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                or
              </h4>
              <Button
                onClick={() => navigate("/register")}
                variant="outlined"
                color="primary"
                disabled={isLoading}
                fullWidth
              >
                Sign Up
              </Button>
            </Form>
          </Card>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
