import React from 'react';
import './CadastroExercicio.css'

function CadastroExercicio() {

    return (
        <div className="section">
            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
    
                            <h2 className="mb-0 pb-3"><span className='espacamento-span'>Listar</span>
                            <span className='espacamento-span'>Cadastro</span></h2>
                            <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                            <label htmlFor="reg-log"></label>
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center listar">
    
                                                <h2 className="mb-4 pb-3">Listar Exercicios</h2>
                                                <div className="form-group espacamento">
                                                    <input type="text" className="form-style" placeholder="Nome do exercicio" />
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>
                                                <a href="" className="btn mt-4 ajuste">Listar</a>
    
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className=" text-center ajuste-tamanho">
                                                <h2 className="mb-3 pb-3">Cadastro de Exercicio</h2>
                                                <div className="form-group ">
                                                    <input type="text" className="form-style" placeholder="Nome do exercicio" />
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="tel" className="form-style" placeholder="Quantidade de carga" />
                                                    <i className="input-icon uil uil-phone"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="email" className="form-style" placeholder="Quantidade de repetições" />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="password" className="form-style" placeholder="Região do corpo trabalhada" />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                    <a href="https://www.web-leb.com/code" className="btn mt-4">Cadastrar-se</a>
                                               
                                                
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