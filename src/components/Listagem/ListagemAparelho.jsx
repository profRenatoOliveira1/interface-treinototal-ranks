import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css'; // Importação do CSS modular
import AparelhoRequests from '../../fetch/AparelhoRequests'; // Importação das funções de requisição
import { FaTrash, FaRegEdit } from "react-icons/fa"; // Ícones de edição e exclusão
import { useNavigate } from 'react-router-dom'; // Hook para navegação
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md"; // Ícones de paginação

function ListagemAparelho() {
    // Estados para armazenar e gerenciar dados, busca e paginação
    const [aparelhos, setAparelhos] = useState([]); // Lista completa de aparelhos
    const [filteredAparelhos, setFilteredAparelhos] = useState([]); // Lista filtrada
    const [search, setSearch] = useState(''); // Estado para o campo de busca
    const [paginaAtual, setPaginaAtual] = useState(1); // Número da página atual
    const itensPorPagina = 5; // Quantidade de itens por página
    const navigate = useNavigate(); // Função de navegação entre páginas

    // Efeito para carregar os dados ao montar o componente
    useEffect(() => {
        const fetchAparelhos = async () => {
            try {
                // Obtém a lista de aparelhos via requisição
                const aparelhos = await AparelhoRequests.ListagemAparelhos();
                setAparelhos(aparelhos); // Armazena os aparelhos no estado
                setFilteredAparelhos(aparelhos); // Inicialmente, todos os aparelhos são exibidos
            } catch (error) {
                console.error('Erro ao buscar aparelhos: ', error); // Log de erro em caso de falha
            }
        };
        fetchAparelhos(); // Executa a busca de dados
    }, []);

    // Efeito para filtrar a lista com base no texto de busca
    useEffect(() => {
        if (search === '') {
            setFilteredAparelhos(aparelhos); // Se o campo de busca está vazio, exibe todos os aparelhos
        } else {
            // Filtra aparelhos cujo nome inclui o texto de busca (case insensitive)
            const filtered = aparelhos.filter(aparelho =>
                aparelho.nomeAparelho.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredAparelhos(filtered); // Atualiza o estado da lista filtrada
        }
    }, [search, aparelhos]); // Executa sempre que `search` ou `aparelhos` mudar

    // Função para deletar um aparelho
    const deletarAparelho = async (aparelho) => {
        const confirmar = window.confirm(`Deseja deletar o Aparelho ${aparelho.nomeAparelho}?`); // Confirmação de exclusão
        if (confirmar) {
            try {
                const sucesso = await AparelhoRequests.deletarAparelho(aparelho.idAparelho); // Requisição de exclusão
                if (sucesso) {
                    window.alert('Aparelho deletado com sucesso'); // Notificação de sucesso
                    window.location.reload(); // Recarrega a página
                } else {
                    window.alert('Erro ao deletar Aparelho'); // Notificação de erro
                }
            } catch (error) {
                window.alert('Erro ao deletar Aparelho'); // Notificação de erro
                console.error('Erro ao deletar aparelho: ', error);
            }
        }
    };

    // Função para navegar até a página de atualização com o aparelho selecionado
    const updateAparelho = (aparelho) => {
        navigate(`/update/aparelho`, { state: { objeto: aparelho }, replace: true });
    };

    // Cálculos para paginação
    const indiceUltimoItem = paginaAtual * itensPorPagina; // Índice do último item na página atual
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina; // Índice do primeiro item na página atual
    const aparelhosPaginados = filteredAparelhos.slice(indicePrimeiroItem, indiceUltimoItem); // Segmento de itens para exibição
    const totalPaginas = Math.ceil(filteredAparelhos.length / itensPorPagina); // Número total de páginas

    // Função para alterar a página exibida
    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina);
    };

    return (
        <>
            {/* Cabeçalho com título e botão para cadastrar um novo aparelho */}
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.section}>
                                <h1 className={styles.titulo}>Tabela Aparelhos</h1>
                            </div>
                            <a
                                style={{ textDecoration: "none" }}
                                href="/Cadastro/Aparelho"
                                className={styles.btn}
                            >
                                Novo Aparelho
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Campo de busca */}
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={search} // Vincula o valor ao estado
                    onChange={(e) => setSearch(e.target.value)} // Atualiza o estado com o texto digitado
                    placeholder="Pesquisar"
                    className={styles.searchInput}
                />
            </div>

            {/* Tabela de aparelhos */}
            <div className={styles.cntTb}>
                {filteredAparelhos.length > 0 ? ( // Exibe a tabela se houver itens
                    <>
                        <table className={`${styles.table} ${styles.tabela}`}>
                            <thead>
                                <tr className={styles.tabelaHeader}>
                                    <th hidden>ID</th>
                                    <th>NOME</th>
                                    <th>MÚSCULO ATIVADO</th>
                                    <th colSpan={2}>AÇÃO</th> {/* Coluna de ações */}
                                </tr>
                            </thead>
                            <tbody>
                                {aparelhosPaginados.map(aparelho => ( // Mapeia os itens para exibição
                                    <tr key={aparelho.idAparelho} className={styles.tabelaCorpo}>
                                        <td hidden>{aparelho.idAparelho}</td>
                                        <td>{aparelho.nomeAparelho.toUpperCase()}</td>
                                        <td>{aparelho.musculoAtivado.toUpperCase()}</td>
                                        <td title="Deletar Aparelho">
                                            <FaTrash
                                                onClick={() => deletarAparelho(aparelho)}
                                                style={{ color: '#DB0135', cursor: 'pointer' }}
                                            />
                                        </td>
                                        <td title="Atualizar Aparelho">
                                            <FaRegEdit
                                                onClick={() => updateAparelho(aparelho)}
                                                style={{ color: '#FFFFFF', cursor: 'pointer' }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    // Mensagem caso não haja itens para exibir
                    <p style={{ color: 'white' }}>Nada encontrado</p>
                )}
            </div>

            {/* Paginação (fora da tabela) */}
            <div className={styles.paginacao}>
                {/* Botão para página anterior */}
                <button
                    onClick={() => mudarPagina(paginaAtual - 1)}
                    disabled={paginaAtual === 1} // Desabilita se estiver na primeira página
                >
                    <MdOutlineArrowBackIos />
                </button>

                {/* Texto informando a página atual */}
                <span>Página {paginaAtual} de {totalPaginas}</span>

                {/* Botão para próxima página */}
                <button
                    onClick={() => mudarPagina(paginaAtual + 1)}
                    disabled={indiceUltimoItem >= filteredAparelhos.length} // Desabilita se estiver na última página
                >
                    <MdOutlineArrowForwardIos />
                </button>
            </div>
        </>
    );
}

// Exporta o componente ListagemAparelho
export default ListagemAparelho;
