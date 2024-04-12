// Importa o arquivo de estilos CSS específico para esta componente de login
import './Login.css';

// Importa o componente Navegacao de um diretório específico
import Navegacao from '../../components/Navegacao/Navegacao';
import CadastroAluno from '../../components/CadastroAluno/CadastroAluno';
import React from 'react'; // Importando o React para que a sintaxe JSX funcione

// Define a função Login, que é um componente React
function Login() {
    // Retorna um fragmento React que engloba o componente Navegacao, CadastroAluno e um parágrafo com texto
    return (
        <>
            {/* Renderiza o componente de navegação */}
            <Navegacao />
            <CadastroAluno />
            {/* 
                Renderiza um parágrafo com o texto "NADA AQUI AINDA" e estiliza o texto com cor preta.
                Este parágrafo serve como uma indicação visual de que ainda não há conteúdo específico nesta página de login.
            */}
         
        </>
    );
}
// Exporta a função Login para que possa ser utilizada em outras partes do código
export default Login;
