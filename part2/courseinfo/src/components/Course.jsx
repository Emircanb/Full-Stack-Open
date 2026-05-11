const Header = (props) => {
  return <h2>{props.course}</h2>
}

const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} part={part.name} exercise={part.exercises} />
        ))}
      </div>
    )
}

const Total = ({parts}) => {
    const totalExercises = parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <div>
      <h3>total of {totalExercises} exercises</h3>
    </div>
  )
}
  
const Part = ({part, exercise}) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </>
    )
}

export default Course