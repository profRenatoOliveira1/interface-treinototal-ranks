// Importa o componente 'AtualizarSenhaProfessor' da pasta de componentes
import AtualizarSenhaProfessor from "../../components/Update/UpdateSenhaProfessor";

// Importa o componente de navegação 'Navegacao'
import Navegacao from "../../components/Navegacao/Navegacao";

// Função 'ProfessorAtualizarSenha' que define a estrutura do componente
function ProfessorAtualizarSenha() {
    return (
        <>
            {/* Renderiza o componente de navegação */}
            <Navegacao />

            {/* Renderiza o componente para atualizar a senha do professor */}
            <AtualizarSenhaProfessor />
        </>
    );
}

// Exporta o componente 'ProfessorAtualizarSenha' para que possa ser utilizado em outras partes do código
export default ProfessorAtualizarSenha;