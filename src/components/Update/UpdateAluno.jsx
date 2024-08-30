import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from '../styles/StyleCadastro.module.css'; // Importa estilos CSS específicos para este componente
import AlunoRequests from '../../fetch/AlunoRequests'; // Importa o módulo de requisições para a API de Alunos
import InputMask from "react-input-mask"; // Importa a biblioteca para criar máscaras de input
import Navegacao from "../Navegacao/Navegacao"
import {formatarData} from "../../../util/Utilitarios";


function UpdateAluno() {
    // usado para navegar entre páginas (redirecionar)

    const navigate = useNavigate();
    // usado para pegar os dados da página anterior (as informações do usuário que foram passadas pela componente ListAlunos)
    const location = useLocation();
    // recupera as informações que vieram da página anterior e armazena na variável objAluno
    const objAluno = location.state.objeto;

    // const { dia, mes, ano } = formatarData(new Date(objAluno.data_nascimento));

    // Cria um estado para armazenar os dados do aluno e já preenche com as informações recebidas da página anterior
    const [aluno, setAluno] = useState({
        id_aluno: objAluno.id_aluno,
        nome: objAluno.nome,
        cpf: objAluno.cpf,
        data_nascimento: formatarData(new Date(objAluno.data_nascimento)),
        celular: objAluno.celular,
        endereco: objAluno.endereco,
        email: objAluno.email,
        senha: objAluno.senha,
        altura: objAluno.altura,
        peso: objAluno.peso
    })
    // Função para atualizar os valores conforme os inputs do formulário são preenchidos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAluno(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Função para atualizar os dados do aluno no banco de dados
    const handleSubmit = async (e) => {
        // evita o recarregamento da página
        e.preventDefault();
        const cleanCPF = aluno.cpf.replace(/\D/g, '');
        const cleanCelular = aluno.celular.replace(/\D/g, '');
        const cleanData = { ...aluno, cpf: cleanCPF, celular: cleanCelular };

        // chama a função atualizarAluno do arquivo AlunoAPIService
        console.table(aluno);
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


    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (
        <>
            <Navegacao />
            <div className={styles.section}>
                <h1 className={styles.h1}>Atualizar de Aluno</h1>
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
                                value={aluno.data_nascimento}
                                onChange={handleChange}
                                name="data_nascimento"
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
                            <input
                                type="number"
                                className={styles.formStyleEsquerda}
                                placeholder="Altura/m"
                                value={aluno.altura}
                                onChange={handleChange}
                                name="altura"
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
                        <button type="submit" className={styles.btn}>
                            enviar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default UpdateAluno;