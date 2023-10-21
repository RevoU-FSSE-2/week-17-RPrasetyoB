import React, { useContext, useEffect, useState } from "react";
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuthChecker } from "../../hook";
import { StyledTableCell, StyledTableRow, mainDivStyle, secondSubStyle, subDivStyle, subDivStyleMobile } from "../../component/TableStyle";
import { AppContext } from "../../provider/AppProvider";
import useFetchApi from "../../utils/FetchApi";
import Swal from "sweetalert2";
import { Card, CardContent } from "@mui/material";

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
    } else if (response?.status === 403) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "You don't have authorization to delete the current task",
      });
    }
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobileView = windowWidth < 768;

  return (
    <div style={mainDivStyle}>
      <div style={isMobileView ? subDivStyleMobile : subDivStyle}>
        <div style={secondSubStyle}>
          <div style={{ width: isMobileView ? '100%' : 'auto' }}>
            <div style={{ width: isMobileView ? '300px' : 'auto', margin: isMobileView ? 'auto' : 0,display: 'flex', justifyContent: 'space-between' }}>
              <Button size="large" onClick={() => navigate("/add")}>
                Add Task
              </Button>
              <div style={{ display: "flex", gap: "5px" }}>
                <Button
                  color="error"
                  size="medium"
                  onClick={handleLogout}
                  style={{ padding: "0 8px" }}
                >
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </div>
        {isMobileView ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {categories.length === 0 ? (
              <p>No data</p>
            ) : (
              categories.map((category: any) => (
                <Card key={category._id} style={{ marginBottom: "16px", width: "290px", }}>
                  <CardContent>
                    <h6 style={{fontStyle: "italic"}}>{category.task}</h6>
                    <Typography variant="body2"><span style={{fontWeight: 550}}>Status:</span>&nbsp;{category.status}</Typography>
                    <Typography variant="body2"><span style={{fontWeight: 550}}>Maker:</span>&nbsp;{category.maker}</Typography>
                    <div style={{marginTop: 15}}>
                      <Button
                        onClick={() => navigate(`/edit/${category._id}`)}
                        data-testid={`edit-button-${category._id}`}
                        variant="outlined"
                        style={{ marginRight: 5 }}
                        startIcon={<Edit />}
                        className="btn-edit"
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        color="error"
                        variant="contained"
                        style={{ marginLeft: 5 }}
                        data-testid={`delete-button-${category._id}`}
                        onClick={() => deleteList(category._id)}
                        endIcon={<DeleteIcon />}
                        size="small"
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ) : (
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
                        style={{ maxWidth: "200px", overflow: "auto" }}
                      >
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
                          spacing={2}
                        >
                          <Button
                            onClick={() => navigate(`/edit/${category._id}`)}
                            data-testid={`edit-button-${category._id}`}
                            variant="outlined"
                            startIcon={<Edit />}
                            className="btn-edit"
                            size="small"
                            style={{ height: 25 }}
                          >
                            Edit
                          </Button>
                          <Button
                            color="error"
                            variant="contained"
                            data-testid={`delete-button-${category._id}`}
                            onClick={() => deleteList(category._id)}
                            endIcon={<DeleteIcon />}
                            size="small"
                            style={{ height: 25 }}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default TableList;
