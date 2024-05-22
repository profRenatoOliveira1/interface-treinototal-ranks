import React, { useState } from 'react';
import styles from './CadastroAparelho.module.css';
import AparelhoRequests from '../../fetch/AparelhosRequests'

function CadastroAparelho() {
    const [formData, setFormData] = useState({
        nome: '',
        tipo: '',
        marca: '',
        modelo: '',
        anoFabricacao: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AparelhoRequests.cadastrarAparelho(formData);
            console.log('Aparelho cadastrado com sucesso:', response);
        } catch (error) {
            console.error('Erro ao cadastrar aparelho:', error);
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.h1}>Cadastro de Aparelho</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Nome"
                            value={formData.nome}
                            onChange={handleChange}
                            name="nome"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            name="tipo"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Marca"
                            value={formData.marca}
                            onChange={handleChange}
                            name="marca"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Modelo"
                            value={formData.modelo}
                            onChange={handleChange}
                            name="modelo"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Ano de Fabricação"
                            value={formData.anoFabricacao}
                            onChange={handleChange}
                            name="anoFabricacao"
                        />
                    </div>
                    <button type="submit" className={styles.btn}>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CadastroAparelho;
