import React from 'react';
import styled from 'styled-components';

export interface Props {
    page: number;
    totalPages: number;
    handlePagination: (page: number) => void;
}



export const Pagination: React.FC<Props> = ({
                                                         page,
                                                         totalPages,
                                                         handlePagination,
                                                     }) => {

    const handleNextPage = ()=>{
        if (page < totalPages) {
            handlePagination(page + 1);
        }
    }

    const handlePreviousPage = ()=>{
        if (page > 1) {
            handlePagination(page -1);
        }
    }


    return <PaginationWrapper>
            <button
                    onClick={handlePreviousPage}
                    className={`arrow ${page === 1 ? "pagination pagination__disabled" : "pagination"}`}>
                {"< Prev Page"}
                </button>

            <span>{page} of {totalPages}</span>

            <button onClick={handleNextPage} className={page >= totalPages ? 'pagination pagination__disabled' : 'pagination'}>
                {"Next Page >"}
            </button>



    </PaginationWrapper>

    ;
};




const PaginationWrapper = styled.div`
    display: flex;
    gap: 8px;
    right: 0;
    position: fixed;
    bottom: 0;
    margin: 44px;
    
    .pagination{
        border: unset;
        background-color: unset;
        cursor: pointer;
    }
    
    .pagination__disabled{
        pointer-events: none;
        cursor: not-allowed;
        background-color: gray;
        opacity: 0.5;
    }
    
    
`;



export default Pagination;
