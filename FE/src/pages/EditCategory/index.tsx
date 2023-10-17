import { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Button, TextField, Card, Typography, CardContent, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { ApiUrl } from "../../utils/api";
import Swal from "sweetalert2";
import { useAuthChecker } from "../../hook";

const validationSchema = Yup.object().shape({
  status: Yup.string().required("updated task is required"),
});

interface EditCategory {
  status?: string;
}



const EditCategory: React.FC = () => {
  const navigate = useNavigate();  
  const { id } = useParams();
  const Url1 = ApiUrl + `/category/${id}`;
  const token = localStorage.getItem('authToken')
  useAuthChecker()
  
  const [category, setCategory] = useState<EditCategory>();
  
  const initialValues = {
      status: category?.status,
    };

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(initialValues.status);

  const getCategory = useCallback(
    async () => {
      const response = await fetch(Url1, {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();      
      setCategory(data.data);
    },
    [Url1, token]
  );
  
  useEffect(
    ()=> {
      getCategory();
    },
    [getCategory]
  );


  const handleStatus = (event: SelectChangeEvent) => {
    const newStatus = event.target.value as string;
    setStatus(newStatus);
  }

  const handleSubmit = async (values: EditCategory) => {
    setIsLoading(true);

    const Url = ApiUrl + `/category/update`;
    try {
      await fetch(Url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials : 'include',
      });
      Swal.fire({
        icon: 'success',
        title: 'Add Category Success',
        text: 'Successfully added category.',
        });
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };  

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
          <Card
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300px',
              padding: '20px'}}>
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              Edit Category
            </Typography>
            <Form onSubmit={handleSubmit}>
              <CardContent>
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel htmlFor="status">Status</InputLabel>
                  <Select
                    label="Status"
                    name="status"
                    placeholder="Choose new status"
                    onChange={handleStatus}
                    value={status}
                    required
                  >
                    <MenuItem value={"Not started"}>Not started</MenuItem>
                    <MenuItem value={"Rejected"}>Rejected</MenuItem>
                    <MenuItem value={"Approved"}>Approved</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
              <Button
                style={{ marginBottom: 10 }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading || isSubmitting}
                fullWidth
              >
                {isLoading ? "Updating..." : "Update"}
              </Button>
              <Button
                className="btnTop"
                onClick={handleCancel}
                variant="outlined"
                color="primary"
                fullWidth
              >
                Cancel
              </Button>
            </Form>
          </Card>
        )}
      </Formik>
    </>
  );
};

export default EditCategory;
