import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css';
import ProfessoresRequests from '../../fetch/ProfessoresRequests';
import { FaTrash, FaRegEdit, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { formatadorData } from "../../../util/Utilitarios";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md"; // Importando os ícones

/**
 * Componente funcional para listar professores
 * @returns JSX.Element
 */
function ListarProfessor() {
    const [professores, setProfessores] = useState([]);
    const [filteredProfessores, setFilteredProfessores] = useState([]);
    const [search, setSearch] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;
    const navigate = useNavigate();

    // Função para buscar a lista de professores
    useEffect(() => {
        const fetchProfessores = async () => {
            try {
                const professor = await ProfessoresRequests.listarProfessor();
                setProfessores(professor);
                setFilteredProfessores(professor);
            } catch (error) {
                console.error('Erro ao buscar professores: ', error);
            }
        };
        fetchProfessores();
    }, []);

    // Função para filtrar os professores com base na pesquisa
    useEffect(() => {
        if (search === '') {
            setFilteredProfessores(professores);
        } else {
            const filtered = professores.filter(professor =>
                professor.nome.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProfessores(filtered);
        }
    }, [search, professores]);

    // Formatação de CPF
    const formatarCPF = (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    // Formatação de Telefone
    const formatarTelefone = (telefone) => telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    // Função para deletar um professor
    const deleteProfessor = async (professor) => {
        const deletar = window.confirm(`Deseja mesmo remover o registro ${professor.nome}? Essa operação é irreversível!`);

        if (deletar) {
            if (ProfessoresRequests.deletarProfessor(professor.id_professor)) {
                window.alert(`Registro ${professor.nome} removido com sucesso.`);
            } else {
                window.alert(`Falha ao remover ${professor.nome}.`);
            }
            window.location.reload();
        }
    };

    // Função para navegar para a página de atualização de professor
    const updateProfessor = (professor) => {
        navigate(`/update/professor`, { state: { objeto: professor }, replace: true });
    };

    // Função para exibir mais informações sobre um professor
    const handleProfessorClick = (professor) => {
        navigate(`/card/professor`, { state: { objeto: professor }, replace: true });
    };

    // Paginação
    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const professoresPaginados = filteredProfessores.slice(indicePrimeiroItem, indiceUltimoItem);
    const totalPaginas = Math.ceil(filteredProfessores.length / itensPorPagina);

    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina);
    };

    return (
        <div className="content">
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.section}>
                                <h1 className={styles.titulo}>Tabela Professores</h1>
                            </div>
                            <a style={{ textDecoration: "none" }} href="http://localhost:5173/Cadastro/Professor" className={styles.btn}>
                                Novo Professor
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar por nome"
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.cntTb}>
                {professoresPaginados.length > 0 ? (
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
                                {professoresPaginados.map(professor => (
                                    <tr key={professor.id_professor} className={styles.tabelaCorpo}>
                                        <td hidden>{professor.id_professor}</td>
                                        <td title="Ver Mais" onClick={() => handleProfessorClick(professor)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                            {professor.nome.toUpperCase()}
                                        </td>
                                        <td>{formatarCPF(professor.cpf)}</td>
                                        <td>{formatadorData(professor.data_nascimento)}</td>
                                        <td style={{ width: 200 }}>{formatarTelefone(professor.celular)}</td>
                                        <td hidden>{professor.endereco.toUpperCase()}</td>
                                        <td hidden>{professor.email.toUpperCase()}</td>
                                        <td hidden>{formatadorData(professor.data_contratacao)}</td>
                                        <td hidden>{professor.formacao.toUpperCase()}</td>
                                        <td>{professor.especialidade.toUpperCase()}</td>
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
                        <div className={styles.paginacao}>
                            <button
                                onClick={() => mudarPagina(paginaAtual - 1)}
                                disabled={paginaAtual === 1}
                            >
                                <MdOutlineArrowBackIos />
                            </button>

                            <span>Página {paginaAtual} de {totalPaginas}</span>

                            <button
                                onClick={() => mudarPagina(paginaAtual + 1)}
                                disabled={paginaAtual === totalPaginas || professoresPaginados.length === 0}
                            >
                                <MdOutlineArrowForwardIos />
                            </button>
                        </div>
                    </>
                ) : (
                    <p style={{ color: 'white' }}>Nada encontrado</p>
                )}
            </div>
        </div>
    );
}

export default ListarProfessor;
