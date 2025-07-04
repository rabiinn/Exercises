import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(Array(anecdotes.length).fill(0))

  const selectNext = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }
  const nextVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  return (
    <div>
      {anecdotes[selected]}
      <div>
      <Button handleClick={selectNext} text="next anecdote"/>
      <Vote handleVote={nextVote} text="vote" />
      </div>
      <FindMostvote arr={votes} anecdotes={anecdotes}/>
    </div>
  )
}
const FindMostvote = ({arr,anecdotes}) =>{
  let biggestIndex = 0
  for(let i = 0;i <arr.length; i++){
    if(arr[i] > arr[biggestIndex]){
      biggestIndex = i 
    }
  }
  return (
    <div>
      <p><b>Anecdote with most votes</b></p>
      <p>{anecdotes[biggestIndex]}</p>
      has {arr[biggestIndex]} votes
    </div>

  )
}
const Button = (props) => (<button onClick={props.handleClick}>{props.text}</button>)
const Vote = (props) => (<button onClick={props.handleVote}>{props.text}</button>)

export default App