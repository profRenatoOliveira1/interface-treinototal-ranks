import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './TabelaListagemExercicios.module.css'; // Importe o módulo CSS corretamente

function TabelaListagemExercicios() {
 
    const [listarExercicio, setExercicios] = useState([]);

    useEffect(() => {
        const fetchExercicios = async () => {
           
                setExercicios(listarExercicio);
                console.error('Erro ao buscar exercícios: ', error);
            }

        fetchExercicios();
    }, []);

    return (
        <div className={styles.cntTb}>
            <h1 className={styles.titulo}>Tabela de Exercícios</h1>
            {exercicios.length > 0 ? (
                <table className={`${styles.table} ${styles.tabela}`}> {/* Utilize as classes do módulo CSS corretamente */}
                    <thead>
                        <tr className={styles.tabelaHeader}>
                            <th>ID</th>
                            <th>Nome do Exercício</th>
                            <th>Repetições</th>
                            <th>Carga</th>
                            <th>Região do Corpo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercicios.map(exercicio => (
                            <tr key={exercicio.id} className={styles.tabelaCorpo}>
                                <td>{exercicio.id}</td>
                                <td>{exercicio.nome}</td>
                                <td>{exercicio.repeticoes}</td>
                                <td>{exercicio.carga}</td>
                                <td>{exercicio.regiaoCorpo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}

export default TabelaListagemExercicios;