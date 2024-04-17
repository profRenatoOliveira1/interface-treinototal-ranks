import React, { useState } from 'react';
import './CadastroProfessor.css';

function CadastroProfessor() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        endereco: '',
        email: '',
        senha: '',
        dataContratacao: '',
        formacao: '',
        especialidade: ''
    });

    const [alunos, setAlunos] = useState([
        {
            nome: 'Ana Silva',
            cpf: '345.678.901-23',
            dataNascimento: '1980-03-10',
            telefone: '(11) 98765-4321',
            endereco: 'Rua das Flores, 456, São Paulo',
            email: 'ana.silva@example.com',
            senha: 'senhasecreta',
            dataContratacao: '2020-02-15',
            formacao: 'Licenciatura em Letras',
            especialidade: 'Língua Portuguesa'
        },
        {
            nome: 'Carlos Souza',
            cpf: '789.012.345-67',
            dataNascimento: '1975-09-25',
            telefone: '(21) 99876-5432',
            endereco: 'Av. Principal, 789, Rio de Janeiro',
            email: 'carlos.souza@example.com',
            senha: 'outrasenha',
            dataContratacao: '2018-05-20',
            formacao: 'Bacharelado em Matemática',
            especialidade: 'Álgebra'
        },
        {
            nome: 'Mariana Oliveira',
            cpf: '123.456.789-00',
            dataNascimento: '1988-12-01',
            telefone: '(31) 98765-1234',
            endereco: 'Rua das Palmeiras, 123, Belo Horizonte',
            email: 'mariana.oliveira@example.com',
            senha: '12345678',
            dataContratacao: '2015-10-10',
            formacao: 'Licenciatura em Biologia',
            especialidade: 'Ecologia'
        }
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const novoProfessor = { ...formData };

        console.log('Dados do formulário de cadastro de professor:', novoProfessor);

        setFormData({
            nome: '',
            cpf: '',
            dataNascimento: '',
            telefone: '',
            endereco: '',
            email: '',
            senha: '',
            dataContratacao: '',
            formacao: '',
            especialidade: ''
        });
    };

    const handleListarAlunos = () => {
        console.log('Listando alunos com nome:', formData.nome);

        const alunosFiltrados = alunos.filter(aluno =>
            aluno.nome.toLowerCase() === formData.nome.toLowerCase()
        );

        if (alunosFiltrados.length > 0) {
            console.log('Alunos encontrados:', alunosFiltrados);
        } else {
            console.log('Nenhum aluno encontrado com o nome:', formData.nome);
        }
    };

    return (
        <div className="section">
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h2 className="mb-0 pb-3"><span className='espacamento-span'>Cadastro</span>
                                <span className='espacamento-span'>Listar</span></h2>
                            <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                            <label htmlFor="reg-log"></label>
                            <div className="card-3d-wrap-prof mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center listar">
                                                <h2 className="mb-4 pb-3">Listar Professor</h2>
                                                <div className="form-group mt-2 espacamento">
                                                    <input
                                                        type="text"
                                                        className="form-style"
                                                        placeholder="Nome completo"
                                                        value={formData.nome}
                                                        onChange={handleChange}
                                                        name="nome"
                                                    />
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn mt-4 ajuste"
                                                    onClick={handleListarAlunos}
                                                >
                                                    Listar Alunos
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className=" text-center ajuste-tamanho">
                                                <h2 className="mb-3 pb-3">Cadastro Professor</h2>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-style"
                                                        placeholder="Nome completo"
                                                        value={formData.nome}
                                                        onChange={handleChange}
                                                        name="nome"
                                                    />
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="number"
                                                        className="form-style"
                                                        placeholder="CPF"
                                                        value={formData.cpf}
                                                        onChange={handleChange}
                                                        name="cpf"
                                                    />

                                                    <i className="input-icon uil uil-phone"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="date"
                                                        className="form-style"
                                                        placeholder="Data de Nascimento: "
                                                        value={formData.dataNascimento}
                                                        onChange={handleChange}
                                                        name="dataNascimento"
                                                    />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="number"
                                                        className="form-style"
                                                        placeholder="Telefone: "
                                                        value={formData.telefone}
                                                        onChange={handleChange}
                                                        name="telefone"
                                                    />
                                                    <i className="input-icon uil uil-phone"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="text"
                                                        className="form-style"
                                                        placeholder="Endereço: "
                                                        value={formData.endereco}
                                                        onChange={handleChange}
                                                        name="endereco"
                                                    />
                                                    <i className="input-icon uil uil-map-marker"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="email"
                                                        className="form-style"
                                                        placeholder="Email: "
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        name="email"
                                                    />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="password"
                                                        className="form-style"
                                                        placeholder="Senha: "
                                                        value={formData.senha}
                                                        onChange={handleChange}
                                                        name="senha"
                                                    />
                                                    <i className="input-icon uil uil-at"></i>
                                                </ div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="date"
                                                        className="form-style"
                                                        placeholder="Data de Contratação: "
                                                        value={formData.dataContratacao}
                                                        onChange={handleChange}
                                                        name="dataContratacao"
                                                    />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="text"
                                                        className="form-style"
                                                        placeholder="Formação: "
                                                        value={formData.formacao}
                                                        onChange={handleChange}
                                                        name="formacao"
                                                    />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="text"
                                                        className="form-style"
                                                        placeholder="Especialidade: "
                                                        value={formData.especialidade}
                                                        onChange={handleChange}
                                                        name="especialidade"
                                                    />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="btn mt-4"
                                                    onClick={handleSubmit}
                                                >
                                                    Cadastrar-se
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadastroProfessor;
