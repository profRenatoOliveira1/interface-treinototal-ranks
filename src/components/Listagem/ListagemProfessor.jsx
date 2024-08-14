import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css'; // Importa estilos CSS específicos para este componente
import ProfessoresRequests from '../../fetch/ProfessoresRequests'; // Importação do módulo responsável por fazer as requisições dos professores
import { FaTrash } from "react-icons/fa"; // Importação do ícone de lixeira da biblioteca react-icons

/**
 * Componente para listar professores
 * @returns {JSX.Element} Componente JSX para listagem de professores
 */
function ListarProfessor() {
    // Define o estado inicial para armazenar os professores
    const [professores, setProfessor] = useState([]);

    /**
     * Hook useEffect para carregar os professores quando o componente é montado
     */
    useEffect(() => {
        /**
         * Função assíncrona para buscar os professores da API
         */
        const fetchProfessor = async () => {
            try {
                // Realiza a requisição para buscar os professores
                const professores = await ProfessoresRequests.listarProfessor();
                // Atualiza o estado com os professores obtidos da API
                setProfessor(professores);
            } catch (error) {
                // Em caso de erro, exibe o erro no console
                console.error('Erro ao buscar professores: ', error);
            }
        };

        // Chama a função para buscar os professores
        fetchProfessor();
    }, []); // O array vazio como segundo parâmetro garante que useEffect seja executado apenas uma vez, após a montagem do componente

    /**
     * Formata a data no formato brasileiro
     * @param {string} data - A data a ser formatada
     * @returns {string} A data formatada no padrão brasileiro
     */
    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-br');
    }

    /**
     * Formata o CPF
     * @param {string} cpf - O CPF a ser formatado
     * @returns {string} O CPF formatado
     */
    const formatarCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    /**
     * Formata o número de telefone
     * @param {string} telefone - O telefone a ser formatado
     * @returns {string} O telefone formatado
     */
    const formatarTelefone = (telefone) => {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    /**
     * Função para deletar um professor
     * @param {number} id_professor - O ID do professor a ser deletado
     * @param {string} nome - O nome do professor a ser exibido na confirmação
     */
    const deletar = async (id_professor, nome) => {
        const confirmar = window.confirm(`Deseja deletar o Professor ${nome}?`);
        if (confirmar) {
            if (await ProfessoresRequests.deletarProfessor(id_professor)) {
                window.alert('Professor deletado com sucesso');
                setProfessor(professores.filter(professor => professor.id_professor !== id_professor));
            } else {
                window.alert('Erro ao deletar Professor');
            }
        }
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
                        {professores.map(professor => (
                            <tr key={professor.id_professor} className={styles.tabelaCorpo}>
                                <td>{professor.nome.toUpperCase()}</td>
                                <td>{formatarCPF(professor.cpf)}</td>
                                <td>{formatarData(professor.dataNascimento)}</td>
                                <td>{formatarTelefone(professor.celular)}</td>
                                <td>{professor.endereco.toUpperCase()}</td>
                                <td>{professor.email.toUpperCase()}</td>
                                <td>{formatarData(professor.dataContratacao)}</td>
                                <td>{professor.formacao.toUpperCase()}</td>
                                <td>{professor.especialidade.toUpperCase()}</td>
                                <td onClick={() => deletar(professor.id_professor, professor.nome)}>
                                    <FaTrash style={{ color: '#DB0135' }} />
                                </td> {/* Passando o ID e o Nome */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
    
}

export default ListarProfessor;
