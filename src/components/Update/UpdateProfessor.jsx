import React, { useState } from 'react';
import styles from '../styles/StyleCadastro.module.css';
import ProfessoresRequests from '../../fetch/ProfessoresRequests';
import InputMask from "react-input-mask";
import { formatarData } from "../../../util/Utilitarios";
import { useLocation, useNavigate } from "react-router-dom";

    /**
        * Componente `UpdateProfessor` para atualizar os dados de um professor existente.
        * 
        * - Utiliza o hook `useState` para gerenciar o estado do formulário.
        * - Utiliza `useLocation` para receber os dados do professor da página anterior.
        * - Manipula as alterações nos campos do formulário e lida com o envio de dados para a API.
        * - Exibe mensagens de erro ou sucesso após a tentativa de atualização.
        * 
        * @component
        * @returns {JSX.Element} O formulário para atualizar os dados de um professor.
    */
    function UpdateProfessor() {
        const navigate = useNavigate();
    // usado para pegar os dados da página anterior (as informações do usuário que foram passadas pela componente ListAlunos)
        const location = useLocation();
    // recupera as informações que vieram da página anterior e armazena na variável objProfessor
        const objProfessor = location.state.objeto;

    /**
        * Define o estado inicial do objeto `professor` com base nos dados do objeto `objProfessor`,
        * utilizando o hook `useState`.
        * 
        * - Cada campo do objeto `professor` é preenchido com os valores correspondentes de `objProfessor`.
        * - As datas de nascimento e contratação são formatadas utilizando a função `formatarData`.
        * 
        * @constant {Object} professor - O estado que contém as informações do professor.
        * @function setProfessor - Função para atualizar o estado `professor`.
        * 
        * @param {Object} objProfessor - Objeto contendo os dados iniciais do professor, que são:
        * @param {number} objProfessor.id_professor - Identificador do professor.
        * @param {string} objProfessor.nome - Nome do professor.
        * @param {string} objProfessor.cpf - CPF do professor.
        * @param {string} objProfessor.data_nascimento - Data de nascimento do professor.
        * @param {string} objProfessor.celular - Número de celular do professor.
        * @param {string} objProfessor.endereco - Endereço do professor.
        * @param {string} objProfessor.email - Endereço de email do professor.
        * @param {string} objProfessor.senha - Senha do professor.
        * @param {string} objProfessor.data_contratacao - Data de contratação do professor.
        * @param {string} objProfessor.formacao - Formação acadêmica do professor.
        * @param {string} objProfessor.especialidade - Especialidade do professor.
    */
    const [professor, setProfessor] = useState({
        id_professor: objProfessor.id_professor,
        nome: objProfessor.nome,
        cpf: objProfessor.cpf,
        dataNascimento: formatarData(new Date(objProfessor.data_nascimento)),
        celular: objProfessor.celular,
        endereco: objProfessor.endereco,
        email: objProfessor.email,
        senha: objProfessor.senha,
        dataContratacao: formatarData(new Date(objProfessor.data_contratacao)),
        formacao: objProfessor.formacao,
        especialidade: objProfessor.especialidade
    })

    /**
        * Atualiza o estado do objeto `professor` com base nas alterações feitas em um campo de formulário.
        * 
        * @param {Object} e - O evento disparado pela mudança no campo de input.
        * @param {HTMLInputElement} e.target - O elemento de input que disparou o evento.
        * @param {string} e.target.name - O nome do campo de input (usado como chave no estado).
        * @param {string} e.target.value - O valor atual do campo de input (usado para atualizar o valor no estado).
    */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfessor(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    /**
        * Lida com o envio do formulário de forma assíncrona, evitando o recarregamento da página,
        * limpa os campos CPF e celular, atualiza os dados do professor e redireciona o usuário após a atualização.
        * 
        * @async
        * @param {Object} e - O evento de submissão do formulário.
        * @param {EventTarget} e.target - O elemento que disparou o evento.
        * 
        * @throws {Error} Lança um erro se a requisição para atualizar o professor falhar.
    */
    const handleSubmit = async (e) => {
        // evita o recarregamento da página
        e.preventDefault();
        const cleanCPF = professor.cpf.replace(/\D/g, '');
        const cleanCelular = professor.celular.replace(/\D/g, '');
        const cleanData = { ...professor, cpf: cleanCPF, celular: cleanCelular };

        // chama a função atualizarAluno do arquivo AlunoAPIService
        if (await ProfessoresRequests.atualizarProfessor(cleanData)) {
            // se a função executou sem nenhum problema, é exibido um alerta confirmando a alteração para o usuário
            window.alert(`Professor ${professor.nome} atualizado com sucesso`);
            // redireciona o usuário para a página de listagem de alunos
            navigate(`/Listagem/Professor`, { replace: true });
        } else {
            // caso a funçao atualizarAluno retorne algum erro, é exibido um log
            console.log('Erro ao atualizar dados do aluno');
        }
    }

    /**
        * Cria um objeto `Date` representando o momento atual e define a hora para o início do dia (meia-noite).
        * 
        * - Cria um novo objeto `Date` com a data e hora atuais.
        * - Define as horas, minutos, segundos e milissegundos para 0, representando o início do dia.
        * 
        * @constant {Date} hoje - O objeto `Date` representando o início do dia atual.
    */
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Atualização de Professor</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {/* Campo para nome completo */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Nome completo"
                            value={professor.nome}
                            onChange={handleChange}
                            name="nome" required
                        />
                    </div>
                    {/* Campo para CPF */}
                    <div className={styles.formGroup}>
                        <InputMask
                            type="text"
                            mask="999.999.999-99"
                            className={styles.formStyleEsquerda}
                            placeholder="CPF"
                            value={professor.cpf}
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
                            value={professor.dataNascimento}
                            onChange={handleChange}
                            name="dataNascimento"
                            max={hoje.toISOString().split('T')[0]}
                            required
                        />
                    </div>
                    {/* Campo para número de celular */}
                    <div className={styles.formGroup}>
                        <InputMask
                            mask="(99) 99999-9999"
                            type="text"
                            className={styles.formStyleEsquerda}
                            placeholder="Telefone"
                            value={professor.celular}
                            onChange={handleChange}
                            name="celular"
                            required
                        />
                        <input
                            type="text"
                            className={styles.formStyleDireita}
                            placeholder="Data de Contratação"
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => e.target.type = e.target.value ? 'date' : 'text'}
                            value={professor.dataContratacao}
                            onChange={handleChange}
                            name="dataContratacao"
                            max={hoje.toISOString().split('T')[0]}
                            required
                        />
                    </div>
                    {/* Campo para endereço */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Endereço"
                            value={professor.endereco}
                            onChange={handleChange}
                            name="endereco"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            className={styles.formStyle}
                            placeholder="Email"
                            value={professor.email}
                            onChange={handleChange}
                            name="email"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="password"
                            className={styles.formStyle}
                            placeholder="Senha"
                            value={professor.senha}
                            onChange={handleChange}
                            name="senha"
                            required
                        />
                    </div>
                    {/* Campo para formação */}
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Formação"
                            value={professor.formacao}
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
                            value={professor.especialidade}
                            onChange={handleChange}
                            name="especialidade"
                        />
                    </div>

                    {/* Botão para enviar o formulário */}
                    <button type="submit" className={styles.btn}>
                        Atualizar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfessor;//exporta o componente UpdateProfessor para ser utilizado em outras partes da aplicação
