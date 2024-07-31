import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap
import styles from '../styles/StyleListagem.module.css'; // Importa estilos CSS específicos para este componente
import ExerciciosRequests from '../../fetch/ExerciciosRequests'; // Importação do módulo responsável por fazer as requisições dos exercícios
import AparelhosRequests from '../../fetch/AparelhosRequests'; // Importação do módulo responsável por fazer as requisições dos aparelhos
import { FaTrash } from "react-icons/fa"; // Importação do ícone de lixeira da biblioteca react-icons

// fechar comentar
function TabelaListagemExercicios() {
    const [exercicios, setExercicios] = useState([]); // Estado para armazenar os exercícios
    // const [aparelhos, setAparelho] = useState([]);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const exercicios = await ExerciciosRequests.listarExercicio(); // Requisição para buscar os exercícios
                const aparelhos = await AparelhosRequests.listarAparelho(); // Requisição para buscar os aparelhos

                // Mapeia aparelhos com os seus respectivos ids
                const aparelhosMap = aparelhos.reduce((map, aparelho) => {
                    map[aparelho.id_aparelho] = aparelho;
                    return map;
                }, {});

                // Adiciona o nome do aparelho ao exercício correspondente
                const exerciciosComAparelhos = exercicios.map(exercicio => ({
                    ...exercicio,
                    nome_aparelho: aparelhosMap[exercicio.id_aparelho]?.nome_aparelho || 'N/A'
                }));

                setExercicios(exerciciosComAparelhos); // Atualiza o estado com os exercícios obtidos
            } catch (error) {
                console.error('Erro ao buscar dados: ', error); // Em caso de erro, exibe no console
            }
        };

        fetchDados(); // Chama a função para buscar os dados ao montar o componente
    }, []);

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
                                <th>Nome do Exercício</th>
                                <th>Aparelho</th>
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
                                    <td>{exercicio.exercicio.toUpperCase()}</td>
                                    <td>{exercicio.nome_aparelho.toUpperCase()}</td>
                                    <td>{exercicio.repeticoes}</td>
                                    <td>{`${exercicio.carga} Kg`}</td>
                                    <td>{exercicio.regiao_corpo_ativa.toUpperCase()}</td>
                                    <td onClick={() => {console.log('deletar')}}><FaTrash /></td> {/* Botão para deletar um exercício */}
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
