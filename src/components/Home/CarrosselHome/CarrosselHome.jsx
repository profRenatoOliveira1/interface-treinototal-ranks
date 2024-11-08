// Importa o componente Carousel do React-Bootstrap
import { Carousel } from 'react-bootstrap';

// Importa o arquivo de estilos CSS específico para a imagem da página home
import './CarrosselHome.css';

// Importa o CSS do Bootstrap para utilizar os estilos de formatação
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa as imagens que serão usadas no carrossel
import img1 from '../../../assets/img1.png';
import img2 from '../../../assets/img2.jpeg';
import img3 from '../../../assets/img3.jpeg';
import img4 from '../../../assets/img4.jpeg';

// Define o componente funcional CarrosselHome
function CarrosselHome() {

  return (
    <>
      {/* Componente de carrossel contendo as imagens e legendas */}
      <Carousel className='div-carrossel home' >

        {/* Primeira imagem do carrossel */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img1}
            alt="Primeiro Slide"
          />
          </Carousel.Item>

        {/* Segunda imagem do carrossel */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Segundo Slide"
          />
        </Carousel.Item>

        {/* Terceira imagem do carrossel */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="Terceiro Slide"
          />
        </Carousel.Item>

        {/* Quarta imagem do carrossel */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img4}
            alt="Quarto Slide"
          />
        </Carousel.Item>

      </Carousel>
    </>
  );
}

// Exporta o componente CarrosselHome para ser utilizado em outras partes do código
export default CarrosselHome;