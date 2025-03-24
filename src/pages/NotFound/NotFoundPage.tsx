import React from "react";
import { Container, Typography } from "@mui/material";

const NotFoundPage: React.FC = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Stránka nebyla nalezena
      </Typography>
      <Typography variant="body1">
        Omlouváme se, ale stránka, kterou hledáte, neexistuje.
      </Typography>
    </Container>
  );
};

export default NotFoundPage;
