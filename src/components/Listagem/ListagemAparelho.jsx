import React, { useState, useEffect } from 'react'; // Importa React e hooks necessários
import styles from '../styles/StyleListagem.module.css'; // Importa estilos CSS específicos para este componente
import AparelhoRequests from '../../fetch/AparelhoRequests'; // Importa funções para requisições de aparelhos
import { FaTrash, FaRegEdit } from "react-icons/fa"; // Importa ícones para deletar e editar
import { useNavigate } from 'react-router-dom'; // Importa hook para navegação
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md"; // Importa ícones para navegação entre páginas

/**
 * Componente funcional para listar aparelhos
 * @returns {JSX.Element} Componente JSX para listagem de aparelhos
 */
function ListarAparelho() {
    // Hooks de estado para armazenar dados e controle de página
    const [aparelhos, setAparelhos] = useState([]); // Armazena todos os aparelhos
    const [filteredAparelhos, setFilteredAparelhos] = useState([]); // Armazena aparelhos filtrados
    const [search, setSearch] = useState(''); // Armazena texto de busca
    const [paginaAtual, setPaginaAtual] = useState(1); // Armazena número da página atual
    const itensPorPagina = 5; // Define quantos itens serão exibidos por página
    const navigate = useNavigate(); // Inicializa o hook de navegação

    /**
     * Efeito para buscar aparelhos quando o componente é montado
     * Executa apenas uma vez ao montar o componente
     */
    useEffect(() => {
        const fetchAparelhos = async () => {
            try {
                const aparelhos = await AparelhoRequests.listarAparelhos(); // Requisição para listar aparelhos
                setAparelhos(aparelhos); // Atualiza o estado com aparelhos recebidos
                setFilteredAparelhos(aparelhos); // Inicialmente, não filtra
            } catch (error) {
                console.error('Erro ao buscar aparelhos: ', error); // Trata erro na requisição
            }
        };
        fetchAparelhos(); // Chama a função para buscar aparelhos
    }, []); // Dependência vazia, roda apenas uma vez ao montar o componente

    /**
     * Efeito para filtrar aparelhos com base na busca
     * Executa sempre que o valor de 'search' ou 'aparelhos' mudar
     */
    useEffect(() => {
        if (search === '') {
            setFilteredAparelhos(aparelhos); // Se não houver busca, exibe todos
        } else {
            // Filtra aparelhos pelo nome
            const filtered = aparelhos.filter(aparelho =>
                aparelho.nomeAparelho.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredAparelhos(filtered); // Atualiza a lista filtrada
        }
    }, [search, aparelhos]); // Dependências para re-executar o efeito

    /**
     * Função para deletar um aparelho
     * @param {Object} aparelho - O objeto do aparelho a ser deletado
     */
    const deletarAparelho = async (aparelho) => {
        const confirmar = window.confirm(`Deseja deletar o Aparelho ${aparelho.nomeAparelho}?`); // Confirmação de exclusão
        if (confirmar) {
            try {
                const sucesso = await AparelhoRequests.deletarAparelho(aparelho.idAparelho); // Requisição para deletar aparelho
                if (sucesso) {
                    // Atualiza a lista de aparelhos após a exclusão
                    window.alert('Aparelho deletado com sucesso'); // Mensagem de sucesso
                    window.location.reload();
                } else {
                    window.alert('Erro ao deletar Aparelho'); // Mensagem de erro
                }
            } catch (error) {
                window.alert('Erro ao deletar Aparelho'); // Mensagem de erro
                console.error('Erro ao deletar aparelho: ', error); // Log de erro
            }
        }
    };

    /**
     * Função para atualizar um aparelho
     * @param {Object} aparelho - O objeto do aparelho a ser atualizado
     */
    const updateAparelho = (aparelho) => {
        navigate(`/update/aparelho`, { state: { objeto: aparelho }, replace: true }); // Navega para a página de atualização
    };

    // Cálculos para a paginação
    const indiceUltimoItem = paginaAtual * itensPorPagina; // Índice do último item da página atual
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina; // Índice do primeiro item da página atual
    const aparelhosPaginados = filteredAparelhos.slice(indicePrimeiroItem, indiceUltimoItem); // Aparelhos da página atual
    const totalPaginas = Math.ceil(filteredAparelhos.length / itensPorPagina); // Total de páginas

    /**
     * Função para mudar a página
     * @param {number} novaPagina - O número da nova página a ser exibida
     */
    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina); // Atualiza a página atual
    };

    return (
        <>
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.section}>
                                <h1 className={styles.titulo}>Tabela Aparelhos</h1> {/* Título da tabela */}
                            </div>
                            <a style={{ textDecoration: "none" }} href="http://localhost:5173/Cadastro/Aparelho" className={styles.btn}>
                                Novo Aparelho {/* Botão para cadastrar novo aparelho */}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={search} // Valor do input de busca
                    onChange={(e) => setSearch(e.target.value)} // Atualiza o estado de busca
                    placeholder="Pesquisar" // Texto de placeholder
                    className={styles.searchInput} // Classe de estilo
                />
            </div>

            <div className={styles.cntTb}>
                {filteredAparelhos.length > 0 ? ( // Verifica se existem aparelhos filtrados
                    <>
                        <table className={`${styles.table} ${styles.tabela}`}> {/* Tabela de aparelhos */}
                            <thead>
                                <tr className={styles.tabelaHeader}>
                                    <th hidden>ID</th> {/* ID oculto na tabela */}
                                    <th>NOME</th> {/* Cabeçalho para o nome do aparelho */}
                                    <th>MÚSCULO ATIVADO</th> {/* Cabeçalho para músculo ativado */}
                                    <th colSpan={2}>AÇÃO</th> {/* Cabeçalho para ações */}
                                </tr>
                            </thead>
                            <tbody>
                                {aparelhosPaginados.map(aparelho => ( // Mapeia os aparelhos para exibição
                                    <tr key={aparelho.id_aparelho} className={styles.tabelaCorpo}>
                                        <td hidden>{aparelho.id_aparelho}</td> {/* ID oculto na tabela */}
                                        <td>{aparelho.nomeAparelho.toUpperCase()}</td> {/* Nome do aparelho em letras maiúsculas */}
                                        <td>{aparelho.musculoAtivado.toUpperCase()}</td> {/* Músculo ativado em letras maiúsculas */}
                                        <td title="Deletar Aparelho">
                                            <FaTrash onClick={() => deletarAparelho(aparelho)} style={{ color: '#DB0135', cursor: 'pointer' }} /> {/* Ícone para deletar */}
                                        </td>
                                        <td title="Atualizar Aparelho">
                                            <FaRegEdit onClick={() => updateAparelho(aparelho)} style={{ color: '#FFFFFF', cursor: 'pointer' }} /> {/* Ícone para atualizar */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={styles.paginacao}> {/* Controles de paginação */}
                            <button
                                onClick={() => mudarPagina(paginaAtual - 1)} // Botão para página anterior
                                disabled={paginaAtual === 1} // Desabilita se estiver na primeira página
                            >
                                <MdOutlineArrowBackIos /> {/* Ícone de seta para trás */}
                            </button>

                            <span>Página {paginaAtual} de {totalPaginas}</span> {/* Texto informando a página atual e total de páginas */}

                            <button
                                onClick={() => mudarPagina(paginaAtual + 1)} // Botão para próxima página
                                disabled={indiceUltimoItem >= filteredAparelhos.length} // Desabilita se não houver mais páginas
                            >
                                <MdOutlineArrowForwardIos /> {/* Ícone de seta para frente */}
                            </button>
                        </div>
                    </>
                ) : (
                    <p style={{ color: 'white' }}>Nada encontrado</p> // Mensagem se nenhum aparelho for encontrado
                )}
            </div>
        </>
    );
}

// Exporta o componente ListarAparelho para ser utilizado em outras partes do código
export default ListarAparelho;
