import React, { useReducer } from "react"
import DigiButton from './DigitButton.jsx'
import OperatorBtn from "./OperatorBtn.jsx"

export const ACTIONS ={
  ADD_DIGIT:'add-digit',
  CHOOSE_OP:'choose-op',
  CLEAR:'clear',
  EVALUATE:'evaluate',
  MATHPI:'math-pi',
  SQR:'sqr',
  SQRT:'sqrt'
}

function reducer (state,actions){
  switch(actions.type) {
    case ACTIONS.ADD_DIGIT:{
      if(state.overwrite){
        return{
          ...state,
          result:actions.payload.digit,
          overwrite:false
        }
      }
      if(actions.payload.digit==='0' && state.result==='0'){
        return state
      }
      if(actions.payload.digit==='.' && state.result.includes('.')){
        return state
      }
        return {
          ...state,
          result: `${state.result}${actions.payload.digit}`
        }
    }
    case ACTIONS.CLEAR: {
      return {
        ...state,
        result:'',operation:'',operator:''
      }
    }
    case ACTIONS.CHOOSE_OP :{
      if(state.result===''&&state.operation===''){
        return state
      }
      if(state.result===''){
        return {
          ...state,
          operator:actions.payload.operator
        }
      }
      if(state.operation===''){
        return{
          ...state,
          operation:state.result,
          operator:actions.payload.operator,
          result:''
        }
      }
      return{
        ...state,
          operation:operate(state),
          operator:actions.payload.operator,
          result:''
      }
      
    }
    case ACTIONS.EVALUATE:{
      if(state.result===''||state.operation===''||state.operator===''){
        return state
      }
      return {
        ...state,
        overwrite:true,
        result: operate(state),
        operation:'',
        operator:''
      }
    }
    case ACTIONS.MATHPI:
      return {
        ...state,
        result:String(Math.PI)
      }
    case ACTIONS.SQR:
      return {
        ...state,
        result:(Number(Math.pow(state.result,2)))
      }
    case ACTIONS.SQRT:
      return {
        ...state,
        result:(Number(Math.sqrt(state.result)))
      }  

    





  }
}

function operate({operation,result,operator}){
  
  let computation = 0
  switch (operator){
    case '+':
      computation = parseFloat(result) + parseFloat(operation)
      break
    case '-':
      computation = parseFloat(operation) - parseFloat(result)
      break
    case '/':
      computation = parseFloat(operation) / parseFloat(result)
      break
    case 'x':
      computation = parseFloat(operation) * parseFloat(result)
      break          

  }
  return String(computation)
}

function App (){
  
    const [{operation,result,operator},dispatch]=useReducer(reducer,{operation:'',result:'',operator:''})

    return (
      <div className="calculator">
        <div className="display">
          <div className="result">{result}</div>
          <div className="operation">{operation} {operator}</div>
        </div>
        <div className="grid">
          <table>
            <tbody>
              <tr>
                <td className="opertbtn" onClick={()=>dispatch({type:ACTIONS.MATHPI})}>π</td>
                <td className="opertbtn" onClick={()=>dispatch({type:ACTIONS.SQR})}>x²</td>
                <td className="opertbtn" onClick={()=>dispatch({type:ACTIONS.SQRT})}>√</td>
                <td className="opertbtn" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</td>
              </tr>
              <tr>
                <DigiButton digit={'7'} dispatch={dispatch}></DigiButton>
                <DigiButton digit={'8'} dispatch={dispatch}></DigiButton>
                <DigiButton digit={'9'} dispatch={dispatch}></DigiButton>
                <OperatorBtn operator={'/'} dispatch={dispatch}></OperatorBtn>
              </tr>
              <tr>
                <DigiButton digit={'4'} dispatch={dispatch}></DigiButton>
                <DigiButton digit={'5'} dispatch={dispatch}></DigiButton>
                <DigiButton digit={'6'} dispatch={dispatch}></DigiButton>
                <OperatorBtn operator={'x'} dispatch={dispatch}></OperatorBtn>
              </tr>
              <tr>
                <DigiButton digit={'1'} dispatch={dispatch}></DigiButton>
                <DigiButton digit={'2'} dispatch={dispatch}></DigiButton>
                <DigiButton digit={'3'} dispatch={dispatch}></DigiButton>
                <OperatorBtn operator={'-'} dispatch={dispatch}></OperatorBtn>
              </tr>
              <tr>
                <DigiButton digit={'0'} dispatch={dispatch}></DigiButton>
                <DigiButton digit={'.'} dispatch={dispatch}></DigiButton>
                <td className="equalKey" onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</td>
                <OperatorBtn operator={'+'} dispatch={dispatch}></OperatorBtn>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default App