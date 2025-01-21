
import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./NotFound.css";

import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorOutlineIcon />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
