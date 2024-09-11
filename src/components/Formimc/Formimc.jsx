import React, { useState } from 'react';
import styles from './FormIMC.module.css'; // Importa os estilos CSS específicos para este componente

function FormIMC() {
  // Estados para armazenar os valores dos inputs e resultados
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');
  const [sexo, setSexo] = useState('masculino');
  const [highlight, setHighlight] = useState('');

  // Função para formatar o peso, garantindo que esteja no formato correto (ex: 65.30)
  const formatarPeso = (valor) => {
    const apenasNumeros = valor.replace(/[^0-9]/g, ''); // Remove tudo que não é número
    if (apenasNumeros.length <= 2) {
      return apenasNumeros;
    }
    return apenasNumeros.slice(0, -2) + '.' + apenasNumeros.slice(-2); // Adiciona o ponto decimal
  };

  // Função para formatar a altura, garantindo que esteja no formato correto (ex: 1.60)
  const formatarAltura = (valor) => {
    const apenasNumeros = valor.replace(/[^0-9]/g, ''); // Remove tudo que não é número
    if (apenasNumeros.length <= 1) {
      return apenasNumeros;
    }
    return apenasNumeros.slice(0, 1) + '.' + apenasNumeros.slice(1); // Adiciona o ponto decimal
  };

  // Função para lidar com mudanças no input de peso
  const handlePesoChange = (e) => {
    let valor = e.target.value;
    const valorFormatado = formatarPeso(valor);
    if (valorFormatado.length > 6) { // Limita o comprimento do valor formatado
      return;
    }
    setPeso(valorFormatado);
  };

  // Função para lidar com mudanças no input de altura
  const handleAlturaChange = (e) => {
    let valor = e.target.value;
    const valorFormatado = formatarAltura(valor);
    if (valorFormatado.length > 5) { // Limita o comprimento do valor formatado
      return;
    }
    setAltura(valorFormatado);
  };

  // Função para lidar com mudanças na seleção do sexo
  const handleSexoChange = (e) => {
    setSexo(e.target.value);
  };

  // Função para calcular o IMC e determinar a faixa de IMC
  const calcularIMC = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    // Verifica se o peso e altura são válidos
    if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      setResultado('Por favor, insira valores válidos.');
      return;
    }

    const imc = pesoNum / (alturaNum * alturaNum); // Calcula o IMC
    let faixaIMC;
    let highlightClass;

    // Determina a faixa de IMC e a classe de destaque com base no sexo
    if (sexo === 'masculino') {
      if (imc < 20) {
        faixaIMC = 'Abaixo do Normal';
        highlightClass = styles.highlight;
      } else if (imc >= 20 && imc < 24.9) {
        faixaIMC = 'com peso Normal';
        highlightClass = styles.highlight;
      } else if (imc >= 25 && imc < 29.9) {
        faixaIMC = 'em Obesidade Leve';
        highlightClass = styles.highlight;
      } else if (imc >= 30 && imc < 39.9) {
        faixaIMC = 'em Obesidade Moderada';
        highlightClass = styles.highlight;
      } else {
        faixaIMC = 'em Obesidade Mórbida';
        highlightClass = styles.highlight;
      }
    } else {
      if (imc < 19) {
        faixaIMC = 'Abaixo do Normal';
        highlightClass = styles.highlight;
      } else if (imc >= 19 && imc < 23.9) {
        faixaIMC = 'Normal';
        highlightClass = styles.highlight;
      } else if (imc >= 24 && imc < 28.9) {
        faixaIMC = 'Obesidade Leve';
        highlightClass = styles.highlight;
      } else if (imc >= 29 && imc < 38.9) {
        faixaIMC = 'Obesidade Moderada';
        highlightClass = styles.highlight;
      } else {
        faixaIMC = 'Obesidade Mórbida';
        highlightClass = styles.highlight;
      }
    }

    // Atualiza o resultado com o IMC e a faixa
    setResultado(`Seu IMC é ${imc.toFixed(2)}. Você está ${faixaIMC}.`);
    setHighlight(faixaIMC);

    // Sugere peso ideal se não estiver na faixa normal
    if (faixaIMC !== 'Normal') {
      let pesoIdealMin = 20 * alturaNum * alturaNum;
      let pesoIdealMax = 24.9 * alturaNum * alturaNum;
      if (sexo === 'feminino') {
        pesoIdealMin = 19 * alturaNum * alturaNum;
        pesoIdealMax = 23.9 * alturaNum * alturaNum;
      }
      const diferencaPeso = pesoNum < pesoIdealMin ? pesoIdealMin - pesoNum : pesoNum - pesoIdealMax;
      const sugestaoPeso = pesoNum < pesoIdealMin ? 'ganhar' : 'perder';
      if (faixaIMC !== 'Normal') {
        setResultado(prev => `${prev} Você precisa ${sugestaoPeso} ${diferencaPeso.toFixed(2)} kg para estar no peso ideal.`);
      }
    }
  };

  return (
    <div className={styles.formImc}>
      <h1 className={styles.h1}>Cálculo IMC</h1> {/* Título da seção */}
      <div className={styles.radioGroup}>
        {/* Seleção de sexo */}
        <label>
          <input
            type="radio"
            value="masculino"
            checked={sexo === 'masculino'}
            onChange={handleSexoChange}
          />
          Masculino
        </label>
        <label>
          <input
            type="radio"
            value="feminino"
            checked={sexo === 'feminino'}
            onChange={handleSexoChange}
          />
          Feminino
        </label>
      </div>
      <div className={styles.formGroup}>
        {/* Campo para peso */}
        <label htmlFor="peso">Peso (kg):</label>
        <input
          type="text"
          className={styles.peso}
          value={peso}
          onChange={handlePesoChange}
          placeholder="Exemplo: 65.30"
        />
      </div>
      <div className={styles.formGroup}>
        {/* Campo para altura */}
        <label htmlFor="altura">Altura (m):</label>
        <input
          type="text"
          className={styles.altura}
          value={altura}
          onChange={handleAlturaChange}
          placeholder="Exemplo: 1.60"
        />
      </div>
      {/* Botão para calcular o IMC */}
      <button className={styles.button} onClick={calcularIMC}>
        Calcular IMC
      </button>
      {/* Exibe o resultado do cálculo */}
      {resultado && <div className={styles.resultado}>{resultado}</div>}
      <div className={styles.tabelaIMC}>
        <table>
          <thead>
            <tr>
              <th>IMC - Índice de Massa Corporal</th>
              <th>Homem</th>
              <th>Mulher</th>
            </tr>
          </thead>
          <tbody>
            {/* Tabela com faixas de IMC e destaque para a faixa correspondente */}
            <tr className={highlight === 'Obesidade Mórbida' ? styles.highlight : ''}>
              <td>Obesidade Mórbida</td>
              <td>&gt; de 43</td>
              <td>&gt; de 39</td>
            </tr>
            <tr className={highlight === 'Obesidade Moderada' ? styles.highlight : ''}>
              <td>Obesidade Moderada</td>
              <td>30 a 39.9</td>
              <td>29 a 38.9</td>
            </tr>
            <tr className={highlight === 'Obesidade Leve' ? styles.highlight : ''}>
              <td>Obesidade Leve</td>
              <td>25 a 29.9</td>
              <td>24 a 28.9</td>
            </tr>
            <tr className={highlight === 'Normal' ? styles.highlight : ''}>
              <td>Normal</td>
              <td>20 a 24.9</td>
              <td>19 a 23.9</td>
            </tr>
            <tr className={highlight === 'Abaixo do Normal' ? styles.highlight : ''}>
              <td>Abaixo do Normal</td>
              <td>&lt; de 20</td>
              <td>&lt; de 19</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormIMC; // Exporta o componente FormIMC para ser utilizado em outras partes da aplicação
