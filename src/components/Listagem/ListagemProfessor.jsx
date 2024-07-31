import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css'; // Importa estilos CSS específicos para este componente
import ProfessoresRequests from '../../fetch/ProfessoresRequests';
import { FaTrash } from "react-icons/fa";

// falta comentar
function ListarProfessor() {
    // Define o estado inicial para armazenar os professores
    const [professores, setProfessor] = useState([]);

    // useEffect para carregar os professores quando o componente é montado
    useEffect(() => {
        // Função assíncrona para buscar os professores da API
        const fetchProfessor = async () => {
            try {
                // Realiza a requisição para buscar os professores
                const professor = await ProfessoresRequests.listarProfessor();
                // Atualiza o estado com os professores obtidos da API
                setProfessor(professor);
            } catch (error) {
                // Em caso de erro, exibe o erro no console
                console.error('Erro ao buscar professores: ', error);
            }
        };

        // Chama a função para buscar os professores
        fetchProfessor();
    }, []); // O array vazio como segundo parâmetro garante que useEffect seja executado apenas uma vez, após a montagem do componente

    // Função para formatar a data no formato brasileiro
    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-br');
    }

    // Função para formatar o CPF
    const formatarCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    // Função para formatar o número de telefone
    const formatarTelefone = (telefone) => {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };


    // Renderização do componente
    return (
        <>
            {/* Cabeçalho da seção */}
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

            {/* Tabela para listar os professores */}
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
                        {/* Mapeia os professores e renderiza cada um como uma linha na tabela */}
                        {professores.map(professor => (
                            <tr key={professor.id_professor} className={styles.tabelaCorpo}>
                                <td>{professor.nome.toUpperCase()}</td>
                                <td>{formatarCPF(professor.cpf)}</td>
                                <td>{formatarData(professor.data_nascimento)}</td>
                                <td>{formatarTelefone(professor.celular)}</td>
                                <td>{professor.endereco.toUpperCase()}</td>
                                <td>{professor.email.toUpperCase()}</td>
                                <td>{formatarData(professor.data_contratacao)}</td>
                                <td>{professor.formacao.toUpperCase()}</td>
                                <td>{professor.especialidade.toUpperCase()}</td>
                                <td onClick={() => console.log('deletar')}><FaTrash /></td> {/* Botão para deletar um professor */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListarProfessor;
