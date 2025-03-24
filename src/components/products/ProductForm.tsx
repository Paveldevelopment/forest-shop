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
  innerRef?: React.MutableRefObject<HTMLFormElement | null>;
  showSubmitButton?: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Název je povinný"),
  price: Yup.number()
    .required("Cena je povinná")
    .min(1, "Cena musí být kladná"),
  stockQuantity: Yup.number()
    .required("Množství na skladě je povinné")
    .min(1, "Množství musí být kladné"),
});

const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
  innerRef,
  showSubmitButton = true,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form ref={innerRef}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              margin="normal"
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
              fullWidth
              margin="normal"
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
              fullWidth
              margin="normal"
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
            {showSubmitButton && (
              <Button variant="contained" type="submit">
                Uložit
              </Button>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
