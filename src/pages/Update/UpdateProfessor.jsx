import ProfessorUpdate from '../../components/Update/UpdateProfessor';
// Importa o componente ProfessorUpdate, que está localizado na pasta '../../components/Update/ProfessorUpdate'.
// Este componente é responsável pelo formulário ou funcionalidade de atualização de professor.

function UpdateProfessor() {
    // Define um componente funcional chamado UpdateProfessor.
    return (
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <ProfessorUpdate /> {/* Renderiza o componente de atualização de Professors */}
        </>
    );
}

//exporta o componente UpdateProfessor para ser usado em outras partes da aplicação.
export default UpdateProfessor;