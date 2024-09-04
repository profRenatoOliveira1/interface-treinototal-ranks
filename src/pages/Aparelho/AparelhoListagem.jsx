import React from 'react';
// Importa a biblioteca React, necessária para criar componentes funcionais em React.

import ListarAparelho from '../../components/Listagem/ListagemAparelho';
// Importa o componente ListarAparelho, que está localizado na pasta '../../components/ListagemAparelho/ListagemAparelho'.
// Este componente é responsável por exibir a listagem de aparelhos.

import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

function AparelhoListagem() {
    // Define um componente funcional chamado AparelhoListagem.
    return (
        <div>
            <Navegacao />
            <ListarAparelho />
        </div>
        // Utiliza uma <div> para agrupar os componentes Navegacao e ListarAparelho.
    );
}

export default AparelhoListagem;//exporta o componente AparelhoListagem para ser usado em outras partes da aplicação.