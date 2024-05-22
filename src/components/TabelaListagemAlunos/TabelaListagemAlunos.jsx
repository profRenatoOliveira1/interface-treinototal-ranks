import React, { useState, useEffect } from 'react';
import styles from './TabelaListagemAlunos.module.css';
import AlunoRequests from '../../fetch/AlunoRequests';
import { FaTrash } from "react-icons/fa";

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
    
    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-br');
    };

    const formatarCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatarTelefone = (telefone) => {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    const deletar = () => {
        window.alert('Não foi feito... ainda');
    };

    console.log(alunos);

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

export default ListarAluno;
