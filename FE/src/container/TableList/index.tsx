import React, { useContext, useEffect } from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuthChecker } from "../../hook";
import { StyledTableCell, StyledTableRow, mainDivStyle, secondSubStyle, subDivStyle } from "../../component/TableStyle";
import { AppContext } from "../../provider/AppProvider";
import useFetchApi from "../../utils/FetchApi";
import Swal from "sweetalert2";

const TableList: React.FC = () => {
  useAuthChecker();
  const { fetchList, deleteTask, handleLogout } = useFetchApi();
  const { categories, setCategories } = useContext(AppContext);
  const navigate = useNavigate();

  const getList = async () => {
    const response = await fetchList();
    if (response?.ok) {
      const data = await response.json();
      setCategories(data.result.data);
    } else {
      console.error("Failed to fetch categories");
    }
  };
  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteList = async (id: string) => {
    const response = await deleteTask(id);
    if (response?.ok) {
      setCategories((categories) =>
        categories.filter((category) => category._id !== id)
      );
      Swal.fire({
        icon: "success",
        title: "Task Delete",
        text: "Successfully deleting task",
      });
    } else if(response?.status == 403) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "You dont have authorization to delete current task",
      });
    }
  };
  return (
    <div style={mainDivStyle}>
      <div style={subDivStyle}>
        <div style={secondSubStyle}>
          <Button size="large" onClick={() => navigate("/add")}>
            Add category
          </Button>
          <div style={{ display: "flex", gap: "5px" }}>
            <Button
              variant="outlined"
              color="error"
              size="medium"
              onClick={handleLogout}
              style={{ padding: "0 8px" }}>
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
                categories.map((category: any) => (
                  <StyledTableRow key={category._id} className="tr">
                    <StyledTableCell
                      align="center"
                      className="td"
                      style={{ maxWidth: "200px", overflow: "auto" }}>
                      {category.task}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {category.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {category.maker}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="td">
                      <Stack
                        direction="row"
                        justifyContent={"flex-end"}
                        spacing={2}>
                        <Button
                          onClick={() => navigate(`/edit/${category._id}`)}
                          data-testid={`edit-button-${category._id}`}
                          variant="outlined"
                          startIcon={<Edit />}
                          className="btn-edit"
                          size="small"
                          style={{ height: 25 }}>
                          edit
                        </Button>
                        <Button
                          color="error"
                          variant="contained"
                          data-testid={`delete-button-${category._id}`}
                          onClick={() => deleteList(category._id)}
                          endIcon={<DeleteIcon />}
                          size="small"
                          style={{ height: 25 }}>
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

export default TableList;
