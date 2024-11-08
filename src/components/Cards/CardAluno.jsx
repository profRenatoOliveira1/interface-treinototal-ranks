import { useLocation } from "react-router-dom"; // Hook para acessar a localização atual
import React from 'react'; // Importa a biblioteca React, necessária para criar componentes funcionais em React.
import { useState } from "react"; // Hook para gerenciar o estado do componente
import styles from '../styles/StyleCard.module.css'; // Importa o arquivo CSS para estilizar o componente
import FotoPadrao from '../../assets/FotoPadrao.png'; // Imagem padrão para o avatar do aluno
import { useNavigate } from "react-router-dom"; // Hook para navegação entre rotas
import { formatarData, formatarCPF, formatadorDataCard, calcularIMC } from "../../../util/Utilitarios"; // Funções utilitárias

/**
 * Componente CardAluno
 * 
 * Este componente exibe as informações detalhadas de um aluno, utilizando dados recebidos
 * através da navegação via `react-router-dom`. Ele formata e apresenta as informações
 * como nome, CPF, data de nascimento, telefone, endereço, e também calcula o IMC do aluno.
 * 
 * @function CardAluno
 * @returns {JSX.Element} Componente visual que renderiza as informações do aluno.
 */
function CardAluno() {
    const navigate = useNavigate(); // Hook para navegação programática
    const location = useLocation(); // Hook para acessar o estado atual da navegação
    const objAluno = location.state.objeto; // Objeto contendo as informações do aluno, passado via navegação

    /**
     * Estado para armazenar as informações do aluno formatadas para exibição.
     * 
     * @typedef {Object} aluno
     * @property {string} nome - Nome do aluno.
     * @property {string} cpf - CPF do aluno (não formatado).
     * @property {string} dataNascimento - Data de nascimento do aluno formatada.
     * @property {string} celular - Número de celular do aluno.
     * @property {string} endereco - Endereço do aluno.
     * @property {string} email - Email do aluno.
     * @property {string} senha - Senha do aluno.
     * @property {number} altura - Altura do aluno em metros.
     * @property {number} peso - Peso do aluno em kg.
     */
    const [aluno] = useState({
        nome: objAluno.nome,
        cpf: objAluno.cpf,
        dataNascimento: formatarData(new Date(objAluno.dataNascimento)), // Formata a data de nascimento
        celular: objAluno.celular,
        endereco: objAluno.endereco,
        email: objAluno.email,
        senha: objAluno.senha,
        altura: objAluno.altura,
        peso: objAluno.peso
    });

    /**
     * Função para navegar de volta à página de listagem de alunos.
     */
    const voltar = () => {
        navigate(`/Listagem/Aluno`, { replace: true }); // Navega de volta para a página de listagem
    };

    /**
     * Função para formatar o número de telefone.
     * 
     * @param {string} telefone - Número de telefone a ser formatado.
     * @returns {string} Telefone formatado no padrão (XX) XXXXX-XXXX.
     */
    const formatarTelefone = (telefone) => telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // Formata o telefone para o padrão brasileiro

    return (
        <>
            <div className={styles.card}> {/* Container do card com informações do aluno */}
                <div className={styles.avatarContainer}> {/* Container para o avatar do aluno */}
                    <img src={FotoPadrao} alt="Foto do aluno" className={styles.avatar} /> {/* Exibe a imagem padrão do aluno */}
                </div>
                <div className={styles.infoContainer}> {/* Container para as informações textuais do aluno */}
                    <h2 className={styles.nome}>{aluno.nome}</h2> {/* Exibe o nome do aluno */}
                    <p><strong>CPF:</strong> {formatarCPF(aluno.cpf)}</p> {/* Exibe o CPF formatado */}
                    <p><strong>Data de Nascimento:</strong> {formatadorDataCard(aluno.dataNascimento)}</p> {/* Exibe a data de nascimento formatada */}
                    <p><strong>Telefone:</strong> {formatarTelefone(aluno.celular)}</p> {/* Exibe o telefone formatado */}
                    <p><strong>Endereço:</strong> {aluno.endereco}</p> {/* Exibe o endereço do aluno */}
                    <p><strong>Email:</strong> {aluno.email}</p> {/* Exibe o email do aluno */}
                    <p><strong>Altura:</strong> {aluno.altura} m</p> {/* Exibe a altura do aluno */}
                    <p><strong>Peso:</strong> {aluno.peso} kg</p> {/* Exibe o peso do aluno */}
                    <p><strong>IMC:</strong> {calcularIMC(aluno.peso, aluno.altura)}</p> {/* Calcula e exibe o IMC do aluno */}
                </div>
            </div>
            <div className={styles.btnContainer}> {/* Container para o botão "Voltar" */}
                <button className={styles.btn} type="button" onClick={voltar}> {/* Botão para voltar à página de listagem */}
                    Voltar
                </button>
            </div>
        </>
    );
}

// Exporta o componente CardAluno
export default CardAluno;
