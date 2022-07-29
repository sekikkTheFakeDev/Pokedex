import React from 'react'
import './evolutions.scss'
import Evolution from '../Evolution/Evolution'
import { evoGrid, groupGrid } from '../../../../js/evoGrid'

export default function Evolutions(props) {

    let groups = props.evolutions
    
    let grid = new evoGrid(groups)
    let gridColumns = grid.getValues(true)

    return (
        <div className="evolutions" style={{"--columns": gridColumns}}>
            {groups.map(group => {
                let ggrid = new groupGrid(group)
                let cols = ggrid.getColumnNo()

                let display = "none"
                let len = groups.length

                if (len === 2) {
                    if (group === groups[0]) {
                        display = "block"
                    }
                }
                else if (len === 3) {
                    if (group === groups[0] || group === groups[1]) {
                        display = "block"
                    }
                }

                return (
                    <div className="group" style={{"--columns": `repeat(${cols}, 1fr)`, "--display": display}}>
                        {group.map(url => {
                            return(
                                <Evolution cols={cols} group={group} groups={groups} url={url} />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}
