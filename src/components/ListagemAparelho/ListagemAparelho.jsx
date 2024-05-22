import React, { useState } from 'react';
import styles from './ListarAparelho.module.css';

function ListarAparelho() {
    const [aparelhos] = useState([
        {
            nome: 'Smartphone X',
            marca: 'Marca A',
            modelo: 'X2020',
            numeroSerie: '12345-ABC',
            dataFabricacao: '2020-05-15',
            dataAquisicao: '2021-03-10',
            preco: '1500.00',
            garantia: '2 anos'
        },
        {
            nome: 'Notebook Y',
            marca: 'Marca B',
            modelo: 'YPro',
            numeroSerie: '67890-DEF',
            dataFabricacao: '2019-08-20',
            dataAquisicao: '2020-01-15',
            preco: '3500.00',
            garantia: '3 anos'
        },
        {
            nome: 'Tablet Z',
            marca: 'Marca C',
            modelo: 'ZTab',
            numeroSerie: '11223-GHI',
            dataFabricacao: '2021-02-10',
            dataAquisicao: '2021-06-05',
            preco: '1200.00',
            garantia: '1 ano'
        }
    ]);

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
                            <th>Nome</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Número de Série</th>
                            <th>Data de Fabricação</th>
                            <th>Data de Aquisição</th>
                            <th>Preço</th>
                            <th>Garantia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aparelhos.map(aparelho => (
                            <tr key={aparelho.numeroSerie} className={styles.tabelaCorpo}>
                                <td>{aparelho.nome}</td>
                                <td>{aparelho.marca}</td>
                                <td>{aparelho.modelo}</td>
                                <td>{aparelho.numeroSerie}</td>
                                <td>{aparelho.dataFabricacao}</td>
                                <td>{aparelho.dataAquisicao}</td>
                                <td>{aparelho.preco}</td>
                                <td>{aparelho.garantia}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListarAparelho;
