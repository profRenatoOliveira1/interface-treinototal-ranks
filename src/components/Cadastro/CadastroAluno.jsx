import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar o estado do componente
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import AlunoRequests from '../../fetch/AlunoRequests'; // Importa o módulo de requisições para a API de Alunos
import InputMask from "react-input-mask"; // Importa a biblioteca para criar máscaras de input

/**
 * Componente funcional para o cadastro de alunos
 */
function CadastroAluno() {
    // Define o estado inicial do formulário com todos os campos vazios
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        celular: '',
        endereco: '',
        email: '',
        senha: '',
        altura: '',
        peso: ''
    });

    /**
     * Função para atualizar o estado do formulário conforme o usuário digita
     * @param {Object} e - O evento de mudança do input
     */
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtém o nome e o valor do campo que foi alterado
        setFormData(prevState => ({
            ...prevState, // Mantém os valores atuais do estado
            [name]: value // Atualiza o valor do campo específico
        }));
    };

    /**
     * Função para lidar com a submissão do formulário
     * @param {Object} e - O evento de submissão do formulário
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        const dtNasc = new Date(formData.dataNascimento);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        // Verifica se a data de nascimento não é futura
        if (dtNasc > hoje) {
            setErrorMessage('A data de nascimento não pode ser uma data futura.');
            return;
        }

        // Verifica se os campos obrigatórios estão preenchidos
        if (!formData.nome || !formData.cpf || !formData.email || !formData.senha) {
            setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Limpa os campos de CPF e celular para remover qualquer formatação
        const cleanCPF = formData.cpf.replace(/\D/g, '');
        const cleanCelular = formData.celular.replace(/\D/g, '');
        const cleanData = { ...formData, cpf: cleanCPF, celular: cleanCelular };

        try {
            // Envia os dados do formulário para a API e aguarda a resposta
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

    const dtNasc = new Date(formData.dataNascimento);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Aluno</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para o nome completo */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Nome completo"
                            value={formData.nome}
                            onChange={handleChange}
                            name="nome"
                            required
                        />
                    </div>
                    {/* Campo para CPF e data de nascimento */}
                    <div className={styles.formGroup}>
                        <InputMask
                            type="text"
                            mask="999.999.999-99"
                            className={styles.formStyleEsquerda}
                            placeholder="CPF"
                            value={formData.cpf}
                            onChange={handleChange}
                            name="cpf"
                            required
                        />
                        <input
                            type="text"
                            className={styles.formStyleDireita}
                            placeholder="Data de Nascimento"
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'}
                            value={formData.dataNascimento}
                            onChange={handleChange}
                            name="dataNascimento"
                            max={hoje.toISOString().split('T')[0]}
                            required
                        />
                    </div>
                    {/* Campo para telefone */}
                    <div className={styles.formGroup}>
                        <InputMask
                            mask="(99) 99999-9999"
                            type="text"
                            className={styles.formStyle}
                            placeholder="Telefone"
                            value={formData.celular}
                            onChange={handleChange}
                            name="celular"
                            required
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
                            required
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
                            required
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
                            required
                        />
                    </div>
                    {/* Campo para altura e peso */}
                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            className={styles.formStyleEsquerda}
                            placeholder="Altura/m"
                            value={formData.altura}
                            onChange={handleChange}
                            name="altura"
                            required
                        />
                        <input
                            type="number"
                            className={styles.formStyleDireita}
                            placeholder="Peso/Kg"
                            value={formData.peso}
                            onChange={handleChange}
                            name="peso"
                            required
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

export default CadastroAluno; // Exporta o componente para ser utilizado em outras partes da aplicação
