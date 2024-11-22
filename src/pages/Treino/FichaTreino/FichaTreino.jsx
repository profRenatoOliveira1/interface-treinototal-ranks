import React from 'react';
import FichaTreino from '../../../components/Fichas/FichaTreino';
import Navegacao from '../../../components/Navegacao/Navegacao';

/**
 * Página de criação ficha de treino
 * @returns web page
 */
function CriarTreino() {
    return (
        <div>
            <Navegacao />
            <FichaTreino />
        </div>
    );
}

export default CriarTreino;
