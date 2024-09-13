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
                <div style={{marginTop: '10%'}} className={styles.divConteiner}>
                <p style={{ color: '#ffeba7', fontWeight: 'bold', fontSize: '150%', marginTop: '2%' }}>E-mail</p>
                <input
                    type="text"
                    className={styles.inpuLogin}
                    placeholder="E-mail"
                    value={formLogin.email}
                    onChange={handleChange}
                    name="email"
                />
                </div>
                <div style={{marginTop: '4%'}} className={styles.divConteiner}>
                <p style={{ color: '#ffeba7', fontWeight: 'bold', fontSize: '150%', marginTop: '2%'  }}>Senha</p>
                <input
                    type="password"
                    className={styles.inpuLogin}
                    placeholder="Senha"
                    value={formLogin.password}
                    onChange={handleChange}
                    name="password"
                    
                />
                </div>
                <button style={{marginTop: '4%'}} className={styles.buttonLogin} type="submit">
                    Login
                </button>
                {errorMessage && <p className={styles.errorMessage} style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Login;
