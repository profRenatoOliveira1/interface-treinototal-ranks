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
    const location = useLocation();
    const objProfessor = location.state.objeto;

    // Define o estado inicial do objeto `professor` com base nos dados do objeto `objProfessor`,
    // Utilizando `America/Sao_Paulo` como fuso horário para garantir o formato correto.
    const [professor, setProfessor] = useState({
        idProfessor: objProfessor.id_professor,
        nome: objProfessor.nome,
        cpf: objProfessor.cpf,
        dataNascimento: formatarData(new Date(objProfessor.data_nascimento)),
        celular: objProfessor.celular,
        endereco: objProfessor.endereco,
        email: objProfessor.email,
        dataContratacao: formatarData(new Date(objProfessor.data_contratacao)),
        formacao: objProfessor.formacao,
        especialidade: objProfessor.especialidade
    })

    // Função para lidar com as mudanças nos campos de input e atualizar o estado do objeto professor.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfessor(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Função assíncrona para lidar com o envio do formulário e atualizar os dados do professor.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const cleanCPF = professor.cpf.replace(/\D/g, '');
        const cleanCelular = professor.celular.replace(/\D/g, '');
        const cleanData = { ...professor, cpf: cleanCPF, celular: cleanCelular };

        if (await ProfessoresRequests.atualizarProfessor(cleanData)) {
            window.alert(`O professor ${professor.nome} foi atualizado com sucesso.`);
            navigate(`/Listagem/Professor`, { replace: true });
        } else {
            console.log('Erro ao atualizar dados do professor');
        }
    }

    // Definição da data de hoje, configurada para o início do dia.
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (
        <div className={styles.section}>
            <h1 className={styles.h1}>Atualização de Professor</h1>
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
                                value={professor.nome}
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
                                value={professor.cpf}
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
                                value={professor.dataNascimento}
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
                                value={professor.celular}
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
                                value={professor.dataContratacao}
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
                                value={professor.endereco}
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
                                value={professor.email}
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
                                value={professor.formacao}
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
                                value={professor.especialidade}
                                onChange={handleChange}
                                name="especialidade"
                            />
                            <label htmlFor="labelEspecialidade">Especialidade</label>
                        </div>
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

// Exporta o componente UpdateProfessor para ser utilizado em outras partes da aplicação.
export default UpdateProfessor;
