import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css';
import AlunoRequests from '../../fetch/AlunoRequests';
import { FaTrash } from "react-icons/fa";

// falta comentar
function ListarAluno() {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const aluno = await AlunoRequests.listarAlunos();
                setAlunos(aluno);
            } catch (error) {
                console.error('Erro ao buscar alunos: ', error);
            }
        };
        fetchAlunos();
    }, []);

    const formatarData = (data) => new Date(data).toLocaleDateString('pt-br');
    const formatarCPF = (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    const formatarTelefone = (telefone) => telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return (
        <>
            <div className="content">
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
                    {alunos.length > 0 ? (
                        <table className={`${styles.table} ${styles.tabela}`}>
                            <thead>
                                <tr className={styles.tabelaHeader}>
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
                                {alunos.map(aluno => (
                                    <tr key={aluno.id_aluno} className={styles.tabelaCorpo}>
                                        <td>{aluno.nome.toUpperCase()}</td>
                                        <td>{formatarCPF(aluno.cpf)}</td>
                                        <td>{formatarData(aluno.data_nascimento)}</td>
                                        <td style={{width: 200}}>{formatarTelefone(aluno.celular)}</td>
                                        <td>{aluno.endereco.toUpperCase()}</td>
                                        <td>{aluno.email.toUpperCase()}</td>
                                        <td>{`${aluno.altura} m`}</td>
                                        <td>{`${aluno.peso} kg`}</td>
                                        <td>{aluno.imc}</td>
                                        <td onClick={() => console.log('deeltar')}><FaTrash /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Carregando...</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ListarAluno;
