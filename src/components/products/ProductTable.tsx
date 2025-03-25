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
import { Product } from "../../types/product";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatCurrency } from "../../utils/formatters";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Název produktu</TableCell>
          <TableCell>Cena</TableCell>
          <TableCell>Množství na skladě</TableCell>
          <TableCell>Stav</TableCell>
          <TableCell align="right">Akce</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell>{product.stockQuantity}</TableCell>
            <TableCell>{product.isActive ? "Aktivní" : "Neaktivní"}</TableCell>
            <TableCell align="right">
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
};

export default ProductTable;
