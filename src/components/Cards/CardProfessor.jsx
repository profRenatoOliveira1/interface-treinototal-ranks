import React from 'react'; // Importa a biblioteca React, necessária para criar componentes funcionais em React.
import { useState } from "react"; // Hook para gerenciar o estado do componente
import { useLocation } from "react-router-dom"; // Importa o hook 'useLocation' do react-router-dom para acessar o estado atual da navegação
import styles from '../styles/StyleCard.module.css'; // Importa os estilos específicos do componentel
import FotoPadrao from '../../assets/FotoPadrao.png'; // Importa uma imagem padrão para o avatar
import { useNavigate } from "react-router-dom"; // Importa o hook 'useNavigate' do react-router-dom para navegação programática
import { formatarData, formatarCPF, formatadorDataCard } from "../../../util/Utilitarios";// Importa funções utilitárias para formatação de dados

// Definição do componente funcional 'CardProfessor'
function CardProfessor() {
    // Inicializa o hook 'useNavigate' para navegação
    const navigate = useNavigate();

    // Inicializa o hook 'useLocation' para acessar o objeto 'objProfessor' passado como estado
    const location = useLocation();
    const objProfessor = location.state.objeto;

    // Define o estado 'professor' com os dados do objeto 'objProfessor', formatando datas e CPF
    const [professor] = useState({
        nome: objProfessor.nome,
        cpf: objProfessor.cpf,
        dataNascimento: formatarData(new Date(objProfessor.dataNascimento)),
        celular: objProfessor.celular,
        endereco: objProfessor.endereco,
        email: objProfessor.email,
        dataContratacao: formatarData(new Date(objProfessor.dataContratacao)),
        formacao: objProfessor.formacao,
        especialidade: objProfessor.especialidade
    });

    // Função para voltar à página de listagem de professores
    const voltar = () => {
        navigate(`/Listagem/Professor`, { replace: true });
    };

    // Função para formatar o telefone no padrão '(XX) XXXXX-XXXX'
    const formatarTelefone = (telefone) => telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return (
        <>
            {/* Card contendo as informações do professor */}
            <div className={styles.card}>
                <div className={styles.avatarContainer}>
                    {/* Exibe a imagem do professor ou uma imagem padrão */}
                    <img src={FotoPadrao} alt="Foto do aluno" className={styles.avatar} />
                </div>
                <div className={styles.infoContainer}>
                    {/* Exibe as informações formatadas do professor */}
                    <h2 className={styles.nome}>{professor.nome}</h2>
                    <p><strong>CPF:</strong> {formatarCPF(professor.cpf)}</p>
                    <p><strong>Data de Nascimento:</strong> {formatadorDataCard(professor.dataNascimento)}</p>
                    <p><strong>Telefone:</strong> {formatarTelefone(professor.celular)}</p>
                    <p><strong>Endereço:</strong> {professor.endereco}</p>
                    <p><strong>Email:</strong> {professor.email}</p>
                    <p><strong>Data de Contratação:</strong> {formatadorDataCard(professor.dataContratacao)}</p>
                    <p><strong>Formação:</strong> {professor.formacao}</p>
                    <p><strong>Especialidade:</strong> {professor.especialidade}</p>
                </div>
            </div>
            {/* Botão para voltar à página anterior */}
            <div className={styles.btnContainer}>
                <button className={styles.btn} type="button" onClick={voltar}>
                    Voltar
                </button>
            </div>
        </>
    );
}

// Exporta o componente 'CardProfessor' para ser utilizado em outras partes do código
export default CardProfessor;
