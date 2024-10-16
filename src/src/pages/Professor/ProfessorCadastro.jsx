import CadastroProfessor from '../../components/Cadastro/CadastroProfessor';
// Importa o componente CadastroProfessor, localizado na pasta '../../components/Cadastro/CadastroProfessor'.
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
    );
}

//exporta o componente cadastro para ser usado em outras partes da aplicação.
export default cadastro;