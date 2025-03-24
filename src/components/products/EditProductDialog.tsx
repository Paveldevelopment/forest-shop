import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ProductForm, { ProductFormValues } from "./ProductForm";
import { Product } from "../../types/product";

interface EditProductDialogProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSubmit: (id: number, values: ProductFormValues) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  open,
  product,
  onClose,
  onSubmit,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  if (!product) {
    return null;
  }

  const initialValues: ProductFormValues = {
    name: product.name,
    price: product.price,
    stockQuantity: product.stockQuantity,
  };

  const handleFormSubmit = (values: ProductFormValues) => {
    onSubmit(product.id, values);
  };

  const handleSaveClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upravit produkt</DialogTitle>
      <DialogContent>
        <ProductForm
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          showSubmitButton={false}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zrušit</Button>
        <Button variant="contained" onClick={handleSaveClick}>
          Uložit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
