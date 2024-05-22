import './Professor.css';
// Importa os estilos CSS específicos para a página.

import CadastroProfessor from '../../components/CadastroProfessor/CadastroProfessor';
// Importa o componente CadastroProfessor, localizado na pasta '../../components/CadastroProfessor/CadastroProfessor'.
// Este componente é responsável pelo formulário ou funcionalidade de cadastro de professores.

import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

// Componente responsável por renderizar a página de cadastro de professores.
function cadastro() {
    // Define um componente funcional chamado cadastro.
    return (
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <Navegacao /> {/* Renderiza o componente de navegação */}
            <CadastroProfessor /> {/* Renderiza o componente de cadastro de professores */}
        </>
        // As tags vazias (<></>) são fragmentos do React que permitem agrupar múltiplos elementos sem adicionar nós extras ao DOM.
    );
}

export default cadastro; // Exporta o componente de cadastro de professores como padrão, permitindo que ele seja importado e usado em outras partes da aplicação.
