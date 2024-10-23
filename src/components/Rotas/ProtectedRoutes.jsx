import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Lida com a proteção das rotas
 * A proteção previne o acesso não autorizado a rotas privadas, evitando também que a aplicação quebre.
 * 
 * A função recebe o elemento que será renderizado e as demais propriedades. Caso o usuário esteja autenticado, o elemento é renderizado, caso contrário, o usuário é redirecionado para a página de login.
 * 
 * @param {*} element - elemento (componente) que será renderizado
 * @param {*} rest - demais propriedades
 * @returns Elemento renderizado caso o usuário esteja autenticado, caso contrário, redireciona para a página de login
 */
const ProtectedRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('isAuth');    // recupera o valor de isAuth no localstorage

    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;  // verifica se o usuário está autenticado (isAuth = true), caso sim, renderiza o elemento, caso contrário, redireciona para a página de login
};

export default ProtectedRoute;