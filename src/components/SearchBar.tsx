import styled from "styled-components";
import React from "react";
import {useProductContext} from "../productContext.tsx";


interface SearchBarProps {
    handleClearSelection: () =>void;
}

const SearchBar: React.FC<SearchBarProps> = ({handleClearSelection}) => {
    const { searchTerm, setSearchTerm, setSortOption } = useProductContext();


       return (
        <SearchBarWrapper>
            <button className={'new-product-button'} onClick={handleClearSelection}>+Add</button>
            <div>

                    <input value={searchTerm}
                           className={'search-bar'}
                           placeholder={"search..."}
                           type={'search'}
                           onChange={(e) => setSearchTerm(e.target.value)}/>

            </div>

            <div className={"sort-container"}>
                <span>Sort By </span>
                <select onChange={(e) => setSortOption(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="date">Recently Added</option>
                </select>
            </div>
        </SearchBarWrapper>
    );
};


const SearchBarWrapper = styled.div`


    width: 50%;
    padding: 10px 0 15px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 20px;
    margin-bottom: 20px;
    align-items: center;
    @media (max-width: 1024px){
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: self-start;
    }
    
        

    .new-product-button {
        position: relative;
        right: 0;
        bottom: 0;
        margin: 10px;
        padding: 2px 10px;
        cursor: pointer;
        background-color: #B6D7A8;
        font-weight: 900;
        border-radius: 3px;
        box-shadow: 1px 3px 2px 0px;
    }
    
    .sort-container{
        display: flex;
        flex-direction: row;
        gap: 10px;
        flex-wrap: nowrap;
        padding: 10px;
        align-items: center;
    }

    .search-bar{
        padding: 10px;
    }
    
    
    select {
        padding: 10px;
    }
    
`

export default SearchBar;
