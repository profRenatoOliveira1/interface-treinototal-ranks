// Importa o arquivo de estilos CSS para esta componente
import './Perfil.css'

// Importa o componente Navegacao de um diretório específico
import Navegacao from '../../components/Navegacao/Navegacao';

// Define a função Depoimentos, que é um componente React
function Depoimentos() {

    // Retorna um fragmento React que engloba o componente Navegacao e um parágrafo com texto
    return (
        <>
            {/* Renderiza o componente de navegação */}
            <Navegacao />

            {/* 
                Renderiza um parágrafo com o texto "NADA AQUI AINDA" e estiliza o texto com cor preta.
                Este parágrafo serve como uma indicação visual de que ainda não há depoimentos disponíveis.
            */}
            <p style={{ color: "#000000" }}>NADA AQUI AINDA</p>
        </>

    );
}
// Exporta a função Depoimentos para que possa ser utilizada em outras partes do código
export default Depoimentos