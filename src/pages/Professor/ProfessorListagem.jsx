import Navegacao from '../../components/Navegacao/Navegacao';
// Importa o componente Navegacao, localizado na pasta '../../components/Navegacao/Navegacao'.
// Este componente provavelmente contém a barra de navegação ou menu do aplicativo.
import ListagemProfessor from '../../components/Listagem/ListagemProfessor';
// Importa o componente ListagemProfessor, localizado na pasta '../../components/Listagem/ListagemProfessor'.
// Este componente é responsável por exibir a listagem de professores.

// Componente responsável por renderizar a página de cadastro de professores.
function cadastro() {
    // Define um componente funcional chamado cadastro.
    return (
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <Navegacao /> {/* Renderiza o componente de navegação */}
            <ListagemProfessor /> {/* Renderiza o componente de listagem de professores */}
        </>
    );
}

//exporta o componente de cadastro de professores como padrão, permitindo que ele seja importado e usado em outras partes da aplicação.
export default cadastro;