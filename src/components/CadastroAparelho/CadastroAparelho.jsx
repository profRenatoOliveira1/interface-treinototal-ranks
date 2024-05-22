import React, { useState } from 'react';
import styles from './CadastroAparelho.module.css';
import AparelhoRequests from '../../fetch/AparelhosRequests';

function CadastroAparelho() {
    const [formData, setFormData] = useState({
        id_aparelho: '',
        nome_aparelho: '',
        musculo_ativado: ''
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
            window.alert( formData.nome_aparelho + ': foi cadastrado com sucesso');
        } catch (error) {
            console.error('Erro ao cadastrar aparelho:', error);        }
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
                            value={formData.nome_aparelho}
                            onChange={handleChange}
                            name="nome_aparelho"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Musculo Ativado"
                            value={formData.musculo_ativado}
                            onChange={handleChange}
                            name="musculo_ativado"
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
