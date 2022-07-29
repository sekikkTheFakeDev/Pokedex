import React, { useEffect, useState, useRef } from 'react'
import './evolution.scss'
import {firstLetter, betterId, getImg} from '../../../../js/Better'
import { evoGrid, groupGrid } from '../../../../js/evoGrid'
import { useNavigate } from 'react-router-dom'

export default function Evolution(props) {

  const url = "https://pokeapi.co/api/v2/pokemon/"

  const splitted = props.url.split("/")
  const id = splitted[splitted.length-2]

  const [info, setInfo] = useState()
  const [evoref, setRef] = useState()

  useEffect(() => {
    fetch(url + id).then(res => res.json()).then(data => {
      setInfo(data)
    })
  }, [])

  let navigate = useNavigate()
  function evoPokemon(id) {
    navigate(`/pokemon/${id}`)
    window.location.reload()
  } 

  let isOdd = props.group.length % 2 === 1 ? true:false
  let span = "span 1"

  if (isOdd) {
    let cols = props.cols

    let last = props.group[cols-1]

    if (props.url == last) {
      span = "span 2"
    }
  }

  let evoHeight = props.group.length === 1 ? "70%":"100%"
  let x = [url]

  if (info)  {
    return (
      <div className="holder" style={{"--span": span}}>
        <div className="evolution" ref={setRef} style={{"--height": evoHeight}}>
          {x.map(y => {
            let size = evoref?.clientHeight / 1.8

            if (document.querySelector("body").clientWidth < 1024) {
              size += 45
            }
            else if (document.querySelector("body").clientWidth < 1220) {
              size -= 25
            }

            if (size) {
              size += "px"
              return (
                <div className="imgholder" id={info.id} style={{width: size, height: size}} onClick={() => {evoPokemon(info.id)}}>
                  <div className="evoimg" style={{backgroundImage: `url(${getImg(info)})`}}></div>
                </div>
              )
            }
          })}
          <div className="text">
            {firstLetter(info.species.name)} <span className="evoid">#{betterId(info.id)}</span>
          </div>
        </div>
      </div>
    )
  }

}
