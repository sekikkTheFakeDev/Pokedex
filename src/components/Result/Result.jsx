import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './result.scss'
import {getImg, firstLetter} from '../../js/Better'

export default function Result(props) {
    
    const [pokemon, setPokemon] = useState()
    let navigate = useNavigate()

    useEffect(() => {
        fetch(props.data.url).then(res => res.json()).then(data => {
            setPokemon(data)
        })
    }, [])

    if (pokemon) {

        let name = firstLetter(pokemon.species.name)
        let img = getImg(pokemon)
        return (
            <div className="resultholder">
                <div onClick={() => navigate(`/pokemon/${pokemon.id}`)}className="result" id={pokemon.id}>
                    <div className="icon" style={{backgroundImage: `url(${img})`}}></div>
                    <div className="name">{name}</div>
                </div>
            </div>
        )
    }
}
