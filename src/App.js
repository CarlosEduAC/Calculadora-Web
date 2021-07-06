import axios from 'axios';

import { useState } from 'react';

import './App.css';

function App() {
  const [display, setDisplay] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(display);

    const [parcelaA, operador, parcelaB] = display.split(' ');

    const calculo = {
      parcelaA: Number(parcelaA),
      parcelaB: Number(parcelaB),
      operador
    }

    console.log(calculo);

    axios.post('http://localhost:3003/calculadora', calculo).then((response) => {
      console.log(response.data.resultado);
    });

    axios.get('http://localhost:3003/historico').then((response) => {
      console.log(response.data);
    });
  }

  const teclas = [1, 2, 3, 4, 5, 6, 7, 8, 9, ['+', '-', '*', '/'], 0, '='];

  const handleCalculation = (tecla) => {
    if (tecla === "+") {
      tecla = " + ";
    }

    if (tecla !== "=") {
      setDisplay(String(display) + String(tecla));
    }

  }

  return (
    <form className="app" onSubmit={handleSubmit}>
      <h1>Calculadora</h1>
      <div className="app-calculadora">
        <input className="app-display" value={display} onChange={() => setDisplay(display)} />
        {teclas.map(tecla => {
          return (
            <button
              type={tecla === "=" ? "submit" : "button"}
              key={tecla}
              className={typeof tecla === "object" ? `teclas-soma tecla` : `tecla`}
              value={display}
              onClick={() => handleCalculation(tecla)}
            >{typeof tecla === "object" ? (
              tecla.map(tecla => <div class="tecla-operador">{tecla}</div>)
            ) : tecla}</button>
          )
        })}
      </div>

      {/* <div className="app-container">
        <div className="app-input">
          <label htmlFor="operadorA">Operador A:</label>
          <input
            id="operadorA"
            type="number"
            value={parcelaA}
            onChange={event => setParcelaA(event.target.value)}
          />
        </div>

        <div className="app-input">
          <label htmlFor="operacao">Operação:</label>
          <input
            id="operacao"
            type="text"
            value={operador}
            onChange={event => setOperador(event.target.value)}
          />
        </div>

        <div className="app-input">
          <label htmlFor="operadorB">Operador B:</label>
          <input
            id="operadorB"
            type="number"
            value={parcelaB}
            onChange={event => setParcelaB(event.target.value)}
          />
        </div>

        <button type="submit" className="app-button">Calcular</button>  
      </div> */}
    </form >
  );
}

export default App;
