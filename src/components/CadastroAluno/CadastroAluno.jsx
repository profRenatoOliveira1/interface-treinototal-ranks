import React from 'react';
import './CadastroAluno.css';

function CadastroAluno() {
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

                                            <h2 className="mb-4 pb-3">Listar Aluno</h2>
                                                <div className="form-group mt-2 espacamento">
                                                    <input type="tel" className="form-style" placeholder="CPF" />
                                                    <i className="input-icon uil uil-phone"></i>
                                                </div>
                                                <a href="" className="btn mt-4 ajuste">Listar</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className=" text-center ajuste-tamanho">
                                                <h2 className="mb-3 pb-3">Cadastro de aluno</h2>
                                                <div className="form-group ">
                                                    <input type="text" className="form-style" placeholder="Nome completo" />
                                                    <i className="input-icon uil uil-user"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="number" className="form-style" placeholder="CPF" />
                                                    <i className="input-icon uil uil-phone"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="text" className="form-style" placeholder="Data de Nascimento" />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="tel" className="form-style" placeholder="Telefone" />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="text" className="form-style" placeholder="Endereço" />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="email" className="form-style" placeholder="Email" />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="password" className="form-style" placeholder="Senha" />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="number" className="form-style" placeholder="Altura" />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="number" className="form-style" placeholder="Peso" />
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

export default CadastroAluno;
