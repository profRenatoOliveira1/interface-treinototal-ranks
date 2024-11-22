import React from 'react';
import CadastroTreino from '../../../components/Cadastro/CadastroTreino';
import Navegacao from '../../../components/Navegacao/Navegacao';

/**
 * Página criação teno
 * @returns web page
 */
function CriarTreino() {
    return (
        <div>
            <Navegacao />
            <CadastroTreino />
        </div>
    );
}

export default CriarTreino;
