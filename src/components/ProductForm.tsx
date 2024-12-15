import React, {FormEvent} from 'react';
import styled from 'styled-components';
import Image from "../assets/Image.tsx";

interface ProductFormProps {
    singleProduct?: { name: string; description: string; price: number }
    handleSubmit?: (e: FormEvent) => void,
    submitRef?: React.LegacyRef<HTMLButtonElement> | undefined,
    handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
}


const ProductForm: React.FC<ProductFormProps> = ({
                                                     singleProduct,
                                                     handleSubmit,
                                                     handleChange,
                                                     submitRef,
                                                 }) => {

    debugger;
    return (
        <FormWrapper onSubmit={handleSubmit}>
            <fieldset>
                <legend>{`Product ${singleProduct?.name} Details`} </legend>
                <Image src="https://picsum.photos/80" alt={singleProduct?.name}/>
                <div className={'form-group'}>
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        id={'productName'}
                        placeholder="Name"
                        name={'name'}
                        maxLength={30}
                        value={singleProduct?.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={'form-group'}>
                    <label htmlFor="description">Product Description</label>
                    <textarea
                        className={'form-textarea'}
                        placeholder="Description"
                        value={singleProduct?.description}
                        name={'description'}
                        onChange={handleChange}
                        maxLength={200}
                    />

                </div>
                <div className={'form-group'}>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        placeholder="Price"
                        name={'price'}
                        value={singleProduct?.price}
                        onChange={handleChange}
                        required
                        min={0}

                    />
                    <span>$</span>
                </div>


                <button ref={submitRef} className={"form-button"} type={'submit'}>Save</button>
            </fieldset>

        </FormWrapper>
    );
};


const FormWrapper = styled.form`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    align-items: stretch;
    justify-content: space-evenly;


    fieldset {
        border-radius: 4px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;

    }


    img {
        height: 60px;
        width: 80px;
        border: 1px solid;
    }


    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: block;
        margin-bottom: 10px;
        width: fit-content;
    }

    .form-group input {
        width: 96%;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    .form-textarea {
        border-radius: 4px;
        height: 80px;
        resize: vertical;
        width: 98%;
    }

    .form-button {
        width: fit-content;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: wrap;
        margin-left: auto;
        background-color: #B8D9AA;
        color: black;
        font-weight: 600;
        opacity: 1;
        box-shadow: 1px 3px 2px 0px;
        cursor: pointer;
        padding: 3px 10px;
        border-radius: 3px;

    }

    input[type="number"] {
        width: 5%;
    }

    .form-button:disabled {
        background-color: #d3d3d3;
        color: #666666;
        cursor: not-allowed;
        opacity: 0.7;
    }

`


export default ProductForm;
