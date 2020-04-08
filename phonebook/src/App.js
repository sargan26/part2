import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // ---- Fatch from json server ----------
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // ---------- Add Person -----------
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    // creates array that contains objects with filtered name
    const filteredArray = persons.filter(person => person.name === personObject.name)

    // update Person
    if (filteredArray.length > 0) {
      const result = window.confirm(`${newName} is already added, replace the old number with a new one?`)
      setNewName('')
      if (result) {
        // notification updated
        setNotification(
          `Updated ${personObject.name}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        personService
          .update(filteredArray[0].id, personObject)
          .then()
          .catch(error => {
            // error message
            setErrorMessage(
              `Person '${personObject.name}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNotification(
              null
            )
          })


        personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
            setNewName('')
            setNewNumber('')
          })   
      }
    // create new Person
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(
            `Added ${personObject.name}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }


  }

  // -------- Event Handlers ----------
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${person.name} ?`)
    if (result) {
      personService
        .remove(id)
        .then()
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
      setNewName('')
      setNewNumber('')
    }

  }

  // ------- Filter ------
  const [filter, setFilter] = useState('')
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={errorMessage}/>
      <Notification message={notification} />
      <Filter text='filter shown with ' filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <AddPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      {props.text}<input value={props.filter} onChange={props.handleFilterChange} />
    </div>
  )
}

const AddPerson = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Numbers = (props) => {
  const personsFiltered = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))


  if (personsFiltered[0] !== undefined) {
    return (
      <ul>
        {personsFiltered.map(person => <Person
          key={person.id}
          name={person.name}
          number={person.number}
          handleDelete={() => props.handleDelete(person.id)}
        />)}
      </ul>
    )
  } else {
    return (
      <div></div>
    )
  }
}




export default App