import React from 'react'
import './card.scss'
import Type from '../Type/Type'
import { useNavigate } from 'react-router-dom'
import {firstLetter} from '../../js/Better'

export default function Card(props) {

  let name = firstLetter(props.data.name)

  let navigate = useNavigate()
  function redirect() {
    navigate(`/pokemon/${props.data.id}`)
  }


  return (
    <div onClick={redirect} className="card" id={props.data.id}>
      <div className="img" style={{backgroundImage: `url(${props.data.img})`}}>{props.data.img ? "":"No Image"}</div>
      <div className="txtholder">
        <p className="cardname">{name}</p>
        <div className="types">
          {props.data.types.map(type => {
            return <Type data={type} />
          })}
        </div>
      </div>
    </div>
  )
}
