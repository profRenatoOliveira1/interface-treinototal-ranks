import './ConteudoDaHome.css';
// Importa os estilos CSS específicos para este componente

// Definição do componente 'conteudoDaHome'
function conteudoDaHome() {
    return (
        <>
            {/* Div que envolve o conteúdo da página inicial */}
            <div className='div-conteudo home'>

                {/* Título da página */}
                <h1 className='titulo'>Treino Total</h1>
            </div>
        </>
    );
}

// Exporta o componente conteudoDaHome para ser utilizado em outras partes do código
export default conteudoDaHome;