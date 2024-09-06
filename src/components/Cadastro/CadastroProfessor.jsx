import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar o estado do componente
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import ProfessoresRequests from '../../fetch/ProfessoresRequests'; // Importa o módulo de requisições para a API de Professores
import InputMask from "react-input-mask"; // Importa a biblioteca para criar máscaras de input

/**
 * Componente funcional para o cadastro de professores
 */
function CadastroProfessor() {
    // Define o estado inicial do formulário com todos os campos vazios
    const [formData, setFormData] = useState({
        nome: '',                   // Campo para o nome do professor
        cpf: '',                    // Campo para o cpf do professor
        dataNascimento: '',         // Campo para a data de nascimento do professor
        celular: '',                // Campo para o celular do professor
        endereco: '',               // Campo para o endereço do professor
        email: '',                  // Campo para o email do professor
        senha: '',                  // Campo para o senha do professor
        dataContratacao: '',        // Campo para o data de contratação do professor
        formacao: '',               // Campo para a formação do professor
        especialidade: ''           // Campo para a especialidade do professor
    });

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtém o nome e o valor do campo que foi alterado
        setFormData(prevState => ({
            ...prevState,
            [name]: value // Atualiza o estado do campo correspondente
        }));
    };

    // Função para limpar o formulário após o envio ou reset
    const clearForm = () => {
        setFormData({
            nome: '',                  
            cpf: '',
            dataNascimento: '',
            celular: '',
            endereco: '',
            email: '',
            senha: '',
            dataContratacao: '',
            formacao: '',
            especialidade: ''
        });
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

        const dtNasc = new Date(formData.dataNascimento); // Converte a data de nascimento para objeto Date
        const dtCont = new Date(formData.dataContratacao); // Converte a data de contratação para objeto Date
        const hoje = new Date(); // Obtém a data de hoje
        hoje.setHours(0, 0, 0, 0); // Define as horas para zero, focando apenas na data

        // Verificação das datas
        if (dtNasc > hoje) {
            setErrorMessage('A data de nascimento não pode ser uma data futura.'); // Define a mensagem de erro se a data de nascimento for no futuro
            return;
        }
        if (dtCont > hoje) {
            setErrorMessage('A data de contratação não pode ser uma data futura.'); // Define a mensagem de erro se a data de contratação for no futuro
            return;
        }

        // Limpeza dos campos de CPF e celular
        const cleanCPF = formData.cpf.replace(/\D/g, ''); // Remove caracteres não numéricos do CPF
        const cleanCelular = formData.celular.replace(/\D/g, ''); // Remove caracteres não numéricos do celular
        const cleanData = { ...formData, cpf: cleanCPF, celular: cleanCelular }; // Cria um novo objeto com os dados limpos

        try {
            const response = await ProfessoresRequests.cadastrarProfessor(cleanData); // Envia os dados limpos para a API
            clearForm();
            console.log('Professor cadastrado com sucesso:', response);
            window.alert(formData.nome + ': foi cadastrado com sucesso'); // Exibe uma mensagem de sucesso
            setErrorMessage(''); // Limpa a mensagem de erro em caso de sucesso
        } catch (error) {
            console.error('Erro ao cadastrar professor:', error); // Exibe uma mensagem de erro no console
            setErrorMessage('Ocorreu um erro: ' + error.message); // Define a mensagem de erro
        }
    };

    const hoje = new Date(); // Obtém a data de hoje novamente para utilizar no campo de data
    hoje.setHours(0, 0, 0, 0); // Define as horas para zero, focando apenas na data

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Professor</h1> {/* Título da seção */}
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para nome completo */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Nome completo"
                            value={formData.nome}
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="nome" // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
                            required
                        />
                    </div>
                    {/* Campo para CPF e Data de Nascimento */}
                    <div className={styles.formGroup}>
                        <InputMask
                            type="text"
                            mask="999.999.999-99"
                            className={styles.formStyleEsquerda}
                            placeholder="CPF"
                            value={formData.cpf}
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="cpf" // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
                            required
                        />
                        <input
                            type="text"
                            className={styles.formStyleDireita}
                            placeholder="Data de Nascimento"
                            onFocus={(e) => e.target.type = 'date'} // Define o tipo do input como 'date' ao focar
                            onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'} // Volta para 'text' se o valor estiver vazio
                            value={formData.dataNascimento}
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="dataNascimento"
                            max={hoje.toISOString().split('T')[0]} // Define a data máxima como hoje
                            required
                        />
                    </div>
                    {/* Campo para número de celular e Data de Contratação */}
                    <div className={styles.formGroup}>
                        <InputMask
                            mask="(99) 99999-9999"
                            type="text"
                            className={styles.formStyleEsquerda}
                            placeholder="Telefone"
                            value={formData.celular}
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="celular" // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
                            required
                        />
                        <input
                            type="text"
                            className={styles.formStyleDireita}
                            placeholder="Data de Contratação"
                            onFocus={(e) => e.target.type = 'date'} // Define o tipo do input como 'date' ao focar
                            onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'} // Volta para 'text' se o valor estiver vazio
                            value={formData.dataContratacao}
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="dataContratacao"
                            max={hoje.toISOString().split('T')[0]} // Define a data máxima como hoje
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
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="endereco" // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
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
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="email" // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
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
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="senha" // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
                            required
                        />
                    </div>
                    {/* Campo para formação */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Formação"
                            value={formData.formacao}
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="formacao" // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
                        />
                    </div>
                    {/* Campo para especialidade */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Especialidade"
                            value={formData.especialidade}
                            onChange={handleChange} // Define a função de mudança para atualizar o estado
                            name="especialidade" // Define o nome do campo, necessário para identificar qual campo está sendo atualizado
                        />
                    </div>
                    {/* Botão para enviar o formulário */}
                    <button type="submit" className={styles.btn}>
                        Cadastrar
                    </button>
                    {/* Botão para acessar a respectiva lista */}
                    <a className={styles.btnListagem} style={{ textDecoration: "none", marginLeft: '5%' }} href="http://localhost:5173/Listagem/Professor">
                        Listagem
                    </a>
                </form>
            </div>
        </div>
    );
}

export default CadastroProfessor; // Exporta o componente CadastroProfessor para ser utilizado em outras partes da aplicação