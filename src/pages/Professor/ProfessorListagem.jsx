import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.

import ListarProfessor from '../../components/Listagem/ListagemProfessor';
// Importa o componente ListarProfessor, localizado na pasta '../../components/ListagemProfessor/ListagemProfessor'.
// Este componente é responsável por exibir a listagem de professores.

// Componente responsável por renderizar a página de cadastro de professores.
function cadastro() {
    // Define um componente funcional chamado cadastro.
    return (
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <Navegacao /> {/* Renderiza o componente de navegação */}
            <ListarProfessor /> {/* Renderiza o componente de listagem de professores */}
        </>
    );
}

export default cadastro; //exporta o componente de cadastro de professores como padrão, permitindo que ele seja importado e usado em outras partes da aplicação.
