import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const FindCountries = (props) => {
  const { filter, handleChange } = props

  return (
    <div>
      find countries <input value={filter} onChange={handleChange}></input>
    </div>
  )
}

const CountryInfo = (filteredCountries) => {
  return (
    <div>
      <h1>{filteredCountries[0].props.name}</h1>
      capital {filteredCountries[0].props.capital}
      <br></br>
      population {filteredCountries[0].props.population}
      <h3>languages</h3>
      <ul>
        {filteredCountries[0].props.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img style={{ width: '8%', height: 'auto' }} src={filteredCountries[0].props.flag} />
      <h3>Weather in Helskini</h3>
      <GetWeather capital={filteredCountries[0].props.capital} />
    </div>
  )
}

const GetWeather = (props) => {
  const { capital } = props
  // ---- Get Weather Data from weatherstack.com -----
  const [weather, setWeather] = useState({
    temperature: 0,
    weather_descriptions: 'sunny'
  })

  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
  }, [])
  if (weather.current !== undefined) {
    return (
      <div>
          <b>temperature:</b> {weather.current.temperature} Celcius
          <br></br>
        <img src={weather.current.weather_icons[0]}/>
        <br></br>
        <b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir} 
      </div>
    )
  } else {
    return (
      <div>
        loading...
      </div>
    )
  }
}

const Countries = (filteredCountries, handleClick) => {
  const myButtons = filteredCountries.map(country => (
    <div key={country.props.name}>
      {country.props.name + ' '}
      <button onClick={() => handleClick(country.props.name)}>show</button>
    </div>
  ))
  return (
    <div>
      {myButtons}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([{
    name: 'Germany',
    languages: [{
      iso639_1: 'de',
      name: 'German'
    }]
  }])

  // ----- Get Country Data from server ---
  useEffect(() => {
    let mounted = true
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
          setCountries(response.data)
      })
  }, [])

  const countriesList = countries.map(country => <Country key={country.name}
    name={country.name}
    capital={country.capital}
    population={country.population}
    languages={country.languages}
    flag={country.flag} />)

  // ---- Filter -----
  const [filter, setFilter] = useState('')
  const handleChange = (event) => {
    setFilter(event.target.value)
  }
  const filteredCountries = countriesList.filter(country =>
    country.props.name.toLowerCase().includes(filter.toLowerCase()))

  const handleClick = (props) => {
    setFilter(props)
  }

  // --- Logic what to display
  let display
  if (filteredCountries.length > 10) {
    display = 'Too many matches, specify another filter'
  } else if (filteredCountries.length === 1) {
    display = CountryInfo(filteredCountries)
  } else {
    display = Countries(filteredCountries, handleClick)
  }

  return (
    <div>
      <FindCountries filter={filter} handleChange={handleChange} />
      {display}
    </div>
  )
}

export default App