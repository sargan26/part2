import React from 'react'
import Header from './course/Header'
import Content from './course/Content'

const Course = (props) => {
    
    const coursesCopy = props.courses.map(course => {
        return (
            <div key={course.id}>
                <Header name={course.name} />
                <Content parts={course.parts} />
            </div>
        )
    })


    return (
        <div>
            {/* {coursesCopy} */}
            {coursesCopy}
        </div>
    )
}
//<Content key={course.id} parts={course.parts} />

export default Course