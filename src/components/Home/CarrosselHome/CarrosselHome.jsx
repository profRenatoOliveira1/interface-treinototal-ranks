// Importa o componente Carousel do React-Bootstrap
import { Carousel } from 'react-bootstrap';

// Importa o arquivo de estilos CSS específico para a imagem da página home
import './CarrosselHome.css';

// Importa o CSS do Bootstrap para utilizar os estilos de formatação
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa as imagens que serão usadas no carrossel
import img1 from '../../../assets/img1.png';
import img2 from '../../../assets/img2.png';
import img3 from '../../../assets/img3.png';

// Define o componente funcional CarrosselHome
function CarrosselHome() {

  return (
    <>
      {/* Componente de carrossel contendo as imagens e legendas */}
      <Carousel className='div-carrossel home'>

        {/* Primeira imagem do carrossel */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img1}
            alt="Primeiro Slide"
          />
          <Carousel.Caption>
            <h3 className='th'>Idealize</h3>
            <p className='th'>Planeje SUA ROTINA de treinos!</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Segunda imagem do carrossel */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Segundo Slide"
          />
          <Carousel.Caption>
            <h3 className='th'>Pratique</h3>
            <p className='th'>Dê seu MÁXIMO!</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Terceira imagem do carrossel */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="Terceiro Slide"
          />
          <Carousel.Caption>
            <h3 className='th'>Conquiste</h3>
            <p className='th'>Alcance seu futuro EU!</p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </>
  );
}

// Exporta o componente CarrosselHome para ser utilizado em outras partes do código
export default CarrosselHome;