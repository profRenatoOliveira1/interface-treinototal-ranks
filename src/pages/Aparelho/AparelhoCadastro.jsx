import React from 'react';
// Importa a biblioteca React, necessária para criar componentes funcionais em React.
import CadastroAparelho from '../../components/Cadastro/CadastroAparelho';
// Importa o componente CadastroAparelho, que está localizado na pasta '../../components/CadastroAparelho/CadastroAparelho'.
// Este componente é responsável pelo formulário ou funcionalidade de cadastro de aparelhos.
import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

function AparelhoCadastro() {
    // Define um componente funcional chamado AparelhoCadastro.
    return (
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <Navegacao /> {/* Renderiza o componente de navegação */}
            <CadastroAparelho /> {/* Renderiza o componente de cadastro de aparelhos */}
        </>
    );
}

//exporta o componente AparelhoCadastro para ser usado em outras partes da aplicação.
export default AparelhoCadastro;