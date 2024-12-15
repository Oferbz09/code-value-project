import React from 'react';
import MainContent from './components/MainContent.tsx';
import Header from "./components/Header.tsx";
import { ProductProvider } from './productContext.tsx';
import GlobalStyle from './styles/globalStyled';

const App : React.FC = ()=> {

  return (
    <ProductProvider>
        <GlobalStyle />
        <Header title={'My Store'}/>
        <MainContent />

    </ProductProvider>
  );
}



export default App
