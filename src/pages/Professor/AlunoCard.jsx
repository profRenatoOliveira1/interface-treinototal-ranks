import React from 'react';
// Importa a biblioteca React, que é necessária para criar componentes funcionais em React.
import CardProfessor from '../../components/Cards/CardProfessor'
// Importa o componente CardProfessor, que está localizado na pasta '../../components/Cards/CardProfessor'.
// Este componente é responsável pelo formulário ou funcionalidade de cards de professores.
import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, que está localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

function ProfessorCard() {
    // Define um componente funcional chamado AlunoCadastro.
    return (
        // Define um componente funcional chamado ProfessorCard.
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <Navegacao /> {/* Renderiza o componente de navegação */}
            <CardProfessor /> {/* Renderiza o componente de cards de professores */}
        </>
    );
}
//exporta o componente AlunoCadastro para ser usado em outras partes da aplicação.
export default ProfessorCard;