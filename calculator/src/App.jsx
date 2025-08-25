import Buttons from './components/Buttons'
import './App.css'
import { useState } from 'react'

function App() {

  const initialStates = [{
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
  }]

  const [states, setStates] = useState(...initialStates);

  function addNumber(number) {
    if (number === '.' && states.displayValue.includes(".")) {
      return
    }

    const clearDisplay = clearDisplay ? '' : states.displayValue;

    const displayValue = currentValue + number;

    setStates(copyValue => {
      return {...copyValue, displayValue, clearDisplay: false}
    });

    const newValue = parseFloat(displayValue);

    const values = [...states.value];
    values[states.current] = newValue;
    setStates(copyValue => {
      return {...copyValue, values}
    });
  }

  function clearMemory() {
    setStates(...initialStates);
  }

  function setOperation(operation) {
    if(states.current === 0) {
      setStates(copyValue => {
        return {...copyValue, operation, current: 1, clearDisplay: true}
      });
    } else {
      const equals = operation === '=';
      const values = [...states.values];

      try {
        values[0] = eval(`${values[0]} ${states.operation} ${values[1]}`);
      } catch (error) {
        values[0] = states.values[0];
      }

      values[1] = 0;

      setStates(copyValue => {
        return {
          ...copyValue,
          displayValue: values[0],
          operation: equals ? null : operation,
          current: equals ? 0: 1,
          clearDisplay: true,
          values,
        }
      });
    }
  }

  return (
    <>
      <Buttons value="AC" type="triple" />
      <Buttons value="/" type="operation" />
      <Buttons value="7" />
      <Buttons value="8" />
      <Buttons value="9" />
      <Buttons value="4" />
      <Buttons value="5" />
      <Buttons value="6" />
      <Buttons value="-" type="operation" />
      <Buttons value="1" />
      <Buttons value="2" />
      <Buttons value="3" />
      <Buttons value="+" type="operation" />
      <Buttons value="0" type="double" />
      <Buttons value="." />
      <Buttons value="=" type="operation" />




    </>

  )
}

export default App
