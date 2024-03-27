// Importa o arquivo de estilos CSS específico para o conteudo da pagina home
import './ConteudoDaHome.css'

// Define a função conteudoDaHome, que é um componente React responsável pelo conteudo da pagina Home
function conteudoDaHome() {

    return (
        <>
            {/* Div para o conteúdo */}
            <div className='div-conteudo home'>

                {/* Título principal */}
                <h1 className='titulo'>Treino Total</h1>
                <br />
                {/* Parágrafo com mensagem de boas-vindas */}
                <p className='paragrafo'>Bem-vindo ao Treino Total! Aqui começa sua jornada de transformação. Desafie-se, conquiste seus objetivos e alcance o melhor de você mesmo. Com uma equipe dedicada, oferecemos as ferramentas e o apoio para você atingir o sucesso em seu bem-estar total. Junte-se a nós e descubra seu potencial.</p>
            </div>
        </>
    );




}
// Exporta a função conteudoDaHome para que possa ser utilizada em outras partes do código
export default conteudoDaHome;