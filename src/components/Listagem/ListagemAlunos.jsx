import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css';
import AlunoRequests from '../../fetch/AlunoRequests';
import { FaTrash, FaRegEdit, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { formatadorData } from "../../../util/Utilitarios";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";

/**
 * Componente funcional para listar alunos
 * @returns JSX.Element
 */
function ListarAluno() {
    const [alunos, setAlunos] = useState([]);
    const [alunosFiltrados, setAlunosFiltrados] = useState([]);
    const [search, setSearch] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const aluno = await AlunoRequests.listarAlunos();
                setAlunos(aluno);
                setAlunosFiltrados(aluno);
            } catch (error) {
                console.error('Erro ao buscar alunos: ', error);
            }
        };
        fetchAlunos();
    }, []);

    useEffect(() => {
        if (search === '') {
            setAlunosFiltrados(alunos);
        } else {
            const filtrados = alunos.filter(aluno =>
                aluno.nome.toLowerCase().includes(search.toLowerCase())
            );
            setAlunosFiltrados(filtrados);
        }
    }, [search, alunos]);

    const formatarCPF = (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    const formatarTelefone = (telefone) => telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    const deleteAluno = (aluno) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o aluno ${aluno.nome}?`);
        if (deletar) {
            if (AlunoRequests.deletarAluno(aluno.id_aluno)) {
                window.location.reload();
                window.alert('Aluno removido com sucesso!');
            } else {
                window.alert('Erro ao remover aluno!');
            }
        }
    };
    
    const updateAluno = (aluno) => {
        navigate(`/update/aluno`, { state: { objeto: aluno }, replace: true });
    };

    const handleAlunoClick = (aluno) => {
        navigate(`/card/aluno`, { state: { objeto: aluno }, replace: true });
    };

    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const alunosPaginados = alunosFiltrados.slice(indicePrimeiroItem, indiceUltimoItem);
    const totalPaginas = Math.ceil(alunosFiltrados.length / itensPorPagina);

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
                                <h1 className={styles.titulo}>Tabela Alunos</h1>
                            </div>
                            <a style={{ textDecoration: "none" }} href="http://localhost:5173/Cadastro/Aluno" className={styles.btn}>
                                Cadastrar aluno
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
                {alunosFiltrados.length > 0 ? (
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
                                <th colSpan={3}>AÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunosPaginados.map(aluno => (
                                <tr key={aluno.id_aluno} className={styles.tabelaCorpo}>
                                    <td hidden>{aluno.id_aluno}</td>
                                    <td title="Ver Mais" onClick={() => handleAlunoClick(aluno)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                        {aluno.nome.toUpperCase()}
                                    </td>
                                    <td>{formatarCPF(aluno.cpf)}</td>
                                    <td>{formatadorData(aluno.data_nascimento)}</td>
                                    <td style={{ width: 200 }}>{formatarTelefone(aluno.celular)}</td>
                                    <td>{aluno.endereco.toUpperCase()}</td>
                                    <td hidden>{aluno.email.toUpperCase()}</td>
                                    <td hidden>{`${aluno.altura} m`}</td>
                                    <td hidden>{`${aluno.peso} kg`}</td>
                                    <td hidden>{aluno.imc}</td>
                                    <td title="Deletar Aluno">
                                        <FaTrash onClick={() => deleteAluno(aluno)} style={{ color: '#DB0135', cursor: 'pointer' }} />
                                    </td>
                                    <td title="Atualizar Aluno">
                                        <FaRegEdit onClick={() => updateAluno(aluno)} style={{ color: '#FFFFFF', cursor: 'pointer' }} />
                                    </td>
                                    <td title="Ver Mais">
                                        <FaInfoCircle onClick={() => handleAlunoClick(aluno)} style={{ cursor: 'pointer', color: 'Yellow' }} />
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
                                disabled={indiceUltimoItem >= alunosFiltrados.length}
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

export default ListarAluno;
