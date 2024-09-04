/**
 * Função para formatar uma data no formato AAAA-MM-DD
 * Usado para preencher o input do tipo date de maneira correta
 * 
 * @param {*} data - data a ser formatada
 * @returns data formatada no padrão AAAA-MM-DD
 */
export function formatarData(data) {
    let dia, mes, ano = 0;

    // Extrai o ano da data e converte para string
    ano = `${data.getFullYear()}`;

    // Condicional para formatar dia e mês com dois dígitos (adiciona '0' se necessário)
    if (data.getDate() < 10 && data.getMonth() + 1 < 10) {
        dia = `0${data.getDate()}`;
        mes = `0${data.getMonth() + 1}`;
    } else if (data.getDate() < 10) {
        dia = `0${data.getDate()}`;
        mes = `${data.getMonth() + 1}`;
    } else if (data.getMonth() + 1 < 10) {
        dia = `${data.getDate()}`;
        mes = `0${data.getMonth() + 1}`;
    } else {
        dia = `${data.getDate()}`;
        mes = `${data.getMonth() + 1}`;
    }

    // Retorna a data no formato AAAA-MM-DD
    return `${ano}-${mes}-${dia}`;
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
