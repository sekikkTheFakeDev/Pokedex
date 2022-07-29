import React, { useEffect, useState } from 'react'
import './search.scss'
import {useLocation, useNavigate} from 'react-router-dom'
import queryString from 'query-string'
import Loading from '../../components/Loading/Loading'
import Result from '../../components/Result/Result'

export default function Search() {

  let url = "https://pokeapi.co/api/v2/pokemon?limit=905&offset=0"

  let {search} = useLocation()
  let {value} = queryString.parse(search)
  let [all, setAll] = useState([])
  let [filtered, setFiltered] = useState([]) 

  let navigate = useNavigate()

  useEffect(() => {
    if (!value) {
      navigate(`/`)
    }
  }, [value])

  useEffect(() => {
    let newFiltered = []

    fetch(url).then(res => res.json()).then(data => {
      setAll(data.results)
    })
  }, [url])

  useEffect(() => {
    let x = all.filter(item => item.name.startsWith(value))

    if (x.length === 0) {
      setFiltered(null)
    }
    else {
      setFiltered(x)
    }
  }, [value, all])

  if (filtered != null && filtered.length > 0) {
    return (
      <div className="results">
        {filtered.map(item => {
          return <Result key={item.name} data={item} />
        })}
      </div>
    )
  }

  else if (filtered == null) {
    return (
      <div className="nores">No Results</div>
    )
  }
  else {
    return (
      <Loading />
    )
  }
}
