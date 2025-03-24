import React from "react";
import MuiButton from "@mui/material/Button";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "text" | "contained" | "outlined";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return <MuiButton {...props}>{label}</MuiButton>;
};

export default Button;
