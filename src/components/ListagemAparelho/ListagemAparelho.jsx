import React, { useState, useEffect } from 'react';
import styles from './ListarAparelho.module.css';
import AparelhoRequests from '../../fetch/AparelhosRequests'; // Importa as requisições para buscar aparelhos
import { FaTrash } from "react-icons/fa"; // Importa o ícone de lixeira da biblioteca react-icons

function ListarAparelho() {
    // Define o estado inicial para armazenar os aparelhos
    const [aparelhos, setAparelho] = useState([]);

    // useEffect para carregar os aparelhos quando o componente é montado
    useEffect(() => {
        // Função assíncrona para buscar os aparelhos da API
        const fetchAparelho = async () => {
            try {
                // Realiza a requisição para buscar os aparelhos
                const aparelhos = await AparelhoRequests.listarAparelho();
                // Atualiza o estado com os aparelhos obtidos da API
                setAparelho(aparelhos);
            } catch (error) {
                // Em caso de erro, exibe o erro no console
                console.error('Erro ao buscar aparelhos: ', error);
            }
        };

        // Chama a função para buscar os aparelhos
        fetchAparelho();
    }, []); // O array vazio como segundo parâmetro garante que useEffect seja executado apenas uma vez, após a montagem do componente

    // Função para deletar um aparelho (ainda não implementada)
    const deletar = () => {
        window.alert('Não foi feito... ainda'); // Exibe um alerta temporário
    };

    console.log(aparelhos); // Exibe os aparelhos no console para depuração

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
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Músculo Ativado</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapeia os aparelhos e renderiza cada um como uma linha na tabela */}
                        {aparelhos.map(aparelho => (
                            <tr key={aparelho.id_aparelho} className={styles.tabelaCorpo}>
                                <td>{aparelho.id_aparelho}</td>
                                <td>{aparelho.nome_aparelho}</td>
                                <td>{aparelho.musculo_ativado}</td>
                                <td onClick={deletar}><FaTrash /></td> {/* Botão para deletar um aparelho */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListarAparelho;
