import React from 'react';
// Importa a biblioteca React, necessária para criar componentes funcionais em React.

import CadastroAparelho from '../../components/Cadastro/CadastroAparelho';
// Importa o componente CadastroAparelho, que está localizado na pasta '../../components/CadastroAparelho/CadastroAparelho'.
// Este componente é responsável pelo formulário ou funcionalidade de cadastro de aparelhos.

import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

function AparelhoCadastro() {
    // Define um componente funcional chamado AparelhoCadastro.
    return (
        <div>
            <Navegacao />
            <CadastroAparelho />
        </div>
        // Utiliza uma <div> para agrupar os componentes Navegacao e CadastroAparelho.
    );
}

export default AparelhoCadastro;
// Exporta o componente AparelhoCadastro como padrão, permitindo que ele seja importado e usado em outras partes da aplicação.
