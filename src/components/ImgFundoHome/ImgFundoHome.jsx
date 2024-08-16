// Importa o arquivo de estilos CSS específico para a imagem da pagina home
import './ImgFundoHome.css'
// Importa a imagem do logo da aplicação
import imgFundo from '../../assets/imgFundo.png'

// Define a função Navegacao, que é um componente React responsável pela imagem da pagina home
function ImgFundoHome() {

  return (
    <>
      {/* Div para a imagem de fundo */}
      <div className='div-img'>

        <img className="imgFundo" src={imgFundo} alt="ERRO" />
      </div>
    </>
  );
}
// Exporta a função ImgFundoHome para que possa ser utilizada em outras partes do código
export default ImgFundoHome;