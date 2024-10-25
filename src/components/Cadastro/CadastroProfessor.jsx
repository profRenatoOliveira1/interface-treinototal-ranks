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
        // senha: '',                  // Campo para o senha do professor
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
            // Envia os dados do formulário para a API e aguarda a resposta    
            if (await ProfessoresRequests.cadastrarProfessor(cleanData)) {
                console.log('Professor cadastrado com sucesso:');
                window.alert(cleanData.nome + ': foi cadastrado com sucesso');
                if (window.confirm(`Deseja ir para a listagem?`))
                    window.location.href = 'http://localhost:5173/Listagem/Professor';
                else
                    window.location.reload();
            } else {
                window.alert('Erro ao cadastrar professor'); // Exibe uma mensagem de erro para o usuário
                window.location.reload();
            }
        } catch (error) {
            console.error('Erro ao cadastrar professor:', error.message);
            window.location.reload();
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
                        <div className="form-floating mb-3 input">
                            <input
                                className="form-control input"
                                id="labelNome"
                                type="text"
                                placeholder="Nome completo"
                                value={formData.nome}
                                onChange={handleChange}
                                name="nome"
                                required
                            />
                            <label htmlFor="labelNome">Nome completo</label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <InputMask
                                type="text"
                                className="form-control input"
                                id="labelCpf"
                                mask="999.999.999-99"
                                placeholder="CPF"
                                value={formData.cpf}
                                onChange={handleChange}
                                name="cpf"
                                required
                            />
                            <label htmlFor="labelCpf">CPF</label>
                        </div>
                        <div className="form-floating mb-3 input">
                            <input
                                type="date"
                                className="form-control input"
                                id="labelDataNasc"
                                placeholder="Data de Nascimento"
                                value={formData.dataNascimento}
                                onChange={handleChange}
                                name="dataNascimento"
                                min={"1930-01-01"}
                                max={hoje.toISOString().split('T')[0]}
                                required
                            />
                            <label htmlFor="labelDataNasc">Data de Nascimento</label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <InputMask
                                type="text"
                                className="form-control input"
                                id="labelCelular"
                                mask="(99) 99999-9999"
                                placeholder="Celular"
                                value={formData.celular}
                                onChange={handleChange}
                                name="celular"
                                required
                            />
                            <label htmlFor="labelCelular">Celular</label>
                        </div>
                        <div className="form-floating mb-3 input">
                            <input
                                type="date"
                                className="form-control input"
                                id="labelDataContratacao"
                                placeholder="Data de Contratação"
                                value={formData.dataContratacao}
                                onChange={handleChange}
                                name="dataContratacao"
                                max={hoje.toISOString().split('T')[0]}
                                required
                            />
                            <label htmlFor="labelDataContratacao">Data de Contratação</label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                className="form-control input"
                                id="labelEndereco"
                                type="text"
                                placeholder="Endereço"
                                value={formData.endereco}
                                onChange={handleChange}
                                name="endereco"
                                required
                            />
                            <label htmlFor="labelEndereco">Endereço</label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                className="form-control input"
                                id="labelEmail"
                                type="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                                required
                            />
                            <label htmlFor="labelEmail">E-mail</label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                className="form-control input"
                                id="labelFormacao"
                                type="text"
                                placeholder="Formação"
                                value={formData.formacao}
                                onChange={handleChange}
                                name="formacao"
                            />
                            <label htmlFor="labelFormacao">Formação</label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                className="form-control input"
                                id="labelEspecialidade"
                                type="text"
                                placeholder="Especialidade"
                                value={formData.especialidade}
                                onChange={handleChange}
                                name="especialidade"
                            />
                            <label htmlFor="labelEspecialidade">Especialidade</label>
                        </div>
                    </div>
                    {/* Botão para enviar o formulário */}
                    <button type="submit" className={styles.btn}>
                        Cadastro
                    </button>
                    {/* Botão para acessar a respectiva lista */}
                    <a className={styles.btnListagem} style={{ textDecoration: "none", marginLeft: '5%' }} href="http://localhost:5173/Listagem/Professor">
                        Professores
                    </a>
                </form>
            </div>
        </div>
    );
}

// Exporta o componente CadastroProfessor para ser utilizado em outras partes da aplicação
export default CadastroProfessor;