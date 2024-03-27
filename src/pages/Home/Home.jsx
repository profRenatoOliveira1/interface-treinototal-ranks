import './Home.css';
import React from 'react';
import Navegacao from '../../components/Navegacao/Navegacao';
import ImgFundoHome from '../../components/ImgFundoHome/ImgFundoHome'; // Verifique se o caminho está correto
import ConteudoDaHome from '../../components/ConteudoDaHome/ConteudoDaHome'; // Corrija o nome se necessário


function Home() {
  return (
    <>
      {/* Renderiza o componente de navegação */}
      <Navegacao></Navegacao>
    
      {/* Div principal contendo o conteúdo da página */}
      <div className='div-mae'>
        <ImgFundoHome></ImgFundoHome>
        <ConteudoDaHome></ConteudoDaHome>
      </div>
    </>
  );
}

export default Home;
