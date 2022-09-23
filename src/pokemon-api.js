const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetails) {
    const pokemon = new Pokemon()
    pokemon.id = ("000" + pokeDetails.id).slice(-3)
    pokemon.name = pokeDetails.name

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const abilities = pokeDetails.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)
    const [ability] = types

    pokemon.abilities = abilities
    pokemon.ability = ability

    pokemon.hp = Math.floor((pokeDetails.stats[0].base_stat * Math.random()) + 1)
    pokemon.maxHp = pokeDetails.stats[0].base_stat

    pokemon.img = pokeDetails.sprites.other.dream_world.front_default

    pokemon.weight = pokeDetails.weight / 10
    pokemon.height = pokeDetails.height / 10

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 9) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokeApi.getPokemonDetail)))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

const getPokemon = async (pokemon) => {
    const urlPokemon = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(urlPokemon.status === 200) {
        const pokemonData = await urlPokemon.json();
        return pokemonData;
    }
}