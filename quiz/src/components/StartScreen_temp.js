import React from "react"

function StartScreen({numQuestions,dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to The react Quiz!</h2>
            <h3>{numQuestions} question to test your React Mastery</h3>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"start"})}>Let's Go</button>
        </div>
    )
}

export default StartScreen
