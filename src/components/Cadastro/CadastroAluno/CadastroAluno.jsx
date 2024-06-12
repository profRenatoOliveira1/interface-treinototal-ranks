import React, { useState } from 'react'; // Importa React e useState hook para gerenciar o estado do componente
import styles from './CadastroAluno.module.css'; // Importa estilos CSS específicos para este componente
import AlunoRequests from '../../../fetch/AlunoRequests'; // Importa o módulo de requisições para a API

function CadastroAluno() {
    // Define o estado inicial do formulário com todos os campos vazios
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        data_nascimento: '',
        celular: '',
        endereco: '',
        email: '',
        senha: '',
        altura: '',
        peso: '',
        imc: ''
    });

    // Função para atualizar o estado do formulário conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtém o nome e o valor do campo que foi alterado
        setFormData(prevState => ({
            ...prevState, // Mantém os valores atuais do estado
            [name]: value // Atualiza o valor do campo específico
        }));
    };

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        // Validação básica para garantir que os campos obrigatórios estão preenchidos
        if (!formData.nome || !formData.cpf || !formData.email || !formData.senha) {
            window.alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            // Envia os dados do formulário para a API e aguarda a resposta
            const response = await AlunoRequests.cadastrarAluno(formData);
            console.log('Aluno cadastrado com sucesso:', response);
            window.alert(`${formData.nome} foi cadastrado com sucesso`); // Exibe uma mensagem de sucesso
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            window.alert('Ocorreu um erro: ' + error.message); // Exibe uma mensagem de erro
        }
    };

    // Função para capitalizar a primeira letra de cada palavra

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
                            type="number"
                            className={styles.formStyle}
                            placeholder="Altura"
                            value={formData.altura}
                            onChange={handleChange}
                            name="altura"
                        />
                    </div>
                    {/* Campo para formação */}
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
                    {/* Campo para especialidade */}
                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            className={styles.formStyle}
                            placeholder="Imc"
                            value={formData.imc}
                            onChange={handleChange}
                            name="imc"
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

export default CadastroAluno; // Exporta o componente para ser utilizado em outras partes da aplicação
