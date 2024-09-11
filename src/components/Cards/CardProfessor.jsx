import { useLocation } from "react-router-dom";
import React from 'react';
import { useState } from "react";
import styles from '../styles/StyleCard.module.css';
import FotoPadrao from '../../assets/FotoPadrao.png';
import { useNavigate } from "react-router-dom";
import { formatarData, formatarCPF, formatadorDataCard } from "../../../util/Utilitarios";

function CardProfessor() {
    const navigate = useNavigate();
    const location = useLocation();
    const objProfessor = location.state.objeto;

    const [professor] = useState({
        nome: objProfessor.nome,
        cpf: objProfessor.cpf,
        dataNascimento: formatarData(new Date(objProfessor.data_nascimento)),
        celular: objProfessor.celular,
        endereco: objProfessor.endereco,
        email: objProfessor.email,
        dataContratacao: formatarData(new Date(objProfessor.data_contratacao)),
        formacao: objProfessor.formacao,
        especialidade: objProfessor.especialidade
    });

    const voltar = () => {
        navigate(`/Listagem/Professor`, { replace: true });
    }
    const formatarTelefone = (telefone) => telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return (
        <>
            <div className={styles.card}>
                <div className={styles.avatarContainer}>
                    <img src={FotoPadrao} alt="Foto do aluno" className={styles.avatar} />
                </div>
                <div className={styles.infoContainer}>
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
            <div className={styles.btnContainer}>
                <button className={styles.btn} type="button" onClick={voltar}>
                    Voltar
                </button>
            </div>
        </>
    );
}

export default CardProfessor;
