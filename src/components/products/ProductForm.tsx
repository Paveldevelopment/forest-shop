import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";

export interface ProductFormValues {
  name: string;
  price: number;
  stockQuantity: number;
}

interface ProductFormProps {
  initialValues: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Název je povinný"),
  price: Yup.number()
    .required("Cena je povinná")
    .min(0, "Cena musí být kladná"),
  stockQuantity: Yup.number()
    .required("Množství na skladě je povinné")
    .min(0, "Množství musí být kladné"),
});

const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              id="name"
              name="name"
              label="Název produktu"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              id="price"
              name="price"
              label="Cena"
              type="number"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.price && Boolean(errors.price)}
              helperText={touched.price && errors.price}
            />
            <TextField
              id="stockQuantity"
              name="stockQuantity"
              label="Množství na skladě"
              type="number"
              value={values.stockQuantity}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.stockQuantity && Boolean(errors.stockQuantity)}
              helperText={touched.stockQuantity && errors.stockQuantity}
            />
            <Button variant="contained" type="submit">
              Uložit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
