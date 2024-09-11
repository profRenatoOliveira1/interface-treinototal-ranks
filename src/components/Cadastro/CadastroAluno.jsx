import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar o estado do componente
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import AlunoRequests from '../../fetch/AlunoRequests'; // Importa o módulo de requisições para a API de Alunos
import InputMask from "react-input-mask"; // Importa a biblioteca para criar máscaras de input
import { calcularIMC } from '../../../util/Utilitarios';
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
        senha: '',            // Campo para a senha do aluno
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
            altura: '',
            peso: ''
        });
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
        const dtNasc = new Date(formData.dataNascimento); // Converte a data de nascimento para um objeto Date
        const hoje = new Date(); // Obtém a data atual
        hoje.setHours(0, 0, 0, 0); // Define as horas como 0 para facilitar a comparação de datas

        // Verifica se a data de nascimento não é futura
        if (dtNasc > hoje) {
            setErrorMessage('A data de nascimento não pode ser uma data futura.');
            return;
        }

        // Verifica se os campos obrigatórios estão preenchidos
        if (!formData.nome || !formData.cpf || !formData.email || !formData.senha || !formData.altura) {
            setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
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
        const cleanCPF = formData.cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos do CPF
        const cleanCelular = formData.celular.replace(/\D/g, ''); // Remove todos os caracteres não numéricos do celular
        const cleanData = { ...formData, cpf: cleanCPF, celular: cleanCelular }; // Cria um novo objeto com os dados limpos
        try {
            // Envia os dados do formulário para a API e aguarda a resposta
            const response = await AlunoRequests.cadastrarAluno(cleanData);
            if (response) {
                clearForm();
                window.alert(`${formData.nome} foi cadastrado com sucesso`);
            }
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            window.alert('Ocorreu um erro: ' + error.message);
        }
    };

    const dtNasc = new Date(formData.dataNascimento); // Converte a data de nascimento para um objeto Date
    const hoje = new Date(); // Obtém a data atual
    hoje.setHours(0, 0, 0, 0); // Define as horas como 0 para facilitar a comparação de datas

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Cadastro de Aluno</h1> {/* Título da seção */}
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
                            onFocus={(e) => e.target.type = 'date'} // Muda o tipo do input para "date" ao focar
                            onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'} // Volta para "text" se o campo estiver vazio
                            value={formData.dataNascimento}
                            onChange={handleChange}
                            name="dataNascimento"
                            max={hoje.toISOString().split('T')[0]} // Define a data máxima como a data atual
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
                        <InputMask
                            mask="9.99"
                            type="text"
                            className={styles.formStyleEsquerda}
                            placeholder="Altura/m"
                            value={formData.altura}
                            onChange={handleChange}
                            name="altura"
                            max={3}
                            min={0}
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
                    <div className={styles.formGroup}>
                        <p className={styles.formStyle}
                        ><strong>imc:</strong> {calcularIMC(formData.peso, formData.altura)}</p>
                    </div>
                    {/* Botão para enviar o formulário */}
                    <button type="submit" className={styles.btn}>
                        Cadastrar
                    </button>
                    {/* Botão para acessar a respectiva lista */}
                    <a className={styles.btnListagem} style={{ textDecoration: "none", marginLeft: '5%' }} href="http://localhost:5173/Listagem/Aluno">
                        Listagem
                    </a>
                </form>

            </div>
        </div>
    );
}

export default CadastroAluno; // Exporta o componente CadastroAluno para ser utilizado em outras partes da aplicação
