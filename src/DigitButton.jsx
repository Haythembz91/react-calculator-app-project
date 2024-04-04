
import React from 'react'
import {ACTIONS} from './App.jsx'


function DigitButton ({dispatch,digit}){


    return (
        <td className='number' onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>{digit}</td>
    )
}

export default DigitButton