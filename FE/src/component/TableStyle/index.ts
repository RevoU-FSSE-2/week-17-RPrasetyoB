import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell"

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
    padding: "8px 16px",
  },
}));

const mainDivStyle = {
  alignItems: "center",
  padding: "auto",
  backgroundColor: "rgb(223, 222, 222)",
  width: "100%",
  height: "100vh",
  position: "relative" as "relative",
};

const mainDivStyleMobile = {
  alignItems: "center",
  padding: "auto",
  backgroundColor: "rgb(223, 222, 222)",
  width: "100%",
  height: "100vh",
  position: "relative" as "relative",
};

const subDivStyle = {
  paddingTop: "10vh",
  width: "700px",
  textAlign: "center" as "center",
  marginLeft: "auto",
  marginRight: "auto",
};

const subDivStyleMobile = {
  paddingTop: "5vh",
  width: "auto",
  textAlign: "center" as "center",
  marginLeft: "auto",
  marginRight: "auto",
};

const secondSubStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "5px",
  height: "30px",
  marginLeft: "auto",
  marginRight: "auto"
}

export { subDivStyleMobile, StyledTableRow, StyledTableCell, mainDivStyle, subDivStyle, secondSubStyle };
