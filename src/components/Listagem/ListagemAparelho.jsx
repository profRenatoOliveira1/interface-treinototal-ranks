import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css'; // Importa estilos CSS específicos para este componente
import AparelhoRequests from '../../fetch/AparelhosRequests'; // Importa as requisições para buscar aparelhos
import { FaTrash } from "react-icons/fa"; // Importa o ícone de lixeira da biblioteca react-icons

// falta comnetar
function ListarAparelho() {
    // Define o estado inicial para armazenar os aparelhos
    const [aparelhos, setAparelhos] = useState([]);

    // useEffect para carregar os aparelhos quando o componente é montado
    useEffect(() => {
        // Função assíncrona para buscar os aparelhos da API
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
                            <th>Nome</th>
                            <th>Músculo Ativado</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapeia os aparelhos e renderiza cada um como uma linha na tabela */}
                        {aparelhos.map(aparelho => (
                            <tr key={aparelho.id_aparelho} className={styles.tabelaCorpo}>
                                <td>{aparelho.nome_aparelho.toUpperCase()}</td>
                                <td>{aparelho.musculo_ativado.toUpperCase()}</td>
                                <td onClick={() => {console.log('deletar');}} className={styles.deleteButton}>
                                    <FaTrash />
                                </td> {/* Botão para deletar um aparelho */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListarAparelho;
