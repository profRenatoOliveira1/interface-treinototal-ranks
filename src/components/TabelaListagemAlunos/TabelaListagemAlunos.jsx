import React, { useState, useEffect } from 'react';
import styles from './TabelaListagemAlunos.module.css';
import AlunoRequests from '../../fetch/AlunoRequests';

function ListarAluno() {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const response = await AlunoRequests.listarAlunos();
                setAlunos(response.data); // Supondo que o backend retorna um objeto com uma propriedade "data" contendo a lista de alunos
            } catch (error) {
                console.error('Erro ao listar alunos:', error);
            }
        };

        fetchAlunos();
    }, []);

    return (
        <>
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
            
            <div className={styles.cntTb}>
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
                            <th>Senha</th>
                            <th>Altura</th>
                            <th>Peso</th>
                            <th>IMC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.map(aluno => (
                            <tr key={aluno.id} className={styles.tabelaCorpo}>
                                <td>{aluno.id}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.cpf}</td>
                                <td>{aluno.data_nascimento}</td>
                                <td>{aluno.celular}</td>
                                <td>{aluno.endereco}</td>
                                <td>{aluno.email}</td>
                                <td>{aluno.senha}</td>
                                <td>{aluno.altura}</td>
                                <td>{aluno.peso}</td>
                                <td>{aluno.imc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListarAluno;
