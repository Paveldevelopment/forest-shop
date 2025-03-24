import { useEffect, useState } from "react";
import { Product } from "../types/product";
import * as productService from "../services/productService";

const useProducts = (includeInactive?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.fetchProducts(includeInactive);
      setProducts(data);
    } catch (e) {
      setError("Nepodařilo se načíst produkty");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [includeInactive]);

  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      const newProduct = await productService.createProduct(product);
      setProducts((prev) => [...prev, newProduct]);
    } catch (e) {
      setError("Nepodařilo se přidat produkt");
    }
  };

  const editProduct = async (id: number, product: Omit<Product, "id">) => {
    try {
      const updatedProduct = await productService.updateProduct(id, product);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p))
      );
    } catch (e) {
      setError("Nepodařilo se aktualizovat produkt");
    }
  };

  const removeProduct = async (id: number) => {
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      setError("Nepodařilo se smazat produkt");
    }
  };

  return { products, loading, error, addProduct, editProduct, removeProduct };
};

export default useProducts;
