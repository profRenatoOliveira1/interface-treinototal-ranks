import React from 'react';
import ListagemExercicio from '../../components/TabelaListagemExercicios/TabelaListagemExercicios';
import Navegacao from '../../components/Navegacao/Navegacao';

function ExercicioListagem() {
    return (
        <div>
            <Navegacao />
            <ListagemExercicio />
        </div>
    );
}

export default ExercicioListagem;
