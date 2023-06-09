import React, { useState } from 'react'
import Banner from './Components/Banner.compenent'
import Screen from './Components/Screen.component'
import './App.scss';
import './styles/key.style.scss'

export const THEME = [
  "Theme1",
  "Theme2",
  "Theme3"
]

function App() {
  const [value, setValue] = useState("0")
  const [expression, setExpression] = useState("")
  const [pressPad,setPressPad]=useState(0)

  const clearResult = function () {
    setValue("0")
    setExpression("")
  }

  const deleteLast = function () {
    setValue((value) => {
      return (value.length > 1 && !isNaN(value)) ? value.toString().slice(0, -1) : "0"
    })
  }

  function addOperator(opt) {
    addNumber(opt)
  }

  function calculate() {
    setValue((value) => {
      value=expression+value
      // eslint-disable-next-line
      const mathExpressionRegex = /^-?\d+(\.\d+)?(\s*[\+\-\*\/]\s*-?\d+(\.\d+)?)*$/
      const isValid = mathExpressionRegex.test(value);
      setExpression("")
      // eslint-disable-next-line
      return isValid? eval(value)+"" : "0"
    })
  }

  function addNumber(opt) {
    opt = opt.toString()
    if(isNaN(opt)&&opt!=="."){
      setPressPad((v)=>v-1)
    }else{
      setPressPad(0)
    }
    setValue((value) => {
      if (value.length === 1 && opt !== "-" &&opt !== "." && value === "0" && opt !== "*" && opt !== "+" && opt !== "/") {
        value = opt
      } else {
        if ((!value.includes(".") && opt === ".") || !isNaN(opt)) {
          value += opt
        }
      }
      return value
    })
    if (isNaN(opt) && opt !== ".") {
      setExpression((exp) => {
        //console.log(exp)
        if (exp.length>=2&&isNaN(exp[exp.length-1])&&pressPad<0) {
          exp=exp.slice(0,-1)
          exp+= opt
        } else {
          //if (exp.lastIndexOf(opt) === -1) {
            exp = exp + parseFloat(value) + opt
            setValue("0")
          //}
        }
        return exp
      }
      )
    }
  }
  const [themeID, setTheme] = useState(window.localStorage.getItem("Theme") || 0);
  return (
    <div className={`App ${THEME[themeID]}`}>
      <main className="container">
        <Banner themeID={themeID} setTheme={setTheme} />
        <Screen expression={expression} value={value} />
        <div className="contener-key">
          <button onClick={() => deleteLast()}>DEL</button>
          <button onClick={() => clearResult()}>RESET</button>
          <button onClick={() => addNumber('7')}>7</button>
          <button onClick={() => addNumber('8')}>8</button>
          <button onClick={() => addNumber('9')}>9</button>
          <button onClick={() => addNumber('4')}>4</button>
          <button onClick={() => addNumber('5')}>5</button>
          <button onClick={() => addNumber('6')}>6</button>
          <button onClick={() => addOperator('+')}>+</button>
          <button onClick={() => addNumber('1')}>1</button>
          <button onClick={() => addNumber('2')}>2</button>
          <button onClick={() => addNumber('3')}>3</button>
          <button onClick={() => addOperator('-')}>-</button>
          <button onClick={() => addNumber('.')}>.</button>
          <button onClick={() => addNumber('0')}>0</button>
          <button onClick={() => addOperator('/')} style={{ paddingTop: "7px" }}>&divide;</button>
          <button onClick={() => addOperator('*')} style={{ paddingTop: "7px" }}>&times;</button>
          <button onClick={() => calculate()}>=</button>
        </div>
        <div class="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>.
          Coded by <a href="https://github.com/mohamedelbachir" target="_blank" rel="noreferrer">Mohamed el bachir</a>.
        </div>
      </main>
    </div>
  );
}

export default App;
