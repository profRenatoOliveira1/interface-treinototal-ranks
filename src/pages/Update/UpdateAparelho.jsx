import AparelhoUpdate from '../../components/Update/UpdateAparelho';
// Importa o componente AparelhoUpdate, que está localizado na pasta '../../components/Update/AparelhoUpdate'.
// Este componente é responsável pelo formulário ou funcionalidade de atualização de aparelho.

function UpdateAparelho() {
    // Define um componente funcional chamado UpdateAparelho.
    return (
        <> {/* Fragmento React para envolver múltiplos elementos */}
            <AparelhoUpdate /> {/* Renderiza o componente de atualização de aparelhos */}
        </>
    );
}

//exporta o componente UpdateAparelho para ser usado em outras partes da aplicação.
export default UpdateAparelho;