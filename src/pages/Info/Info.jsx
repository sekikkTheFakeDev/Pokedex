import React, {useEffect, useState} from 'react'
import './info.scss'

import {useNavigate, useParams} from 'react-router-dom'
import {getEvolutions} from '../../js/getEvolutions'
import {getImg, firstLetter, betterId} from '../../js/Better'

import Loading from '../../components/Loading/Loading'
import Type from '../../components/Type/Type'
import Evolutions from './components/Evolutions/Evolutions'
import Stats from './components/Stats/Stats'


import {FaQuestionCircle} from 'react-icons/fa'
import {IoClose} from 'react-icons/io5'

export default function Info() {
  
    const url = "https://pokeapi.co/api/v2/pokemon/"

    const {id} = useParams()
    const [info, setInfo] = useState()
    const [abilityURL, setAbility] = useState()
    const [evolutions, setEvolutions] = useState()
    const [previous, setPrev] = useState()
    const [next, setNext] = useState()
    
    useEffect(() => {
        fetch(url + id).then(res => res.json()).then(data => {
            setInfo(data)
        })
    }, [url])

    useEffect(() => {
        let {prev, next} = getNav(parseInt(id))
        fetch(url + prev).then(res => res.json()).then(data => {
            setPrev({name: firstLetter(data.species.name), id: data.id})
        })
        fetch(url + next).then(res => res.json()).then(data => {
            setNext({name: firstLetter(data.species.name), id: data.id})
        })
    }, [])

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon-species/" + id).then(res => res.json()).then(data => {
            if (data.evolution_chain == null) setEvolutions([])

            fetch(data.evolution_chain.url).then(res => res.json()).then(data => {
                setEvolutions(getEvolutions(data))
            })
        })
    }, [id])

    useEffect(() => {
        if (abilityURL) {
            fetch(abilityURL).then(res => res.json()).then(data => {
                data.effect_entries.forEach(entry => {
                    if (entry.language.name === "en") {
                        openAbilityInfo(entry.effect)
                    }
                })
            })
        }
    }, [abilityURL])

    function getNav(id) {
        let prev = id - 1
        let next = id + 1

        if (prev < 1) {
            prev = 905
        }
        if (next > 905) {
            next = 1
        }

        return {prev: prev, next: next}

    }

    function openAbilityInfo(text) {
        let abilityinfo = document.querySelector(".blur")
        abilityinfo.style.pointerEvents = "all"
        abilityinfo.style.opacity = 1

        abilityinfo.querySelector(".abilitydesc").textContent = text
    }

    function closeInfo() {
        let abilityinfo = document.querySelector(".blur")
        abilityinfo.style.pointerEvents = "none"    
        abilityinfo.style.opacity = 0


        abilityinfo.querySelector(".abilitydesc").textContent = ""
        setAbility(null)
    }

    let navigate = useNavigate()
    function otherPokemon(id) {
        navigate(`/pokemon/${id}`)
        window.location.reload()
    }

    if (info && previous && next && evolutions) {
        
        let img = getImg(info)
        let name = firstLetter(info.species.name)

        return (
            <div className="info">
                <div className="left">
                    <div className="basic">
                        <div className="btop">
                            <div className="infotext">
                                <div className="name">
                                    <div className="id">#{betterId(info.id)}</div>
                                    {name}
                                </div>
                                <div className="squares">
                                    <div className="lsq">
                                        <div className="height txtbox">
                                            <div className="t">Height:</div>
                                            {info.height*10} cm
                                        </div>
                                        <div className="moves txtbox">
                                            <div className="t">Moves:</div>
                                            {info.moves.length}
                                        </div>
                                    </div>
                                    <div className="rsq">
                                        <div className="weight txtbox">
                                            <div className="t">Weight:</div>
                                            {info.weight/10} kg
                                        </div>
                                        <div className="infotypes txtbox">
                                            <div className="t">Type:</div>
                                            <div className="typ">
                                                {info.types.map(type => {
                                                    return <Type data={type} />
                                                })}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="infoimg" style={{backgroundImage: `url(${img})`}}></div>
                        </div>
                        <div className="bbottom">
                            <div className="abilities">
                                <div className="blur">
                                    <div className="abilityinfo">
                                        <div className="x" onClick={() => closeInfo()}><IoClose /></div>
                                        <div className="t">Ability info:</div>
                                        <div className="abilitydesc"></div>
                                    </div>
                                </div>
                                <div className="t">Abilities:</div>
                                <div className="abs">
                                    {info.abilities.map(ability => {
                                        return (
                                            <div className="ability">
                                                {firstLetter(ability.ability.name)} <span className="?" onClick={() => setAbility(ability.ability.url)}><FaQuestionCircle /></span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="navigate">
                                <div className="leftnav" onClick={() => {otherPokemon(previous.id)}}>
                                    <div className="navtext">
                                        {previous.name} <span className="pnid">#{betterId(previous.id)}</span>
                                    </div>
                                </div>
                                <div className="rightnav" onClick={() => {otherPokemon(next.id)}}>
                                    <div className="navtext">
                                        {next.name} <span className="pnid">#{betterId(next.id)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="evolutionsholder">
                        <div className="evo">Evolutions</div>
                        <Evolutions evolutions={evolutions}/>
                    </div>
                    <div className="statsholder">
                        <Stats stats={info.stats}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Loading />
    )
}
