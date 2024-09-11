import React from 'react';
// Importa a biblioteca React, que é necessária para criar componentes funcionais em React.

import CardAluno from '../../components/Cards/CardAluno'
// Importa o componente CadastroAluno, que está localizado na pasta '../../components/CadastroAluno/CadastroAluno'.
// Este componente é responsável pelo formulário ou funcionalidade de cadastro de aluno.

import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, que está localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

function AlunoCard() {
    // Define um componente funcional chamado AlunoCadastro.
    return (
        <>
            <Navegacao />
            <CardAluno />
        </>
        // As tags vazias (<></>) são fragmentos do React que permitem agrupar múltiplos elementos sem adicionar nós extras ao DOM.
    );
}

export default AlunoCard;//exporta o componente AlunoCadastro para ser usado em outras partes da aplicação.