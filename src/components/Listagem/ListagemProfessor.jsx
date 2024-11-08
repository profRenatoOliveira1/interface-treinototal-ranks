import React, { useState, useEffect } from 'react'; // Importa React e hooks necessários
import styles from '../styles/StyleListagem.module.css'; // Importa estilos específicos do componente
import ProfessorRequests from '../../fetch/ProfessorRequests'; // Importa as funções para fazer requisições de professores
import { FaTrash, FaRegEdit, FaInfoCircle } from "react-icons/fa"; // Importa ícones da biblioteca react-icons
import { useNavigate } from 'react-router-dom'; // Importa hook para navegação entre rotas
import { formatadorData } from "../../../util/Utilitarios"; // Importa função para formatação de datas
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md"; // Importa ícones de navegação

/**
 * Componente funcional para listar professores.
 * 
 * Este componente permite a visualização, edição, exclusão e pesquisa de professores.
 *
 * @returns {JSX.Element} Componente JSX para listagem de professores.
 */
function ListarProfessor() {
    /** 
     * Estado para armazenar a lista de professores.
     * @type {Array} professores - Lista de professores.
     */
    const [professores, setProfessores] = useState([]);

    /** 
     * Estado para armazenar os professores filtrados pela pesquisa.
     * @type {Array} filteredProfessores - Lista de professores filtrados.
     */
    const [filteredProfessores, setFilteredProfessores] = useState([]);

    /** 
     * Estado para armazenar o valor do campo de busca.
     * @type {string} search - Valor do campo de pesquisa.
     */
    const [search, setSearch] = useState('');

    /** 
     * Estado para armazenar a página atual da listagem.
     * @type {number} paginaAtual - Número da página atual.
     */
    const [paginaAtual, setPaginaAtual] = useState(1);

    /** 
     * Número de itens a serem exibidos por página.
     * @type {number} itensPorPagina - Itens por página.
     */
    const itensPorPagina = 5;

    /** 
     * Hook para navegação entre páginas.
     * @type {function} navigate - Função para navegar entre rotas.
     */
    const navigate = useNavigate();

    /**
     * Efeito para buscar a lista de professores ao montar o componente.
     *
     * Este efeito é executado apenas uma vez quando o componente é montado.
     */
    useEffect(() => {
        const fetchProfessores = async () => {
            try {
                const professor = await ProfessorRequests.listarProfessores(); // Faz a requisição para obter a lista de professores
                setProfessores(professor); // Atualiza o estado com a lista de professores
                setFilteredProfessores(professor); // Inicializa a lista filtrada com todos os professores
            } catch (error) {
                console.error('Erro ao buscar professores: ', error); // Loga o erro no console
            }
        };
        fetchProfessores(); // Executa a função de busca
    }, []); // Executa apenas uma vez ao montar o componente

    /**
     * Efeito para filtrar os professores com base na pesquisa.
     *
     * Este efeito é executado sempre que o valor da pesquisa ou a lista de professores muda.
     */
    useEffect(() => {
        if (search === '') {
            setFilteredProfessores(professores); // Se não há pesquisa, mostra todos os professores
        } else {
            const filtered = professores.filter(professor =>
                professor.nome.toLowerCase().includes(search.toLowerCase()) // Filtra professores que contêm a string de busca
            );
            setFilteredProfessores(filtered); // Atualiza a lista filtrada
        }
    }, [search, professores]); // Executa sempre que o valor da pesquisa ou a lista de professores mudar

    /**
     * Função para formatar CPF.
     * 
     * @param {string} cpf - CPF a ser formatado.
     * @returns {string} CPF formatado.
     */
    const formatarCPF = (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    /**
     * Função para formatar telefone.
     * 
     * @param {string} telefone - Telefone a ser formatado.
     * @returns {string} Telefone formatado.
     */
    const formatarTelefone = (telefone) => telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    /**
     * Função para deletar um professor.
     *
     * @param {Object} professor - Objeto professor a ser deletado.
     */
    const deleteProfessor = async (professor) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o professor ${professor.nome}?`); // Confirmação de exclusão
        if (deletar) {
            try {
                if (await ProfessorRequests.deletarProfessor(professor.idProfessor)) {
                    // Faz a requisição para deletar o professor
                    window.alert('Professor removido com sucesso!'); // Alerta de sucesso
                    window.location.reload();
                }
            } catch {
                window.alert('Erro ao remover professor!'); // Alerta de erro
            }
        }
    };

    /**
     * Função para navegar para a página de atualização de professor.
     *
     * @param {Object} professor - Objeto professor a ser atualizado.
     */
    const updateProfessor = (professor) => {
        navigate(`/update/professor`, { state: { objeto: professor }, replace: true }); // Navega para a página de atualização
    };

    /**
     * Função para exibir mais informações sobre um professor.
     *
     * @param {Object} professor - Objeto professor cujos detalhes serão exibidos.
     */
    const handleProfessorClick = (professor) => {
        navigate(`/card/professor`, { state: { objeto: professor }, replace: true }); // Navega para a página de detalhes
    };

    /** 
     * Cálculos para a paginação.
     * 
     * @type {number} indiceUltimoItem - Índice do último item na página atual.
     * @type {number} indicePrimeiroItem - Índice do primeiro item na página atual.
     * @type {Array} professoresPaginados - Professores a serem exibidos na página atual.
     * @type {number} totalPaginas - Total de páginas.
     */
    const indiceUltimoItem = paginaAtual * itensPorPagina; // Índice do último item na página atual
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina; // Índice do primeiro item na página atual
    const professoresPaginados = filteredProfessores.slice(indicePrimeiroItem, indiceUltimoItem); // Professores a serem exibidos na página atual
    const totalPaginas = Math.ceil(filteredProfessores.length / itensPorPagina); // Total de páginas

    /**
     * Função para mudar de página.
     *
     * @param {number} novaPagina - Número da nova página a ser exibida.
     */
    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina); // Atualiza a página atual
    };

    return (
        <div className="content"> {/* Container principal */}
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.section}>
                                <h1 className={styles.titulo}>Tabela Professores</h1> {/* Título da tabela */}
                            </div>
                            <a style={{ textDecoration: "none" }} href="/Cadastro/Professor" className={styles.btn}>
                                Novo Professor {/* Link para adicionar novo professor */}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

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

            {/* Tabela para listar os professores */}
            <div className={styles.cntTb}>
                {professoresPaginados.length > 0 ? ( // Verifica se há professores a serem exibidos
                    <>
                        <table className={`${styles.table} ${styles.tabela}`}>
                            <thead>
                                <tr className={styles.tabelaHeader}>
                                    <th hidden>ID</th>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Data de Nascimento</th>
                                    <th>Telefone</th>
                                    <th hidden>Endereço</th>
                                    <th hidden>Email</th>
                                    <th hidden>Data de Contratação</th>
                                    <th hidden>Formação</th>
                                    <th>Especialidade</th>
                                    <th colSpan={3}>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {professoresPaginados.map(professor => ( // Mapeia os professores paginados
                                    <tr key={professor.id_professor} className={styles.tabelaCorpo}>
                                        <td hidden>{professor.id_professor}</td>
                                        <td title="Ver Mais" onClick={() => handleProfessorClick(professor)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                            {professor.nome.toUpperCase()} {/* Nome do professor em letras maiúsculas */}
                                        </td>
                                        <td>{formatarCPF(professor.cpf)}</td> {/* CPF formatado */}
                                        <td>{formatadorData(professor.dataNascimento)}</td> {/* Data de nascimento formatada */}
                                        <td style={{ width: 200 }}>{formatarTelefone(professor.celular)}</td> {/* Telefone formatado */}
                                        <td hidden>{professor.endereco.toUpperCase()}</td>
                                        <td hidden>{professor.email.toUpperCase()}</td>
                                        <td hidden>{formatadorData(professor.dataContratacao)}</td>
                                        <td hidden>{professor.formacao.toUpperCase()}</td>
                                        <td>{professor.especialidade.toUpperCase()}</td> {/* Especialidade do professor */}
                                        <td title="Deletar Professor">
                                            <FaTrash onClick={() => deleteProfessor(professor)} style={{ color: '#DB0135', cursor: 'pointer' }} /> {/* Ícone para deletar professor */}
                                        </td>
                                        <td title="Atualizar Professor">
                                            <FaRegEdit onClick={() => updateProfessor(professor)} style={{ color: '#FFFFFF', cursor: 'pointer' }} /> {/* Ícone para editar professor */}
                                        </td>
                                        <td title="Ver Mais">
                                            <FaInfoCircle onClick={() => handleProfessorClick(professor)} style={{ cursor: 'pointer', color: 'Yellow' }} /> {/* Ícone de detalhes */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Controles de paginação */}
                        <div className={styles.paginacao}>
                            <button
                                onClick={() => mudarPagina(paginaAtual - 1)} // Botão para a página anterior
                                disabled={paginaAtual === 1} // Desabilita se já está na primeira página
                            >
                                <MdOutlineArrowBackIos />
                            </button>

                            <span>Página {paginaAtual} de {totalPaginas}</span> {/* Exibe a página atual e total de páginas */}

                            <button
                                onClick={() => mudarPagina(paginaAtual + 1)} // Botão para a próxima página
                                disabled={paginaAtual === totalPaginas || professoresPaginados.length === 0} // Desabilita se já está na última página ou não há professores
                            >
                                <MdOutlineArrowForwardIos />
                            </button>
                        </div>
                    </>
                ) : (
                    <p style={{ color: 'white' }}>Nada encontrado</p> // Mensagem se não houver professores
                )}
            </div>
        </div>
    );
}

// Exporta o componente para uso em outras partes do aplicativo
export default ListarProfessor;