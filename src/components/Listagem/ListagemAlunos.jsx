import React, { useState, useEffect } from 'react';
import styles from '../styles/StyleListagem.module.css'; // Importa estilos CSS específicos para este componente
import AlunoRequests from '../../fetch/AlunoRequests'; // Importa as requisições para a API de alunos
import { FaTrash } from "react-icons/fa"; // Importa o ícone de lixeira do pacote react-icons

/**
 * Componente funcional para listar alunos
 * @returns JSX.Element
 */
function ListarAluno() {
    const [alunos, setAlunos] = useState([]); // Define o estado inicial para armazenar a lista de alunos

    /**
     * Hook useEffect para buscar a lista de alunos ao montar o componente
     */
    useEffect(() => {
        /**
         * Função assíncrona para buscar alunos da API
         */
        const fetchAlunos = async () => {
            try {
                const aluno = await AlunoRequests.listarAlunos(); // Faz a requisição para listar alunos
                setAlunos(aluno); // Atualiza o estado com a lista de alunos
            } catch (error) {
                console.error('Erro ao buscar alunos: ', error); // Loga um erro em caso de falha na requisição
            }
        };
        fetchAlunos(); // Chama a função para buscar alunos
    }, []); // Array de dependências vazio indica que o efeito executa apenas uma vez ao montar o componente

    /**
     * Função para formatar a data no formato dd/mm/yyyy
     * @param {string} data - Data a ser formatada
     * @returns {string} - Data formatada
     */
    const formatarData = (data) => new Date(data).toLocaleDateString('pt-br');
    
    /**
     * Função para formatar o CPF no formato xxx.xxx.xxx-xx
     * @param {string} cpf - CPF a ser formatado
     * @returns {string} - CPF formatado
     */
    const formatarCPF = (cpf) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    
    /**
     * Função para formatar o telefone no formato (xx) xxxxx-xxxx
     * @param {string} telefone - Telefone a ser formatado
     * @returns {string} - Telefone formatado
     */
    const formatarTelefone = (telefone) => telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    
    const deletar = (aluno) => {
        //window.alert('Não foi feito... ainda'); // Exibe um alerta temporário
        const deletar = window.confirm(`Tem certeza que deseja remover o aluno ${aluno.nome}?`);

        if (deletar) {
            if (AlunoRequests.deletarAluno(aluno.id_aluno)) {
                window.location.reload();
                window.alert('Aluno removido com sucesso!');
            } else {
                window.alert('Erro ao remover aluno!');
            }
        }
    };

    return (
        <>
            <div className="content">
                <div className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <div className={styles.section}>
                                    <h1 className={styles.titulo}>Tabela Alunos</h1> {/* Título da tabela */}
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
                                        <td>{aluno.nome.toUpperCase()}</td> {/* Exibe o nome em letras maiúsculas */}
                                        <td>{formatarCPF(aluno.cpf)}</td> {/* Formata e exibe o CPF */}
                                        <td>{formatarData(aluno.dataNascimento)}</td> {/* Formata e exibe a data de nascimento */}
                                        <td style={{width: 200}}>{formatarTelefone(aluno.celular)}</td> {/* Formata e exibe o telefone */}
                                        <td>{aluno.endereco.toUpperCase()}</td> {/* Exibe o endereço em letras maiúsculas */}
                                        <td>{aluno.email.toUpperCase()}</td> {/* Exibe o email em letras maiúsculas */}
                                        <td>{`${aluno.altura} m`}</td> {/* Exibe a altura com a unidade 'm' */}
                                        <td>{`${aluno.peso} kg`}</td> {/* Exibe o peso com a unidade 'kg' */}
                                        <td>{aluno.imc}</td> {/* Exibe o IMC */}
                                        <td>
                                        <FaTrash onClick={() => deletar(aluno)} style={{ color: '#DB0135' }}/>
                                        </td> {/* Ícone de lixeira para ação de deletar */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Carregando...</p> // Exibe mensagem de carregamento enquanto os alunos estão sendo buscados
                    )}
                </div>
            </div>
        </>
    );
}

export default ListarAluno; // Exporta o componente para ser utilizado em outras partes da aplicação
