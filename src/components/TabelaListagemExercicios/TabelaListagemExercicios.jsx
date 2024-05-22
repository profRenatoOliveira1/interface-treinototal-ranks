import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './TabelaListagemExercicios.module.css';
import ExerciciosRequests from '../../fetch/ExerciciosRequests'; 
import { FaTrash } from "react-icons/fa";

function TabelaListagemExercicios() {
    const [exercicios, setExercicios] = useState([]);

    useEffect(() => {
        const fetchExercicios = async () => {
            try {
                const exercicios = await ExerciciosRequests.listarExercicio();
                setExercicios(exercicios);
            } catch (error) {
                console.error('Erro ao buscar exercícios: ', error);
            }
        };

        fetchExercicios();
    }, []);

    const deletar = () => {
        window.alert('Não foi feito... ainda');
    };

    console.log(exercicios);

    return (
        <>
            <h1 className={styles.titulo}>Tabela de Exercícios</h1>
            <div className={styles.cntTb}>
                {exercicios.length > 0 ? (
                    <table className={`${styles.table} ${styles.tabela}`}>
                        <thead>
                            <tr className={styles.tabelaHeader}>
                                <th>ID</th>
                                <th>Nome do Exercício</th>
                                <th>Repetições</th>
                                <th>Carga</th>
                                <th>Região do Corpo</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exercicios.map(exercicio => (
                                <tr key={exercicio.id_exercicio} className={styles.tabelaCorpo}>
                                    <td>{exercicio.id_exercicio}</td>
                                    <td>{exercicio.exercicio}</td>
                                    <td>{exercicio.repeticoes}</td>
                                    <td>{exercicio.carga}</td>
                                    <td>{exercicio.regiao_corpo_ativa}</td>
                                    <td onClick={deletar}><FaTrash /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </>
    );
}

export default TabelaListagemExercicios;
