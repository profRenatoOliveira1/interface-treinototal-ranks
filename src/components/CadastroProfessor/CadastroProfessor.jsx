import React, { useState } from 'react';
import styles from './CadastroProfessor.module.css';
import ProfessoresRequests from '../../fetch/ProfessoresRequests';

function CadastroProfessor() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        endereco: '',
        email: '',
        senha: '',
        especialidade: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ProfessoresRequests.cadastrarProfessor(formData);
            console.log('Professor cadastrado com sucesso:', response);
        } catch (error) {
            console.error('Erro ao cadastrar professor:', error);
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.h1}>Cadastro de Professor</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Nome completo"
                            value={formData.nome}
                            onChange={handleChange}
                            name="nome"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="CPF"
                            value={formData.cpf}
                            onChange={handleChange}
                            name="cpf"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="date"
                            className={styles.formStyle}
                            placeholder="Data de Nascimento"
                            value={formData.dataNascimento}
                            onChange={handleChange}
                            name="dataNascimento"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="tel"
                            className={styles.formStyle}
                            placeholder="Telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            name="telefone"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Endereço"
                            value={formData.endereco}
                            onChange={handleChange}
                            name="endereco"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            className={styles.formStyle}
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="password"
                            className={styles.formStyle}
                            placeholder="Senha"
                            value={formData.senha}
                            onChange={handleChange}
                            name="senha"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Especialidade"
                            value={formData.especialidade}
                            onChange={handleChange}
                            name="especialidade"
                        />
                    </div>
                    <button type="submit" className={styles.btn}>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CadastroProfessor;
