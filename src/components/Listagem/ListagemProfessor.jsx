import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css'; // Importa os estilos CSS específicos para este componente
import ProfessoresRequests from '../../fetch/ProfessoresRequests'; // Importa o módulo responsável pelas requisições de professores
import { FaTrash } from "react-icons/fa"; // Importa o ícone de lixeira da biblioteca react-icons
import { FaRegEdit } from "react-icons/fa"; // Importa o ícone de edição da biblioteca react-icons
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para navegação

/**
 * Componente para listar professores
 * @returns {JSX.Element} Componente JSX para listagem de professores
 */
function ListarProfessor() {
    // Define o estado inicial para armazenar os professores
    const [professores, setProfessor] = useState([]);
    const navigate = useNavigate(); // Hook para navegação

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
     * @param {Object} professor - O professor a ser deletado
     */
    const deletarProfessor = (professor) => {
        const deletar = window.confirm(`Tem certeza que deseja remover o professor ${professor.nome}?`);

        if (deletar) {
            if (ProfessoresRequests.deletarProfessor(professor.id_professor)) {
                window.location.reload(); // Recarrega a página após a exclusão
                window.alert('Professor removido com sucesso!');
            } else {
                window.alert('Erro ao remover professor!');
            }
        }
    };

    /**
     * Função para atualizar um professor
     * @param {Object} professor - O professor a ser atualizado
     */
    const UpdateProfessor = (professor) => {
        // Redireciona o usuário para a página de atualização, passando os dados do professor como estado
        navigate(`/update/professor`, { state: { objeto: professor }, replace: true });
    }

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
                                <a style={{ textDecoration: "none" }} href="http://localhost:5173/Cadastro/Professor" className={styles.btn}>
                                    Cadastrar Professor
                                </a>
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
                            <th hidden>ID</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Data de Nascimento</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Email</th>
                            <th>Data de Contratação</th>
                            <th>Formação</th>
                            <th>Especialidade</th>
                            <th colSpan={2}>Ação</th>
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
                                {/* Botão para deletar um professor */}
                                <td onClick={() => deletarProfessor(professor)}>
                                    <FaTrash style={{ color: '#DB0135' }} />
                                </td>
                                {/* Botão para editar um professor */}
                                <td>
                                    <FaRegEdit onClick={() => UpdateProfessor(professor)} style={{ color: '#FFFFFF' }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListarProfessor;//exporta o componente ListarProfessor para ser utilizado em outras partes da aplicação
