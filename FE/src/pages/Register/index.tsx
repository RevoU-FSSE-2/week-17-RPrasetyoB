import { useState } from 'react';
import { Form, Formik } from 'formik';
import { Button, TextField, Card, Typography, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { ApiUrl } from '../../utils/api';
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Name is Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters long')
        .required('Password is required')
});

interface registerValue {
  username: string,
  email: string,
  password: string
}

const initialValues = {
  username: '',
  email: '',
  password: '',
};

const RegisterForm: React.FC = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values : registerValue) => {
    setIsLoading(true);

    const Url = ApiUrl + '/v1/auth/register'
    try {
      const response = await fetch(Url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json()
      console.log(data);
      
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration',
          text: 'Registered successfully, redirect to loginpage.',
        });
        
        navigate('/login')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration failure',
          text: 'Registration failed. Please check your data.',
        });
      }
      
      setIsLoading(false);
    
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while processing your request. Please try again later.')
      Swal.fire({
        icon: 'error',
        title: 'Registration failure',
        text: 'An error occurred while processing your request. Please try again later.',
      });
    }
  }     

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          touched,
          errors,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Card style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            padding: '20px'}}>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
              Registration Form
            </Typography>
            <Form onSubmit={handleSubmit}>
              <CardContent>
              <TextField
                  label="username"
                  variant="outlined"
                  name="username"
                  placeholder='Enter username'
                  fullWidth
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  placeholder='Enter email'
                  fullWidth
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  name="password"
                  type="password"
                  placeholder='Enter password'
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
                type='submit'
                variant="contained"
                color="primary"
                disabled={isLoading || isSubmitting}
                fullWidth
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Button>
              <h4 style={{ color: 'grey', fontSize: '18px', marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>or</h4>              
              <Button
                onClick={()=> navigate('/login')}
                type="button"
                variant="outlined"
                color="primary"
                disabled={isLoading || isSubmitting}
                fullWidth
              >
                Login
              </Button>
            </Form>
          </Card> 
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
