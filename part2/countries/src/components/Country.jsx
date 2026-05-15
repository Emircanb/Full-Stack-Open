import { useState, useEffect } from 'react'
import axios from 'axios'
import { use } from 'react'

const Country = ({country}) => {
    const api_key = import.meta.env.VITE_API_KEY
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
            .then(response => {
                setWeather(response.data)
                console.log(response.data)
            })
    }, [country.capital])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital {country.capital}</div>
            <div>Area {country.area}</div>
            <h2>Languages:</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>
            <h2>Weather in {country.capital}</h2>
            {weather ? (
                <div>
                    <div>temperature {weather.main.temp} Celsius</div>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
                    <div>wind {weather.wind.speed} m/s</div>
                </div>
            ) : (
                <div>Loading weather data...</div>
            )}
        </div>
    )
}


const Countries = ({countries, countryFilter}) => {
    const [countryToShow, setCountryToShow] = useState(null)

    useEffect(() => {
    setCountryToShow(null)
    }, [countryFilter])

    if (!countryFilter) {
        return null
    }
    
    if (countryToShow) {
        return (
            <div>
                <button onClick={() => setCountryToShow(null)}>back</button>
                <Country country={countryToShow}/>
            </div>
        )

    }

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()));
    if (filteredCountries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (filteredCountries.length === 1) {
        return (<Country country={filteredCountries[0]}/>)
    }
    else if (filteredCountries.length === 0) {
        return (
            <div>
                No matches found
            </div>
        )
    }

    return (
        <div>
            {filteredCountries.map(country =>
            <p
                key={country.name.common}>{country.name.common}
                <button key={`${country.name.common}-button`} onClick={() => setCountryToShow(country)}>show</button>
            </p>

        )}
        </div>
    )

}

export default Countries