import React from 'react';
// Importa a biblioteca React, necessária para criar componentes funcionais em React.

import CadastroExercicio from '../../components/Cadastro/CadastroExercicio/CadastroExercicio';
// Importa o componente CadastroExercicio, que está localizado na pasta '../../components/CadastroExercicio/CadastroExercicio'.
// Este componente é responsável pelo formulário ou funcionalidade de cadastro de exercícios.

import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

function ExercicioCadastro() {
    // Define um componente funcional chamado ExercicioCadastro.
    return (
        <div>
            <Navegacao />
            <CadastroExercicio />
        </div>
        // Utiliza uma <div> para agrupar os componentes Navegacao e CadastroExercicio.
    );
}

export default ExercicioCadastro;
// Exporta o componente ExercicioCadastro como padrão, permitindo que ele seja importado e usado em outras partes da aplicação.
