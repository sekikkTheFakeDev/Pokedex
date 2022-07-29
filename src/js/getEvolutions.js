let evolves = []

export function getEvolutions(data) {
    let chain = data.chain
    let main = chain.species.url
    evolves = [[main]]

    let rank = []
    chain.evolves_to.forEach(item => {
        rank.push(item.species.url)
    })
    

    if (rank.length !== 0) evolves.push(rank)

    chain.evolves_to.forEach(item => {
        getEvolves(item)
    })

    return evolves
}

function getEvolves(item) {
    if (item.evolves_to.length === 0) return
    let rank = []
    item.evolves_to.forEach(i => {
        rank.push(i.species.url)
        getEvolves(i)
    })
    evolves.push(rank)
}