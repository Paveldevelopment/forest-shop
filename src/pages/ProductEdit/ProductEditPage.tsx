import React from "react";
import { Container, Typography } from "@mui/material";
import ProductForm, {
  ProductFormValues,
} from "../../components/products/ProductForm";

const initialValues: ProductFormValues = {
  name: "",
  price: 0,
  stockQuantity: 0,
};

const ProductEditPage: React.FC = () => {
  const handleSubmit = (values: ProductFormValues) => {
    console.log("Odeslaná data:", values);
    // Zde implementujte logiku pro úpravu nebo vytvoření produktu
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Editace produktu
      </Typography>
      <ProductForm initialValues={initialValues} onSubmit={handleSubmit} />
    </Container>
  );
};

export default ProductEditPage;
