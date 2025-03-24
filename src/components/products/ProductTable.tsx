import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../../types/product";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Název produktu</TableCell>
          <TableCell>Cena</TableCell>
          <TableCell>Množství na skladě</TableCell>
          <TableCell>Akce</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.stockQuantity}</TableCell>
            <TableCell>
              <Tooltip title="Upravit">
                <IconButton onClick={() => onEdit(product)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Smazat">
                <IconButton onClick={() => onDelete(product)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ProductTable;
