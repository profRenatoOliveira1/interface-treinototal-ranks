import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap
import styles from '../styles/StyleListagem.module.css'; // Importa estilos CSS específicos para este componente
import ExerciciosRequests from '../../fetch/ExerciciosRequests'; // Importação do módulo responsável por fazer as requisições dos exercícios
import AparelhosRequests from '../../fetch/AparelhosRequests'; // Importação do módulo responsável por fazer as requisições dos aparelhos
import { FaTrash, FaRegEdit } from "react-icons/fa"; // Importação de ícones da biblioteca react-icons
import { useNavigate } from 'react-router-dom';

/**
 * Componente para listar exercícios
 * @returns {JSX.Element} Componente JSX para listagem de exercícios
 */
function TabelaListagemExercicios() {
    const [exercicios, setExercicios] = useState([]); // Estado para armazenar os exercícios
    const [filteredExercicios, setFilteredExercicios] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const exercicios = await ExerciciosRequests.listarExercicio(); // Requisição para buscar os exercícios
                const aparelhos = await AparelhosRequests.listarAparelho(); // Requisição para buscar os aparelhos

                const aparelhosMap = aparelhos.reduce((map, aparelho) => {
                    map[aparelho.id_aparelho] = aparelho;
                    return map;
                }, {});

                const exerciciosComAparelhos = exercicios.map(exercicio => ({
                    ...exercicio,
                    nome_aparelho: aparelhosMap[exercicio.id_aparelho]?.nome_aparelho
                }));

                setExercicios(exerciciosComAparelhos); // Atualiza o estado com os exercícios obtidos
                setFilteredExercicios(exerciciosComAparelhos);
            } catch (error) {
                console.error('Erro ao buscar dados: ', error); // Em caso de erro, exibe no console
            }
        };

        fetchDados(); // Chama a função para buscar os dados ao montar o componente
    }, []);

    useEffect(() => {
        if (search === '') {
            setFilteredExercicios(exercicios);
        } else {
            const filtered = exercicios.filter(exercicio =>
                exercicio.exercicio.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredExercicios(filtered);
        }
    }, [search, exercicios]);

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

    const UpdateExercicio = (exercicio) => {
        navigate(`/update/exercicio`, { state: { objeto: exercicio }, replace: true });
    }

    return (
        <>
            {/* Título da tabela de exercícios */}
            <h1 className={styles.titulo}>Tabela de Exercícios</h1>
            <a style={{ textDecoration: "none" }} href="http://localhost:5173/Cadastro/Exercicio" className={styles.btn}>
                Cadastrar Exercicio
            </a>

            {/* Campo de Pesquisa */}
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar por nome"
                    className={styles.searchInput}
                />
            </div>

            {/* Tabela para listar os exercícios */}
            <div className={styles.cntTb}>
                {filteredExercicios.length > 0 ? (
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
                            {filteredExercicios.map(exercicio => (
                                <tr key={exercicio.id_exercicio} className={styles.tabelaCorpo}>
                                    <td hidden>{exercicio.id_exercicio}</td>
                                    <td hidden>{exercicio.id_aparelho}</td>
                                    <td>{exercicio.exercicio.toUpperCase()}</td>
                                    <td>{exercicio.nome_aparelho.toUpperCase()}</td>
                                    <td>{exercicio.repeticoes}</td>
                                    <td>{`${exercicio.carga} Kg`}</td>
                                    <td>{exercicio.regiao_corpo_ativa.toUpperCase()}</td>
                                    <td>
                                        <FaTrash onClick={() => deletarExercicio(exercicio)} style={{ color: '#DB0135' }} />
                                    </td>
                                    <td>
                                        <FaRegEdit onClick={() => UpdateExercicio(exercicio)} style={{ color: '#FFFFFF' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{color: 'white'}}>Nada encontrado</p>
                )}
            </div>
        </>
    );
}

export default TabelaListagemExercicios;
