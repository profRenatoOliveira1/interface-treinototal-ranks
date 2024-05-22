import React, { useState } from 'react'; // Importa React e useState hook para gerenciar o estado do componente
import styles from './CadastroAluno.module.css'; // Importa estilos CSS específicos para este componente
import AlunoRequests from '../../fetch/AlunoRequests'; // Importa o módulo de requisições para a API

function CadastroAluno() {
    // Define o estado inicial do formulário com todos os campos vazios
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        data_nascimento: '',
        telefone: '',
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
    const capitalize = (str) => {
        return str.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
    };

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.h1}>Cadastro de Aluno</h1>
                <form onSubmit={handleSubmit}>
                    {/* Gera dinamicamente os campos do formulário */}
                    {['nome', 'cpf', 'data_nascimento', 'telefone', 'endereco', 'email', 'senha', 'altura', 'peso', 'imc'].map(field => (
                        <div className={styles.formGroup} key={field}>
                            <input
                                type={
                                    field === 'email' ? 'email' :
                                    field === 'senha' ? 'password' :
                                    field === 'data_nascimento' ? 'date' :
                                    ['altura', 'peso', 'imc'].includes(field) ? 'number' :
                                    'text'
                                }
                                className={styles.formStyle}
                                placeholder={capitalize(field.replace('_', ' '))} // Define o placeholder capitalizando o nome do campo
                                value={formData[field]} // Define o valor do input com base no estado
                                onChange={handleChange} // Define a função de mudança para atualizar o estado
                                name={field} // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
                            />
                        </div>
                    ))}
                    <button type="submit" className={styles.btn}>
                        Cadastrar-se
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CadastroAluno; // Exporta o componente para ser utilizado em outras partes da aplicação
