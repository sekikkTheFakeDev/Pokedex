import React, {useState} from 'react'
import { firstLetter } from '../../../../js/Better'
import './stats.scss'

export default function Stats(props) {
     
    let [barRef, setRef] = useState()
    let delay = -150

    return (
        <div className="stats">
            {props.stats.map(stat => {
                delay += 150
                let name = stat.stat.name
                name = name === "hp" ? name.toUpperCase() : firstLetter(name)
                name = name.replace("-", " ")

                let base = stat.base_stat
                let max = name === "HP" ? base * 2 + 204 : (base * 2 + 99) * 1.1
                max = Math.floor(max)

                let ls = [1]

                return (
                    <div className="stat">
                        <div className="statname">{name}</div>
                        <div className="bar" ref={setRef}>
                            {ls.map(x => {

                                let width = barRef?.clientWidth / max * base

                                if (width) {
                                    return (
                                        <div className="meter" style={{"--width": width + "px", "--delay": delay + "ms"}}>
                                            <div className="base">{base}</div>
                                        </div>
                                        
                                    )
                                }
                            })}
                            
                        </div>
                        <div className="maxval">{max}</div>
                    </div>
                )
            })}
        </div>
    )
}
