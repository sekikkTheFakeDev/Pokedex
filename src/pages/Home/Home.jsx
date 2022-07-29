import React, {useState, useEffect} from 'react'
import './home.scss'
import Card from '../../components/Card/Card'
import Loading from '../../components/Loading/Loading'
import {getImg, firstLetter} from '../../js/Better'

export default function Home() {

    const url = "https://pokeapi.co/api/v2/pokemon?limit=1&offset="

    const [urls, setUrls] = useState([])
    const [cards, setCards] = useState([])

    useEffect(() => {
        let offsets = []
        let fetches = []
        let newUrls = []

        for (let i=0;i<10;i++) {
            let offset = Math.floor(Math.random() * (904 - 0 + 1)) + 0;

            while (offsets.includes(offset)) {
                offset = Math.floor(Math.random() * (904 - 0 + 1)) + 0;
            }
            
            fetches.push(fetch(url + offset).then(res => res.json().then(data => {
                newUrls.push(data.results[0].url)
            })))
        }

        Promise.all(fetches).then(() => {
            setUrls(newUrls)
        })
    }, [url])

    useEffect(() => {
        if (urls.length > 0) {
            let newCards = []
            let fetches = []
            urls.forEach(url => {
                fetches.push(fetch(url).then(res => res.json()).then(data => {

                    let obj = {
                        id: data.id,
                        name: data.species.name,
                        img: getImg(data),
                        types: data.types
                    }

                    newCards.push(obj)
                }))
            })

            Promise.all(fetches).then(() => {
                setCards(newCards)
            })

        }
    }, [urls])


    if (cards.length > 0) {
        return (
            <div className="home">
                {cards.map(card => {
                    return <Card key={card.id} data={card} />
                })}
            </div>
        )
    }

    return (
        <div className="home">
            <Loading />
        </div>
    )
}
