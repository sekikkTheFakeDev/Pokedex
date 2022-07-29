import React, {useRef} from 'react'
import {FaSearch} from 'react-icons/fa'
import './searchbar.scss'
import { useNavigate } from 'react-router-dom'

export default function Searchbar() {

  let navigate = useNavigate()
  let ref = useRef()

  function search() {
    let value = ref.current.value

    if (value == null || value === "") return

    navigate(`/search?value=${value}`)

    ref.current.value = null
  }

  return (
    <div className="inputsholder">
        <input ref={ref} type="text" className="searchinp" placeholder="Find a Pokémon" onKeyDown={(e) => {
          if (e.key === "Enter") {
            search()
          }
        }}/>
        <button onClick={search} className="searchbtn"><FaSearch /></button>
    </div>
  )
}
