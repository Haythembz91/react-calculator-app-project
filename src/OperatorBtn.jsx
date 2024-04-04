import { ACTIONS } from "./App.jsx"
import React from "react"

function OperatorBtn ({dispatch,operator}){
    return (
        <td className="opertbtn" onClick={()=>{dispatch({type: ACTIONS.CHOOSE_OP,payload:{operator}})}}>{operator}</td>
    )
}

export default OperatorBtn