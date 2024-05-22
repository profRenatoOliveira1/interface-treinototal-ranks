import React, { useState } from 'react';
import styles from './CadastroExercicio.module.css';
import ExerciciosRequests from '../../fetch/ExerciciosRequests';

function CadastroExercicio() {
    const [formData, setFormData] = useState({
        id_aparelho: '',
        exercicio: '',
        carga: '',
        repeticoes: '',
        regiao_corpo_ativa: ''
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
            window.alert( formData.exercicio + ': foi cadastrado com sucesso');
            setFormData({
                exercicio: '',
                carga: '',
                repeticoes: '',
                regiao_corpo_ativa: ''
            });
        } catch (error) {
            console.error('Erro ao cadastrar exercício:', error);
            window.alert( 'Erro ao cadastrar exercício');

        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.h1}>Cadastro de Exercício</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            className={styles.formStyle}
                            placeholder="id_aparelho"
                            value={formData.id_aparelho}
                            onChange={handleChange}
                            name="id_aparelho"
                        />
                    </div>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="exercicio"
                            value={formData.exercicio}
                            onChange={handleChange}
                            name="exercicio"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            className={styles.formStyle}
                            placeholder="carga"
                            value={formData.carga}
                            onChange={handleChange}
                            name="carga"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="number"
                            className={styles.formStyle}
                            placeholder="repeticoes"
                            value={formData.repeticoes}
                            onChange={handleChange}
                            name="repeticoes"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.formStyle}
                            placeholder="regiaoCorpoAtiva"
                            value={formData.regiao_corpo_ativa}
                            onChange={handleChange}
                            name="regiao_corpo_ativa"
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
