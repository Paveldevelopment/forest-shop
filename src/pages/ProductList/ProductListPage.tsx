import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import ProductTable from "../../components/products/ProductTable";
import DeleteConfirmationDialog from "../../components/common/DeleteConfirmationDialog";
import EditProductDialog from "../../components/products/EditProductDialog";
import { Product } from "../../types/product";
import useProducts from "../../hooks/useProducts";

const ProductListPage: React.FC = () => {
  // Stav pro filtr aktivních/neaktivních produktů:
  // "true" = Aktivní → předáme undefined (endpoint vrací pouze aktivní produkty)
  // "false" = Neaktivní → předáme "false" (endpoint obdrží parametr ?includeInactive=false a klientská filtrace ponechá jen inactive)
  const [activeFilter, setActiveFilter] = useState<string>("true");
  const includeInactiveParam: string | undefined =
    activeFilter === "true" ? undefined : "false";

  // Hook načítá produkty na základě předaného parametru
  const { products, loading, error, removeProduct, editProduct } =
    useProducts(includeInactiveParam);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Stavy pro dialogy
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  // Stav pro Snackbar notifikaci
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as any).message) {
      setSnackbarMessage((location.state as any).message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filterProducts = (
    query: string,
    prods: Product[],
    activeFilter: string
  ) => {
    const qLower = query.toLowerCase();
    let filtered = prods.filter(
      (p) =>
        p.name.toLowerCase().includes(qLower) ||
        p.price.toString().includes(query) ||
        p.stockQuantity.toString().includes(query)
    );
    // Pokud je vybráno "Neaktivní", ponecháme jen produkty, kde isActive === false
    if (activeFilter === "false") {
      filtered = filtered.filter((p) => p.isActive === false);
    }
    return filtered;
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setFilteredProducts(filterProducts(value, products, activeFilter));
  };

  const handleActiveFilterChange = (value: string) => {
    setActiveFilter(value);
  };

  useEffect(() => {
    setFilteredProducts(filterProducts(searchQuery, products, activeFilter));
  }, [products, searchQuery, activeFilter]);

  // Definice funkcí pro editaci a mazání
  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setEditDialogOpen(true);
  };

  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleEditSubmit = async (
    id: number,
    values: { name: string; price: number; stockQuantity: number }
  ) => {
    try {
      await editProduct(id, values);
      setSnackbarMessage("Produkt byl úspěšně aktualizován.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Chyba při aktualizaci produktu.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    setEditDialogOpen(false);
    setProductToEdit(null);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await removeProduct(productToDelete.id);
      setProductToDelete(null);
      setDeleteDialogOpen(false);
      setSnackbarMessage("Produkt byl úspěšně odstraněn.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setDeleteDialogOpen(false);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Evidenční seznam produktů
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <FormControl sx={{ minWidth: 120, marginLeft: 2 }}>
          <InputLabel id="active-filter-label">Aktivní</InputLabel>
          <Select
            labelId="active-filter-label"
            id="active-filter"
            value={activeFilter}
            label="Aktivní"
            onChange={(e) => handleActiveFilterChange(e.target.value as string)}
          >
            <MenuItem value="true">Aktivní</MenuItem>
            <MenuItem value="false">Neaktivní</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ProductTable
        products={filteredProducts}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <EditProductDialog
        open={editDialogOpen}
        product={productToEdit}
        onClose={() => {
          setEditDialogOpen(false);
          setProductToEdit(null);
        }}
        onSubmit={handleEditSubmit}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%", fontSize: "1.5rem", py: 2 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductListPage;
