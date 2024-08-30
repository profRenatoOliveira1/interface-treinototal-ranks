import React, { useState } from 'react';
import styles from '../styles/StyleCadastro.module.css';
import ProfessoresRequests from '../../fetch/ProfessoresRequests';
import InputMask from "react-input-mask";
import { formatarData } from "../../../util/Utilitarios";
import { useLocation, useNavigate } from "react-router-dom";




function CadastroProfessor() {
    const navigate = useNavigate();
    // usado para pegar os dados da página anterior (as informações do usuário que foram passadas pela componente ListAlunos)
    const location = useLocation();
    // recupera as informações que vieram da página anterior e armazena na variável objProfessor
    const objProfessor = location.state.objeto;

    // const { dia, mes, ano } = formatarData(new Date(objProfessor.data_nascimento));

    // Cria um estado para armazenar os dados do aluno e já preenche com as informações recebidas da página anterior
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

    // Função para atualizar os valores conforme os inputs do formulário são preenchidos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfessor(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Função para atualizar os dados do aluno no banco de dados
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


    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Arualizar de Professor</h1>
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
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CadastroProfessor;
