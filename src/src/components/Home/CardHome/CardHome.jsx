import './CardHome.css';
// Importa os estilos CSS específicos para este componente
import imgCard from '../../../assets/imgCard.jpg';
// Importa a imagem do card
import ExDes from '../../../assets/exdes.jpeg';
// Importa a imagem do card
import ExTri from '../../../assets/extri.jpeg';
// Importa a imagem do card

// Definição do componente 'conteudoDaHome'
function CardHome() {
    return (
        <>

            {/* Div para o card */}
            <div className="card-container">
                <div className="custom-card">
                    <img className="card-image" src={imgCard} alt="Imagem do card" />
                    <div className="card-content">
                        <p>Bem-vindo ao Treino Total! Aqui começa sua jornada de transformação. Desafie-se, conquiste seus objetivos e alcance o melhor de você mesmo. Com uma equipe dedicada, oferecemos as ferramentas e o apoio para você atingir o sucesso em seu bem-estar total. Junte-se a nós e descubra seu potencial.</p>
                    </div>
                </div>
            </div>

            {/* Div para o card */}
            <div className="card-container">
                <div className="custom-card">
                    <img className="card-image" src={ExDes} alt="Imagem do card" />
                    <div className="card-content">
                        <h3>Exercício Desenvolvimento</h3>
                        <p>O exercício de desenvolvimento aprimora habilidades através de práticas desafiadoras, promovendo crescimento contínuo, confiança, resolução de problemas e adaptabilidade, sendo útil em várias áreas pessoais e profissionais.</p>
                    </div>
                </div>
            </div>

            {/* Div para o card */}
            <div className="card-container">
                <div className="custom-card">
                    <img className="card-image" src={ExTri} alt="Imagem do card" />
                    <div className="card-content">
                        <h3>Exercício Tríceps </h3>
                        <p>O exercício de tríceps é fundamental para desenvolver força e definição na parte posterior dos braços. Movimentos como a extensão de tríceps no pulley, tríceps testa e mergulho (ou paralelas) são populares para trabalhar esse grupo muscular. Ao fortalecer o tríceps, melhora-se a estabilidade do cotovelo e o desempenho em outros exercícios de empurrar, como o supino.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

// Exporta a função CardHome para que possa ser utilizada em outras partes do código
export default CardHome;