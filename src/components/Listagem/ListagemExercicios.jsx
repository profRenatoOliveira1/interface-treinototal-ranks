import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap
import styles from '../styles/StyleListagem.module.css'; // Importa estilos CSS específicos para este componente
import ExerciciosRequests from '../../fetch/ExerciciosRequests'; // Importação do módulo responsável por fazer as requisições dos exercícios
import AparelhosRequests from '../../fetch/AparelhosRequests'; // Importação do módulo responsável por fazer as requisições dos aparelhos
import { FaTrash } from "react-icons/fa"; // Importação do ícone de lixeira da biblioteca react-icons
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

/**
 * Componente para listar exercícios
 * @returns {JSX.Element} Componente JSX para listagem de exercícios
 */
function TabelaListagemExercicios() {
    const [exercicios, setExercicios] = useState([]); // Estado para armazenar os exercícios
    const navigate = useNavigate();
    const [aparelhos, setAparelhos] = useState([]);

    /**
     * Hook useEffect para carregar os dados dos exercícios e aparelhos quando o componente é montado
     */
    useEffect(() => {
        /**
         * Função assíncrona para buscar os exercícios e aparelhos da API
         */
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
                    nome_aparelho: aparelhosMap[exercicio.id_aparelho]?.nome_aparelho
                }));

                setExercicios(exerciciosComAparelhos); // Atualiza o estado com os exercícios obtidos
            } catch (error) {
                console.error('Erro ao buscar dados: ', error); // Em caso de erro, exibe no console
            }
        };

        fetchDados(); // Chama a função para buscar os dados ao montar o componente
    }, []);

    const deletarExercicio = (exercicio) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o exercício ${exercicio.exercicio}?`);

        if (deletar) {
            if (ExerciciosRequests.deletarExercicio(exercicio.id_exercicio)) {
                window.location.reload();
                window.alert('Exercicio removido com sucesso');
            } else {
                window.alert('Erro ao remover exercicio');
            }
        }
    };
    // Renderização do componente

    const UpdateExercicio = (exercicio) => {
        // redireciona o usuário para a página de alteração de dados (componente AtualizarAlunos), passando como parâmetro um objeto com as informações do aluno
        navigate(`/update/exercicio`, { state: { objeto: exercicio }, replace: true });
    }

    return (
        <>
            {/* Título da tabela de exercícios */}
            <h1 className={styles.titulo}>Tabela de Exercícios</h1>
            <a style={{ textDecoration: "none" }} href="http://localhost:5173/Cadastro/Exercicio" className={styles.btn}>
                Cadastrar Exercicio
            </a>
            {/* Tabela para listar os exercícios */}
            <div className={styles.cntTb}>
                {/* Verifica se há exercícios a serem exibidos */}
                {exercicios.length > 0 ? (
                    <table className={`${styles.table} ${styles.tabela}`}>
                        <thead>
                            <tr className={styles.tabelaHeader}>
                                <th hidden>ID</th>
                                <th hidden>ID</th>
                                <th>Nome do Exercício</th>
                                <th>Aparelho</th>
                                <th>Repetições</th>
                                <th>Carga</th>
                                <th>Região do Corpo</th>
                                <th colSpan={2}>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapeia os exercícios e renderiza cada um como uma linha na tabela */}
                            {exercicios.map(exercicio => (
                                <tr key={exercicio.id_exercicio} className={styles.tabelaCorpo}>
                                    <td hidden>{exercicio.id_exercicio}</td>
                                    <td hidden>{exercicio.id_aparelho}</td>
                                    <td>{exercicio.exercicio.toUpperCase()}</td>
                                    <td>{exercicio.nome_aparelho.toUpperCase()}</td>
                                    <td>{exercicio.repeticoes}</td>
                                    <td>{`${exercicio.carga} Kg`}</td>
                                    <td>{exercicio.regiao_corpo_ativa.toUpperCase()}</td>
                                    <td >
                                        <FaTrash onClick={() => deletarExercicio(exercicio)} style={{ color: '#DB0135' }} />
                                    </td> {/* Botão para deletar um exercício */}
                                    <td>
                                        <FaRegEdit onClick={() => UpdateExercicio(exercicio)} style={{ color: '#FFFFFF' }} />
                                    </td> {/* Ícone de lixeira para ação de deletar */}
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

export default TabelaListagemExercicios;//exporta o componente TabelaListagemExercicios para ser utilizado em outras partes da aplicação
