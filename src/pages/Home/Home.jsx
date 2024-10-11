import './Home.css';
// Importa o arquivo de estilos CSS específico para o componente Home.

import React from 'react';
// Importa a biblioteca React, necessária para criar componentes funcionais em React.

import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

import CarrosselHome from '../../components/Home/CarrosselHome/CarrosselHome';
// Importa o componente CarrosselHome, localizado na pasta '../../components/CarrosselHome/CarrosselHome'.
// Este componente provavelmente exibe uma imagem de fundo específica para a página inicial.

import ConteudoDaHome from '../../components/Home/ConteudoDaHome/ConteudoDaHome';
// Importa o componente ConteudoDaHome, localizado na pasta '../../components/ConteudoDaHome/ConteudoDaHome'.
// Este componente provavelmente contém o conteúdo principal da página inicial.

import CardHome from '../../components/Home/CardHome/CardHome';
// Importa o componente CardHome, localizado na pasta '../../components/Home/CardHome/CardHome'.
// Este componente provavelmente contém o conteúdo principal da página inicial.

import FooterHome from '../../components/Home/FooterHome/FooterHome';
// Importa o componente FooterHome, localizado na pasta '../../components/Home/FooterHome/FooterHome'.
// Este componente provavelmente contém o conteúdo principal da página inicial.

function Home() {
  // Define um componente funcional chamado Home.
  return (
    <>
      {/* Renderiza o componente de navegação */}
      <Navegacao></Navegacao>

      {/* Div principal contendo o conteúdo da página */}
      <div className='div-mae'>
        <div className='conteudoDaHome'>
          <ConteudoDaHome></ConteudoDaHome>
        </div>
        {/* Renderiza o componente ConteudoDaHome, exibindo o conteúdo principal da página inicial. */}

        <div className='CarrosselHome'>
          <CarrosselHome></CarrosselHome>
        </div>
        {/* Renderiza o componente CarrosselHome, exibindo a imagem de fundo da página inicial. */}

        <div className='cardHome'>
          <CardHome></CardHome>
        </div>
        {/* Renderiza o componente CardHome, exibindo a imagem de fundo da página inicial. */}

        <div className='footerHome'>
          <FooterHome></FooterHome>
        </div>
        {/* Renderiza o componente CardHome, exibindo a imagem de fundo da página inicial. */}

      </div>
    </>
    // As tags vazias (<></>) são fragmentos do React que permitem agrupar múltiplos elementos sem adicionar nós extras ao DOM.
  );
}

//exporta o componente Home para ser usado em outras partes da aplicação.
export default Home;