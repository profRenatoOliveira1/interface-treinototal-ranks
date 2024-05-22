import './Home.css';
// Importa o arquivo de estilos CSS específico para o componente Home.

import React from 'react';
// Importa a biblioteca React, necessária para criar componentes funcionais em React.

import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

import ImgFundoHome from '../../components/ImgFundoHome/ImgFundoHome';
// Importa o componente ImgFundoHome, localizado na pasta '../../components/ImgFundoHome/ImgFundoHome'.
// Este componente provavelmente exibe uma imagem de fundo específica para a página inicial.

import ConteudoDaHome from '../../components/ConteudoDaHome/ConteudoDaHome';
// Importa o componente ConteudoDaHome, localizado na pasta '../../components/ConteudoDaHome/ConteudoDaHome'.
// Este componente provavelmente contém o conteúdo principal da página inicial.

function Home() {
  // Define um componente funcional chamado Home.
  return (
    <>
      {/* Renderiza o componente de navegação */}
      <Navegacao></Navegacao>

      {/* Div principal contendo o conteúdo da página */}
      <div className='div-mae'>
        <ImgFundoHome></ImgFundoHome>
        {/* Renderiza o componente ImgFundoHome, exibindo a imagem de fundo da página inicial. */}

        <ConteudoDaHome></ConteudoDaHome>
        {/* Renderiza o componente ConteudoDaHome, exibindo o conteúdo principal da página inicial. */}
      </div>
    </>
    // As tags vazias (<></>) são fragmentos do React que permitem agrupar múltiplos elementos sem adicionar nós extras ao DOM.
  );
}

export default Home;
// Exporta o componente Home como padrão, permitindo que ele seja importado e usado em outras partes da aplicação.
