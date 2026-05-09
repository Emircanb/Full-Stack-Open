const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercise}></Part>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercise}></Part>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercise}></Part>
    </div>
  )
  
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.sum[0].exercises + props.sum[1].exercises + props.sum[2].exercises}</p>
    </div>
  )
}
  
const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}
const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}></Content>
      <Total sum={course.parts}></Total>
    </>
  )
} 

export default App