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
      navigate("/", { state: { message: "Produkt byl úspěšně přidán." } });
    } catch (error) {
      console.error("Chyba při přidávání produktu:", error);
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Přidat nový produkt
      </Typography>
      {/* Zde se nepředává innerRef ani showSubmitButton, takže se zobrazí tlačítko Uložit */}
      <ProductForm
        initialValues={{ name: "", price: 0, stockQuantity: 0 }}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateProductPage;
