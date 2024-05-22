import React, { useState, useEffect } from 'react';
import styles from './ListarProfessor.module.css';
import ProfessoresRequests from '../../fetch/ProfessoresRequests';
import { FaTrash } from "react-icons/fa";

function ListarProfessor() {
    const [professores, setProfessor] = useState([]);

    useEffect(() => {
        const fetchProfessor = async () => {
            try {
                const professor = await ProfessoresRequests.listarProfessor();
                setProfessor(professor);
            } catch (error) {
                console.error('Erro ao buscar professores: ', error);
            }
        };

        fetchProfessor();
    }, []);

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-br');
    }

    const formatarCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatarTelefone = (telefone) => {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    const deletar = () => {
        window.alert('Não foi feito... ainda');
    };

    console.log(professores);

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
                            <th>Data de Contratação</th>
                            <th>Formação</th>
                            <th>Especialidade</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professores.map(professor => (
                            <tr key={professor.id_professor} className={styles.tabelaCorpo}>
                                <td>{professor.nome}</td>
                                <td>{formatarCPF(professor.cpf)}</td>
                                <td>{formatarData(professor.data_nascimento)}</td>
                                <td>{formatarTelefone(professor.celular)}</td>
                                <td>{professor.endereco}</td>
                                <td>{professor.email}</td>
                                <td>{formatarData(professor.data_contratacao)}</td>
                                <td>{professor.formacao}</td>
                                <td>{professor.especialidade}</td>
                                <td onClick={deletar}><FaTrash /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListarProfessor;
