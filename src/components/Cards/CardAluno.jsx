import { useLocation } from "react-router-dom";
import React from 'react';
import { useState } from "react";
import styles from '../styles/StyleCard.module.css';
import FotoPadrao from '../../assets/FotoPadrao.png';
import { useNavigate } from "react-router-dom";
import { formatarData, formatarCPF, formatadorDataCard, calcularIMC } from "../../../util/Utilitarios";

function CardAluno() {
    const navigate = useNavigate();
    const location = useLocation();
    const objAluno = location.state.objeto;

    const [aluno] = useState({
        nome: objAluno.nome,
        cpf: objAluno.cpf,
        dataNascimento: formatarData(new Date(objAluno.data_nascimento)),
        celular: objAluno.celular,
        endereco: objAluno.endereco,
        email: objAluno.email,
        senha: objAluno.senha,
        altura: objAluno.altura,
        peso: objAluno.peso
    });

    const voltar = () => {
        navigate(`/Listagem/Aluno`, { replace: true });
    }
    const formatarTelefone = (telefone) => telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    return (
        <>
            <div className={styles.card}>
                <div className={styles.avatarContainer}>
                    <img src={FotoPadrao} alt="Foto do aluno" className={styles.avatar} />
                </div>
                <div className={styles.infoContainer}>
                    <h2 className={styles.nome}>{aluno.nome}</h2>
                    <p><strong>CPF:</strong> {formatarCPF(aluno.cpf)}</p>
                    <p><strong>Data de Nascimento:</strong> {formatadorDataCard(aluno.dataNascimento)}</p>
                    <p><strong>Telefone:</strong> {formatarTelefone(aluno.celular)}</p>
                    <p><strong>Endereço:</strong> {aluno.endereco}</p>
                    <p><strong>Email:</strong> {aluno.email}</p>
                    <p><strong>Altura:</strong> {aluno.altura} m</p>
                    <p><strong>Peso:</strong> {aluno.peso} kg</p>
                    <p><strong>imc:</strong> {calcularIMC(aluno.peso, aluno.altura)}</p>
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

export default CardAluno;
