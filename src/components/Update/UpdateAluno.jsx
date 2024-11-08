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

    // const { dia, mes, ano } = formatarData(new Date(objAluno.dataNascimento));

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
        * @param {number} objAluno.idAluno - Identificador do aluno.
        * @param {string} objAluno.nome - Nome do aluno.
        * @param {string} objAluno.cpf - CPF do aluno.
        * @param {string} objAluno.dataNascimento - Data de nascimento do aluno.
        * @param {string} objAluno.celular - Número de celular do aluno.
        * @param {string} objAluno.endereco - Endereço do aluno.
        * @param {string} objAluno.email - Endereço de email do aluno.
        * @param {number} objAluno.altura - Altura do aluno.
        * @param {number} objAluno.peso - Peso do aluno.
        * @param {number} objAluno.imc - Peso do aluno.

    */
    const [aluno, setAluno] = useState({
        idAluno: objAluno.idAluno,
        nome: objAluno.nome,
        cpf: objAluno.cpf,
        dataNascimento: formatarData(new Date(objAluno.dataNascimento)),
        celular: objAluno.celular,
        endereco: objAluno.endereco,
        email: objAluno.email,
        altura: objAluno.altura,
        peso: objAluno.peso,
        imc: objAluno.imc
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
        const { name, value } = e.target; // Obtém o nome e o valor do campo que foi alterado
        setAluno(prevState => ({
            ...prevState, // Mantém os valores atuais do estado
            [name]: value // Atualiza o valor do campo específico
        }));

        if(name === 'peso' || name === 'altura') {
            const altura = parseFloat(name === 'altura' ? value: setAluno.altura);
            const peso = parseFloat(name === 'peso' ? value: setAluno.peso);

            if(altura > 0 && peso > 0) {
                const imc = (peso / (altura * altura)).toFixed(2);
                setAluno(prevState => ({
                    ...prevState,
                    imc
                }));
            }
        }
    };

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
            window.alert(`O aluno ${aluno.nome} foi atualizado com sucesso.`);
            // redireciona o usuário para a página de listagem de alunos
            navigate(`/Listagem/Aluno`, { replace: true });
        } else {
            // caso a funçao atualizarAluno retorne algum erro, é exibido um log
            console.log('Erro ao atualizar dados do aluno');
        }
    }

    /**
        * Cria um novo objeto de data para representar a data atual.
        * 
        * - A função `new Date()` obtém a data e hora atuais no momento de execução.
        * 
        * @constant {Date} hoje - Objeto de data que representa a data de hoje.
        */
    const hoje = new Date();

    /**
     * Ajusta a hora da data atual para 00:00:00, garantindo que apenas a data
     * (dia, mês e ano) seja considerada nas operações subsequentes.
     * 
     * - O método `setHours(0, 0, 0, 0)` define a hora, minuto, segundo e milissegundo para zero.
     * - Esse ajuste é útil quando você quer comparar apenas as datas sem considerar a hora exata.
     * 
     * @method setHours
     */
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
                            <div className="form-floating mb-3 input">
                                <input
                                    className="form-control input"
                                    id="labelNome"
                                    type="text"
                                    placeholder="Nome completo"
                                    value={aluno.nome}
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
                                    value={aluno.cpf}
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
                                    value={aluno.dataNascimento}
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
                                    value={aluno.celular}
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
                                    value={aluno.endereco}
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
                                    value={aluno.email}
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
                            value={aluno.senha}
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
                                    value={aluno.altura}
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
                                    value={aluno.peso}
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
                        <input 
                            type="text"
                            className='form-control input'
                            placeholder='IMC'
                            value={aluno.imc}
                            onChange={handleChange}
                            name="imc" 
                            disabled
                            style={{ height: '50px', textAlign: 'center', fontWeight: 'bold'}} />
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

// Exporta o componente UpdateAluno para ser utilizado em outras partes do código
export default UpdateAluno;
