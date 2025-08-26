import './App.css'
import Buttons from './components/Buttons/Index'
import Display from './components/Display/Index'
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

    const clearDisplay = states.displayValue === '0' || states.clearDisplay;

    const currentValue = clearDisplay ? '' : states.displayValue; 

    const displayValue = currentValue + number;

    setStates(copyValue => {
      return {...copyValue, displayValue, clearDisplay: false}
    });

    const newValue = parseFloat(displayValue);

    const values = [...states.values];
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
    <div className='container'>
      <h1 className='title'>React Calculator ETEC</h1>
      <Display value={states.displayValue}/>
      <div className='buttonsContainer'>
        <Buttons label="AC" type="triple" action={clearMemory}/>
        <Buttons label="/" type="operation" action={() => {setOperation('/')}} />
        <Buttons label="7" action={() => addNumber('7')}/>
        <Buttons label="8" action={() => addNumber('8')}/>
        <Buttons label="9" action={() => addNumber('9')}/>
        <Buttons label="*" type="operation" action={() => {setOperation('*')}}/>
        <Buttons label="4" action={() => addNumber('4')}/>
        <Buttons label="5" action={() => addNumber('5')}/>
        <Buttons label="6" action={() => addNumber('6')}/>
        <Buttons label="-" type="operation" action={() => {setOperation('-')}}/>
        <Buttons label="1" action={() => addNumber('1')}/>
        <Buttons label="2" action={() => addNumber('2')}/>
        <Buttons label="3" action={() => addNumber('3')}/>
        <Buttons label="+" type="operation"  action={() => {setOperation('+')}}/>
        <Buttons label="0" type="double" action={() => {addNumber(0)}}/>
        <Buttons label="." action={() => addNumber('.')}/>
        <Buttons label="=" type="operation" action={() => {setOperation('=')}} />
      </div>
    </div>

  )
}

export default App
