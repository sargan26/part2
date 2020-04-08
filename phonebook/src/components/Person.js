import React from 'react';

const Person = (props) => {
    const { name, number, handleDelete } = props
    return (
        <div>
            <li>
                {name} {number}  
                <button onClick={handleDelete}>delete</button>
            </li>
        </div>
    );
};

export default Person;