import React, { useState, useEffect } from 'react';
import styles from './ListarAparelho.module.css';
import AparelhoRequests from '../../fetch/AparelhosRequests';
import { FaTrash } from "react-icons/fa";

function ListarAparelho() {
    const [aparelhos, setAparelho] = useState([]);

    useEffect(() => {
        const fetchAparelho = async () => {
            try {
                const aparelhos = await AparelhoRequests.listarAparelho();
                setAparelho(aparelhos);
            } catch (error) {
                console.error('Erro ao buscar aparelhos: ', error);
            }
        };

        fetchAparelho();
    }, []);

    const deletar = () => {
        window.alert('Não foi feito... ainda');
    };

    console.log(aparelhos);

    return (
        <>
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
                        {aparelhos.map(aparelho => (
                            <tr key={aparelho.id_aparelho} className={styles.tabelaCorpo}>
                                <td>{aparelho.id_aparelho}</td>
                                <td>{aparelho.nome_aparelho}</td>
                                <td>{aparelho.musculo_ativado}</td>
                                <td onClick={deletar}><FaTrash /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListarAparelho;
