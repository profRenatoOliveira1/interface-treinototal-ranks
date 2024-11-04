import React, { useState, useEffect } from 'react'; // Importa React e hooks necessários
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap para estilização
import styles from '../styles/StyleListagem.module.css'; // Importa estilos CSS específicos para este componente
import ExercicioRequests from '../../fetch/ExercicioRequests'; // Importação do módulo responsável por fazer as requisições dos exercícios
import AparelhoRequests from '../../fetch/AparelhoRequests'; // Importação do módulo responsável por fazer as requisições dos aparelhos
import { FaTrash, FaRegEdit } from "react-icons/fa"; // Importação de ícones da biblioteca react-icons
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md"; // Ícones de navegação
import { useNavigate } from 'react-router-dom'; // Importa hook para navegação entre rotas

/**
 * Componente para listar exercícios com paginação
 * @returns {JSX.Element} Componente JSX para listagem de exercícios
 */
function ListagemExercicios() {
    // Estados para gerenciar a lista de exercícios e filtros
    const [exercicios, setExercicios] = useState([]); // Estado para armazenar os exercícios
    const [filteredExercicios, setFilteredExercicios] = useState([]); // Exercícios filtrados com base na busca
    const [search, setSearch] = useState(''); // Valor do campo de busca
    const [paginaAtual, setPaginaAtual] = useState(1); // Página atual da listagem
    const itensPorPagina = 5; // Número de itens por página
    const navigate = useNavigate(); // Hook para navegação entre páginas

    /**
     * Efeito para buscar os dados dos exercícios e aparelhos
     * Executa apenas uma vez na montagem do componente
     */
    useEffect(() => {
        const fetchDados = async () => {
            try {
                const exercicios = await ExercicioRequests.listarExercicios(); // Requisição para buscar os exercícios
                const aparelhos = await AparelhoRequests.listarAparelhos(); // Requisição para buscar os aparelhos

                // Criação de um mapa para facilitar a associação entre aparelhos e seus nomes
                const aparelhosMap = aparelhos.reduce((map, aparelho) => {
                    map[aparelho.id_aparelho] = aparelho; // Mapeia cada aparelho por seu ID
                    return map; // Retorna o mapa atualizado
                }, {});

                // Combina os dados de exercícios com seus respectivos aparelhos
                const exerciciosComAparelhos = exercicios.map(exercicio => ({
                    ...exercicio,
                    nome_aparelho: aparelhosMap[exercicio.id_aparelho]?.nome_aparelho // Adiciona o nome do aparelho
                }));

                setExercicios(exerciciosComAparelhos); // Atualiza o estado com os exercícios obtidos
                setFilteredExercicios(exerciciosComAparelhos); // Atualiza a lista filtrada
            } catch (error) {
                console.error('Erro ao buscar dados: ', error); // Em caso de erro, exibe no console
            }
        };

        fetchDados(); // Executa a função de busca
    }, []); // Executa apenas uma vez na montagem do componente

    /**
     * Efeito para filtrar os exercícios com base na busca
     * Executa sempre que o valor de 'search' ou 'exercicios' mudar
     */
    useEffect(() => {
        if (search === '') {
            setFilteredExercicios(exercicios); // Se não há busca, mostra todos os exercícios
        } else {
            // Filtra os exercícios que contêm a string de busca
            const filtered = exercicios.filter(exercicio =>
                exercicio.exercicio.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredExercicios(filtered); // Atualiza a lista filtrada
        }
    }, [search, exercicios]); // Dependências para re-executar o efeito quando a busca ou os exercícios mudarem

    /**
     * Função para deletar um exercício
     * @param {Object} exercicio - O objeto do exercício a ser deletado
     */
    const deletarExercicio = (exercicio) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o exercício ${exercicio.exercicio}?`); // Confirmação de exclusão

        if (deletar) {
            if (ExerciciosRequests.deletarExercicio(exercicio.id_exercicio)) {
                window.location.reload(); // Recarrega a página após a exclusão
                window.alert('Exercicio removido com sucesso'); // Alerta de sucesso
            } else {
                window.alert('Erro ao remover exercicio'); // Alerta de erro
            }
        }
    };

    /**
     * Função para atualizar um exercício
     * @param {Object} exercicio - O objeto do exercício a ser atualizado
     */
    const UpdateExercicio = (exercicio) => {
        navigate(`/update/exercicio`, { state: { objeto: exercicio }, replace: true }); // Navega para a página de atualização
    };

    // Cálculos para a paginação
    const indiceUltimoItem = paginaAtual * itensPorPagina; // Índice do último item na página atual
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina; // Índice do primeiro item na página atual
    const exerciciosPaginados = filteredExercicios.slice(indicePrimeiroItem, indiceUltimoItem); // Exercícios a serem exibidos na página atual
    const totalPaginas = Math.ceil(filteredExercicios.length / itensPorPagina); // Total de páginas

    /**
     * Função para mudar de página
     * @param {number} novaPagina - O número da nova página a ser exibida
     */
    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina); // Atualiza a página atual
    };

    return (
        <>
            {/* Título da tabela de exercícios */}
            <h1 className={styles.titulo}>Tabela de Exercícios</h1>
            <a style={{ textDecoration: "none" }} href="http://localhost:5173/Cadastro/Exercicio" className={styles.btn}>
                Novo Exercicio {/* Link para adicionar novo exercício */}
            </a>

            {/* Campo de Pesquisa */}
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={search} // Vincula o valor do input ao estado de busca
                    onChange={(e) => setSearch(e.target.value)} // Atualiza o estado ao mudar o input
                    placeholder="Pesquisar"
                    className={styles.searchInput} // Classe para o input
                />
            </div>

            {/* Tabela para listar os exercícios */}
            <div className={styles.cntTb}>
                {exerciciosPaginados.length > 0 ? ( // Verifica se há exercícios a serem exibidos
                    <>
                        <table className={`${styles.table} ${styles.tabela}`}>
                            <thead>
                                <tr className={styles.tabelaHeader}>
                                    <th hidden>ID</th>
                                    <th hidden>ID</th>
                                    <th>Nome do Exercício</th>
                                    <th>Aparelho</th>
                                    <th>Repetições</th>
                                    <th>Carga</th>
                                    <th>Região do Corpo</th>
                                    <th colSpan={2}>Ação</th> {/* Colunas de ação */}
                                </tr>
                            </thead>
                            <tbody>
                                {exerciciosPaginados.map(exercicio => ( // Mapeia exercícios a serem exibidos
                                    <tr key={exercicio.id_exercicio} className={styles.tabelaCorpo}>
                                        <td hidden>{exercicio.id_exercicio}</td>
                                        <td hidden>{exercicio.id_aparelho}</td>
                                        <td>{exercicio.exercicio.toUpperCase()}</td> {/* Nome do exercício */}
                                        <td>{exercicio.nome_aparelho?.toUpperCase()}</td> {/* Nome do aparelho */}
                                        <td>{exercicio.repeticoes}</td> {/* Repetições do exercício */}
                                        <td>{`${exercicio.carga} Kg`}</td> {/* Carga do exercício */}
                                        <td>{exercicio.regiao_corpo_ativa.toUpperCase()}</td> {/* Região do corpo ativa */}
                                        <td title="Deletar Exercício">
                                            <FaTrash onClick={() => deletarExercicio(exercicio)} style={{ color: '#DB0135', cursor: 'pointer' }} /> {/* Ícone de deletar */}
                                        </td>
                                        <td title="Atualizar Exercício">
                                            <FaRegEdit onClick={() => UpdateExercicio(exercicio)} style={{ color: '#FFFFFF', cursor: 'pointer' }} /> {/* Ícone de editar */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Paginação */}
                        <div className={styles.paginacao}>
                            <button
                                onClick={() => mudarPagina(paginaAtual - 1)} // Muda para a página anterior
                                disabled={paginaAtual === 1} // Desabilita se já estiver na primeira página
                            >
                                <MdOutlineArrowBackIos />
                            </button>

                            <span>Página {paginaAtual} de {totalPaginas}</span> {/* Exibe informações da página atual */}

                            <button
                                onClick={() => mudarPagina(paginaAtual + 1)} // Muda para a próxima página
                                disabled={paginaAtual === totalPaginas || exerciciosPaginados.length === 0} // Desabilita se já estiver na última página
                            >
                                <MdOutlineArrowForwardIos />
                            </button>
                        </div>
                    </>
                ) : (
                    <p style={{ color: 'white' }}>Nada encontrado</p> // Mensagem caso não haja exercícios
                )}
            </div>
        </>
    );
}

// Exporta o componente para uso em outras partes do aplicativo
export default ListagemExercicios;
