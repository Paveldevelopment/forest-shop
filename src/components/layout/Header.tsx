import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Lišákův obchod
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Produkty
        </Button>
        <Button color="inherit" component={RouterLink} to="/create">
          Nový produkt
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
