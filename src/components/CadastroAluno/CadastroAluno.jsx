import React, { useState } from 'react';
import styles from './CadastroAluno.module.css';
import AlunoRequests from '../../fetch/AlunoRequests'

function CadastroAluno() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        endereco: '',
        email: '',
        senha: '',
        altura: '',
        peso: ''
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
            const response = await AlunoRequests.cadastrarAluno(formData);
            console.log('Aluno cadastrado com sucesso:', response);
            // Aqui você pode redirecionar o usuário para outra página, exibir uma mensagem de sucesso, etc.
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            // Aqui você pode lidar com erros, exibir uma mensagem de erro para o usuário, etc.
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.h1}>Cadastro de Aluno</h1>
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
                            placeholder="Altura"
                            value={formData.altura}
                            onChange={handleChange}
                            name="altura"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Peso"
                            value={formData.peso}
                            onChange={handleChange}
                            name="peso"
                        />
                    </div>
                    <button type="submit" className={styles.btn}>
                        Cadastrar-se
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CadastroAluno;
