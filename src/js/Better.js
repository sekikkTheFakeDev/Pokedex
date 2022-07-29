export function getImg(data) {
    let better_id = betterId(data.id)

    let img = data.sprites.other.dream_world.front_default || 
              data.sprites.other["official-artwork"].front_default || 
              data.sprites.front_default || 
              `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${better_id}.png`

    return img
}

export function firstLetter(string) {
    return string[0].toUpperCase() + string.substring(1)
}

export function betterId(id) {
    var str = "" + id
    var pad = "000"
    var better_id = pad.substring(0, pad.length - str.length) + str
    
    return better_id
}