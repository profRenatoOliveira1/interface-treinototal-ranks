import React, { useState } from 'react';
import styles from '../styles/StyleCadastro.module.css';
import AlunoRequests from '../../fetch/AlunoRequests';
import InputMask from "react-input-mask";

function CadastroAluno() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        data_nascimento: '',
        celular: '',
        endereco: '',
        email: '',
        senha: '',
        altura: '',
        peso: ''
    });

    const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dt_nasc = new Date(formData.data_nascimento);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        if (dt_nasc > hoje) {
            setErrorMessage('A data de nascimento não pode ser uma data futura.');
            return;
        }

        if (!formData.nome || !formData.cpf || !formData.email || !formData.senha) {
            setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const cleanCPF = formData.cpf.replace(/\D/g, '');
        const cleanCelular = formData.celular.replace(/\D/g, '');
        const cleanData = { ...formData, cpf: cleanCPF, celular: cleanCelular };

        try {
            const response = await AlunoRequests.cadastrarAluno(cleanData);
            console.log('Aluno cadastrado com sucesso:', response);
            if (response) {
                window.alert(`${formData.nome} foi cadastrado com sucesso`);
            }
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            window.alert('Ocorreu um erro: ' + error.message);
        }
    };

    const dt_nasc = new Date(formData.data_nascimento);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Aluno</h1>
            <div className={styles.container}>
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
                        <InputMask
                            type="text"
                            mask="999.999.999-99"
                            className={styles.formStyleEsquerda}
                            placeholder="CPF"
                            value={formData.cpf}
                            onChange={handleChange}
                            name="cpf"
                        />
                        <input
                            type="text"
                            className={styles.formStyleDireita}
                            placeholder="Data de Nascimento"
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'}
                            value={formData.data_nascimento}
                            onChange={handleChange}
                            name="data_nascimento"
                            max={hoje.toISOString().split('T')[0]}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <InputMask
                            mask="(99) 99999-9999"
                            type="text"
                            className={styles.formStyle}
                            placeholder="Telefone"
                            value={formData.celular}
                            onChange={handleChange}
                            name="celular"
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
                            type="number"
                            className={styles.formStyleEsquerda}
                            placeholder="Altura/m"
                            value={formData.altura}
                            onChange={handleChange}
                            name="altura"
                        />
                        <input
                            type="number"
                            className={styles.formStyleDireita}
                            placeholder="Peso/Kg"
                            value={formData.peso}
                            onChange={handleChange}
                            name="peso"
                        />
                    </div>

                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                    <button type="submit" className={styles.btn}>
                        Cadastrar-se
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CadastroAluno;
