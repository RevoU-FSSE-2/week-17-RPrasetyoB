import React, { useContext, useState } from "react";
import { Form, Formik } from "formik";
import { Button, Card, Typography, CardContent, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthChecker } from "../../hook";
import { ApiUrl } from "../../utils/api";
import { AppContext } from "../../provider/AppProvider";

const validationSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
});

interface EditCategory {
  status: string;
}

const EditCategory: React.FC = () => {
  const navigate = useNavigate();
  const { _id } = useParams<{ _id: string }>();
  const { categories } = useContext(AppContext);
  useAuthChecker();

  const category = categories.find((category) => category._id === _id);

  const initialValues: EditCategory = {
    status: category?.status || "",
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: EditCategory) => {
    setIsLoading(true);

    const Url = ApiUrl + `/v1/tasks/${category?._id}`;
    try {
      const response = await fetch(Url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });
      if(response.ok){
        Swal.fire({
          icon: 'success',
          title: 'Update Category Success',
          text: 'Successfully updated category.',
        });
      }
      navigate('/home');
    } catch (error) {
      console.error("Error updating category", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/home');
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
          isSubmitting,
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
        }) => (
          <Card
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300px',
              padding: '20px',
            }}
          >
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status}
                    required
                  >
                    <MenuItem value="Not started">Not started</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                  </Select>
                </FormControl>
                {touched.status && errors.status && (
                  <div className="error">{errors.status}</div>
                )}
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
