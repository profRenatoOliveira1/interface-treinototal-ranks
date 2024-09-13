import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar o estado do componente
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import ProfessoresRequests from '../../fetch/ProfessoresRequests'; // Importa o módulo de requisições para a API de Professores
import InputMask from "react-input-mask"; // Importa a biblioteca para criar máscaras de input

/**
    * Componente para o cadastro de professores.
    * 
    * - Mantém o estado dos dados do formulário usando o hook `useState`.
    * - Inclui funções para atualizar o estado do formulário, limpar o formulário e submeter os dados.
    * - Utiliza a biblioteca `react-input-mask` para aplicar máscaras aos campos de CPF e celular.
    * - Faz validação das datas e limpeza dos campos antes de enviar os dados para a API.
    * - Exibe um formulário para o usuário preencher com informações do professor.
    * 
    * @component
    * @example
    * return (
    *   <CadastroProfessor />
    * );
*/
function CadastroProfessor() {

    /**
        * Define o estado inicial do objeto `formData` com campos vazios,
        * utilizando o hook `useState`.
        * 
        * - Cada campo do objeto `formData` representa um atributo do professor
        *   e é inicializado como uma string vazia.
        * 
        * @constant {Object} formData - O estado que contém as informações do formulário.
        * @function setFormData - Função para atualizar o estado `formData`.
        * 
        * @param {Object} formData - Objeto contendo os dados do formulário, com os seguintes campos:
        * @param {string} formData.nome - Nome do professor.
        * @param {string} formData.cpf - CPF do professor.
        * @param {string} formData.dataNascimento - Data de nascimento do professor.
        * @param {string} formData.celular - Número de celular do professor.
        * @param {string} formData.endereco - Endereço do professor.
        * @param {string} formData.email - Endereço de email do professor.
        * @param {string} formData.senha - Senha do professor.
        * @param {string} formData.dataContratacao - Data de contratação do professor.
        * @param {string} formData.formacao - Formação acadêmica do professor.
        * @param {string} formData.especialidade - Especialidade do professor.
    */
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

    /**
        * Atualiza o estado do formulário com base nas alterações feitas pelo usuário em um campo de input.
        * 
        * - Obtém o nome e o valor do campo que foi alterado a partir do evento `e`.
        * - Atualiza o estado `formData` mantendo os valores atuais e substituindo o valor do campo alterado.
        * 
        * @function handleChange
        * 
        * @param {Object} e - O evento de mudança do input.
        * @param {string} e.target.name - O nome do campo de input que disparou o evento (usado como chave no estado).
        * @param {string} e.target.value - O valor atual do campo de input (usado para atualizar o valor no estado).
        * 
        * @example
        * // Chama a função quando o usuário altera um campo do formulário
        * handleChange({ target: { name: 'nomeAparelho', value: 'Novo Aparelho' } });
    */
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtém o nome e o valor do campo que foi alterado
        setFormData(prevState => ({
            ...prevState,
            [name]: value // Atualiza o estado do campo correspondente
        }));
    };

    /**
        * Limpa os campos do formulário, redefinindo o estado `formData` para seus valores iniciais.
        * 
        * - Atualiza o estado `formData` para um objeto com todos os campos definidos como strings vazias.
        * - Esse método é útil para resetar o formulário após a submissão ou quando necessário.
        * 
        * @function clearForm
        * 
        * @example
        * // Chama a função para limpar o formulário
        * clearForm();
    */
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

    /**
        * Função para lidar com a submissão do formulário de cadastro de professores.
        * 
        * - Previne o comportamento padrão do formulário que recarregaria a página.
        * - Converte as datas de nascimento e contratação para objetos `Date` e verifica se são datas futuras, exibindo mensagens de erro se necessário.
        * - Limpa os campos de CPF e celular de caracteres não numéricos para garantir a consistência dos dados.
        * - Envia os dados limpos para a API e aguarda a resposta.
        * - Exibe uma mensagem de sucesso e limpa o formulário em caso de sucesso, ou define uma mensagem de erro em caso de falha.
        * 
        * @async
        * @function handleSubmit
        * 
        * @param {Object} e - O evento de submissão do formulário.
        * @param {string} e.preventDefault - Método para prevenir o comportamento padrão do formulário.
        * 
        * @throws {Error} Se ocorrer um erro ao enviar os dados para a API.
        * 
        * @example
        * // Chama a função handleSubmit ao submeter o formulário
        * handleSubmit(event);
    */
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

        /**
            Remove formatação dos campos de CPF e celular e cria um novo objeto com os dados limpos.
            
            - Remove todos os caracteres não numéricos do CPF e do celular utilizando expressões regulares.
            - Cria um novo objeto `cleanData` com os dados do formulário, substituindo os campos `cpf` e `celular` pelos valores limpos.
            
            @constant {string} cleanCPF - CPF do aluno com todos os caracteres não numéricos removidos.
            @constant {string} cleanCelular - Número de celular do aluno com todos os caracteres não numéricos removidos.
            @constant {Object} cleanData - Novo objeto contendo os dados do formulário com CPF e celular limpos.
            
            @example
            // Remove formatação dos dados e cria o objeto com os dados limpos
            const cleanCPF = formData.cpf.replace(/\D/g, '');
            const cleanCelular = formData.celular.replace(/\D/g, '');
            const cleanData = { ...formData, cpf: cleanCPF, celular: cleanCelular };
         */
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