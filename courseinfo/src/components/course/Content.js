import React from 'react'
import Part from './content/Part'

// const Content = ({ course }) => {
//     const parts = [
//         <Part key={0} text="Fundamentals of React" value={10} />,
//         <Part key={1} text="Using props to pass data" value={7} />,
//         <Part key={2} text="State of a component" value={14} />,
//         <Part key={3} text="Redux" value={11} />
//     ]

//     const partsCopy = parts.map(part => part.props.value)

//     const total = partsCopy.reduce( (s, p) => s + p )


//     return (
//         <div>
//             {/* <Part text="Fundamentals of React" value={10} />
//             <Part text="Using props to pass data" value={7} />
//             <Part text="State of a component" value={14} />
//             <Part text="Redux" value={11} /> */}
//             {parts}
//             <p style={{fontWeight: 'bold'}}>total of {total} exercises</p>
//         </div>
//     )
// }

const Content = (props) => {

    const parts = props.parts.map(part => <Part key={part.id} text={part.name} value={part.exercises} />)

    const partsCopy = props.parts.map(part => part.exercises)
    const total = partsCopy.reduce( (s, p) => s + p )


    return (
        <div>
            {parts}
            <p style={{fontWeight: 'bold'}}>total of {total} exercises</p>
        </div>
    )
}

export default Content