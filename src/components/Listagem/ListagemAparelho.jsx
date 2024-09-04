import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css'; // Importa estilos CSS específicos para este componente
import AparelhoRequests from '../../fetch/AparelhosRequests'; // Importa as requisições para buscar aparelhos
import { FaTrash } from "react-icons/fa"; // Importa o ícone de lixeira da biblioteca react-icons
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


/**
 * Componente funcional para listar aparelhos
 * @returns {JSX.Element} Componente JSX para listagem de aparelhos
 */
function ListarAparelho() {
    // Define o estado inicial para armazenar os aparelhos
    const [aparelhos, setAparelhos] = useState([]);
    const navigate = useNavigate();

    /**
     * Hook useEffect para carregar os aparelhos quando o componente é montado
     */
    useEffect(() => {
        /**
         * Função assíncrona para buscar os aparelhos da API
         */
        const fetchAparelho = async () => {
            try {
                // Realiza a requisição para buscar os aparelhos
                const aparelhos = await AparelhoRequests.listarAparelho();
                // Atualiza o estado com os aparelhos obtidos da API
                setAparelhos(aparelhos);
            } catch (error) {
                // Em caso de erro, exibe o erro no console
                console.error('Erro ao buscar aparelhos: ', error);
            }
        };

        // Chama a função para buscar os aparelhos
        fetchAparelho();
    }, []); // O array vazio como segundo parâmetro garante que useEffect seja executado apenas uma vez, após a montagem do componente

    const deletarAparelho = async (aparelho) => {
        const confirmar = window.confirm(`Deseja deletar o Aparelho ${aparelho.nome_aparelho}?`);
        if (confirmar) {
            try {
                const sucesso = await AparelhoRequests.deletarAparelho(aparelho.id_aparelho);
                window.location.reload();
                if (sucesso) {
                    window.alert('Aparelho deletado com sucesso');
                    setAparelhos(aparelhos.filter(aparelho => aparelho.id_aparelho !== aparelho.id_aparelho));
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
        // redireciona o usuário para a página de alteração de dados (componente AtualizarAlunos), passando como parâmetro um objeto com as informações do aluno
        navigate(`/update/aparelho`, { state: { objeto: aparelho }, replace: true });
    }
    // Renderização do componente
    return (
        <>
            {/* Cabeçalho da seção */}
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.section}>
                                <h1 className={styles.titulo}>Tabela Aparelhos</h1>
                                <a style={{ textDecoration: "none" }} href="http://localhost:5173/Cadastro/Aparelho" className={styles.btn}>
                                    Cadastrar aparelho
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabela para listar os aparelhos */}
            <div className={styles.cntTb}>
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
                        {/* Mapeia os aparelhos e renderiza cada um como uma linha na tabela */}
                        {aparelhos.map(aparelho => (
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
            </div>
        </>
    );
}

export default ListarAparelho;// Exporta o componente ListaAparelho para que possa ser utilizada em outras partes do código
