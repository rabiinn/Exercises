import { useState } from 'react'

  const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all = good + neutral + bad
    const average = all > 0? (good - bad) / all : 0
    const positive = all > 0? (good / all) * 100: 0
  
    const handleGood = () =>{
      setGood(good + 1)
    }
    const handleNeutral = () => {
      setNeutral(neutral + 1)
    }
    const handleBad = () => {
      setBad(bad + 1)
    }
  return (
    <div>
      <p><b>give feedback</b></p>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      <p><b>Statistics</b></p>
      {all === 0? <p>Give Feedback</p>:
      <table>
        <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={all}/>
            <StatisticLine text="average" value={average.toFixed(2)}/>
            <StatisticLine text="positive" value={positive.toFixed(2)+ "%"}/>
        </tbody>
      </table>
      }
    </div>
  )
}

  const Button = ({onClick,text}) => (<button onClick={onClick}>{text}</button>)

  
  const StatisticLine = ({text,value}) => {
    return (
          <tr>
            <td>{text}</td>
            <td>{value}</td>
          </tr>
    )
  }


export default App
