import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap
import styles from './TabelaListagemExercicios.module.css'; // Importação dos estilos CSS específicos para este componente
import ExerciciosRequests from '../../fetch/ExerciciosRequests'; // Importação do módulo responsável por fazer as requisições dos exercícios
import { FaTrash } from "react-icons/fa"; // Importação do ícone de lixeira da biblioteca react-icons

function TabelaListagemExercicios() {
    const [exercicios, setExercicios] = useState([]); // Estado para armazenar os exercícios

    useEffect(() => {
        const fetchExercicios = async () => {
            try {
                const exercicios = await ExerciciosRequests.listarExercicio(); // Requisição para buscar os exercícios
                setExercicios(exercicios); // Atualiza o estado com os exercícios obtidos
            } catch (error) {
                console.error('Erro ao buscar exercícios: ', error); // Em caso de erro, exibe no console
            }
        };

        fetchExercicios(); // Chama a função para buscar os exercícios ao montar o componente
    }, []);

    const deletar = () => {
        window.alert('Não foi feito... ainda'); // Função para deletar um exercício (ainda não implementada)
    };

    console.log(exercicios); // Exibe os exercícios no console para depuração

    // Renderização do componente
    return (
        <>
            {/* Título da tabela de exercícios */}
            <h1 className={styles.titulo}>Tabela de Exercícios</h1>

            {/* Tabela para listar os exercícios */}
            <div className={styles.cntTb}>
                {/* Verifica se há exercícios a serem exibidos */}
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
                            {/* Mapeia os exercícios e renderiza cada um como uma linha na tabela */}
                            {exercicios.map(exercicio => (
                                <tr key={exercicio.id_exercicio} className={styles.tabelaCorpo}>
                                    <td>{exercicio.id_exercicio}</td>
                                    <td>{exercicio.exercicio}</td>
                                    <td>{exercicio.repeticoes}</td>
                                    <td>{exercicio.carga}</td>
                                    <td>{exercicio.regiao_corpo_ativa}</td>
                                    <td onClick={deletar}><FaTrash /></td> {/* Botão para deletar um exercício */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
                    <p>Carregando...</p>
                )}
            </div>
        </>
    );
}

export default TabelaListagemExercicios;
