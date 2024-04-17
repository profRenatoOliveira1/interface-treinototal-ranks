import React, { useState } from 'react';
import './CadastroAparelho.css';

function CadastroAparelho() {
    // Estados para armazenar os valores digitados pelo usuário
    const [nomeAparelho, setNomeAparelho] = useState('');
    const [musculoAtivado, setMusculoAtivado] = useState('');

    // Função para enviar os dados do formulário
    const handleSubmit = (event) => {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário
        const formData = {
            nomeAparelho,
            musculoAtivado
        };
        console.log('Dados do formulário:', formData); // Você pode enviar esses dados para a rota no backend aqui
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
                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">
                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center listar">
                                                <h2 className="mb-4 pb-3">Listar Aparelho</h2>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group espacamento">
                                                        <input
                                                            type="text"
                                                            className="form-style"
                                                            placeholder="Nome aparelho"
                                                            value={nomeAparelho}
                                                            onChange={(e) => setNomeAparelho(e.target.value)}
                                                        />
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <button type="submit" className="btn mt-4 ajuste">Listar</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className=" text-center ajuste-tamanho">
                                                <h2 className="mb-3 pb-3">Cadastro de Aparelho</h2>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group ">
                                                        <input
                                                            type="text"
                                                            className="form-style"
                                                            placeholder="Nome aparelho"
                                                            value={nomeAparelho}
                                                            onChange={(e) => setNomeAparelho(e.target.value)}
                                                        />
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="text"
                                                            className="form-style"
                                                            placeholder="Músculo ativado"
                                                            value={musculoAtivado}
                                                            onChange={(e) => setMusculoAtivado(e.target.value)}
                                                        />
                                                        <i className="input-icon uil uil-phone"></i>
                                                    </div>
                                                    <button type="submit" className="btn mt-4">Cadastrar</button>
                                                </form>
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

export default CadastroAparelho;
