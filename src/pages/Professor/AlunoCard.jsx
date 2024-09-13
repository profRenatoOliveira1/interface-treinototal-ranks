import React from 'react';
// Importa a biblioteca React, que é necessária para criar componentes funcionais em React.

import CardProfessor from '../../components/Cards/CardProfessor'
// Importa o componente CadastroAluno, que está localizado na pasta '../../components/CadastroAluno/CadastroAluno'.
// Este componente é responsável pelo formulário ou funcionalidade de cadastro de aluno.

import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, que está localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

function ProfessorCard() {
    // Define um componente funcional chamado AlunoCadastro.
    return (
        <>
            <Navegacao />
            <CardProfessor />
        </>
    );
}

export default ProfessorCard;//exporta o componente AlunoCadastro para ser usado em outras partes da aplicação.