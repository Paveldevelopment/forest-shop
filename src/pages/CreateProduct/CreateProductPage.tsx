import React from "react";
import { Container, Typography } from "@mui/material";
import ProductForm, {
  ProductFormValues,
} from "../../components/products/ProductForm";
import useProducts from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";

const CreateProductPage: React.FC = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      await addProduct(values);
      // Předáme hlášku do ProductListPage pomocí navigate state
      navigate("/", { state: { message: "Produkt byl úspěšně přidán." } });
    } catch (error) {
      console.error("Chyba při přidávání produktu:", error);
      // Můžete přidat vlastní obsluhu chyb (např. zobrazení notifikace)
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Přidat nový produkt
      </Typography>
      <ProductForm
        initialValues={{ name: "", price: 0, stockQuantity: 0 }}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateProductPage;
