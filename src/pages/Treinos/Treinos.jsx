// Importa o arquivo de estilos CSS para esta componente
import './Treinos.css'

// Importa o componente Navegacao de um diretório específico
import Navegacao from '../../components/Navegacao/Navegacao';
import CadastroExercicio from '../../components/CadastroExercicio/CadastroExercicio';
// Define a função Fotos, que é um componente React
function Fotos() {

    // Retorna um fragmento React que engloba o componente Navegacao e um parágrafo com texto
    return (
        <>

            <Navegacao />
            <CadastroExercicio />
        </>

    );
}

// Exporta a função Fotos para que possa ser utilizada em outras partes do código
export default Fotos