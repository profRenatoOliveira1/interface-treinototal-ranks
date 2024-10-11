import React from 'react';
// Importa a biblioteca React, necessária para criar componentes funcionais em React.
import CadastroExercicio from '../../components/Cadastro/CadastroExercicio';
// Importa o componente CadastroExercicio, que está localizado na pasta '../../components/Cadastro/CadastroExercicio'.
// Este componente é responsável pelo formulário ou funcionalidade de cadastro de exercícios.
import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

function ExercicioCadastro() {
    // Define um componente funcional chamado ExercicioCadastro.
    return (
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <Navegacao /> {/* Renderiza o componente de navegação */}
            <CadastroExercicio /> {/* Renderiza o componente de cadastro de exercícios */}
        </>
    );
}

//exporta o componente ExercicioCadastro para ser usado em outras partes da aplicação.
export default ExercicioCadastro;