import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css';
import AparelhoRequests from '../../fetch/AparelhosRequests';
import { FaTrash, FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";

/**
 * Componente funcional para listar aparelhos
 * @returns {JSX.Element} Componente JSX para listagem de aparelhos
 */
function ListarAparelho() {
    const [aparelhos, setAparelhos] = useState([]);
    const [filteredAparelhos, setFilteredAparelhos] = useState([]);
    const [search, setSearch] = useState('');
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5; // Define quantos itens serão exibidos por página
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAparelhos = async () => {
            try {
                const aparelhos = await AparelhoRequests.listarAparelho();
                setAparelhos(aparelhos);
                setFilteredAparelhos(aparelhos);
            } catch (error) {
                console.error('Erro ao buscar aparelhos: ', error);
            }
        };
        fetchAparelhos();
    }, []);

    useEffect(() => {
        if (search === '') {
            setFilteredAparelhos(aparelhos);
        } else {
            const filtered = aparelhos.filter(aparelho =>
                aparelho.nome_aparelho.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredAparelhos(filtered);
        }
    }, [search, aparelhos]);

    const deletarAparelho = (aparelho) => {
        const deletar = window.confirm(`Deseja mesmo remover o registro ${aparelho.nome_aparelho}? Essa operação é irreversível!`);

        if (deletar) {
            if (AparelhoRequests.deletarAparelho(aparelho.id_aparelho)) {
                window.alert(`Registro ${aparelho.nome_aparelho} removido com sucesso.`);
            } else {
                window.alert(`Falha ao remover ${aparelho.nome_aparelho}.`);
            }
            window.location.reload();
        }
    };

    const updateAparelho = (aparelho) => {
        navigate(`/update/aparelho`, { state: { objeto: aparelho }, replace: true });
    };

    // Paginação
    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const aparelhosPaginados = filteredAparelhos.slice(indicePrimeiroItem, indiceUltimoItem);
    const totalPaginas = Math.ceil(filteredAparelhos.length / itensPorPagina);

    const mudarPagina = (novaPagina) => {
        setPaginaAtual(novaPagina);
    };

    return (
        <>
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.section}>
                                <h1 className={styles.titulo}>Tabela Aparelhos</h1>
                            </div>
                            <a style={{ textDecoration: "none" }} href="http://localhost:5173/Cadastro/Aparelho" className={styles.btn}>
                                Novo aparelho
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
                {filteredAparelhos.length > 0 ? (
                    <>
                        <table className={`${styles.table} ${styles.tabela}`}>
                            <thead>
                                <tr className={styles.tabelaHeader}>
                                    <th hidden>ID</th>
                                    <th>NOME</th>
                                    <th>MÚSCULO ATIVADO</th>
                                    <th colSpan={2}>AÇÃO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aparelhosPaginados.map(aparelho => (
                                    <tr key={aparelho.id_aparelho} className={styles.tabelaCorpo}>
                                        <td hidden>{aparelho.id_aparelho}</td>
                                        <td>{aparelho.nome_aparelho.toUpperCase()}</td>
                                        <td>{aparelho.musculo_ativado.toUpperCase()}</td>
                                        <td title="Deletar Aparelho">
                                            <FaTrash onClick={() => deletarAparelho(aparelho)} style={{ color: '#DB0135', cursor: 'pointer' }} />
                                        </td>
                                        <td title="Atualizar Aparelho">
                                            <FaRegEdit onClick={() => updateAparelho(aparelho)} style={{ color: '#FFFFFF', cursor: 'pointer' }} />
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
                                disabled={indiceUltimoItem >= filteredAparelhos.length}
                            >
                                <MdOutlineArrowForwardIos />
                            </button>
                        </div>
                    </>
                ) : (
                    <p style={{ color: 'white' }}>Nada encontrado</p>
                )}
            </div>
        </>
    );
}

export default ListarAparelho;
