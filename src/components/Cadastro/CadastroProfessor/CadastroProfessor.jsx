import React, { useState } from 'react';
import styles from './CadastroProfessor.module.css';
import ProfessoresRequests from '../../../fetch/ProfessoresRequests';

// Componente funcional CadastroProfessor
function CadastroProfessor() {
    // Definição do estado inicial do formulário com useState
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

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Atualiza o estado com o novo valor do campo modificado
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página
        try {
            // Envia os dados do formulário para a API
            const response = await ProfessoresRequests.cadastrarProfessor(formData);
            console.log('Professor cadastrado com sucesso:', response);
            // Mostra um alerta de sucesso para o usuário
            window.alert(formData.nome + ': foi cadastrado com sucesso');
        } catch (error) {
            // Mostra um alerta de erro para o usuário em caso de falha
            console.error('Erro ao cadastrar professor:', error);
        }
    };

    // Renderização do formulário
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.h1}>Cadastro de Professor</h1>
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
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="CPF"
                            value={formData.cpf}
                            onChange={handleChange}
                            name="cpf"
                        />
                    </div>
                    {/* Campo para data de nascimento */}
                    <div className={styles.formGroup}>
                        <input
                            type="date"
                            className={styles.formStyle}
                            placeholder="Data de Nascimento"
                            value={formData.data_nascimento}
                            onChange={handleChange}
                            name="data_nascimento"
                        />
                    </div>
                    {/* Campo para número de celular */}
                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            className={styles.formStyle}
                            placeholder="Telefone"
                            value={formData.celular}
                            onChange={handleChange}
                            name="celular"
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
                    {/* Campo para email */}
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
                    {/* Campo para senha */}
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
                    {/* Campo para data de contratação */}
                    <div className={styles.formGroup}>
                        <input
                            type="date"
                            className={styles.formStyle}
                            placeholder="Data Contratacao"
                            value={formData.data_contratacao}
                            onChange={handleChange}
                            name="data_contratacao"
                        />
                    </div>
                    {/* Campo para formação */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Formacao"
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
