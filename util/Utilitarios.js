/**
 * Função para formatar uma data no formato AAAA-MM-DD
 * Usado para preencher o input do tipo date de maneira correta
 * 
 * @param {*} data - data a ser formatada
 * @returns data formatada no padrão AAAA-MM-DD
 */
export function formatarData(data) {
    const dataISO = new Date(data).toISOString();
    return dataISO.split('T')[0];
}


/**
 * Função para formatar uma data no padrão brasileiro DD/MM/AAAA
 * 
 * @param {string|Date} data - data a ser formatada
 * @returns data formatada no padrão DD/MM/AAAA
 */
export function formatadorDataCard(data) {
    const dataLocal = new Date(data + 'T00:00:00');  // Força a interpretação correta da data no fuso local
    return dataLocal.toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo',  // Garante o uso do fuso horário correto
    });
}

/**
 * Função para calcular o Índice de Massa Corporal (IMC)
 * 
 * @param {number} peso - Peso da pessoa em quilogramas (kg)
 * @param {number} altura - Altura da pessoa em metros (m)
 * @returns {number} - Retorna o valor do IMC
 */
export function calcularIMC(peso, altura) {
    if (!peso || !altura || altura <= 0) {
        return 0;
    }
    else {
        const imc = peso / (altura * altura);
        return imc.toFixed(2);
    }

}


/**
 * Função para formatar uma data no padrão brasileiro DD/MM/AAAA
 * 
 * @param {*} data - data a ser formatada
 * @returns data formatada no padrão DD/MM/AAAA
 */
export function formatadorData(data) {
    return new Date(data).toLocaleDateString('pt-br');
}


export function formatarTelefone(celular) {
    celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

/**
 * Função para formatar um CPF no formato padrão 000.000.000-00
 * 
 * @param {string} cpf - CPF a ser formatado
 * @returns CPF formatado no padrão 000.000.000-00
 */
export function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Função para limpar um CPF, removendo todos os caracteres não numéricos
 * 
 * @param {Object} formData - objeto contendo o CPF a ser limpo
 * @returns CPF limpo, sem caracteres não numéricos
 */
export function cleanCPF(formData) {
    formData.cpf.replace(/\D/g, ''); // Substitui todos os caracteres não numéricos por vazio
}

/**
 * Função para limpar um número de celular, removendo todos os caracteres não numéricos
 * 
 * @param {Object} formData - objeto contendo o celular a ser limpo
 * @returns número de celular limpo, sem caracteres não numéricos
 */
export function cleanCelular(formData) {
    formData.celular.replace(/\D/g, ''); // Substitui todos os caracteres não numéricos por vazio
}
