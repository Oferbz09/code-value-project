import React from 'react';
import styled from 'styled-components';
import Image from "../assets/Image.tsx";
import { useProductContext } from '../productContext.tsx';
import {Product} from "../types/product.type.ts";

interface ProductListProps {
  setSelectedProduct: (product: Product) =>void;
  startIndex: number;
  endIndex: number;
}

const ProductList: React.FC<ProductListProps> = ({setSelectedProduct, startIndex, endIndex}) => {
  const { filteredAndSortedProducts, deleteProduct } = useProductContext();

  const parseDate = (date: string) => {
    const newDate = new Date(date);
    return (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' +  newDate.getFullYear() + '  ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();

  }

  return (
    <ProductListWrapper>
      {filteredAndSortedProducts.slice(startIndex, endIndex)?.map((product) => (
        <ProductContainer key={product.id}>
          <ProductDetails onClick={() => setSelectedProduct(product)} >
            <li className={'product-img-container'}>
            <Image src="https://picsum.photos/80" alt={product.name} />
            </li>
            <li className={'product-text-container'}>
              <h3 className={'product-row h3'}>{product?.name}</h3>
              <p className={'product-row'}>{product?.description}</p>
              <p className={'product-row'}>{product?.price}</p>
              <p className={'product-row'}>{parseDate(product?.creationDate)}</p>
            </li>

          </ProductDetails>
          <>
          <button className={"product-delete-button"} onClick={() => deleteProduct(product?.id)}>Delete</button>
          </>
        </ProductContainer>
      ))}
    </ProductListWrapper>
  );
};

export default ProductList;

const ProductListWrapper = styled.div`
  position: relative;
  width: 100%;

  .product-delete-button {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 10px;
    padding: 3px 10px;
    cursor: pointer;
    background-color: #FF9900;
    font-weight: bold;
    border-radius: 3px;
    box-shadow: 1px 3px 2px 0px;
  }


`

const ProductContainer = styled.ul`
  padding: 15px;
  position: relative;
  margin: 0 0 10px 0;
  border: 1px solid black;
  border-radius: 10px;
  list-style: none;
`;

const ProductDetails = styled.div`
  padding: 10px;
  position: relative;
  margin: 0 auto;
  flex-direction: row;
  flex-wrap: nowrap;
  display: flex;
  gap: 20px;
  align-items: center;
  cursor: pointer;
  
  
  .product-img-container{
    width: auto;
    height: auto;
    object-fit: cover;
    position: relative;
  }
  
  
  .product-text-container{
    position: relative;
    gap: 10px;
    display: flex;
    flex-direction: column;
    width: auto;
    flex-wrap: wrap;

    p{
      word-break: break-word;
      margin: 5px 0;
      font-size: 14px;
      color: black;
    }
    h3 {
      margin: 0;
      font-size: 20px;
      font-weight: bold;
    }
  }


 
  
`;


