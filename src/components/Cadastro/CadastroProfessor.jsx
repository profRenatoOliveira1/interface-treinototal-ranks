import React, { useState } from 'react';
import styles from '../styles/StyleCadastro.module.css';
import ProfessoresRequests from '../../fetch/ProfessoresRequests';
import InputMask from "react-input-mask";

function CadastroProfessor() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        data_nascimento: '',
        celular: '',
        endereco: '',
        email: '',
        senha: '',
        data_contratacao: '',
        formacao: '',
        especialidade: ''
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
        const dt_cont = new Date(formData.data_contratacao);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        // Verificação das datas
        if (dt_nasc > hoje) {
            setErrorMessage('A data de nascimento não pode ser uma data futura.');
            return;
        }
        if (dt_cont > hoje) {
            setErrorMessage('A data de contratação não pode ser uma data futura.');
            return;
        }

        // Limpeza dos campos de CPF e celular
        const cleanCPF = formData.cpf.replace(/\D/g, '');
        const cleanCelular = formData.celular.replace(/\D/g, '');
        const cleanData = { ...formData, cpf: cleanCPF, celular: cleanCelular };

        try {
            const response = await ProfessoresRequests.cadastrarProfessor(cleanData);
            console.log('Professor cadastrado com sucesso:', response);
            window.alert(formData.nome + ': foi cadastrado com sucesso');
            setErrorMessage(''); // Limpa a mensagem de erro em caso de sucesso
        } catch (error) {
            console.error('Erro ao cadastrar professor:', error);
            setErrorMessage('Ocorreu um erro: ' + error.message);
        }
    };

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Professor</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para nome completo */}
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
                    {/* Campo para CPF */}
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
                    {/* Campo para número de celular */}
                    <div className={styles.formGroup}>
                        <InputMask
                            mask="(99) 99999-9999"
                            type="text"
                            className={styles.formStyleEsquerda}
                            placeholder="Telefone"
                            value={formData.celular}
                            onChange={handleChange}
                            name="celular"
                        />
                        <input
                            type="text"
                            className={styles.formStyleDireita}
                            placeholder="Data de Contratação"
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'}
                            value={formData.data_contratacao}
                            onChange={handleChange}
                            name="data_contratacao"
                            max={hoje.toISOString().split('T')[0]} 
                        />
                    </div>
                    {/* Campo para endereço */}
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
                    {/* Campo para formação */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Formação"
                            value={formData.formacao}
                            onChange={handleChange}
                            name="formacao"
                        />
                    </div>
                    {/* Campo para especialidade */}
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
                    {/* Mensagem de erro */}
                    {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                    {/* Botão para enviar o formulário */}
                    <button type="submit" className={styles.btn}>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CadastroProfessor;
