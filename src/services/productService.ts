// src/services/productService.ts
import api from "./api";
import { Product } from "../types/product";

export const fetchProducts = async (
  includeInactive?: string
): Promise<Product[]> => {
  let url = "/products";
  // Pokud includeInactive je definováno a není prázdné, přidáme query parametr
  if (includeInactive && includeInactive !== "") {
    url += `?includeInactive=${includeInactive}`;
  }
  const response = await api.get<Product[]>(url);
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
  const response = await api.patch<Product>(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
