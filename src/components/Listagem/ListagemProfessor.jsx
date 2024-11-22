import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css';
import ProfessorRequests from '../../fetch/ProfessorRequests';
import { FaTrash, FaRegEdit, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { formatadorData } from "../../../util/Utilitarios";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

/**
 * Componente funcional para listar professores.
 * Este componente permite visualizar, editar, excluir e pesquisar professores, 
 * além de suportar paginação.
 */
function ListagemProfessor() {
    // Estado para armazenar todos os professores obtidos da API
    const [professores, setProfessores] = useState([]);
    
    // Estado para armazenar os professores filtrados com base na busca
    const [filteredProfessores, setFilteredProfessores] = useState([]);
    
    // Estado para controlar o valor do campo de busca
    const [search, setSearch] = useState('');
    
    // Estado para controlar a página atual na paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    
    // Número de itens exibidos por página
    const itensPorPagina = 5;

    // Hook para navegação entre páginas
    const navigate = useNavigate();

    // Hook para buscar os professores ao carregar o componente
    useEffect(() => {
        const fetchProfessores = async () => {
            try {
                // Faz requisição para obter a lista de professores
                const professor = await ProfessorRequests.listarProfessor();
                setProfessores(professor); // Atualiza o estado com a lista completa
                setFilteredProfessores(professor); // Inicializa os filtrados com a lista completa
            } catch (error) {
                console.error('Erro ao buscar professores: ', error);
            }
        };
        fetchProfessores(); // Chama a função para buscar os professores
    }, []);

    // Hook para atualizar os professores filtrados ao mudar a busca ou a lista original
    useEffect(() => {
        if (search === '') {
            setFilteredProfessores(professores); // Se busca estiver vazia, exibe todos
        } else {
            const filtered = professores.filter(professor =>
                professor.nome.toLowerCase().includes(search.toLowerCase()) // Filtra por nome
            );
            setFilteredProfessores(filtered); // Atualiza o estado com os resultados filtrados
        }
    }, [search, professores]);

    // Função para formatar CPF
    const formatarCPF = (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    // Função para formatar telefone
    const formatarTelefone = (telefone) => telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    // Função para deletar um professor
    const deleteProfessor = async (professor) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o professor ${professor.nome}?`);
        if (deletar) {
            try {
                if (await ProfessorRequests.deletarProfessor(professor.idProfessor)) {
                    window.alert('Professor removido com sucesso!');
                    window.location.reload(); // Recarrega a página para atualizar a lista
                }
            } catch {
                window.alert('Erro ao remover professor!');
            }
        }
    };

    // Função para redirecionar para a página de edição de professor
    const updateProfessor = (professor) => {
        navigate(`/update/professor`, { state: { objeto: professor }, replace: true });
    };

    // Função para visualizar mais informações sobre um professor
    const handleProfessorClick = (professor) => {
        navigate(`/card/professor`, { state: { objeto: professor }, replace: true });
    };

    // Variáveis para calcular a paginação
    const indiceUltimoItem = paginaAtual * itensPorPagina; // Índice do último item na página atual
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina; // Índice do primeiro item na página atual
    const professoresPaginados = filteredProfessores.slice(indicePrimeiroItem, indiceUltimoItem); // Segmento da lista filtrada para exibição
    const totalPaginas = Math.ceil(filteredProfessores.length / itensPorPagina); // Total de páginas

    // Função para mudar a página atual
    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina);
    };

    return (
        <div className="content"> {/* Contêiner principal */}
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.section}>
                                <h1 className={styles.titulo}>Tabela Professores</h1> {/* Título */}
                            </div>
                            {/* Link para cadastro de novo professor */}
                            <a style={{ textDecoration: "none" }} href="/Cadastro/Professor" className={styles.btn}>
                                Novo Professor
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Campo de pesquisa */}
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // Atualiza o estado ao alterar o texto
                    placeholder="Pesquisar"
                    className={styles.searchInput}
                />
            </div>

            {/* Tabela de professores */}
            <div className={styles.cntTb}>
                {professoresPaginados.length > 0 ? ( // Verifica se há professores na página atual
                    <table className={`${styles.table} ${styles.tabela}`}>
                        <thead>
                            <tr className={styles.tabelaHeader}>
                                <th hidden>ID</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Data de Nascimento</th>
                                <th>Telefone</th>
                                <th>Especialidade</th>
                                <th colSpan={3}>Ação</th> {/* Colunas de ações */}
                            </tr>
                        </thead>
                        <tbody>
                            {professoresPaginados.map(professor => ( // Mapeia os professores para exibição
                                <tr key={professor.idProfessor} className={styles.tabelaCorpo}>
                                    <td hidden>{professor.idProfessor}</td>
                                    <td title="Ver Mais" onClick={() => handleProfessorClick(professor)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                        {professor.nome.toUpperCase()} {/* Nome em maiúsculas */}
                                    </td>
                                    <td>{formatarCPF(professor.cpf)}</td>
                                    <td>{formatadorData(professor.dataNascimento)}</td>
                                    <td style={{ width: 200 }}>{formatarTelefone(professor.celular)}</td>
                                    <td>{professor.especialidade.toUpperCase()}</td>
                                    {/* Ícones de ação */}
                                    <td title="Deletar Professor">
                                        <FaTrash onClick={() => deleteProfessor(professor)} style={{ color: '#DB0135', cursor: 'pointer' }} />
                                    </td>
                                    <td title="Atualizar Professor">
                                        <FaRegEdit onClick={() => updateProfessor(professor)} style={{ color: '#FFFFFF', cursor: 'pointer' }} />
                                    </td>
                                    <td title="Ver Mais">
                                        <FaInfoCircle onClick={() => handleProfessorClick(professor)} style={{ cursor: 'pointer', color: 'Yellow' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ color: 'white' }}>Nada encontrado</p> // Mensagem para nenhum resultado
                )}
            </div>

            {/* Controles de paginação */}
            <div className={styles.paginacao}>
                <button
                    onClick={() => mudarPagina(paginaAtual - 1)} // Botão para página anterior
                    disabled={paginaAtual === 1} // Desabilitado se estiver na primeira página
                >
                    <MdOutlineArrowBackIos />
                </button>

                <span>Página {paginaAtual} de {totalPaginas}</span> {/* Indicador de página */}

                <button
                    onClick={() => mudarPagina(paginaAtual + 1)} // Botão para próxima página
                    disabled={paginaAtual === totalPaginas || professoresPaginados.length === 0} // Desabilitado se estiver na última página ou sem itens
                >
                    <MdOutlineArrowForwardIos />
                </button>
            </div>
        </div>
    );
}

// Exporta o componente ListagemProfessor
export default ListagemProfessor;
