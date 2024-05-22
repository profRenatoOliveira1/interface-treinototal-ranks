import React, { useState, useEffect } from 'react';
import styles from './TabelaListagemAlunos.module.css';
import AlunoRequests from '../../fetch/AlunoRequests';
import { FaTrash } from "react-icons/fa";

function ListarAluno() {
    // Define o estado inicial para armazenar os alunos
    const [alunos, setAlunos] = useState([]);

    // useEffect para carregar os alunos quando o componente é montado
    useEffect(() => {
        // Função assíncrona para buscar os alunos da API
        const fetchAlunos = async () => {
            try {
                // Realiza a requisição para buscar os alunos
                const aluno = await AlunoRequests.listarAlunos();
                // Atualiza o estado com os alunos obtidos da API
                setAlunos(aluno);
            } catch (error) {
                // Em caso de erro, exibe o erro no console
                console.error('Erro ao buscar alunos: ', error);
            }
        };

        // Chama a função para buscar os alunos
        fetchAlunos();
    }, []); // O array vazio como segundo parâmetro garante que useEffect seja executado apenas uma vez, após a montagem do componente

    // Função para formatar a data no formato brasileiro
    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-br');
    };

    // Função para formatar o CPF
    const formatarCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    // Função para formatar o número de telefone
    const formatarTelefone = (telefone) => {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    // Função para deletar um aluno (ainda não implementada)
    const deletar = () => {
        window.alert('Não foi feito... ainda'); // Exibe um alerta temporário
    };

    console.log(alunos); // Exibe os alunos no console para depuração

    // Renderização do componente
    return (
        <>
            {/* Cabeçalho da seção */}
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.section}>
                                <h1 className={styles.titulo}>Tabela Alunos</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabela para listar os alunos */}
            <div className={styles.cntTb}>
                {/* Verifica se há alunos a serem exibidos */}
                {alunos.length > 0 ? (
                    <table className={`${styles.table} ${styles.tabela}`}>
                        <thead>
                            <tr className={styles.tabelaHeader}>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Data de Nascimento</th>
                                <th>Telefone</th>
                                <th>Endereço</th>
                                <th>Email</th>
                                <th>Altura</th>
                                <th>Peso</th>
                                <th>IMC</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapeia os alunos e renderiza cada um como uma linha na tabela */}
                            {alunos.map(aluno => (
                                <tr key={aluno.id_aluno} className={styles.tabelaCorpo}>
                                    <td>{aluno.id_aluno}</td>
                                    <td>{aluno.nome}</td>
                                    <td>{formatarCPF(aluno.cpf)}</td>
                                    <td>{formatarData(aluno.data_nascimento)}</td>
                                    <td>{formatarTelefone(aluno.celular)}</td>
                                    <td>{aluno.endereco}</td>
                                    <td>{aluno.email}</td>
                                    <td>{aluno.altura}</td>
                                    <td>{aluno.peso}</td>
                                    <td>{aluno.imc}</td>
                                    <td onClick={deletar}><FaTrash /></td> {/* Botão para deletar um aluno */}
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

export default ListarAluno;
