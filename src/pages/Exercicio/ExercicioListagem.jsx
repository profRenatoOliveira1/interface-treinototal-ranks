import React from 'react';
// Importa a biblioteca React, necessária para criar componentes funcionais em React.

import ListagemExercicio from '../../components/Listagem/ListagemExercicios';
// Importa o componente ListagemExercicio, que está localizado na pasta '../../components/TabelaListagemExercicios/TabelaListagemExercicios'.
// Este componente é responsável por exibir a tabela de listagem de exercícios.

import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

function ExercicioListagem() {
    // Define um componente funcional chamado ExercicioListagem.
    return (
        <div>
            <Navegacao />
            <ListagemExercicio />
        </div>
        // Utiliza uma <div> para agrupar os componentes Navegacao e ListagemExercicio.
    );
}

export default ExercicioListagem;//exporta o componente ExercicioListagem para ser usado em outras partes da aplicação.
