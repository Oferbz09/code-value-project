import React, {useState} from 'react';
import ProductForm from './ProductForm.tsx';
import ProductList from './ProductList.tsx';
import styled from 'styled-components';
import {Product} from "../types/product.type.ts";
import SearchBar from "./SearchBar.tsx";
import {Pagination} from './Pagination.tsx';
import {useProductContext} from "../productContext.tsx";


const MainContent: React.FC = () => {
    const { filteredAndSortedProducts } = useProductContext();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [page, setPage] = useState(1);
    const PRODUCTS_PER_PAGE = 5;
    const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;

    const handlePageNumberChange = (selectedPage: number) => {
        if (page !== selectedPage) {
            setPage(selectedPage);
        }
    };

    const handleClearSelection=()=>{
        setSelectedProduct(null);
    }

    return (
    <MainContentWrapper>
        <SearchBar handleClearSelection={handleClearSelection}/>
        <div className={'productContainer'}>
            <ProductList setSelectedProduct={setSelectedProduct} startIndex={startIndex} endIndex={endIndex} />
            <ProductForm selectedProduct={selectedProduct}/>
        </div>
        <Pagination
            page={page}
            totalPages={totalPages}
            handlePagination={handlePageNumberChange}
        />

    </MainContentWrapper>
  );
};


const MainContentWrapper = styled.div`
    margin: 15px auto;
    background: #fff;
    border-radius: 10px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    width: 95%;
  


    .productContainer{
        background: #fff;
        border-radius: 10px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        width: 100%;
        justify-content: space-evenly;
        gap: 20px;
        align-items: flex-start;

        @media (max-width: 1024px){
            flex-direction: column-reverse;
        }
    }
`


export default MainContent;
