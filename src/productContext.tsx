import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {Product} from './types/product.type.ts'


interface ProductContextType {
    products: Product[];
    filteredAndSortedProducts: Product[];
    addProduct: (product: { id: any; creationDate: Date; name: string; description: string; price: number })=>void;
    deleteProduct: (id: number) => void;
    updateProduct: (id: number, product: {
        id: any;
        creationDate: Date;
        name: string;
        description: string;
        price: number
    }) => void;
    setSortOption: (option: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}


const ProductContext = createContext<ProductContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useProductContext(): ProductContextType {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProduct must be used within a ThemeProvider');
    }
    return context;
}

interface ProductProviderProps {
    children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('name');


    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);



    const addProduct = (product: Product): void => {
        const updatedProducts = [...products, product];
        setProducts(updatedProducts);
        saveToLocalStorage(updatedProducts);
    };

    const updateProduct = (id: number, updatedProduct: Product): void => {
        const mappedProduct = products?.map((product) =>
            product.id === id ? updatedProduct : product
        );
        setProducts(mappedProduct);
        saveToLocalStorage(mappedProduct);
    };

    const deleteProduct = (id: number) => {
        const updatedProduct = products?.filter((product) => product.id !== id);
        setProducts(updatedProduct);
        saveToLocalStorage(updatedProduct);
    };

        const saveToLocalStorage = (updatedProduct: Product[]) => {
        localStorage.setItem('products', JSON.stringify(updatedProduct));
    };

    const filterProducts = (products: Product[], term: string) => {
        return products.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
    };

    const sortProducts = (products: Product[], option: string) => {
        if (option === 'name') {
            return [...products].sort((a, b) => a.name.localeCompare(b.name));
        } else if (option === 'date') {
            return [...products].sort(
                (a:Product, b: Product) => {
                    return (new Date(b.creationDate)) - (new Date(a.creationDate));
                }
            );
        }
        return products;
    };

    const filteredProducts = filterProducts(products, searchTerm);
    const filteredAndSortedProducts = sortProducts(filteredProducts, sortOption);


    return (
        <ProductContext.Provider value={{ products, searchTerm, addProduct, updateProduct, deleteProduct, setSearchTerm,
            setSortOption,filteredAndSortedProducts }}
        >
            {children}
        </ProductContext.Provider>
    );
}