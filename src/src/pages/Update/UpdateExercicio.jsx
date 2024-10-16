import ExercicioUpdate from '../../components/Update/UpdateExercicio';
// Importa o componente ExercicioUpdate, que está localizado na pasta '../../components/Update/ExercicioUpdate'.
// Este componente é responsável pelo formulário ou funcionalidade de atualização de exercício.

function UpdateExercicio() {
    // Define um componente funcional chamado UpdateExercicio.
    return (
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <ExercicioUpdate /> {/* Renderiza o componente de atualização de Exercicios */}
        </>
    );
}

//exporta o componente UpdateExercicio para ser usado em outras partes da aplicação.
export default UpdateExercicio;