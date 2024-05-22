import React from 'react';
import ListarAluno from '../../components/TabelaListagemAlunos/TabelaListagemAlunos';
import Navegacao from '../../components/Navegacao/Navegacao';

function AlunoListagem() {
    return (
        <div>
            <Navegacao />
            <ListarAluno />
        </div>
    );
}

export default AlunoListagem;
