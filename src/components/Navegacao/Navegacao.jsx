// Importa o arquivo de estilos CSS específico para a barra de navegação
import './Navegacao.css'

// Importa o componente Link da biblioteca react-router-dom, que é usado para navegação entre páginas sem recarregar a página

import { Link } from 'react-router-dom';

// Importa a imagem do logo da aplicação
import imgLogo from '../../assets/imgLogoProSaude.png'

// Define a função Navegacao, que é um componente React responsável pela barra de navegação
function Navegacao() {

    // Retorna a estrutura da barra de navegação
    return (
        <div className="barra-navegacao">
            <div className="logo-zoo">

                {/* Renderiza o logo da aplicação com um link para o Google */}
                <a href="https://www.google.com.br/" target="_blank"><img className="imgLogo" src={imgLogo} /></a>
            </div>


            <div className="navbar-opcoes">
                {/* Renderiza uma lista de opções de navegação */}
                <ul>
                    <li>
                        {/* Renderiza um link para a página Home */}
                        <Link className='navbar-li' to="/"> Home</Link>
                    </li>
                    <li>
                        {/* Renderiza um link para a página Home */}
                        <Link className='navbar-li' to="/Academia"> Academia</Link>
                    </li>
                    <li>
                        {/* Renderiza um link para a página Treinos */}
                        <Link className='navbar-li' to="/Treinos"> Exercicio</Link>
                    </li>

                    <li>
                        {/* Renderiza um link para a página Perfil */}
                        <Link className='navbar-li' to="/Aparelho" > Aparelho</Link>
                    </li>

                    <li>
                        {/* Renderiza um link para a página Login */}
                        <Link className='navbar-li' to="/Login"> Aluno</Link>
                    </li>

                    <li>
                        <Link className='navbar-li' to="/Professor"> Professor</Link>
                    </li>

                </ul>
            </div>

        </div>

    );




}
// Exporta a função Navegacao para que possa ser utilizada em outras partes do código
export default Navegacao;