import React from 'react';  // Importa o React para permitir o uso de JSX
import Formimc from '../../components/Formimc/Formimc';  // Importa o componente Formimc
import Navegacao from '../../components/Navegacao/Navegacao';  // Importa o componente Navegacao

function indiceimc() {  // Define um componente funcional chamado indiceimc
    return (
        <div>  {/* Renderiza um elemento div */}
            <Navegacao />  {/* Renderiza o componente de navegação */}
            <Formimc />  {/* Renderiza o componente do formulário de IMC */}
        </div>
    );
}

export default indiceimc;  // Exporta o componente indiceimc como o export padrão