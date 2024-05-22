import React, { useState } from 'react';
import styles from './ListarProfessor.module.css';
import ProfessoresRequests from '../../fetch/ProfessoresRequests';
function ListarProfessor() {
    const [professores] = useState([
        {
            nome: 'Ana Silva',
            cpf: '345.678.901-23',
            dataNascimento: '1980-03-10',
            telefone: '(11) 98765-4321',
            endereco: 'Rua das Flores, 456, São Paulo',
            email: 'ana.silva@example.com',
            senha: 'senhasecreta',
            dataContratacao: '2020-02-15',
            formacao: 'Licenciatura em Letras',
            especialidade: 'Língua Portuguesa'
        },
        {
            nome: 'Carlos Souza',
            cpf: '789.012.345-67',
            dataNascimento: '1975-09-25',
            telefone: '(21) 99876-5432',
            endereco: 'Av. Principal, 789, Rio de Janeiro',
            email: 'carlos.souza@example.com',
            senha: 'outrasenha',
            dataContratacao: '2018-05-20',
            formacao: 'Bacharelado em Matemática',
            especialidade: 'Álgebra'
        },
        {
            nome: 'Mariana Oliveira',
            cpf: '123.456.789-00',
            dataNascimento: '1988-12-01',
            telefone: '(31) 98765-1234',
            endereco: 'Rua das Palmeiras, 123, Belo Horizonte',
            email: 'mariana.oliveira@example.com',
            senha: '12345678',
            dataContratacao: '2015-10-10',
            formacao: 'Licenciatura em Biologia',
            especialidade: 'Ecologia'
        }
    ]);

    return (
        <>
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.section}>
                            <h1 className={styles.titulo}>Tabela Professor</h1>
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
                            <th>CPF</th>
                            <th>Data de Nascimento</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Email</th>
                            <th>Senha</th>
                            <th>Data de Contratação</th>
                            <th>Formação</th>
                            <th>Especialidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professores.map(professor => (
                            <tr key={professor.cpf} className={styles.tabelaCorpo}>
                                <td>{professor.nome}</td>
                                <td>{professor.cpf}</td>
                                <td>{professor.dataNascimento}</td>
                                <td>{professor.telefone}</td>
                                <td>{professor.endereco}</td>
                                <td>{professor.email}</td>
                                <td>{professor.senha}</td>
                                <td>{professor.dataContratacao}</td>
                                <td>{professor.formacao}</td>
                                <td>{professor.especialidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListarProfessor;
