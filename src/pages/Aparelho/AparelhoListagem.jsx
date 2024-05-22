import React from 'react';
import ListarAparelho from '../../components/ListagemAparelho/ListagemAparelho';
import Navegacao from '../../components/Navegacao/Navegacao';

function AparelhoListagem() {
    return (
        <div>
            <Navegacao />
            <ListarAparelho />
        </div>
    );
}

export default AparelhoListagem;
