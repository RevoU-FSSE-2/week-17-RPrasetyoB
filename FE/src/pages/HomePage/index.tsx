import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ApiUrl } from "../../utils/api";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { Category, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuthChecker } from "../../hook";

// table style //
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px 16px"
  },
}));

// interface //
interface Category {
  id: string;
  task: string;
  status: string;
  maker:string;
}

interface User {
  id: string
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  useAuthChecker()
  const [categories, setCategories] = useState<Category[]>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCategory = async () => {
    try {
      const Url = ApiUrl + "/v1/tasks";
      const response = await fetch(Url, {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        console.log('data',data)
        setCategories(data.result.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {  
        fetchCategory();
  }, []);

  // log out //
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    Swal.fire("Logged Out");
  };

  //fetch user
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUser = async ()=> {
    try {
      const Url = ApiUrl + '/v1/tasks'
      await fetch(Url, {
        method: 'GET',
        credentials: 'include'
      });
    } catch (error) {
      console.error(error);      
    }
  }
  useEffect(() => {  
    fetchUser();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Delete //
  const DeleteCategory = async (id: string) => {
    try {
      const Url = ApiUrl + `/category/${id}`;
      const response = await fetch(Url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });

      if (response.ok) {
        setCategories((categories) =>
          categories.filter((category) => category.id !== id)
        );
      } else {
        console.error("Failed to delete category. Status:", response.status);
      }
    } catch (error) {
      console.error("Error while deleting category:", error);
    }
  };


  return (
    <div style={{alignItems: "center",
      padding: "auto",
      backgroundColor: 'rgb(223, 222, 222)',
      width: "100%",
      height: '100vw',
      position: 'relative',
      overflow: 'auto'}}>
      <div style={{paddingTop: '10vh',
        width: '700px',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'}}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '5px',
          height: '30px',
          marginLeft: 'auto',
          marginRight: 'auto'}}>
          <Button size="large" onClick={() => navigate("/add")}>
            Add category
          </Button>
          <div style={{display: 'flex', gap: '5px'}}>
            <Button variant="outlined" color="error" size="medium" onClick={handleLogout} style={{padding: '0 8px'}}>
              Log Out
            </Button>         
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Maker</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <StyledTableCell colSpan={4} align="center">
                    No data
                  </StyledTableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <StyledTableRow key={category.id} className="tr">
                    <StyledTableCell align="center" className="td" style={{maxWidth: '200px', overflow: 'auto'}}>
                      {category.task}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {category.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {category.maker}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="td">
                      <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
                        <Button
                          onClick={() => navigate(`/edit/${category.id}`)}
                          data-testid={`edit-button-${category.id}`}
                          variant="outlined" startIcon={<Edit />}
                          className="btn-edit"
                          size="small"
                          style={{height: 25}}>
                            edit                 
                        </Button>
                        <Button
                          color="error"
                          variant="contained"
                          data-testid={`delete-button-${category.id}`}
                          onClick={() => DeleteCategory(category.id)}
                          endIcon={<DeleteIcon />}
                          size="small"
                          style={{height: 25}}>
                            del                       
                        </Button>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HomePage;
