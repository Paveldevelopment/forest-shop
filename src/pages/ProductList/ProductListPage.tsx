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
  const { products, loading, error, removeProduct, editProduct } =
    useProducts();
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Uložíme hodnotu filtru pro isActive jako string ("true" nebo "false") – defaultně "true"
  const [activeFilter, setActiveFilter] = useState<string>("true");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  // Stav pro editaci produktu
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  // Stav pro Snackbar notifikaci
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const location = useLocation();

  // Pokud byla předána hláška přes state při navigaci (např. po přidání produktu), zobrazíme ji
  useEffect(() => {
    if (location.state && (location.state as any).message) {
      setSnackbarMessage((location.state as any).message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      // Vyčistíme state, aby se hláška nezobrazovala opakovaně
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Pomocná funkce pro filtrování produktů podle vyhledávacího dotazu a filtru isActive
  const filterProducts = (query: string, active: string, prods: Product[]) => {
    const qLower = query.toLowerCase();
    return prods.filter(
      (p) =>
        p.isActive === (active === "true") &&
        (p.name.toLowerCase().includes(qLower) ||
          p.price.toString().includes(query) ||
          p.stockQuantity.toString().includes(query))
    );
  };

  // Obsluha změny vyhledávacího dotazu
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setFilteredProducts(filterProducts(value, activeFilter, products));
  };

  // Obsluha změny filtru podle isActive
  const handleActiveFilterChange = (value: string) => {
    setActiveFilter(value);
    setFilteredProducts(filterProducts(searchQuery, value, products));
  };

  // Aktualizace filtrovaných produktů při změně původního seznamu, vyhledávacího dotazu nebo filtru isActive
  useEffect(() => {
    setFilteredProducts(filterProducts(searchQuery, activeFilter, products));
  }, [products, searchQuery, activeFilter]);

  // Obsluha kliknutí na ikonu editace
  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setEditDialogOpen(true);
  };

  // Callback po odeslání formuláře v dialogu pro editaci
  const handleEditSubmit = async (
    id: number,
    values: { name: string; price: number; stockQuantity: number }
  ) => {
    try {
      await editProduct(id, values);
      console.log("Produkt byl úspěšně aktualizován.");
      setSnackbarMessage("Produkt byl úspěšně aktualizován.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Chyba při aktualizaci produktu:", error);
      setSnackbarMessage("Chyba při aktualizaci produktu.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    setEditDialogOpen(false);
    setProductToEdit(null);
  };

  // Obsluha smazání – otevření dialogu
  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
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
