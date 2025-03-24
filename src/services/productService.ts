import api from "./api";
import { Product } from "../types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/products");
  return response.data;
};

export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const response = await api.post<Product>("/products", product);
  return response.data;
};

export const updateProduct = async (
  id: number,
  product: Omit<Product, "id">
): Promise<Product> => {
  // const response = await api.put<Product>(`/products/${id}`, product); // PAV
  const response = await api.patch<Product>(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
