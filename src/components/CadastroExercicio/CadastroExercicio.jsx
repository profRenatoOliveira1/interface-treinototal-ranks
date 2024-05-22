import React, { useState } from 'react';
import styles from './CadastroExercicio.module.css';
import ExerciciosRequests from '../../fetch/ExercíciosRequests';

function CadastroExercicio() {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        grupoMuscular: '',
        dificuldade: ''
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
            const response = await ExerciciosRequests.cadastrarExercicio(formData);
            console.log('Exercício cadastrado com sucesso:', response);
        } catch (error) {
            console.error('Erro ao cadastrar exercício:', error);
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.h1}>Cadastro de Exercício</h1>
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
                            placeholder="Descrição"
                            value={formData.descricao}
                            onChange={handleChange}
                            name="descricao"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Grupo Muscular"
                            value={formData.grupoMuscular}
                            onChange={handleChange}
                            name="grupoMuscular"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="Dificuldade"
                            value={formData.dificuldade}
                            onChange={handleChange}
                            name="dificuldade"
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

export default CadastroExercicio;
