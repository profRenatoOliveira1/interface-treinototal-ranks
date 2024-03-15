// Importa o arquivo de estilos CSS específico para esta componente de login
import './Login.css'

// Importa o componente Navegacao de um diretório específico
import Navegacao from '../../components/Navegacao/Navegacao';

// Define a função Login, que é um componente React
function Login() {

    // Retorna um fragmento React que engloba o componente Navegacao e um parágrafo com texto
    return (
        <>
            {/* Renderiza o componente de navegação */}
            <Navegacao />

            {/* 
                Renderiza um parágrafo com o texto "NADA AQUI AINDA" e estiliza o texto com cor preta.
                Este parágrafo serve como uma indicação visual de que ainda não há conteúdo específico nesta página de login.
            */}
            <p style={{ color: "#000000" }}>NADA AQUI AINDA</p>
        </>

    );
}
// Exporta a função Login para que possa ser utilizada em outras partes do código
export default Login