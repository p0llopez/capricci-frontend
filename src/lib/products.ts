import type { Product } from "../types/Product";

const API_BASE_URL = "https://capricci-backend.onrender.com/api";

const fetchFromAPI = async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
};

export const getProduct = async (id: string): Promise<Product> => {
    const product = await fetchFromAPI(`/products/${id}`) as Product;
    return product;
};

export const getProducts = async (): Promise<Product[]> => {
    const products = await fetchFromAPI("/products") as Product[];
    return products;
};