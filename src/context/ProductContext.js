import { createContext, useState, useEffect } from "react";
import { getProducts } from "../services/productService"; // Import your service

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProductsData = async () => {
        setIsLoading(true);
        setError(null); 
        
        try {
            const data = await getProducts(); 
            setProducts(data);
        } catch (err) {
            setError("Failed to fetch products. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProductsData();
    }, []);

    return (
        <ProductContext.Provider value={{ products, isLoading, error, fetchProductsData }}>
            {children}
        </ProductContext.Provider>
    );
};