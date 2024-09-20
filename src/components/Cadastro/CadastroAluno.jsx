import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar o estado do componente
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import AlunoRequests from '../../fetch/AlunoRequests'; // Importa o módulo de requisições para a API de Alunos
import InputMask from "react-input-mask"; // Importa a biblioteca para criar máscaras de input
import { calcularIMC } from '../../../util/Utilitarios';
import './.css'
/**
    * Componente funcional para o cadastro de alunos.
    * 
    * - Utiliza o hook `useState` para gerenciar o estado do formulário.
    * - Inclui campos para nome, CPF, data de nascimento, telefone, endereço, email, senha, altura e peso.
    * - Utiliza a biblioteca `react-input-mask` para aplicar máscaras de entrada em CPF e telefone.
    * - Valida a data de nascimento para garantir que não seja uma data futura e verifica se todos os campos obrigatórios estão preenchidos.
    * - Limpa o formulário após a submissão bem-sucedida e exibe mensagens de erro se necessário.
    * 
    * @component
    * @example
    * // Renderiza o componente CadastroAluno
    * <CadastroAluno />
*/
function CadastroAluno() {

    /**
        * Define o estado inicial do objeto `formData` com campos vazios,
        * utilizando o hook `useState`.
        * 
        * - Cada campo do objeto `formData` representa um atributo do aluno
        *   e é inicializado como uma string vazia.
        * 
        * @constant {Object} formData - O estado que contém as informações do formulário.
        * @function setFormData - Função para atualizar o estado `formData`.
        * 
        * @param {Object} formData - Objeto contendo os dados do formulário, com os seguintes campos:
        * @param {string} formData.nome - Nome do aluno.
        * @param {string} formData.cpf - CPF do aluno.
        * @param {string} formData.dataNascimento - Data de nascimento do aluno.
        * @param {string} formData.celular - Número de celular do aluno.
        * @param {string} formData.endereco - Endereço do aluno.
        * @param {string} formData.email - Endereço de email do aluno.
        * @param {string} formData.senha - Senha do aluno.
        * @param {string} formData.altura - Altura do aluno.
        * @param {string} formData.peso - Peso do aluno.
    */
    const [formData, setFormData] = useState({
        nome: '',             // Campo para o nome do aluno
        cpf: '',              // Campo para o CPF do aluno
        dataNascimento: '',   // Campo para a data de nascimento do aluno
        celular: '',          // Campo para o celular do aluno
        endereco: '',         // Campo para o endereço do aluno
        email: '',            // Campo para o email do aluno
        // senha: '',            // Campo para a senha do aluno
        altura: '',           // Campo para a altura do aluno
        peso: ''              // Campo para o peso do aluno
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
            ...prevState, // Mantém os valores atuais do estado
            [name]: value // Atualiza o valor do campo específico
        }));
    };

    /**
        * Lida com a submissão do formulário de forma assíncrona, evitando o recarregamento da página,
        * e envia os dados do formulário para a API.
        * 
        * - Previne o comportamento padrão do formulário, que seria o recarregamento da página.
        * - Envia os dados do formulário para a API usando a função `cadastrarAparelho` do módulo `AparelhoRequests`.
        * - Exibe uma mensagem de sucesso ao usuário após a confirmação do cadastro.
        * - Em caso de erro durante a requisição, exibe uma mensagem de erro no console.
        * 
        * @async
        * @param {Object} e - O evento de submissão do formulário.
        * @param {EventTarget} e.target - O elemento que disparou o evento.
        * 
        * @throws {Error} Lança um erro se a requisição para cadastrar o aparelho falhar.
        * 
        * @example
        * // Chama a função ao submeter o formulário
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
        const cleanCPF = formData.cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos do CPF
        const cleanCelular = formData.celular.replace(/\D/g, ''); // Remove todos os caracteres não numéricos do celular
        const cleanData = { ...formData, cpf: cleanCPF, celular: cleanCelular }; // Cria um novo objeto com os dados limpos
        try {
            // Envia os dados do formulário para a API e aguarda a resposta     
            if (await AlunoRequests.cadastrarAluno(cleanData)) {
                console.log('Aluno cadastrado com sucesso:');
                window.alert(cleanData.nome + ': foi cadastrado com sucesso');

                if (window.confirm(`Deseja ir para a listagem?`))
                    window.location.href = 'http://localhost:5173/Listagem/Aluno';
                else
                    window.location.reload();
            } else {
                window.alert('Erro ao cadastrar aluno'); // Exibe uma mensagem de erro para o usuário
                window.location.reload();
            }
        } catch (error) {
            window.alert('Ocorreu um erro: ' + error.message); // Exibe uma mensagem de erro para o usuário
            window.location.reload();
        }

    };

    const hoje = new Date(); // Obtém a data atual
    hoje.setHours(0, 0, 0, 0); // Define as horas como 0 para facilitar a comparação de datas

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Aluno</h1> {/* Título da seção */}
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
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
                    </div>
                    <div className={styles.formGroup}>
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
                    {/* Campo para telefone */}
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
                    </div>
                    {/* Campo para endereço */}
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
                    {/* Campo para email */}
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
                    {/* Campo para senha
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
                    </div> */}
                    {/* Campo para altura e peso */}
                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                className="form-control input"
                                id="labelAltura"
                                type="number"
                                placeholder="Altura/m"
                                value={formData.altura}
                                onChange={handleChange}
                                name="altura"
                                max={2.50}
                                min={1.00}
                                step={0.01}
                                required
                            />
                            <label htmlFor="labelAltura">Altura/m</label>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <div className="form-floating mb-3 input">
                            <input
                                className="form-control input"
                                id="labelPeso"
                                type="number"
                                placeholder="Peso/Kg"
                                value={formData.peso}
                                onChange={handleChange}
                                name="peso"
                                max={250.00}
                                min={20.00}
                                step={0.01}
                                required
                            />
                            <label htmlFor="labelPeso">Peso/Kg</label>
                        </div>
                    </div>
                    <div className="formGroup input">
                        <p className={styles.formStyle}>
                            <strong>IMC:</strong> {calcularIMC(formData.peso, formData.altura)}
                        </p>
                    </div>
                    {/* Botão para enviar o formulário */}
                    <button type="submit" className={styles.btn}>
                        Cadastro
                    </button>
                    {/* Botão para acessar a respectiva lista */}
                    <a
                        className={styles.btnListagem}
                        style={{ textDecoration: "none", marginLeft: '5%' }}
                        href="http://localhost:5173/Listagem/Aluno"
                    >
                        Alunos
                    </a>
                </form>
            </div>
        </div>
    );
    
}

export default CadastroAluno; // Exporta o componente CadastroAluno para ser utilizado em outras partes da aplicação
