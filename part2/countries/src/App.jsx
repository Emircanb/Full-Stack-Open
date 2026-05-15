import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Country.jsx'


const App = () => {

  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  return (
    <>
      find countries <input value={countryFilter} onChange ={handleFilterChange}/>
      <Countries countries={countries} countryFilter={countryFilter}/>
    </>
  )
}

export default App
