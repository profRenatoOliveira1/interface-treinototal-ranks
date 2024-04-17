import React, { useState } from 'react';
import './CadastroExercicio.css';

function CadastroExercicio() {
    const [formData, setFormData] = useState({
        nomeExercicio: '',
        carga: '',
        repeticoes: '',
        regiaoCorpo: ''
    });

    const [exercicios, setExercicios] = useState([
        { nome: 'Flexão', carga: 20, repeticoes: 10, regiaoCorpo: 'Peito' },
        { nome: 'Agachamento', carga: 30, repeticoes: 15, regiaoCorpo: 'Pernas' },
        { nome: 'Prancha', carga: 0, repeticoes: 30, regiaoCorpo: 'Abdômen' }
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita o recarregamento da página ao enviar o formulário

        // Cria um novo objeto de exercício com os dados do formulário atual
        const novoExercicio = {
            nome: formData.nomeExercicio,
            carga: parseInt(formData.carga),
            repeticoes: parseInt(formData.repeticoes),
            regiaoCorpo: formData.regiaoCorpo
        };

        // Adiciona o novo exercício à lista de exercícios usando o setExercicios
        setExercicios(prevExercicios => [...prevExercicios, novoExercicio]);

        // Limpa o formulário após o cadastro
        setFormData({
            nomeExercicio: '',
            carga: '',
            repeticoes: '',
            regiaoCorpo: ''
        });

        console.log('Exercício cadastrado:', novoExercicio);
        console.log('Lista de exercícios atualizada:', exercicios);
    };

    const handleListarExercicios = () => {
        console.log('Listando exercícios com nome:', formData.nomeExercicio);

        // Filtrar exercícios com o mesmo nome fornecido no formulário
        const exerciciosFiltrados = exercicios.filter(exercicio =>
            exercicio.nome.toLowerCase() === formData.nomeExercicio.toLowerCase()
        );

        if (exerciciosFiltrados.length > 0) {
            console.log('Exercício encontrado:', exerciciosFiltrados[0]);
        } else {
            console.log('Nenhum exercício encontrado com o nome:', formData.nomeExercicio);
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
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className=" text-center ajuste-tamanho">
                                                <h2 className="mb-3 pb-3">Cadastro de Exercício</h2>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-style"
                                                        placeholder="Nome do exercício"
                                                        value={formData.nomeExercicio}
                                                        onChange={handleChange}
                                                        name="nomeExercicio"
                                                    />
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="number"
                                                        className="form-style"
                                                        placeholder="Quantidade de carga"
                                                        value={formData.carga}
                                                        onChange={handleChange}
                                                        name="carga"
                                                    />
                                                    <i className="input-icon uil uil-phone"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="number"
                                                        className="form-style"
                                                        placeholder="Quantidade de repetições"
                                                        value={formData.repeticoes}
                                                        onChange={handleChange}
                                                        name="repeticoes"
                                                    />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input
                                                        type="text"
                                                        className="form-style"
                                                        placeholder="Região do corpo trabalhada"
                                                        value={formData.regiaoCorpo}
                                                        onChange={handleChange}
                                                        name="regiaoCorpo"
                                                    />
                                                    <i className="input-icon uil uil-lock-alt"></i>
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
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center listar">
                                                <h2 className="mb-4 pb-3">Listar Exercícios</h2>


                                                <div className="form-group espacamento">
                                                    <input
                                                        type="text"
                                                        className="form-style"
                                                        placeholder="Nome do exercício"
                                                        value={formData.nomeExercicio}
                                                        onChange={handleChange}
                                                        name="nomeExercicio"
                                                    />
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn mt-4 ajuste"
                                                    onClick={handleListarExercicios}
                                                >
                                                    Listar
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

export default CadastroExercicio;
