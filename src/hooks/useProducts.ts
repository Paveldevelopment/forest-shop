import { useEffect, useState } from "react";
import { Product } from "../types/product";
import * as productService from "../services/productService";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log("products", products); // PAV

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.fetchProducts();
      setProducts(data);
    } catch (e) {
      setError("Nepodařilo se načíst produkty");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      const newProduct = await productService.createProduct(product);
      console.log("newProduct", newProduct); // PAV
      setProducts([...products, newProduct]);
    } catch (e) {
      setError("Nepodařilo se přidat produkt");
    }
  };

  const editProduct = async (id: number, product: Omit<Product, "id">) => {
    try {
      const updatedProduct = await productService.updateProduct(id, product);
      setProducts(products.map((p) => (p.id === id ? updatedProduct : p)));
    } catch (e) {
      setError("Nepodařilo se aktualizovat produkt");
    }
  };

  const removeProduct = async (id: number) => {
    try {
      await productService.deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (e) {
      setError("Nepodařilo se smazat produkt");
    }
  };

  return {
    products,
    loading,
    error,
    loadProducts,
    addProduct,
    editProduct,
    removeProduct,
  };
};

export default useProducts;
