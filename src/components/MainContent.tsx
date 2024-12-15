import React, {useEffect, useRef, useState} from 'react';
import ProductForm from './ProductForm.tsx';
import ProductList from './ProductList.tsx';
import styled from 'styled-components';
import {Product} from "../types/product.type.ts";
import SearchBar from "./SearchBar.tsx";
import {Pagination} from './Pagination.tsx';
import {useProductContext} from "../productContext.tsx";

const initialState = {
    name: '', description: '', price: 0
}
const MainContent: React.FC = () => {
    const { addProduct, updateProduct, filteredAndSortedProducts } = useProductContext();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [singleProduct, setSingleProduct] = useState(initialState);
    const submitRef = useRef<HTMLButtonElement>(null);


    //PAGINATION CONST
    const [page, setPage] = useState(1);
    const PRODUCTS_PER_PAGE = 5;
    const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;


    //check if there is a request to edit the product. place the product in the form
    useEffect(() => {
        if (selectedProduct){
            setSingleProduct(selectedProduct);
        }
        else {
            setSingleProduct(initialState);
        }

    }, [selectedProduct])


    //Check for Validation of the Form
    useEffect(() => {
        if (singleProduct?.name!=='' && singleProduct?.price>0){
            if (submitRef?.current){
                submitRef.current.disabled = false
            }
        }
        else {
            if (submitRef?.current){
                submitRef.current.disabled = true
            }
        }

    }, [singleProduct]);


    //
    const handlePageNumberChange = (selectedPage: number) => {
        if (page !== selectedPage) {
            setPage(selectedPage);
        }
    };


    //Clear Form
    const handleClearSelection=()=>{
        setSelectedProduct(null);
        setSingleProduct(initialState)
    }


    //Form Field Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>)=>{
        const { name, type } = e.target;
        let value: string | number = e.target.value;

        if (type==='number'){
            value = (Number(value) <0) ? 0 : parseInt(value, 10);
        }

        setSingleProduct((prevState) =>
            ({...prevState, [name]: value}));
    }


    //Generate a unique Number for ID
    const generateUniqueNumber = ()=> {
        return Number(Date.now()+ Math.random().toFixed(0));
    }

    //Send the Form (Save Products)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const new_Product = {
            id: selectedProduct?.id || generateUniqueNumber(),
            creationDate: new Date(),
            ...singleProduct
        }

        if (selectedProduct){
            if (updateProduct) {
                updateProduct(selectedProduct.id, new_Product)
            }
        }
        else {
            addProduct(new_Product);
        }

        setSelectedProduct(null);
        setSingleProduct(initialState)
    };

    return (
    <MainContentWrapper>
        <SearchBar handleClearSelection={handleClearSelection}/>
        <div className={'productContainer'}>
            <ProductList setSelectedProduct={setSelectedProduct} startIndex={startIndex} endIndex={endIndex} />
            <ProductForm submitRef={submitRef} handleSubmit={handleSubmit} handleChange={handleChange} singleProduct={singleProduct}/>
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
