import React from 'react';
// Importa a biblioteca React, necessária para criar componentes funcionais em React.
import ListarAluno from '../../components/Listagem/ListagemAlunos';
// Importa o componente ListarAluno, que está localizado na pasta '../../components/TabelaListagemAlunos/TabelaListagemAlunos'.
// Este componente é responsável por exibir a tabela de listagem de alunos.
import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

function AlunoListagem() {
    // Define um componente funcional chamado AlunoListagem.
    return (
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <Navegacao /> {/* Renderiza o componente de navegação */}
            <ListarAluno /> {/* Renderiza o componente de lista de alunos */}
        </>
        // Utiliza uma <div> para agrupar os componentes Navegacao e ListarAluno.
    );
}

//exporta o componente AlunoListagem para ser usado em outras partes da aplicação.
export default AlunoListagem;