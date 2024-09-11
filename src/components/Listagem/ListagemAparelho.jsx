import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css'; // Importa estilos CSS específicos para este componente
import AparelhoRequests from '../../fetch/AparelhosRequests'; // Importa as requisições para buscar aparelhos
import { FaTrash, FaRegEdit } from "react-icons/fa"; // Importa ícones da biblioteca react-icons
import { useNavigate } from 'react-router-dom';


/**
 * Componente funcional para listar aparelhos
 * @returns {JSX.Element} Componente JSX para listagem de aparelhos
 */
function ListarAparelho() {
    const [aparelhos, setAparelhos] = useState([]);
    const [filteredAparelhos, setFilteredAparelhos] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAparelho = async () => {
            try {
                const aparelhos = await AparelhoRequests.listarAparelho();
                setAparelhos(aparelhos);
                setFilteredAparelhos(aparelhos);
            } catch (error) {
                console.error('Erro ao buscar aparelhos: ', error);
            }
        };
        fetchAparelho();
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

    const deletarAparelho = async (aparelho) => {
        const confirmar = window.confirm(`Deseja deletar o Aparelho ${aparelho.nome_aparelho}?`);
        if (confirmar) {
            try {
                const sucesso = await AparelhoRequests.deletarAparelho(aparelho.id_aparelho);
                window.location.reload();
                if (sucesso) {
                    window.alert('Aparelho deletado com sucesso');
                    setAparelhos(aparelhos.filter(a => a.id_aparelho !== aparelho.id_aparelho));
                    setFilteredAparelhos(filteredAparelhos.filter(a => a.id_aparelho !== aparelho.id_aparelho));
                } else {
                    window.alert('Erro ao deletar Aparelho');
                }
            } catch (error) {
                window.alert('Erro ao deletar Aparelho');
                console.error('Erro ao deletar aparelho: ', error);
            }
        } else {
            window.alert('Aparelho não deletado');
        }
    };

    const UpdateAparelho = (aparelho) => {
        navigate(`/update/aparelho`, { state: { objeto: aparelho }, replace: true });
    }

    return (
        <>
            {/* Cabeçalho da seção */}
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.section}>
                                <h1 className={styles.titulo}>Tabela Aparelhos</h1>
                                <a className={styles.btn} style={{ textDecoration: "none" }} href="http://localhost:5173/Cadastro/Aparelho">
                                    Cadastrar aparelho
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Campo de Pesquisa */}
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar por nome"
                    className={styles.searchInput}
                />
            </div>

            {/* Tabela para listar os aparelhos */}
            <div className={styles.cntTb}>
                {filteredAparelhos.length > 0 ? (
                    <table className={`${styles.table} ${styles.tabela}`}>
                        <thead>
                            <tr className={styles.tabelaHeader}>
                                <th hidden>ID</th>
                                <th>Nome</th>
                                <th>Músculo Ativado</th>
                                <th colSpan={2}>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAparelhos.map(aparelho => (
                                <tr key={aparelho.id_aparelho} className={styles.tabelaCorpo}>
                                    <td hidden>{aparelho.id_aparelho}</td>
                                    <td>{aparelho.nome_aparelho.toUpperCase()}</td>
                                    <td>{aparelho.musculo_ativado.toUpperCase()}</td>
                                    <td>
                                        <FaTrash onClick={() => deletarAparelho(aparelho)} style={{ color: '#DB0135' }} />
                                    </td>
                                    <td>
                                        <FaRegEdit onClick={() => UpdateAparelho(aparelho)} style={{ color: '#FFFFFF' }} />
                                    </td> {/* Ícone de lixeira para ação de deletar */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{color: 'white'}}>Nada encontrado</p>
                )}
            </div>
        </>
    );
}

export default ListarAparelho;
