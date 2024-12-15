import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
    title: string
}

const Header: React.FC<HeaderProps>= ({title})=> {
    return (
        <HeaderWrapper className={'title-container'}>
        <h1 className={'title'}> {title}</h1>
        </HeaderWrapper>
    )

}


const HeaderWrapper = styled.header`
    background-color: #9FC5F8;
    height: 60px;
    width: 100%;

    .title {
        font-size: 24px;
        color: black;
        padding: 0 25px;
        margin: auto 0;
        height: 100%;
        display: flex;
        align-content: center;
        align-items: center;
    }

`

export default Header