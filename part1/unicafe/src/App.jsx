import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td style={{ textAlign: 'left' }}>{value}</td>
    </tr>
  )
}
const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}
const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <tr>
        <td>No feedback given</td>
      </tr>
    )
  }
  const average = (good - bad) / total  
  const positive = (good / total) * 100
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="average" value={average.toFixed(1)} />
          <StatisticLine text="positive" value={`${positive.toFixed(1)} %`} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App