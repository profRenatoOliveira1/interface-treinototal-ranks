import React, { useState } from 'react';
import './CadastroAluno.css';

function CadastroAluno() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        endereco: '',
        email: '',
        senha: '',
        altura: '',
        peso: ''
    });

    const [alunos, setAlunos] = useState([
        {
            nome: 'João Silva',
            cpf: '123.456.789-00',
            dataNascimento: '1995-08-15',
            telefone: '(11) 98765-4321',
            endereco: 'Rua das Flores, 123, São Paulo',
            email: 'joao.silva@example.com',
            senha: 'senhasecreta',
            altura: '1.75m',
            peso: '70kg'
        },
        {
            nome: 'Maria Souza',
            cpf: '987.654.321-00',
            dataNascimento: '1990-05-20',
            telefone: '(21) 99876-5432',
            endereco: 'Av. Principal, 456, Rio de Janeiro',
            email: 'maria.souza@example.com',
            senha: 'outrasenha',
            altura: '1.60m',
            peso: '55kg'
        },
        {
            nome: 'Pedro Santos',
            cpf: '456.789.123-00',
            dataNascimento: '1998-12-10',
            telefone: '(31) 98765-1234',
            endereco: 'Rua das Palmeiras, 789, Belo Horizonte',
            email: 'pedro.santos@example.com',
            senha: '12345678',
            altura: '1.80m',
            peso: '80kg'
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

        const novoAluno = { ...formData };

        setAlunos(prevAlunos => [...prevAlunos, novoAluno]);

        setFormData({
            nome: '',
            cpf: '',
            dataNascimento: '',
            telefone: '',
            endereco: '',
            email: '',
            senha: '',
            altura: '',
            peso: ''
        });

        console.log('Aluno cadastrado:', novoAluno);
    };

    const handleListarAlunos = () => {
        console.log('Listando alunos com nome:', formData.nome);

        const alunosFiltrados = alunos.filter(aluno =>
            aluno.nome.toLowerCase() === formData.nome.toLowerCase()
        );

        if (alunosFiltrados.length > 0) {
            console.log('Aluno encontrado:', alunosFiltrados[0]);
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
                            <h2 className="mb-0 pb-3">
                                <span className='espacamento-span'>Cadastro</span>
                                <span className='espacamento-span'>Listar</span>
                                </h2>
                            <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                            <label htmlFor="reg-log"></label>
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center listar">
                                            <h2 className="mb-3 pb-3">listar Aluno</h2>
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
                                                    Listar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className=" text-center ajuste-tamanho">
                                            <h2 className="mb-4 pb-3">Cadastro de Aluno</h2>
                                               
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
                                                        type="text"
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
                                                        type="text"
                                                        className="form-style"
                                                        placeholder="Data de Nascimento"
                                                        value={formData.dataNascimento}
                                                        onChange={handleChange}
                                                        name="dataNascimento"
                                                    />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="text"
                                                        className="form-style"
                                                        placeholder="Telefone"
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
                                                        placeholder="Endereço"
                                                        value={formData.endereco}
                                                        onChange={handleChange}
                                                        name="endereco"
                                                    />
                                                    <i className="input-icon uil uil-map-marker"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="text"
                                                        className="form-style"
                                                        placeholder="Email"
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
                                                        placeholder="Senha"
                                                        value={formData.senha}
                                                        onChange={handleChange}
                                                        name="senha"
                                                    />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="text"
                                                        className="form-style"
                                                        placeholder="Altura"
                                                        value={formData.altura}
                                                        onChange={handleChange}
                                                        name="altura"
                                                    />
                                                    <i className="input-icon uil uil-ruler"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="text"
                                                        className="form-style"
                                                        placeholder="Peso"
                                                        value={formData.peso}
                                                        onChange={handleChange}
                                                        name="peso"
                                                    />
                                                    <i className="input-icon uil uil-weight"></i>
                                                </div>
                                                <button
                                                    type="button"
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

export default CadastroAluno;
