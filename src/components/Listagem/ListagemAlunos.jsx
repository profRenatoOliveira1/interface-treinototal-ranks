import React, { useState, useEffect } from 'react'; // Importa React e hooks necessários
import styles from '../styles/StyleListagem.module.css'; // Importa o CSS para estilos do componente
import AlunoRequests from '../../fetch/AlunoRequests'; // Importa funções para manipulação de alunos
import { FaTrash, FaRegEdit, FaInfoCircle } from "react-icons/fa"; // Importa ícones para ações
import { useNavigate } from 'react-router-dom'; // Importa hook para navegação entre páginas
import { formatadorData } from "../../../util/Utilitarios"; // Importa função para formatar datas
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md"; // Importa ícones de navegação

/**
 * Componente funcional para listar alunos
 * @returns {JSX.Element} - Renderiza a tabela de alunos e fornece funcionalidades de busca e paginação
 */
function ListarAluno() {
    // Estados para gerenciar os alunos e filtragens
    const [alunos, setAlunos] = useState([]); // Lista de alunos completa
    const [alunosFiltrados, setAlunosFiltrados] = useState([]); // Lista de alunos filtrados
    const [search, setSearch] = useState(''); // Valor do campo de busca
    const [paginaAtual, setPaginaAtual] = useState(1); // Página atual da listagem
    const itensPorPagina = 5; // Número de itens por página
    const navigate = useNavigate(); // Hook para navegação entre rotas


    
    /** 
     * Efeito para buscar alunos na montagem do componente 
     * Executa uma única vez ao montar o componente 
     */
    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const aluno = await AlunoRequests.listarAlunos(); // Chama a função para listar alunos
                setAlunos(aluno); // Armazena alunos no estado
                setAlunosFiltrados(aluno); // Inicializa a lista filtrada
            } catch (error) {
                console.error('Erro ao buscar alunos: ', error); // Trata erros de busca
            }
        };
        fetchAlunos(); // Executa a função de busca
    }, []); // Executa apenas uma vez na montagem

    /** 
     * Efeito para filtrar alunos baseado no campo de busca 
     * Executa sempre que o valor de 'search' ou 'alunos' mudar
     */
    useEffect(() => {
        if (search === '') {
            setAlunosFiltrados(alunos); // Se não há busca, mostra todos os alunos
        } else {
            // Filtra alunos com base no nome
            const filtrados = alunos.filter(aluno =>
                aluno.nome.toLowerCase().includes(search.toLowerCase())
            );
            setAlunosFiltrados(filtrados); // Atualiza a lista filtrada
        }
    }, [search, alunos]); // Dependências para re-executar o efeito

    // Função para formatar CPF
    const formatarCPF = (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    // Função para formatar telefone
    const formatarTelefone = (telefone) => telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    /**
     * Função para deletar aluno
     * @param {Object} aluno - Objeto do aluno a ser deletado
     */
    const deleteAluno = (aluno) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o aluno ${aluno.nome}?`); // Confirmação de exclusão
        if (deletar) {
            if (AlunoRequests.deletarAluno(aluno.idAluno)) {
                window.location.reload(); // Recarrega a página após exclusão
                window.alert('Aluno removido com sucesso!'); // Alerta de sucesso
            } else {
                window.alert('Erro ao remover aluno!'); // Alerta de erro
            }
        }
    };

    /**
     * Função para atualizar aluno
     * @param {Object} aluno - Objeto do aluno a ser atualizado
     */
    const updateAluno = (aluno) => {
        navigate(`/update/aluno`, { state: { objeto: aluno }, replace: true }); // Navega para a página de atualização
    };

    /**
     * Função para ver mais detalhes do aluno
     * @param {Object} aluno - Objeto do aluno a ser detalhado
     */
    const handleAlunoClick = (aluno) => {
        navigate(`/card/aluno`, { state: { objeto: aluno }, replace: true }); // Navega para a página de detalhes
    };

    // Cálculos para a paginação
    const indiceUltimoItem = paginaAtual * itensPorPagina; // Índice do último item na página atual
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina; // Índice do primeiro item na página atual
    const alunosPaginados = alunosFiltrados.slice(indicePrimeiroItem, indiceUltimoItem); // Alunos a serem exibidos na página atual
    const totalPaginas = Math.ceil(alunosFiltrados.length / itensPorPagina); // Total de páginas

    /**
     * Função para mudar de página
     * @param {number} novaPagina - Número da nova página a ser exibida
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
                                <h1 className={styles.titulo}>Tabela Alunos</h1> {/* Título da tabela */}
                            </div>
                            <a style={{ textDecoration: "none" }} href="http://localhost:5173/Cadastro/Aluno" className={styles.btn}>
                                Novo Aluno {/* Link para adicionar novo aluno */}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={search} // Vincula o valor ao estado de busca
                    onChange={(e) => setSearch(e.target.value)} // Atualiza o estado ao mudar o input
                    placeholder="Pesquisar"
                    className={styles.searchInput} // Classe para o input
                />
            </div>

            <div className={styles.cntTb}>
                {alunosFiltrados.length > 0 ? ( // Verifica se há alunos filtrados
                    <>
                        <table className={`${styles.table} ${styles.tabela}`}>
                            <thead>
                                <tr className={styles.tabelaHeader}>
                                    <th hidden>ID</th>
                                    <th>NOME</th>
                                    <th>CPF</th>
                                    <th>DATA DE NASCIMENTO</th>
                                    <th>TELEFONE</th>
                                    <th>ENDEREÇO</th>
                                    <th hidden>Email</th>
                                    <th hidden>Altura</th>
                                    <th hidden>Peso</th>
                                    <th hidden>IMC</th>
                                    <th colSpan={3}>AÇÃO</th> {/* Colunas de ação */}
                                </tr>
                            </thead>
                            <tbody>
                                {alunosPaginados.map(aluno => ( // Mapeia alunos a serem exibidos
                                    <tr key={aluno.id_aluno} className={styles.tabelaCorpo}>
                                        <td hidden>{aluno.id_aluno}</td>
                                        <td title="Ver Mais" onClick={() => handleAlunoClick(aluno)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                            {aluno.nome.toUpperCase()} {/* Nome do aluno */}
                                        </td>
                                        <td>{formatarCPF(aluno.cpf)}</td> {/* CPF formatado */}
                                        <td>{formatadorData(aluno.dataNascimento)}</td> {/* Data de nascimento formatada */}
                                        <td style={{ width: 200 }}>{formatarTelefone(aluno.celular)}</td> {/* Telefone formatado */}
                                        <td>{aluno.endereco.toUpperCase()}</td> {/* Endereço do aluno */}
                                        <td hidden>{aluno.email.toUpperCase()}</td>
                                        <td hidden>{`${aluno.altura} m`}</td>
                                        <td hidden>{`${aluno.peso} kg`}</td>
                                        <td hidden>{aluno.imc}</td>
                                        <td title="Deletar Aluno">
                                            <FaTrash onClick={() => deleteAluno(aluno)} style={{ color: '#DB0135', cursor: 'pointer' }} /> {/* Ícone de deletar */}
                                        </td>
                                        <td title="Atualizar Aluno">
                                            <FaRegEdit onClick={() => updateAluno(aluno)} style={{ color: '#FFFFFF', cursor: 'pointer' }} /> {/* Ícone de editar */}
                                        </td>
                                        <td title="Ver Mais">
                                            <FaInfoCircle onClick={() => handleAlunoClick(aluno)} style={{ cursor: 'pointer', color: 'Yellow' }} /> {/* Ícone de ver mais */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={styles.paginacao}> {/* Controles de paginação */}
                            <button
                                onClick={() => mudarPagina(paginaAtual - 1)} // Muda para a página anterior
                                disabled={paginaAtual === 1} // Desabilita se já estiver na primeira página
                            >
                                <MdOutlineArrowBackIos />
                            </button>

                            <span>Página {paginaAtual} de {totalPaginas}</span> {/* Exibe informações da página atual */}

                            <button
                                onClick={() => mudarPagina(paginaAtual + 1)} // Muda para a próxima página
                                disabled={indiceUltimoItem >= alunosFiltrados.length} // Desabilita se já estiver na última página
                            >
                                <MdOutlineArrowForwardIos />
                            </button>
                        </div>
                    </>
                ) : (
                    <p style={{ color: 'white' }}>Nada encontrado</p> // Mensagem caso não haja alunos
                )}
            </div>
        </div>
    );
}

// Exporta o componente para uso em outras partes do aplicativo
export default ListarAluno;
