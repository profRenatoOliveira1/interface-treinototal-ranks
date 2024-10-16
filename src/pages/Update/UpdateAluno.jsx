import AlunoUpdate from '../../components/Update/UpdateAluno';
// Importa o componente AlunoUpdate, que está localizado na pasta '../../components/Update/AlunoUpdate'.
// Este componente é responsável pelo formulário ou funcionalidade de atualização de aluno.

function UpdateAluno() {
    // Define um componente funcional chamado UpdateAluno.
    return (
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <AlunoUpdate /> {/* Renderiza o componente de atualização de alunos */}
        </>
    );
}

//exporta o componente UpdateAluno para ser usado em outras partes da aplicação.
export default UpdateAluno;