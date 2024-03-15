// Importa o arquivo de estilos CSS para esta componente
import './Treinos.css'

// Importa o componente Navegacao de um diretório específico
import Navegacao from '../../components/Navegacao/Navegacao';

// Define a função Fotos, que é um componente React
function Fotos() {

    // Retorna um fragmento React que engloba o componente Navegacao e um parágrafo com texto
    return (
        <>

            {/* Renderiza o componente de navegação */}
            <Navegacao />

            {/* 
                Renderiza um parágrafo com o texto "NADA AQUI AINDA" e estiliza o texto com cor preta.
                Este parágrafo serve como uma indicação visual de que ainda não há conteúdo nesta parte da página.
            */}
            <p style={{ color: "#000000" }}>NADA AQUI AINDA</p>
        </>

    );
}

// Exporta a função Fotos para que possa ser utilizada em outras partes do código
export default Fotos