import './FooterHome.css'; // Importa os estilos CSS específicos para este componente

// Definição do componente 'conteudoDaHome'
function FooterHome() {
    return (
        <>
            {/* Div que envolve o conteúdo da página inicial */}

            <footer>
                <div className='div-left footer'>
                    <ul>
                        <p>Membros do Grupo</p>
                        <li>Ana Carolina Fernandes</li>
                        <li>Gabriel Henrique Santos de Barros</li>
                        <li>Lucas Hideki Miyazaki</li>
                        <li>Vitor Joaquim de Almeida</li>
                    </ul>
                </div>
            </footer>
            <footer>
                <div className='div-bottomL footer'>
                    <a target='_blank' href="https://www.instagram.com/" 
                    className='rSocial' 
                    style={{fontFamily: 'sans-serif'}}
                    >Instagram</a>
                </div>
                <div className='div-bottomR footer'>
                    <p>© 2024 Treino Total.Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    );
}

// Exporta o componente conteudoDaHome para ser utilizado em outras partes do código
export default FooterHome;