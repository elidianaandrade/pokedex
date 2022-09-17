const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetails) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetails.id
    pokemon.name = pokeDetails.name
    
    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.img = pokeDetails.sprites.other.dream_world.front_default

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

/* CHOOSE POKEMON */
const pokemonName = document.querySelector('.choose-pokemon__name');
const pokemonNumber = document.querySelector('.choose-pokemon__number');
const pokemonImg = document.querySelector('.choose-pokemon__img');

const form = document.querySelector('.choose-pokemon__form');
const input = document.querySelector('.choose-pokemon__search');
let searchPokemon = 1;

const getPokemon = async (pokemon) => {
    const urlPokemon = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(urlPokemon.status === 200) {
        const pokemonData = await urlPokemon.json();
        return pokemonData;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const pokemonData = await getPokemon(pokemon)

    if(pokemonData) {
        pokemonName.innerHTML = pokemonData.name
        pokemonNumber.innerHTML = `nº ${pokemonData.id}`
        pokemonImg.src = pokemonData.sprites.other.dream_world.front_default
        input.value = '';
    } else {
        pokemonName.innerHTML = 'Pokémon not found'
        pokemonNumber.innerHTML = ''
        pokemonImg.src = 'src/assets/images/whos-that-pokemon.png'
        input.value = '';
    }


}

form.addEventListener('submit', (search) => {
    search.preventDefault();
    renderPokemon(input.value.toLowerCase());
  });

renderPokemon(searchPokemon)