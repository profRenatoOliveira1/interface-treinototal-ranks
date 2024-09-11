import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import AlunoRequests from '../../fetch/AlunoRequests'; // Importa o módulo de requisições para a API de Alunos
import InputMask from "react-input-mask"; // Importa a biblioteca para criar máscaras de input
import Navegacao from "../Navegacao/Navegacao"
import { formatarData, calcularIMC } from "../../../util/Utilitarios";

    /**
        * Componente funcional para atualizar os dados de um aluno.
        * 
        * - Usa hooks do React (`useState`, `useLocation`, `useNavigate`) para gerenciar o estado e navegação.
        * - Inicializa o estado com os dados do aluno recuperados da página anterior.
        * - Define funções para lidar com mudanças nos campos de entrada e envio do formulário.
        * - Inclui lógica para atualizar os dados do aluno e redirecionar o usuário após a atualização.
        * 
        * @function UpdateAluno
        * @returns {JSX.Element} O componente de atualização do aluno.
    */
function UpdateAluno() {
    // usado para navegar entre páginas (redirecionar)

    const navigate = useNavigate();
    // usado para pegar os dados da página anterior (as informações do usuário que foram passadas pela componente ListAlunos)
    const location = useLocation();
    // recupera as informações que vieram da página anterior e armazena na variável objAluno
    const objAluno = location.state.objeto;

    // const { dia, mes, ano } = formatarData(new Date(objAluno.data_nascimento));

    /**
        * Define o estado inicial do objeto `aluno` com base nos dados do objeto `objAluno`,
        * utilizando o hook `useState`.
        * 
        * - Cada campo do objeto `aluno` é preenchido com os valores correspondentes de `objAluno`.
        * - O campo `dataNascimento` é formatado usando a função `formatarData`.
        * 
        * @constant {Object} aluno - O estado que contém as informações do aluno.
        * @function setAluno - Função para atualizar o estado `aluno`.
        * 
        * @param {Object} objAluno - Objeto contendo os dados iniciais do aluno, que são:
        * @param {number} objAluno.id_aluno - Identificador do aluno.
        * @param {string} objAluno.nome - Nome do aluno.
        * @param {string} objAluno.cpf - CPF do aluno.
        * @param {string} objAluno.data_nascimento - Data de nascimento do aluno.
        * @param {string} objAluno.celular - Número de celular do aluno.
        * @param {string} objAluno.endereco - Endereço do aluno.
        * @param {string} objAluno.email - Endereço de email do aluno.
        * @param {string} objAluno.senha - Senha do aluno.
        * @param {number} objAluno.altura - Altura do aluno.
        * @param {number} objAluno.peso - Peso do aluno.
    */
    const [aluno, setAluno] = useState({
        id_aluno: objAluno.id_aluno,
        nome: objAluno.nome,
        cpf: objAluno.cpf,
        dataNascimento: formatarData(new Date(objAluno.data_nascimento)),
        celular: objAluno.celular,
        endereco: objAluno.endereco,
        email: objAluno.email,
        senha: objAluno.senha,
        altura: objAluno.altura,
        peso: objAluno.peso
    })

    /**
        * Atualiza o estado do objeto `aluno` com base nas alterações feitas em um campo de formulário.
        * 
        * @param {Object} e - O evento disparado pela mudança no campo de input.
        * @param {HTMLInputElement} e.target - O elemento de input que disparou o evento.
        * @param {string} e.target.name - O nome do campo de input (usado como chave no estado).
        * @param {string} e.target.value - O valor atual do campo de input (usado para atualizar o valor no estado).
    */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAluno(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    /**
        * Lida com o envio do formulário de forma assíncrona, evitando o recarregamento da página
        * e limpando os campos CPF e celular (removendo caracteres não numéricos) antes de submeter os dados.
        * 
        * @async
        * @param {Object} e - O evento de submissão do formulário.
    */
    const handleSubmit = async (e) => {
        // evita o recarregamento da página
        e.preventDefault();
        const cleanCPF = aluno.cpf.replace(/\D/g, '');
        const cleanCelular = aluno.celular.replace(/\D/g, '');
        const cleanData = { ...aluno, cpf: cleanCPF, celular: cleanCelular };

        // chama a função atualizarAluno do arquivo AlunoAPIService
        if (await AlunoRequests.atualizarAluno(cleanData)) {
            // se a função executou sem nenhum problema, é exibido um alerta confirmando a alteração para o usuário
            window.alert(`Aluno ${aluno.nome} atualizado com sucesso`);
            // redireciona o usuário para a página de listagem de alunos
            navigate(`/Listagem/Aluno`, { replace: true });
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
        <>
            <Navegacao />
            <div className={styles.section}>
                <h1 className={styles.h1}>Atualização de Aluno</h1>
                <div className={styles.container}>
                    <form onSubmit={handleSubmit}>
                        {/* Campo para o nome completo */}
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                className={styles.formStyle}
                                placeholder="Nome completo"
                                value={aluno.nome}
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
                                value={aluno.cpf}
                                onChange={handleChange}
                                name="cpf"
                                required
                            />
                            <input
                                type="date"
                                className={styles.formStyleDireita}
                                placeholder="Data de Nascimento"
                                value={aluno.dataNascimento}
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
                                value={aluno.celular}
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
                                value={aluno.endereco}
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
                                value={aluno.email}
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
                                value={aluno.senha}
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
                                value={aluno.altura}
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
                                value={aluno.peso}
                                onChange={handleChange}
                                name="peso"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <p className={styles.formStyle}
                            ><strong>imc:</strong> {calcularIMC(aluno.peso, aluno.altura)}</p>
                        </div>
                        <button type="submit" className={styles.btn}>
                            Atualizar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateAluno;// Exporta o componente UpdateAluno para ser utilizado em outras partes do código
