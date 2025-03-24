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
  if (!product) return null;

  const initialValues: ProductFormValues = {
    name: product.name,
    price: product.price,
    stockQuantity: product.stockQuantity,
  };

  const handleSubmit = (values: ProductFormValues) => {
    onSubmit(product.id, values);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upravit produkt</DialogTitle>
      <DialogContent>
        <ProductForm initialValues={initialValues} onSubmit={handleSubmit} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zrušit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
