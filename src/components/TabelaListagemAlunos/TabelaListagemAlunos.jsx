import React, { useState } from 'react';
import styles from './TabelaListagemAlunos.module.css';

function ListarAluno() {
    const [alunos] = useState([
        {
            id: 1,

            nome: 'João Pereira',
            cpf: '20210001',
            data_nascimento: '2005-06-15',
            celular: '(11) 91234-5678',
            endereco: 'Rua A, 123, São Paulo',
            email: 'joao.pereira@example.com',
            senha: '2021-02-01',
            altura: 1.75,
            peso: 70,
            imc: 22.86,
        },
        {
            id: 2,
            nome: 'Maria Souza',
            cpf: '20210002',
            data_nascimento: '2004-08-22',
            celular: '(21) 92345-6789',
            endereco: 'Avenida B, 456, Rio de Janeiro',
            email: 'maria.souza@example.com',
            senha: '2021-02-01',
            altura: 1.60,
            peso: 55,
            imc: 21.48,
        },
        {
            id: 3,
            nome: 'Carlos Lima',
            cpf: '20210003',
            data_nascimento: '2003-12-30',
            celular: '(31) 93456-7890',
            endereco: 'Rua C, 789, Belo Horizonte',
            email: 'carlos.lima@example.com',
            senha: '2021-02-01',
            altura: 1.90,
            peso: 80,
            imc: 22.16,
        }
    ]);
    
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
                            <tr key={aluno.matricula} className={styles.tabelaCorpo}>
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
