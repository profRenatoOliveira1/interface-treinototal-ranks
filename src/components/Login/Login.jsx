import AuthRequests from "../../fetch/AuthRequests";
import { useState } from 'react';
import styles from '../styles/StyleLogin.module.css';

function Login() {
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormLogin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthRequests.login(formLogin);
            if (response.auth) {
                setTimeout(() => {
                    AuthRequests.persistToken(response.token);
                }, 1000);
                window.location.href = '/';
            } else {
                setErrorMessage('Autenticação falhou. Por favor, verifique suas credenciais.');
            }
        } catch (error) {
            console.error('Erro ao tentar realizar login:', error);
            setErrorMessage('Usuário e/ou senha incorretos. Tente novamente.');
        }
    };

    return (
        <div className={styles.containerLogin}>
            <form className={styles.formLogin} onSubmit={handleSubmit}>
                <h1 className={styles.h1}>Login</h1>
                <div style={{ marginTop: '10%' }} className={styles.divConteiner}>
                    <div className="form-floating mb-3 input">
                        <input
                            className="form-control input"
                            id="labelEmail"
                            type="email"
                            placeholder="Endereço"
                            value={formLogin.email}
                            onChange={handleChange}
                            name="email"
                            required
                        />
                        <label htmlFor="labelEmail">Email</label>
                    </div>
                </div>
                <div style={{ marginTop: '4%' }} className={styles.divConteiner}>
                    <div className="form-floating mb-3 input">
                        <input
                            className="form-control input"
                            id="labelSenha"
                            type="password"
                            placeholder="Senha"
                            value={formLogin.password}
                            onChange={handleChange}
                            name="password"
                            required
                        />
                        <label htmlFor="labelSenha">Senha</label>
                    </div>
                </div>
                <button style={{ marginTop: '4%' }} className={styles.buttonLogin} type="submit">
                    Login
                </button>
                {errorMessage && <p className={styles.errorMessage} style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Login;
