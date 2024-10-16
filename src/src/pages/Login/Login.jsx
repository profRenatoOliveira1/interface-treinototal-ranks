import React from 'react';
// Importa a biblioteca React
import Login from '../../components/Login/Login';
// Importa o componente Login, que está localizado na pasta '../../components/Login/Login'.
// Este componente é responsável por exibir a Login de usuários.
import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

function PaginaLogin() {
        // Define um componente funcional chamado AparelhoListagem.
    return (
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <Navegacao /> {/* Renderiza o componente de navegação */}
            <Login /> {/* Renderiza o componente de login */}
        </>
    );
}

// Exporta o componente PaginaLogin para ser utilizado em outras partes da aplicação
export default PaginaLogin;
