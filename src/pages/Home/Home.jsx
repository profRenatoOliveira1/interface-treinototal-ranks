// Importa o arquivo de estilos CSS específico para esta componente de Home
import './Home.css'

// Importa o componente Navegacao de um diretório específico
import Navegacao from '../../components/Navegacao/Navegacao';

// Importa a imagem de fundo da home
import imgFundo from '../../assets/imgFundo.jpeg'

// Define a função Home, que é um componente React
function Home() {

  // Retorna um fragmento React que engloba o componente Navegacao, uma div principal e seu conteúdo
  return (
    <>

      {/* Renderiza o componente de navegação */}
      <Navegacao></Navegacao>

      {/* Div principal contendo o conteúdo da página */}
      <div className='div-mae'>

        {/* Div para o conteúdo */}
        <div className='div-conteudo'>

          {/* Título principal */}
          <h1 className='titulo'>Treino Total</h1>

          {/* Parágrafo com mensagem de boas-vindas */}
          <p className='paragrafo'>Bem-vindo ao Treino Total! Aqui começa sua jornada de transformação. Desafie-se, conquiste seus objetivos e alcance o melhor de você mesmo. Com uma equipe dedicada, oferecemos as ferramentas e o apoio para você atingir o sucesso em seu bem-estar total. Junte-se a nós e descubra seu potencial.</p>

          {/* Div para o botão de iniciar */}

          {/* Botão de iniciar */}
          <div className='div-botao'>
            <button className='botao'>INICIAR</button>
          </div>
        </div>

        {/* Div para a imagem de fundo */}
        <div className='div-img'>

          {/* Imagem de fundo */}
          <img className="imgFundo" src={imgFundo} alt="ERRO" />
        </div>

      </div>

    </>
  );
}
// Exporta a função Home para que possa ser utilizada em outras partes do código
export default Home;