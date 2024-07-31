import React, { useState } from 'react';
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import AlunoRequests from '../../fetch/AlunoRequests';
import InputMask from "react-input-mask";

// falta comentar
function CadastroAluno() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        data_nascimento: '',
        celular: '',
        endereco: '',
        // email: '',
        // senha: '',
        altura: '',
        peso: ''
    });

    // falta comentar
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // falta comentar
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nome || !formData.cpf ) {
            window.alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const cleanCPF = formData.cpf.replace(/\D/g, ''); 
        const cleanCelular = formData.celular.replace(/\D/g, ''); 
        const cleanData = { ...formData, cpf: cleanCPF, celular: cleanCelular };

        try {
            const response = await AlunoRequests.cadastrarAluno(cleanData);
            console.log('Aluno cadastrado com sucesso:', response);
            window.alert(`${formData.nome} foi cadastrado com sucesso`);
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            window.alert('Ocorreu um erro: ' + error.message);
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
                    {/* Campo para CPF */}
                    <div className={styles.formGroup}>
                        <InputMask
                            type="text"
                            mask="999.999.999-99"
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
                            type="text"
                            className={styles.formStyle}
                            placeholder="Data de Nascimento"
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'}
                            value={formData.data_nascimento}
                            onChange={handleChange}
                            name="data_nascimento"
                        />
                    </div>
                    {/* Campo para número de celular */}
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
                    {/* 
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
                    */}
                    {/* Campo para altura */}
                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            className={styles.formStyle}
                            placeholder="Altura"
                            value={formData.altura}
                            onChange={handleChange}
                            name="altura"
                        />
                    </div>
                    {/* Campo para peso */}
                    <div className={styles.formGroup}>
                        <input
                            type="number"
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
